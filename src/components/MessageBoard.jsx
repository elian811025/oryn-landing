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
        if (!timestamp) return '--/-- --:--'
        const date = new Date(timestamp)
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    }

    // Split messages into dev logs and community messages
    const devMessages = messages.filter(m => m.is_dev === true)
    const communityMessages = messages.filter(m => m.is_dev !== true)

    return (
        <section id="messages" className="py-24 px-4 md:px-8 bg-[#050505] w-full border-t border-white/5 relative">

            {/* Background Grid for Continuity */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                        opacity: 0.2
                    }}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-white/40 font-mono text-sm tracking-widest">
                            <span className="w-2 h-2 bg-white/40 block" />
                            模組：訊號交換 [SIGNAL_EXCHANGE]
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            交流訊號
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="flex items-center justify-end gap-4 text-xs font-mono text-white/40">
                            <span>TOTAL_MSGS: {messages.length}</span>
                            <span>ACTIVE_NODES: 2</span>
                        </div>
                    </div>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column - Dev Log (System Log) */}
                    <motion.div
                        className="flex flex-col h-full"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-[#0a0a0a] border border-white/10 border-b-0 p-3 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white/80 font-mono tracking-wider">系統日誌 [SYSTEM_LOGS]</h3>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        <div className="bg-[#050505] border border-white/10 flex-1 min-h-[400px] max-h-[600px] overflow-hidden relative">
                            {/* Scrollable Area */}
                            <div className="absolute inset-0 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                                {loading ? (
                                    <p className="text-white/20 font-mono text-xs p-2">LOADING_DATA...</p>
                                ) : devMessages.length === 0 ? (
                                    <p className="text-white/20 font-mono text-xs p-2">NO_LOGS_FOUND</p>
                                ) : (
                                    devMessages.map((msg, index) => (
                                        <div key={msg.id || `dev-${index}`} className="group hover:bg-white/5 transition-colors p-2 border-l-2 border-transparent hover:border-emerald-500/50">
                                            <div className="flex flex-wrap gap-x-3 text-xs font-mono text-emerald-500/60 mb-1">
                                                <span>[{formatTime(msg.created_at)}]</span>
                                                <span className="text-emerald-500 font-bold uppercase">{msg.name === 'oryn.tw' ? 'SYS_ADMIN' : msg.name}</span>
                                            </div>
                                            <p className="text-white/80 text-sm leading-relaxed font-light pl-2 border-l border-emerald-500/20 ml-1">
                                                {msg.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Community (External Input) */}
                    <motion.div
                        className="flex flex-col h-full"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-[#0a0a0a] border border-white/10 border-b-0 p-3 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white/80 font-mono tracking-wider">外部輸入 [EXTERNAL_INPUTS]</h3>
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/10 p-0 flex flex-col h-full min-h-[400px]">

                            {/* Input Area (Top) */}
                            <div className="p-4 border-b border-white/10 bg-[#050505]">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="代號 (選填)..."
                                            className="w-1/3 bg-[#0a0a0a] border border-white/10 px-3 py-2 text-white text-xs font-mono placeholder-white/20 focus:border-white/40 outline-none transition-colors"
                                        />
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="輸入指令或訊息..."
                                                className="w-full bg-[#0a0a0a] border border-white/10 px-3 py-2 text-white text-xs font-mono placeholder-white/20 focus:border-white/40 outline-none transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-white text-black text-xs font-bold font-mono hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting ? 'SENDING...' : 'SEND'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Messages List (Bottom) */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent max-h-[500px]">
                                {loading ? (
                                    <p className="text-white/20 font-mono text-xs">LOADING_FEED...</p>
                                ) : communityMessages.length === 0 ? (
                                    <p className="text-white/20 font-mono text-xs">NO_INPUTS_DETECTED</p>
                                ) : (
                                    communityMessages.map((msg, index) => (
                                        <div key={msg.id || `community-${index}`} className="flex gap-3 py-2 px-2 hover:bg-white/5 transition-colors group border-b border-white/[0.03] last:border-0">
                                            <div className="shrink-0 w-24 text-right">
                                                <div className="text-[10px] font-mono text-white/30">{formatTime(msg.created_at)}</div>
                                            </div>
                                            <div className="w-px bg-white/10 self-stretch" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-bold text-white/40 font-mono mb-0.5 group-hover:text-white/60 transition-colors">
                                                    {msg.name || 'ANONYMOUS'}
                                                </div>
                                                <p className="text-white/80 text-sm break-words leading-snug">
                                                    {msg.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
