import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ⚠️ 請確認這裡換成了您「最新部署」的 Google Script網址
const API_URL = 'https://script.google.com/macros/s/AKfycbxlM5XI6y9sxyBrAb1BPv5AiEc62M2v4mJYmCE-Mti0lF-yBAN48ZjJqhqUcd3d4_Xg0Q/exec'

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

// Generate or get User UUID
const getUserUUID = () => {
    let uuid = localStorage.getItem('oryn_user_uuid')
    if (!uuid) {
        uuid = 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        localStorage.setItem('oryn_user_uuid', uuid)
    }
    return uuid
}

// Get today's date string (YYYY-MM-DD)
const getTodayString = () => {
    return new Date().toISOString().split('T')[0]
}

// Get remaining power from localStorage (with daily reset)
const getRemainingPower = () => {
    const tracking = localStorage.getItem('oryn_vote_tracking')
    if (!tracking) {
        return { power: 3, date: getTodayString() }
    }

    try {
        const data = JSON.parse(tracking)
        // Check if stored date is today
        if (data.date === getTodayString()) {
            return { power: data.power, date: data.date }
        } else {
            // New day - reset power
            return { power: 3, date: getTodayString() }
        }
    } catch {
        return { power: 3, date: getTodayString() }
    }
}

// Save remaining power to localStorage
const saveRemainingPower = (power) => {
    const data = { power, date: getTodayString() }
    localStorage.setItem('oryn_vote_tracking', JSON.stringify(data))
}

