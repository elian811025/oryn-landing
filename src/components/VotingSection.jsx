import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

// 5 Category Tabs Configuration
const categories = [
    {
        id: 'web',
        label: '網頁應用程式',
        subtitle: '網站或網頁版軟體',
        description: '不需要下載安裝，只要打開瀏覽器，輸入網址就能用的東西。'
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
                        許願池
                    </h2>
                    <p className="text-xl text-[#A1A1AA] mb-10">選出你最想要的新功能</p>

                    {/* Remaining Power Badge */}
                    <div className={`inline-flex items-center gap-4 px-10 py-5 rounded-full border ${remainingPower > 0 ? 'bg-[#0a0a0a] border-[#D4AF37]/30' : 'bg-neutral-900 border-neutral-700'}`}>
                        <span className={`text-3xl ${remainingPower > 0 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>🪙</span>
                        <span className={`font-mono font-bold text-2xl ${remainingPower > 0 ? 'text-[#EAEAEA]' : 'text-neutral-500'}`}>
                            許願幣: {remainingPower} / 3
                        </span>
                        {remainingPower === 0 && <span className="text-neutral-500 text-lg ml-2">(明天會再發3枚幣)</span>}
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                        <p className="mt-4 text-[#A1A1AA]">正在擺攤中...</p>
                    </div>
                ) : (
                    /* Creative Market Grid (Masonry-like layout) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 auto-rows-fr">
                        {features.map((feat, index) => {
                            const voteCount = feat.votes || 0
                            const isRank1 = index === 0 && voteCount > 0
                            const isLive = feat.is_live
                            const isNew = voteCount === 0

                            return (
                                <motion.div
                                    key={feat.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`
                                        flex flex-col justify-between group transition-all relative overflow-hidden h-full
                                        rounded-3xl border p-1
                                        ${isLive || isRank1
                                            ? 'bg-neutral-900/40 border-[#D4AF37]/50 shadow-[0_0_30px_-5px_rgba(212,175,55,0.15)]'
                                            : 'bg-neutral-900/20 border-white/5 hover:border-[#D4AF37]/30 hover:bg-neutral-900/40'}
                                    `}
                                >
                                    {/* Inner Card Container */}
                                    <div className="flex-1 rounded-[20px] bg-[#0a0a0a]/80 backdrop-blur-sm p-7 h-full flex flex-col">

                                        {/* Status Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            {/* Left Badge */}
                                            <div>
                                                {isLive ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full tracking-wider shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                                                        <span className="w-2 h-2 rounded-full bg-black animate-pulse" /> LIVE
                                                    </span>
                                                ) : isRank1 ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-bold rounded-full tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                                                        👑 NO.1
                                                    </span>
                                                ) : isNew ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold rounded-full tracking-wider">
                                                        ✨ NEW
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-mono text-[#525252] border border-[#262626] px-2 py-1 rounded">
                                                        #{String(index + 1).padStart(3, '0')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Right Vote Counter */}
                                            {isNew ? (
                                                <span className="text-xs font-medium text-[#D4AF37] animate-pulse">
                                                    ✨ 等你首投
                                                </span>
                                            ) : (
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-2xl font-black font-mono leading-none ${isLive || isRank1 ? 'text-[#D4AF37]' : 'text-[#737373]'}`}>
                                                        {voteCount}
                                                    </span>
                                                    <span className="text-[10px] text-[#525252] font-bold tracking-wider uppercase">VOTES</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="mb-8">
                                            <h3 className={`text-xl font-bold mb-3 leading-tight ${isLive || isRank1 ? 'text-white' : 'text-[#D4d4d4] group-hover:text-white transition-colors'}`}>
                                                {feat.title}
                                            </h3>
                                            <p className="text-sm text-[#A3A3A3] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                                {feat.description}
                                            </p>

                                            {/* Category Tag (Since we removed tabs) */}
                                            <div className="mt-4">
                                                <span className="text-[10px] uppercase tracking-widest text-[#525252] border border-[#262626] px-2 py-1 rounded-md">
                                                    {categories.find(c => c.id === feat.category)?.label || '未分類'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Gamified Progress & Action */}
                                        <div className="mt-auto">
                                            {/* Game-like XP Bar */}
                                            {!isLive && (
                                                <div className="relative w-full h-1.5 bg-[#171717] rounded-full mb-6 overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/50 via-[#FFD700] to-[#FFA500]"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${Math.min(voteCount * 5, 100)}%` }} // Scaled for visual impact
                                                        transition={{ duration: 1.5, ease: "circOut" }}
                                                    />
                                                    {/* Shine effect on bar */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                                                </div>
                                            )}

                                            {isLive ? (
                                                <a
                                                    href="https://thesis.oryn.tw"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 rounded-xl font-bold text-sm tracking-wide bg-[#D4AF37] text-black hover:bg-[#E5C100] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    立即使用
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => handleVote(feat.id)}
                                                    disabled={remainingPower <= 0}
                                                    className={`
                                                        w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2
                                                        ${remainingPower > 0
                                                            ? 'bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37]/20 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                                                            : 'bg-[#171717] text-[#404040] cursor-not-allowed border border-white/5'}
                                                    `}
                                                >
                                                    {remainingPower > 0 ? (
                                                        <>
                                                            <span className="group-hover:animate-bounce">🪙</span> 投下許願幣
                                                        </>
                                                    ) : (
                                                        '明日再來 👋'
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {/* Wishlist Form - Magical Rewrite */}
                <div id="wishlist" className="relative max-w-3xl mx-auto mt-32">

                    {/* Magical Aura Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-purple-500/5 to-transparent blur-[60px] rounded-full pointer-events-none" />

                    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[2rem] p-10 md:p-14 border border-[#D4AF37]/30 shadow-[0_0_50px_-10px_rgba(212,175,55,0.15)] overflow-hidden">

                        {/* Shimmering Top Border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

                        <div className="text-center mb-10">
                            <span className="inline-block text-4xl mb-4 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">🌠</span>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE580] to-[#EAEAEA]">
                                你的想像，是我們下一個奇蹟的種子
                            </h3>
                            <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-xl mx-auto">
                                在這裡，沒有所謂異想天開<br />
                                告訴我們你遇到的麻煩，或是腦海中一閃而過的瘋狂點子<br />
                                <span className="text-[#D4AF37]">我們或許真的能讓它發生</span>
                            </p>
                        </div>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left relative z-10">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#D4AF37]/80 ml-2">你的願望內容</label>
                                    <textarea
                                        value={idea}
                                        onChange={e => setIdea(e.target.value)}
                                        placeholder="親愛的開發者：&#10;&#10;我希望有一個工具可以幫我..."
                                        className="w-full bg-[#050505] border border-white/10 rounded-2xl p-6 text-lg focus:border-[#D4AF37] focus:bg-[#0a0a0a] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] outline-none transition-all min-h-[160px] text-[#EAEAEA] placeholder-neutral-600 resize-none"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3 mb-2 px-1">
                                    {suggestionTags.map(tag => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => addTag(tag)}
                                            className="text-xs md:text-sm px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all active:scale-95"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm font-medium text-[#D4AF37]/80 ml-2">留下你的 email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="願望實現時，我想第一個知道"
                                            className="w-full h-full bg-[#050505] border border-white/10 rounded-2xl p-5 text-base focus:border-[#D4AF37] focus:bg-[#0a0a0a] outline-none transition-all text-[#EAEAEA] placeholder-neutral-600"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || (!idea && !email)}
                                            className="w-full md:w-auto px-8 py-5 text-lg bg-gradient-to-r from-[#D4AF37] to-[#FFA500] text-black font-bold rounded-2xl hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 group"
                                        >
                                            {isSubmitting ? (
                                                '正在傳送...'
                                            ) : (
                                                <>
                                                    <span>✨</span> 將願望投遞給宇宙
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-16 text-center"
                            >
                                <div className="inline-block p-6 rounded-full bg-[#D4AF37]/10 mb-6 animate-pulse">
                                    <span className="text-6xl">🌠</span>
                                </div>
                                <h4 className="text-3xl font-bold text-[#D4AF37] mb-4">收到你的信號了！</h4>
                                <p className="text-xl text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                                    你的願望已經像流星一樣飛入我們的開發清單。<br />
                                    <span className="text-white">請期待奇蹟發生。</span>
                                </p>
                            </motion.div>
                        )}

                        {/* Decorative background elements inside card */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}
