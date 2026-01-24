import { motion } from 'framer-motion'

// --- Background Components ---
const TechnicalBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* 1. Base Grid Layer */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}
            />

            {/* 2. Secondary Fine Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
                    backgroundSize: '10px 10px',
                    opacity: 0.3
                }}
            />

            {/* 3. Radial Fade for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>
    )
}

// Released products only (completed features)
const releasedProducts = [
    {
        id: 'thesis_fixer',
        title: '論文格式救星 (舊版)',
        titleEn: 'THESIS FORMATTING LIFESAVER',
        details: '丟入 Word 檔，自動校正格式。',
        externalLink: 'https://thesis.oryn.tw',
        status: 'BETA',
        version: 'v0.9.2',
        category: 'UTILITY_TOOL',
        logo: '/論文格式救星(舊版) logo.png',
        actionText: '啟動校正程序'
    },
    {
        id: 'prisma_knowledge',
        title: 'Prisma 知識全貌',
        titleEn: 'PRISMA KNOWLEDGE GRAPH',
        details: '結合與維基百科，將知識視覺化。',
        externalLink: 'https://prisma.oryn.tw',
        status: 'STABLE',
        version: 'v1.0.4',
        category: 'DATA_VIS',
        logo: '/Prisma 知識全貌 logo.png',
        actionText: '展開知識宇宙'
    },
    {
        id: 'hex_strategy',
        title: 'HEX 戰略沙盤',
        titleEn: 'HEX STRATEGY BOARD',
        details: '將複雜的思緒整理成清晰的戰略地圖。',
        externalLink: 'https://nex.oryn.tw',
        status: 'LATEST',
        version: 'v1.1.0',
        category: 'STRATEGY',
        logo: '/HEX 戰略沙盤 LOGO.png',
        actionText: '進入戰略室'
    },
    {
        id: 'thesis_formatting_lifesaver',
        title: '論文格式救星',
        titleEn: 'THESIS FORMATTING LIFESAVER',
        details: '在純淨的雲端介面中直接撰寫論文，完美的 Word 檔即刻生成。',
        externalLink: 'https://thesis-formatting-lifesaver.oryn.tw/',
        status: 'DEV',
        version: 'v0.1.0',
        category: 'EDITOR',
        logo: '/論文格式救星 logo.png',
        actionText: '進入專注模式'
    }
]

export function EvolutionLab() {
    return (
        <section id="products" className="py-32 px-4 bg-[#050505] relative overflow-hidden border-t border-white/5">
            <TechnicalBackground />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-white/40 font-mono text-sm tracking-widest">
                            <span className="w-2 h-2 bg-white/40 block" />
                            模組：現實化資產 [REALIZED_ASSETS]
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                            產品區
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-white/40 font-mono text-xs tracking-[0.2em] mb-1">系統狀態 [SYSTEM STATUS]</p>
                        <div className="flex items-center gap-2 justify-end text-emerald-500 font-mono text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            運行中 [OPERATIONAL]
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {releasedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative bg-[#0a0a0a] border border-white/10 p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 flex flex-col h-full overflow-hidden"
                        >
                            {/* Neon Flow Effect */}
                            <motion.div
                                className="absolute inset-0 w-1/2 h-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
                                style={{ skewX: -20, filter: 'blur(10px)' }}
                                animate={{ x: ['-150%', '350%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 bg-gradient-to-tr from-transparent via-[#D4AF37] to-transparent"
                                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                                style={{ backgroundSize: '200% 200%' }}
                            />

                            <div className="absolute top-0 right-0 p-4 opacity-100 transition-opacity z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#D4AF37] transition-colors"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </div>

                            <div className="mb-6 flex justify-between items-start relative z-10">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-colors duration-300 rounded-lg overflow-hidden">
                                    <img src={product.logo} alt={product.title} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-right">
                                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-1">編號: {product.status}</div>
                                    <div className="font-mono text-[10px] text-white/20">{product.version}</div>
                                </div>
                            </div>

                            <div className="mt-auto relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-xs font-mono text-white/40 mb-6 tracking-wide uppercase">
                                    {product.titleEn}
                                </p>

                                <div className="space-y-4 border-t border-white/5 pt-6">
                                    <p className="text-lg text-white/90 leading-relaxed font-medium">
                                        {product.details}
                                    </p>
                                </div>

                                {/* Explicit Action Button */}
                                <div className="mt-8 pt-0">
                                    <a
                                        href={product.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full px-4 py-3 bg-white/5 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] border border-white/10 transition-all duration-300 group/btn"
                                    >
                                        <span className="text-sm font-mono tracking-wide">{product.actionText}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-[#D4AF37]/50 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-[#D4AF37]/50 transition-colors" />
                        </motion.div>
                    ))}

                    {/* Pending Node Placeholder */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center bg-transparent group min-h-[300px]"
                    >
                        <h3 className="text-xl font-bold text-white/20 mb-2">等待輸入 [AWAITING_INPUT]</h3>
                        <p className="font-mono text-xs text-white/20 mb-6">下個迭代計算中...</p>

                        <a
                            href="#messages"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-xs font-mono text-white/60 hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span>前往留言 [MESSAGE_BOARD]</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
