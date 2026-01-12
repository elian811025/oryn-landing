import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Google Apps Script URL for message board
const GAS_URL = "https://script.google.com/macros/s/AKfycbxlM5XI6y9sxyBrAb1BPv5AiEc62M2v4mJYmCE-Mti0lF-yBAN48ZjJqhqUcd3d4_Xg0Q/exec"
export function MessageBoard() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch messages on mount
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            // 1. 加個時間戳記 (t=...) 騙過瀏覽器，強制不讀快取
            const res = await fetch(`${GAS_URL}?t=${new Date().getTime()}`);

            const rawData = await res.json();
            console.log("從 Google 抓到的原始資料:", rawData);

            const validMessages = rawData.map(msg => {
                // 2. 資料清洗
                return {
                    ...msg,
                    name: String(msg.name || "匿名"),
                    content: String(msg.content || ""),
                    is_dev: msg.is_dev === true || String(msg.is_dev).toUpperCase() === "TRUE"
                };
            }).filter(msg => {
                // 3. 過濾
                return msg.content.trim().length > 0;
            });

            console.log("清洗後的資料:", validMessages);
            setMessages(validMessages);

        } catch (error) {
            console.error("載入失敗 (請檢查網址或網路):", error);
        } finally {
            // 【關鍵修正】不管成功或失敗，最後一定要把 Loading 關掉！
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // 1. Validation: Only check if content is empty
        if (!content.trim()) {
            alert('請輸入留言內容')
            return
        }

        setIsSubmitting(true)

        const SECRET_CODE = "dev";

        // 2. Handle Name Logic
        let rawName = name.trim();
        let finalName = rawName;
        let isDev = false;

        // Check for secret code
        if (rawName.includes("#" + SECRET_CODE)) {
            isDev = true;
            finalName = rawName.replace("#" + SECRET_CODE, "").trim();
            if (!finalName) finalName = "oryn.tw";
        } else if (!rawName) {
            // Default to "匿名" if empty
            finalName = "匿名";
        }

        // Create message object
        const newMessage = {
            name: finalName,
            content: content.trim(),
            is_dev: isDev,
            timestamp: new Date().toLocaleString('zh-TW')
        }

        // Optimistic UI Update
        setMessages(prev => [newMessage, ...prev])
        setContent('')
        setName('') // Clear name

        try {
            await fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'post_message',
                    name: rawName || "匿名", // Send raw name (or "匿名") to backend
                    content: newMessage.content,
                    is_dev: newMessage.is_dev
                })
            })
        } catch (error) {
            console.error('Error posting message:', error)
            alert('發送失敗，但留言已暫存顯示')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Split messages into dev logs and community messages
    const devMessages = messages.filter(m => m.is_dev === true)
    const communityMessages = messages.filter(m => m.is_dev !== true)

    return (
        <section id="messages" className="py-24 px-8 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#EAEAEA]">
                        互動中心
                    </h2>
                    <p className="text-[#A1A1AA]">Communication Hub</p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column - Dev Log */}
                    <motion.div
                        className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-2xl p-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#D4AF37]/20">
                            <span className="text-2xl">👨‍💻</span>
                            <h3 className="text-xl font-bold text-[#D4AF37]">開發者日誌</h3>
                            <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-full">Dev Log</span>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {loading ? (
                                <p className="text-[#A1A1AA] text-center py-8">載入中...</p>
                            ) : devMessages.length === 0 ? (
                                <p className="text-[#A1A1AA] text-center py-8">暫無開發者訊息</p>
                            ) : (
                                devMessages.map((msg, index) => (
                                    <motion.div
                                        key={`dev-${index}-${msg.timestamp}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[#D4AF37] font-bold text-xl md:text-2xl">🔧 {msg.name === 'oryn.tw' ? '【開發者】' : msg.name}</span>
                                            <span className="text-[#A1A1AA] text-lg">{msg.timestamp}</span>
                                        </div>
                                        <p className="text-[#EAEAEA] text-2xl md:text-3xl leading-relaxed font-medium">{msg.content}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column - Community */}
                    <motion.div
                        className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                            <span className="text-2xl">💬</span>
                            <h3 className="text-xl font-bold text-stone-200">社群留言</h3>
                            <span className="text-xs bg-stone-200/10 text-stone-300 px-2 py-1 rounded-full">Community</span>
                        </div>

                        {/* Message Input Form */}
                        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                            {/* Name Input */}
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="你的名字 (選填)"
                                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-6 py-4 text-[#EAEAEA] text-xl placeholder-neutral-600 focus:border-[#D4AF37] outline-none transition-colors"
                            />

                            {/* Message Textarea (Upgraded) */}
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="留下你的想法..."
                                rows={6}
                                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-6 py-4 text-[#EAEAEA] text-xl placeholder-neutral-600 focus:border-[#D4AF37] outline-none transition-colors resize-none"
                            />

                            {/* Submit Button (Solid Gold Luxury) */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-4 bg-[#D4AF37] hover:bg-[#B8860B] disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-black text-xl font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-[#D4AF37]/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        發送中...
                                    </>
                                ) : '發送留言'}
                            </button>
                        </form>

                        {/* Messages List */}
                        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                            {loading ? (
                                <p className="text-[#A1A1AA] text-center py-8">載入中...</p>
                            ) : communityMessages.length === 0 ? (
                                <p className="text-[#A1A1AA] text-center py-8">成為第一個留言的人吧！</p>
                            ) : (
                                communityMessages.map((msg, index) => (
                                    <motion.div
                                        key={`community-${index}-${msg.timestamp}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-stone-300 font-bold text-xl md:text-2xl">{msg.name || '匿名'}</span>
                                            <span className="text-[#A1A1AA] text-lg">{msg.timestamp}</span>
                                        </div>
                                        <p className="text-[#EAEAEA] text-2xl md:text-3xl leading-relaxed font-medium">{msg.content}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
