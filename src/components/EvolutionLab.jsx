import { motion } from 'framer-motion'

// --- Background Components ---
const BackgroundAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* 1. Organic Liquid Gold Aurora */}
            <motion.div
                className="absolute inset-0 opacity-[0.08]"
                animate={{
                    background: [
                        "radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)"
                    ]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* 2. Floating Bioluminescent Orbs */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[80px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0
                    }}
                    animate={{
                        x: [
                            (Math.random() * 100) + "%",
                            (Math.random() * 100) + "%",
                            (Math.random() * 100) + "%"
                        ],
                        y: [
                            (Math.random() * 100) + "%",
                            (Math.random() * 100) + "%",
                            (Math.random() * 100) + "%"
                        ],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: Math.random() * 200 + 100 + 'px', // Smaller orbs
                        height: Math.random() * 200 + 100 + 'px',
                        backgroundColor: i % 2 === 0 ? '#FFA500' : '#FFD700',
                    }}
                />
            ))}


        </div>
    )
}

// Released products only (completed features)
const releasedProducts = [
    {
        id: 'thesis_fixer',
        title: '論文格式救星',
        desc: '丟入 Word 檔，自動校正 APA/MLA 格式、對齊目錄與頁碼。省下最後那崩潰的 5 小時排版時間。',
        externalLink: 'https://thesis.oryn.tw',
        status: 'Beta',
        category: '🌐 Web App',
        icon: '📄',
        buttonText: '🚀 立即使用'
    },
    {
        id: 'prisma_knowledge',
        title: 'Prisma 知識全貌',
        desc: '結合 Gemini 2.0 與維基百科，將知識視覺化。從一個節點展開整個宇宙，發現那些原本看不見的隱形連結與邏輯。',
        externalLink: 'https://prisma.oryn.tw',
        status: 'New',
        category: '🌐 Web App',
        icon: '🔮',
        buttonText: '🔮 立即探索'
    },
    {
        id: 'hex_strategy',
        title: 'HEX 戰略沙盤',
        desc: '將複雜的思緒整理成清晰的戰略地圖，用無限的畫布釐清每一個戰略決策',
        externalLink: 'https://nex.oryn.tw',
        status: 'New',
        category: '🌐 Web App',
        icon: '🗺️',
        buttonText: '🗺️ 立即探索'
    }
]

export function EvolutionLab() {
    return (
        <section id="products" className="py-24 px-8 bg-[#050505] relative overflow-hidden">
            {/* Animated Background System */}
            <BackgroundAnimation />

            {/* Reduced reduced blur and opacity */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FFD700]/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white tracking-tighter">
                        願望成真區
                    </h2>
                    <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6 rounded-full opacity-50" />
                    <p className="text-xl text-[#A1A1AA] font-light tracking-widest">
                        BEYOND THE LAB : REALIZED ASSETS
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {releasedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#FFD700]/20 rounded-3xl p-10 hover:border-[#FFD700]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,215,0,0.1)]"
                        >
                            {/* Inner Card Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                            <div className="relative z-10">
                                {/* Status Badge */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFD700]/60 font-bold">
                                        {product.category}
                                    </span>
                                    <span className="px-4 py-1.5 text-xs font-bold bg-[#FFA500]/10 text-[#FFA500] rounded-full border border-[#FFA500]/20">
                                        {product.status}
                                    </span>
                                </div>

                                {/* Icon Display */}
                                <div className="relative mb-8 text-6xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 inline-block">
                                    <div className="absolute inset-0 bg-[#FFD700]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {product.icon || '📄'}
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-lg text-[#A1A1AA] leading-relaxed mb-10 font-light">
                                    {product.desc}
                                </p>

                                {/* CTA Button */}
                                <a
                                    href={product.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn relative w-full h-16 flex items-center justify-center overflow-hidden rounded-2xl bg-[#FFD700] hover:bg-[#E5C100] transition-colors duration-300 shadow-[0_4px_20px_rgba(255,215,0,0.15)] hover:shadow-[0_4px_25px_rgba(255,215,0,0.25)]"
                                >
                                    {/* Subtle shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />

                                    <span className="relative font-bold text-[#1A1A1A] text-xl flex items-center gap-2">
                                        {product.buttonText || '🚀 立即使用'}
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    ))}

                    {/* Coming Soon Placeholder */}
                    <motion.a
                        href="#voting"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative bg-[#0a0a0a]/40 border-2 border-dashed border-[#FFD700]/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center min-h-[400px] hover:border-[#FFD700]/40 transition-all duration-500 group overflow-hidden"
                    >
                        {/* Background Particles for Placeholder */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,215,0,0.2)_0%,transparent_70%)]" />
                        </div>

                        <div className="relative z-10">
                            <div className="text-6xl mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">🔮</div>
                            <h3 className="text-2xl font-bold text-[#A1A1AA] group-hover:text-white mb-4 transition-colors">下一個奇蹟？</h3>
                            <p className="text-[#A1A1AA]/60 text-lg group-hover:text-[#A1A1AA] transition-colors max-w-xs font-light">
                                命運掌握在你手裡！<br />
                                <span className="text-[#FFD700]/80 font-bold group-hover:text-[#FFA500]">前往 功能許願池</span><br />
                                丟下硬幣決定下一個功能的降臨
                            </p>
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
