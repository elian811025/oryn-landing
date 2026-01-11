import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ⚠️ 請確認這裡換成了您「最新部署」的 Google Script網址
const API_URL = 'https://script.google.com/macros/s/AKfycbzgXBgjiAoHVNjZNzdtn85Vecrrh-TrHRmqdwtd-uus4iSWrw3-tCgMJY7PVNjEU2c7Vw/exec'

const features = [
    { id: 'feat_formatter', title: '論文格式救星', desc: '丟入 Word 檔，自動校正 APA/MLA 格式、對齊目錄與頁碼。省下最後那崩潰的 5 小時排版時間。' },
    { id: 'feat_mirror', title: 'AI 模擬面試官', desc: '社恐救星。上傳履歷，AI 化身面試官與您語音對練，並提供自信度與回答邏輯的逐字稿分析。' },
    { id: 'feat_slide', title: '報告架構生成', desc: '拯救分組報告。輸入主題，AI 自動生成每一頁 PPT 的邏輯骨架與演講稿，解決沒靈感的痛苦。' },
    { id: 'feat_synapse', title: '論文靈感編織', desc: '寫不出論文？把零散的文獻筆記丟進來，AI 自動找出關聯並生成大綱，將混亂思緒梳理成通順骨架。' },
    { id: 'feat_ghost', title: '幽靈自習室', desc: '與其餘 1% 的專注者同時在線。看不見臉、不能聊天，只能感知到有人正與你並肩作戰的無聲陪伴。' },
    { id: 'feat_nap', title: '午休快速充電', desc: '基於生理時鐘的 20 分鐘午睡引導。在空堂圖書館，用音頻引導快速入睡並準時喚醒，避開昏沈感。' }
]

const suggestionTags = [
    '#自動記帳', '#早八叫醒服務', '#宿舍斷網神器', '#分手療傷指南', '#教授廢話過濾器'
]

export function EvolutionLab() {
    const [votes, setVotes] = useState({}) // 預設為空物件
    const [energy, setEnergy] = useState(3)
    const [hasShared, setHasShared] = useState(false)

    // Mutation Form State
    const [idea, setIdea] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const storedEnergy = localStorage.getItem('oryn_energy')
        if (storedEnergy !== null) setEnergy(parseInt(storedEnergy))

        const storedHasShared = localStorage.getItem('oryn_has_shared')
        if (storedHasShared === 'true') setHasShared(true)

        fetch(API_URL, { method: 'POST', body: JSON.stringify({ type: 'get_votes' }) })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    setVotes(data.data || {})
                }
            })
            .catch(err => console.error("API Error:", err))
    }, [])

    const handleVote = (id) => {
        if (energy <= 0) return
        const newEnergy = energy - 1
        setEnergy(newEnergy)
        localStorage.setItem('oryn_energy', newEnergy)
        setVotes(prev => ({ ...(prev || {}), [id]: ((prev || {})[id] || 0) + 1 }))
        fetch(API_URL, { method: 'POST', body: JSON.stringify({ type: 'vote', id }) })
    }

    // 🚀 分享獲取能量
    const handleShare = (platform) => {
        const shareUrl = 'https://oryn.tw'

        if (platform === 'line') {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank')
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('連結已複製！'))
                .catch(() => alert('複製失敗，請手動複製：' + shareUrl))
        }

        // 獎勵能量
        const newEnergy = energy + 3
        setEnergy(newEnergy)
        localStorage.setItem('oryn_energy', newEnergy.toString())
        localStorage.setItem('oryn_has_shared', 'true')
        setHasShared(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!idea.trim() && !email.trim()) return

        setIsSubmitting(true)
        const contentPayload = `Idea: ${idea} | Contact: ${email}`

        try {
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ type: 'idea', content: contentPayload })
            })
            setSubmitted(true)
            setIdea('')
            setEmail('')
        } catch (err) { console.error(err) }
        finally { setIsSubmitting(false) }
    }

    // 點擊標籤加入輸入框
    const addTag = (tag) => {
        setIdea(prev => prev ? `${prev} ${tag}` : tag)
    }

    const safeVotes = votes || {}
    const sortedFeatures = [...features].sort((a, b) => (safeVotes[b.id] || 0) - (safeVotes[a.id] || 0))

    return (
        <section id="evolution" className="py-24 px-8 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                        協議進化實驗
                    </h2>
                    <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-raised border border-primary/30">
                        <span className="text-primary text-xl">⚡</span>
                        <span className="text-text-primary font-mono font-bold">剩餘算力: {energy} / 3</span>
                    </div>
                </div>

                {/* 🚨 Emergency Protocol - Share to Recharge */}
                {energy === 0 && !hasShared && (
                    <motion.div
                        className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                                ⚠️ 算力耗盡｜啟動緊急動員
                            </h3>
                            <p className="text-text-secondary mb-6">
                                分享連結邀請援軍，立即獲得 <span className="text-yellow-400 font-bold">3 單位算力</span>。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => handleShare('line')}
                                    className="px-6 py-3 bg-[#06C755] hover:bg-[#05b34d] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                    </svg>
                                    分享到 Line
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="px-6 py-3 bg-surface hover:bg-surface-raised border border-yellow-500/50 text-yellow-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    複製連結
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {sortedFeatures.map((feat, index) => (
                        <motion.div key={feat.id} layout initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 flex flex-col justify-between group border border-white/5 hover:border-primary/30 transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-mono px-2 py-1 rounded ${index < 3 ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-muted'}`}>RANK #{index + 1}</span>
                                    <span className="text-2xl font-bold font-mono">{safeVotes[feat.id] || 0}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary">{feat.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6">{feat.desc}</p>
                            </div>
                            <div className="mt-auto">
                                <div className="w-full h-1 bg-surface-raised rounded-full mb-4 overflow-hidden">
                                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${Math.min((safeVotes[feat.id] || 0) / 5, 100)}%` }} />
                                </div>
                                <button onClick={() => handleVote(feat.id)} disabled={energy <= 0} className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${energy > 0 ? 'bg-surface hover:bg-primary hover:text-surface-raised border border-primary/30 text-primary' : 'bg-surface/50 text-text-muted cursor-not-allowed'}`}>
                                    <span>⚡</span> {energy > 0 ? '注入能量' : '算力耗盡'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-primary/20 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">還沒看到你想要的功能？</h3>
                    <p className="text-text-secondary mb-8">將您的需求寫入 Oryn 的基因庫。</p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                            <textarea
                                value={idea} onChange={e => setIdea(e.target.value)}
                                placeholder="系統尚有缺口... 請輸入您需要的秩序程式碼 (功能想法)..."
                                className="w-full bg-background/50 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-colors min-h-[100px] text-text-primary"
                            />

                            {/* Suggestion Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {suggestionTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addTag(tag)}
                                        className="text-xs px-3 py-1 rounded-full bg-surface-raised border border-white/10 text-text-secondary hover:text-primary hover:border-primary/30 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="輸入 Email (當功能上線時通知我)"
                                    className="flex-1 bg-background/50 border border-white/10 rounded-xl p-4 focus:border-primary/50 outline-none transition-colors text-text-primary"
                                />
                                <button type="submit" disabled={isSubmitting || (!idea && !email)} className="px-8 py-4 bg-primary text-background font-bold rounded-xl hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? '發送訊號...' : '發射訊號 🚀'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-primary">
                            <span className="text-5xl mb-4 block">🧬</span>
                            <p className="text-xl font-bold">訊號已接收。</p>
                            <p className="opacity-80">您的 ID 已被寫入 Oryn 的基因庫。</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}