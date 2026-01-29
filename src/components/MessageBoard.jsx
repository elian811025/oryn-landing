import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export function MessageBoard() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch messages
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

            if (!error) {
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
        if (!content.trim()) {
            alert('請輸入留言內容')
            return
        }

        setIsSubmitting(true)
        const SECRET_CODE = "dev"
        let rawName = name.trim()
        let finalName = rawName
        let isDev = false

        if (rawName.includes("#" + SECRET_CODE)) {
            isDev = true
            finalName = rawName.replace("#" + SECRET_CODE, "").trim()
            if (!finalName) finalName = "oryn.tw"
        } else if (!rawName) {
            finalName = "匿名旅人"
        }

        const newMessage = {
            name: finalName,
            content: content.trim(),
            is_dev: isDev
        }

        // Optimistic UI
        setMessages(prev => [{ ...newMessage, created_at: new Date().toISOString() }, ...prev])
        setContent('')
        setName('')

        try {
            const { error } = await supabase.from('messages').insert([newMessage])
            if (error) throw error
        } catch (error) {
            alert('發送失敗，已轉為暫存模式顯示')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatTime = (timestamp) => {
        if (!timestamp) return 'Just now'
        const date = new Date(timestamp)
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    const devMessages = messages.filter(m => m.is_dev === true)
    const communityMessages = messages.filter(m => m.is_dev !== true)

    return (
        <section id="messages" className="py-32 px-4 md:px-8 bg-[#020202] w-full border-t border-white/5 relative overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold font-serif text-[#D4AF37] mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        聯絡與動態
                    </motion.h2>
                    <motion.p
                        className="text-neutral-300 font-medium text-base tracking-wide"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        這裡記錄著我的開發進度，也歡迎你留下任何訊息。
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left: System Logs (Dev) - 5 Columns */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <h3 className="text-[#D4AF37] font-bold text-lg">站長日誌</h3>
                        </div>

                        <div className="relative group">
                            {/* Removed blur effect for clarity */}
                            <div className="relative bg-[#111] border border-white/20 rounded-2xl h-[500px] overflow-hidden flex flex-col shadow-xl">
                                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                    <span className="text-white/60 text-sm">最新發布</span>
                                    <span className="text-[#D4AF37] text-xs font-bold">ORYN.TW</span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-[#D4AF37]/20 scrollbar-track-transparent">
                                    {loading ? (
                                        <div className="flex justify-center p-4"><span className="text-white/40 text-sm">載入中...</span></div>
                                    ) : (
                                        devMessages.map((msg, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                className="relative pl-6 border-l-2 border-[#D4AF37]/30"
                                            >
                                                <div className="text-xs text-[#D4AF37] font-medium mb-1">
                                                    {formatTime(msg.created_at)}
                                                </div>
                                                <p className="text-white text-base leading-relaxed">
                                                    {msg.content}
                                                </p>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Community (Feed + Input) - 7 Columns */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                            <h3 className="text-white font-bold text-lg">訪客留言板</h3>
                        </div>

                        {/* Input Area (Top) */}
                        <div className="relative rounded-2xl bg-white/[0.03] border border-white/10">
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="你的暱稱 (選填)..."
                                            className="w-1/3 bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                                        />
                                        <button
                                            disabled={isSubmitting}
                                            className="flex-1 bg-[#D4AF37] text-black font-bold text-base rounded-lg hover:bg-[#F4CF57] disabled:opacity-50 transition-all active:scale-[0.98]"
                                        >
                                            {isSubmitting ? '發送中...' : '送出留言'}
                                        </button>
                                    </div>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="寫下你想說的話..."
                                        rows={3}
                                        className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-base text-white placeholder-white/30 resize-none focus:border-[#D4AF37] focus:outline-none transition-all"
                                    />
                                </form>
                            </div>
                        </div>

                        {/* Message Feed */}
                        <div className="flex-1 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-white/10 pr-2 space-y-3">
                            {communityMessages.length === 0 ? (
                                <div className="text-center py-10 text-white/30 text-sm">目前還沒有留言，來搶頭香吧！</div>
                            ) : (
                                communityMessages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-[#D4AF37]/30 transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-[#e2e2e2] text-sm">
                                                {msg.name || '匿名訪客'}
                                            </span>
                                            <span className="text-xs text-white/40">
                                                {formatTime(msg.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap break-words">
                                            {msg.content}
                                        </p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
