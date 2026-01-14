import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

// 5 Category Tabs Configuration
const categories = [
    {
        id: 'web',
        label: '網頁應用程式',
        subtitle: '網站或網頁版軟體',
        description: '不需要下載安裝，只要打開瀏覽器（像 Chrome、Edge）輸入網址就能用的東西。'
    },
    {
        id: 'extension',
        label: '瀏覽器擴充功能',
        subtitle: 'Chrome 的外掛',
        description: '這是依附在 Google Chrome 瀏覽器右上角的小工具，通常用來增強瀏覽器的功能，或者修改你看到的網頁內容。'
    },
    {
        id: 'mobile',
        label: '行動應用程式',
        subtitle: '手機 App',
        description: '專門安裝在手機（iPhone 或 Android）上面的軟體，通常需要從 App Store 或 Google Play 下載。'
    },
    {
        id: 'desktop',
        label: '桌面應用程式',
        subtitle: '電腦軟體',
        description: '下載並安裝在電腦（Windows 或 Mac）硬碟裡的軟體。通常效能比較好，不一定要有網路也能跑。'
    },
    {
        id: 'script',
        label: '自動化腳本',
        subtitle: '自動化機器人或小工具',
        description: '這通常沒有漂亮的介面，是一段在背景默默執行的程式碼，用來幫你做重複無聊的工作。'
    }
]

const suggestionTags = [
    '#自動記帳', '#早八叫醒服務', '#宿舍斷網神器', '#分手療傷指南', '#教授廢話過濾器'
]

// Helper functions for daily vote tracking (localStorage)
const getTodayString = () => new Date().toISOString().split('T')[0]

const getRemainingPower = () => {
    const tracking = localStorage.getItem('oryn_vote_tracking')
    if (!tracking) return { power: 3, date: getTodayString() }
    try {
        const data = JSON.parse(tracking)
        if (data.date === getTodayString()) return { power: data.power, date: data.date }
        return { power: 3, date: getTodayString() }
    } catch {
        return { power: 3, date: getTodayString() }
    }
}

const saveRemainingPower = (power) => {
    localStorage.setItem('oryn_vote_tracking', JSON.stringify({ power, date: getTodayString() }))
}