export function VotingSection() {
    const [votes, setVotes] = useState({})
    const [remainingPower, setRemainingPower] = useState(3)
    const [userUUID, setUserUUID] = useState('')
    const [hasShared, setHasShared] = useState(false)

    // Wishlist Form State
    const [idea, setIdea] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        // Initialize User UUID
        const uuid = getUserUUID()
        setUserUUID(uuid)

        // Initialize remaining power (with daily reset)
        const { power } = getRemainingPower()
        setRemainingPower(power)

        // Check shared status
        const storedHasShared = localStorage.getItem('oryn_has_shared')
        if (storedHasShared === 'true') setHasShared(true)

        // Fetch votes from backend
        fetch(API_URL, { method: 'POST', body: JSON.stringify({ type: 'get_votes' }) })
            .then(res => res.json())
            .then(data => {
                if (data.result === 'success') {
                    setVotes(data.data || {})
                }
            })
            .catch(err => console.error("API Error:", err))
    }, [])

    const handleVote = async (id) => {
        if (remainingPower <= 0) return

        // Optimistic UI update
        const newPower = remainingPower - 1
        setRemainingPower(newPower)
        saveRemainingPower(newPower)
        setVotes(prev => ({ ...(prev || {}), [id]: ((prev || {})[id] || 0) + 1 }))

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'vote',
                    id,
                    name: userUUID // Send UUID for backend tracking
                })
            })
            const data = await response.json()

            // Handle backend errors
            if (data.result === 'error') {
                // Revert optimistic update
                setRemainingPower(remainingPower)
                saveRemainingPower(remainingPower)
                setVotes(prev => ({ ...(prev || {}), [id]: Math.max(((prev || {})[id] || 1) - 1, 0) }))
                alert(data.message || '投票失敗，請稍後再試')
            }
        } catch (err) {
            console.error("Vote Error:", err)
            // Revert on network error
            setRemainingPower(remainingPower)
            saveRemainingPower(remainingPower)
        }
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

        // 獎勵能量 (bonus power from sharing)
        const newPower = Math.min(remainingPower + 3, 6) // Max 6 after bonus
        setRemainingPower(newPower)
        saveRemainingPower(newPower)
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
        <section id="voting" className="py-24 px-8 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#EAEAEA]">
                        許願排行榜
                    </h2>
                    <p className="text-[#A1A1AA] mb-6">Voting Leaderboard</p>

                    {/* Remaining Power Badge */}
                    <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border ${remainingPower > 0 ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-neutral-900 border-neutral-700'}`}>
                        <span className={`text-2xl ${remainingPower > 0 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>⚡</span>
                        <span className={`font-mono font-bold text-xl ${remainingPower > 0 ? 'text-[#EAEAEA]' : 'text-neutral-500'}`}>
                            剩餘算力: {remainingPower} / 3
                        </span>
                        {remainingPower === 0 && (
                            <span className="text-neutral-500 text-sm ml-2">(明日重置)</span>
                        )}
                    </div>
                </div>

                {/* 🚨 Emergency Protocol - Share to Recharge */}
                {remainingPower === 0 && !hasShared && (
                    <motion.div
                        className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl border-2 border-[#D4AF37]/50 bg-[#D4AF37]/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2 text-[#D4AF37]">
                                ⚠️ 算力耗盡｜啟動緊急動員
                            </h3>
                            <p className="text-[#A1A1AA] mb-6">
                                分享連結邀請援軍，立即獲得 <span className="text-[#D4AF37] font-bold">3 單位算力</span>。
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
                                    className="px-6 py-3 bg-[#0a0a0a] hover:bg-neutral-800 border border-[#D4AF37]/50 text-[#D4AF37] font-bold rounded-xl transition-all flex items-center justify-center gap-2"
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

                {/* Voting Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {sortedFeatures.map((feat, index) => {
                        const isRank1 = index === 0
                        const isTop3 = index < 3

                        return (
                            <motion.div
                                key={feat.id}
                                layout
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className={`
                                    rounded-2xl p-6 flex flex-col justify-between group transition-all relative overflow-hidden border
                                    ${isRank1
                                        ? 'bg-[#0a0a0a] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] z-10'
                                        : 'bg-[#0a0a0a] hover:border-[#D4AF37]/30 border-white/5'}
                                    ${!isRank1 && isTop3 ? 'border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]' : ''}
                                `}
                            >
                                {isRank1 && (
                                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none" />
                                )}
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`
                                            text-sm font-mono px-3 py-1 rounded flex items-center gap-1
                                            ${isRank1 ? 'bg-[#D4AF37] text-black font-bold' : ''}
                                            ${!isRank1 && isTop3 ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20' : ''}
                                            ${!isTop3 ? 'bg-white/5 text-[#A1A1AA]' : ''}
                                        `}>
                                            {isRank1 && '👑 '}
                                            {isRank1 ? 'TOP 1' : `RANK #${index + 1}`}
                                        </span>
                                        <span className={`text-3xl font-bold font-mono ${isRank1 ? 'text-[#D4AF37]' : 'text-[#EAEAEA]'}`}>
                                            {safeVotes[feat.id] || 0}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-[#EAEAEA]">
                                        {feat.title}
                                    </h3>
                                    <p className="text-[#A1A1AA] text-base leading-relaxed mb-8">
                                        {feat.desc}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <div className="w-full h-1 bg-neutral-800 rounded-full mb-4 overflow-hidden">
                                        <motion.div
                                            className={`h-full ${isRank1 ? 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-[#D4AF37]/50'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((safeVotes[feat.id] || 0) / 5, 100)}%` }}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleVote(feat.id)}
                                        disabled={remainingPower <= 0}
                                        className={`
                                            w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg
                                            ${remainingPower > 0
                                                ? (isRank1 ? 'bg-[#D4AF37] text-black hover:bg-[#B8860B]' : 'bg-[#0a0a0a] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-[#D4AF37]')
                                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}
                                        `}
                                    >
                                        <span>⚡</span> {remainingPower > 0 ? '注入能量' : '算力耗盡'}
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Wishlist Form */}
                <div id="wishlist" className="max-w-2xl mx-auto bg-[#0a0a0a] rounded-3xl p-8 border border-[#D4AF37]/20 text-center">
                    <h3 className="text-2xl font-bold mb-2 text-[#EAEAEA]">還沒看到你想要的功能？</h3>
                    <p className="text-[#A1A1AA] mb-8">將您的需求寫入 Oryn 的基因庫。</p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                            <textarea
                                value={idea} onChange={e => setIdea(e.target.value)}
                                placeholder="系統尚有缺口... 請輸入您需要的秩序程式碼 (功能想法)..."
                                className="w-full bg-[#050505] border border-neutral-800 rounded-xl p-4 focus:border-[#D4AF37] outline-none transition-colors min-h-[100px] text-[#EAEAEA] placeholder-neutral-600"
                            />

                            {/* Suggestion Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {suggestionTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addTag(tag)}
                                        className="text-xs px-3 py-1 rounded-full bg-[#0a0a0a] border border-neutral-800 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="輸入 Email (當功能上線時通知我)"
                                    className="flex-1 bg-[#050505] border border-neutral-800 rounded-xl p-4 focus:border-[#D4AF37] outline-none transition-colors text-[#EAEAEA] placeholder-neutral-600"
                                />
                                <button type="submit" disabled={isSubmitting || (!idea && !email)} className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#B8860B] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? '發送訊號...' : '發射訊號 🚀'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-[#D4AF37]">
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
