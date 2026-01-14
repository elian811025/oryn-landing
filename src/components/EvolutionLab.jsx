import { motion } from 'framer-motion'

// Released products only (completed features)
const releasedProducts = [
    {
        id: 'thesis_fixer',
        title: '論文格式救星',
        desc: '丟入 Word 檔，自動校正 APA/MLA 格式、對齊目錄與頁碼。省下最後那崩潰的 5 小時排版時間。',
        externalLink: 'https://thesis.oryn.tw',
        status: 'Beta',
        category: '🌐 Web App'
    }
]

export function EvolutionLab() {
    return (
        <section id="products" className="py-24 px-8 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#EAEAEA]">
                        已完成產品
                    </h2>
                    <p className="text-[#A1A1AA]">Released Products</p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {releasedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-[#0a0a0a] border border-emerald-500/30 rounded-2xl p-8 hover:border-emerald-400/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <span className="px-3 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                                    {product.status}
                                </span>
                            </div>

                            {/* Category */}
                            <span className="text-xs text-[#A1A1AA] mb-2 block">{product.category}</span>

                            {/* Icon */}
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                📄
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-[#EAEAEA] mb-3">
                                {product.title}
                            </h3>
                            <p className="text-[#A1A1AA] leading-relaxed mb-8">
                                {product.desc}
                            </p>

                            {/* CTA Button - External Link */}
                            <a
                                href={product.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg bg-emerald-500 text-black hover:bg-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            >
                                <span>🚀</span> 立即體驗
                            </a>
                        </motion.div>
                    ))}

                    {/* Coming Soon Placeholder - Link to Voting */}
                    <motion.a
                        href="#voting"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative bg-[#0a0a0a] border border-dashed border-cyan-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] hover:border-cyan-500/50 transition-all cursor-pointer group"
                    >
                        <div className="text-5xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">🔮</div>
                        <h3 className="text-xl font-bold text-[#A1A1AA] group-hover:text-cyan-400 mb-2 transition-colors">更多功能開發中</h3>
                        <p className="text-neutral-500 text-sm group-hover:text-[#A1A1AA] transition-colors">
                            前往下方<span className="text-cyan-400">進化實驗室</span><br />投票決定下一個功能
                        </p>
                    </motion.a>
                </div>
            </div>
        </section>
    )
}