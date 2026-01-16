import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export function MessageBoard() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch messages from Supabase on mount
    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Supabase Error:", error)
            } else {
                // Filter out empty messages
                const validMessages = (data || []).filter(msg =>
                    msg.content && msg.content.trim().length > 0
                )
                setMessages(validMessages)
            }
        } catch (error) {
            console.error("載入失敗:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation: Only check if content is empty
        if (!content.trim()) {
            alert('請輸入留言內容')
            return
        }

        setIsSubmitting(true)

        const SECRET_CODE = "dev"

        // Handle Name Logic
        let rawName = name.trim()
        let finalName = rawName
        let isDev = false

        // Check for secret code
        if (rawName.includes("#" + SECRET_CODE)) {
            isDev = true
            finalName = rawName.replace("#" + SECRET_CODE, "").trim()
            if (!finalName) finalName = "oryn.tw"
        } else if (!rawName) {
            finalName = "匿名"
        }

        // Create message object
        const newMessage = {
            name: finalName,
            content: content.trim(),
            is_dev: isDev
        }

        // Optimistic UI Update
        setMessages(prev => [{ ...newMessage, created_at: new Date().toISOString() }, ...prev])
        setContent('')
        setName('')

        try {
            const { error } = await supabase
                .from('messages')
                .insert([newMessage])

            if (error) {
                console.error('Error posting message:', error)
                alert('發送失敗，請稍後再試')
            }
        } catch (error) {
            console.error('Error posting message:', error)
            alert('發送失敗，但留言已暫存顯示')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Format timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        return date.toLocaleString('zh-TW')
    }

    // Split messages into dev logs and community messages
    const devMessages = messages.filter(m => m.is_dev === true)
    const communityMessages = messages.filter(m => m.is_dev !== true)

    return (
        <section id="messages" className="py-24 px-4 md:px-8 bg-[#050505] w-full">
            <div className="w-full max-w-[1920px] mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#EAEAEA]">
                        來聊聊天 / 聽聽你的想法
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
                            <h3 className="text-xl font-bold text-[#D4AF37]">魔法師的修練日記</h3>
                            <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-full">Dev Log</span>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                            {loading ? (
                                <p className="text-[#A1A1AA] text-center py-8">載入中...</p>
                            ) : devMessages.length === 0 ? (
                                <p className="text-[#A1A1AA] text-center py-8">暫無訊息</p>
                            ) : (
                                devMessages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id || `dev-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[#D4AF37] font-bold text-xl md:text-2xl">🔧 {msg.name === 'oryn.tw' ? '【開發者】' : msg.name}</span>
                                            <span className="text-[#A1A1AA] text-lg">{formatTime(msg.created_at)}</span>
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
                            <h3 className="text-xl font-bold text-stone-200">冒險者留言板</h3>
                            <span className="text-xs bg-stone-200/10 text-stone-300 px-2 py-1 rounded-full"></span>
                        </div>

                        {/* Message Input Form */}
                        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                            {/* Name Input */}
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="你的大名 (或是帥氣代號)"
                                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-6 py-4 text-[#EAEAEA] text-xl placeholder-neutral-600 focus:border-[#D4AF37] outline-none transition-colors"
                            />

                            {/* Message Textarea */}
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="留個言給開發者，或是跟大家打招呼..."
                                rows={6}
                                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-6 py-4 text-[#EAEAEA] text-xl placeholder-neutral-600 focus:border-[#D4AF37] outline-none transition-colors resize-none"
                            />

                            {/* Submit Button */}
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
                                ) : '貼上佈告欄'}
                            </button>
                        </form>

                        {/* Messages List */}
                        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                            {loading ? (
                                <p className="text-[#A1A1AA] text-center py-8">載入中...</p>
                            ) : communityMessages.length === 0 ? (
                                <p className="text-[#A1A1AA] text-center py-8">還沒人來過？快來搶頭香！🏆</p>
                            ) : (
                                communityMessages.map((msg, index) => (
                                    <motion.div
                                        key={msg.id || `community-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-stone-300 font-bold text-xl md:text-2xl">{msg.name || '匿名'}</span>
                                            <span className="text-[#A1A1AA] text-lg">{formatTime(msg.created_at)}</span>
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