export function VotingSection() {
    const [activeCategory, setActiveCategory] = useState('web')
    const [features, setFeatures] = useState([])
    const [loading, setLoading] = useState(true)
    const [remainingPower, setRemainingPower] = useState(3)
    const [hasShared, setHasShared] = useState(false)

    // Wishlist Form State
    const [idea, setIdea] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    // Fetch features from Supabase on mount
    useEffect(() => {
        const fetchFeatures = async () => {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('features')
                    .select('*')
                    .order('votes', { ascending: false })

                if (error) {
                    console.error('Supabase Error:', error)
                } else {
                    setFeatures(data || [])
                }
            } catch (err) {
                console.error('Fetch Error:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchFeatures()

        // Initialize daily power
        const { power } = getRemainingPower()
        setRemainingPower(power)

        // Check shared status
        const storedHasShared = localStorage.getItem('oryn_has_shared')
        if (storedHasShared === 'true') setHasShared(true)
    }, [])

    // Vote handler - updates Supabase
    const handleVote = async (featureId) => {
        if (remainingPower <= 0) return

        // Optimistic UI update
        const newPower = remainingPower - 1
        setRemainingPower(newPower)
        saveRemainingPower(newPower)

        setFeatures(prev => prev.map(f =>
            f.id === featureId ? { ...f, votes: (f.votes || 0) + 1 } : f
        ))

        try {
            // Get current vote count
            const { data: currentFeature } = await supabase
                .from('features')
                .select('votes')
                .eq('id', featureId)
                .single()

            // Increment vote in Supabase
            const { error } = await supabase
                .from('features')
                .update({ votes: (currentFeature?.votes || 0) + 1 })
                .eq('id', featureId)

            if (error) {
                console.error('Vote Error:', error)
                // Revert on error
                setRemainingPower(remainingPower)
                saveRemainingPower(remainingPower)
                setFeatures(prev => prev.map(f =>
                    f.id === featureId ? { ...f, votes: Math.max((f.votes || 1) - 1, 0) } : f
                ))
                alert('投票失敗，請稍後再試')
            }
        } catch (err) {
            console.error('Vote Error:', err)
            setRemainingPower(remainingPower)
            saveRemainingPower(remainingPower)
        }
    }

    // Share to recharge power
    const handleShare = (platform) => {
        const shareUrl = 'https://oryn.tw'
        if (platform === 'line') {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank')
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('連結已複製！'))
                .catch(() => alert('複製失敗，請手動複製：' + shareUrl))
        }
        const newPower = Math.min(remainingPower + 3, 6)
        setRemainingPower(newPower)
        saveRemainingPower(newPower)
        localStorage.setItem('oryn_has_shared', 'true')
        setHasShared(true)
    }

    // Submit idea to Supabase
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!idea.trim() && !email.trim()) return

        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('suggestions')
                .insert([{ content: idea, email: email }])

            if (error) {
                console.error('Suggestion Error:', error)
                alert('提交失敗，請稍後再試')
            } else {
                setSubmitted(true)
                setIdea('')
                setEmail('')
            }
        } catch (err) {
            console.error('Submit Error:', err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const addTag = (tag) => setIdea(prev => prev ? `${prev} ${tag}` : tag)

    // Get current category info
    const currentCategory = categories.find(c => c.id === activeCategory)

    // Filter and sort features by category
    const filteredFeatures = features
        .filter(f => f.category === activeCategory)
        .sort((a, b) => (b.votes || 0) - (a.votes || 0))

    return (
        <section id="voting" className="py-24 px-8 bg-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#EAEAEA]">
                        進化實驗室
                    </h2>
                    <p className="text-xl text-[#A1A1AA] mb-10">Arsenal Development Voting</p>

                    {/* Remaining Power Badge */}
                    <div className={`inline-flex items-center gap-4 px-10 py-5 rounded-full border ${remainingPower > 0 ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-neutral-900 border-neutral-700'}`}>
                        <span className={`text-3xl ${remainingPower > 0 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>⚡</span>
                        <span className={`font-mono font-bold text-2xl ${remainingPower > 0 ? 'text-[#EAEAEA]' : 'text-neutral-500'}`}>
                            剩餘算力: {remainingPower} / 3
                        </span>
                        {remainingPower === 0 && <span className="text-neutral-500 text-lg ml-2">(明日重置)</span>}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`
                                    relative px-8 py-5 rounded-xl font-medium transition-all duration-300
                                    ${isActive
                                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)]'
                                        : 'bg-[#0a0a0a] text-[#A1A1AA] border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'}
                                `}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-base font-bold">{cat.label}</span>
                                    <span className="text-sm opacity-70">{cat.subtitle}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Category Description */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-center mb-16"
                    >
                        <p className="text-xl text-[#D4AF37]/80 max-w-2xl mx-auto">
                            {currentCategory?.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Emergency Share Protocol */}
                {remainingPower === 0 && !hasShared && (
                    <motion.div
                        className="max-w-2xl mx-auto mb-12 p-8 rounded-2xl border-2 border-[#D4AF37]/50 bg-[#D4AF37]/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4 text-[#D4AF37]">⚠️ 算力耗盡｜啟動緊急動員</h3>
                            <p className="text-xl text-[#A1A1AA] mb-8">
                                分享連結邀請援軍，立即獲得 <span className="text-[#D4AF37] font-bold">3 單位算力</span>。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={() => handleShare('line')} className="px-8 py-4 text-lg bg-[#06C755] hover:bg-[#05b34d] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                    分享到 Line
                                </button>
                                <button onClick={() => handleShare('copy')} className="px-8 py-4 text-lg bg-[#0a0a0a] hover:bg-neutral-800 border border-[#D4AF37]/50 text-[#D4AF37] font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                                    複製連結
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                        <p className="mt-4 text-[#A1A1AA]">載入中...</p>
                    </div>
                ) : (
                    /* Voting Cards Grid */
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
                        >
                            {filteredFeatures.length === 0 ? (
                                <div className="col-span-full text-center py-10 text-[#A1A1AA]">
                                    此分類尚無功能，敬請期待！
                                </div>
                            ) : (
                                filteredFeatures.map((feat, index) => {
                                    const voteCount = feat.votes || 0
                                    const isRank1 = index === 0 && voteCount > 0
                                    const isLive = feat.is_live

                                    return (
                                        <motion.div
                                            key={feat.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`
                                                rounded-2xl p-8 flex flex-col justify-between group transition-all relative overflow-hidden border
                                                ${isLive
                                                    ? 'bg-[#0a0a0a] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                                                    : isRank1
                                                        ? 'bg-[#0a0a0a] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                                                        : 'bg-[#0a0a0a] border-white/10 hover:border-[#D4AF37]/30'}
                                            `}
                                        >
                                            {/* Glow Effect */}
                                            {(isRank1 || isLive) && (
                                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none" />
                                            )}

                                            <div>
                                                {/* Status Badges */}
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex gap-2">
                                                        {isLive && (
                                                            <span className="text-sm font-bold px-4 py-2 rounded-full bg-[#D4AF37] text-black">
                                                                🟢 LIVE
                                                            </span>
                                                        )}
                                                        {isRank1 && !isLive && (
                                                            <span className="text-sm font-bold px-4 py-2 rounded-full bg-[#D4AF37] text-black">
                                                                👑 TOP 1
                                                            </span>
                                                        )}
                                                        {!isRank1 && !isLive && (
                                                            <span className="text-sm font-mono px-4 py-2 rounded bg-white/5 text-[#A1A1AA]">
                                                                RANK #{index + 1}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-3xl font-bold font-mono ${isLive || isRank1 ? 'text-[#D4AF37]' : 'text-[#EAEAEA]'}`}>
                                                        {voteCount}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-4 text-[#EAEAEA]">{feat.title}</h3>
                                                <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8">{feat.description}</p>
                                            </div>

                                            {/* Vote Progress & Button */}
                                            <div className="mt-auto">
                                                <div className="w-full h-2 bg-neutral-800 rounded-full mb-6 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-[#D4AF37]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(voteCount * 10, 100)}%` }}
                                                    />
                                                </div>

                                                {isLive ? (
                                                    <a
                                                        href="https://thesis.oryn.tw"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                                                    >
                                                        <span>🚀</span> 立即體驗
                                                    </a>
                                                ) : (
                                                    <button
                                                        onClick={() => handleVote(feat.id)}
                                                        disabled={remainingPower <= 0}
                                                        className={`
                                                            w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg
                                                            ${remainingPower > 0
                                                                ? 'bg-[#0a0a0a] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                                                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}
                                                        `}
                                                    >
                                                        <span>⚡</span> {remainingPower > 0 ? '注入能量' : '算力耗盡'}
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Wishlist Form */}
                <div id="wishlist" className="max-w-2xl mx-auto bg-[#0a0a0a] rounded-3xl p-10 border border-[#D4AF37]/20 text-center">
                    <h3 className="text-3xl font-bold mb-4 text-[#EAEAEA]">還沒看到你想要的功能？</h3>
                    <p className="text-xl text-[#A1A1AA] mb-10">將您的需求寫入 Oryn 的基因庫。</p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                            <textarea
                                value={idea}
                                onChange={e => setIdea(e.target.value)}
                                placeholder="系統尚有缺口... 請輸入您需要的功能想法..."
                                className="w-full bg-[#050505] border border-neutral-800 rounded-xl p-5 text-lg focus:border-[#D4AF37] outline-none transition-colors min-h-[120px] text-[#EAEAEA] placeholder-neutral-600"
                            />
                            <div className="flex flex-wrap gap-3 mb-2">
                                {suggestionTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => addTag(tag)}
                                        className="text-base px-4 py-2 rounded-full bg-black border border-white/10 text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="輸入 Email (當功能上線時通知我)"
                                    className="flex-1 bg-[#050505] border border-neutral-800 rounded-xl p-5 text-lg focus:border-[#D4AF37] outline-none transition-colors text-[#EAEAEA] placeholder-neutral-600"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || (!idea && !email)}
                                    className="px-10 py-5 text-lg bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#B8860B] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                >
                                    {isSubmitting ? '發送訊號...' : '發射訊號 🚀'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-[#D4AF37]">
                            <span className="text-6xl mb-6 block">🧬</span>
                            <p className="text-2xl font-bold">訊號已接收。</p>
                            <p className="text-xl opacity-80">您的 ID 已被寫入 Oryn 的基因庫。</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
