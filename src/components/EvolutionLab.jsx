import { motion } from 'framer-motion'

// --- Data ---
const releasedProducts = [
    {
        id: 'thesis_formatting_lifesaver',
        title: '論文格式救星',
        titleEn: 'THESIS FORMATTING LIFESAVER',
        details: '在純淨的雲端介面中直接撰寫論文，完美的 Word 檔即刻生成。',
        externalLink: 'https://thesis-formatting-lifesaver.oryn.tw/',
        status: 'DEV', // Green
        version: 'v0.1.0',
        logo: '/論文格式救星 logo.png',
        actionText: '進入專注模式'
    },
    {
        id: 'hex_strategy',
        title: 'HEX 戰略沙盤',
        titleEn: 'HEX STRATEGY BOARD',
        details: '將複雜的思緒整理成清晰的戰略地圖，視覺化你的下一步。',
        externalLink: 'https://nex.oryn.tw',
        status: 'LATEST', // Gold
        version: 'v1.1.0',
        logo: '/HEX 戰略沙盤 LOGO.png',
        actionText: '進入戰略室'
    },
    {
        id: 'oryn_eyes',
        title: 'Eyes 舊手機監視器',
        titleEn: 'ORYN EYES SURVEILLANCE',
        details: '把閒置的舊手機變成監視器，安全監控零成本。',
        externalLink: 'https://eyes.oryn.tw/',
        status: 'LATEST',
        version: 'v1.0.0',
        logo: '/ORYN Eyes 舊手機監視器.png',
        actionText: '開啟監控系統'
    },
    {
        id: 'prisma_knowledge',
        title: 'Prisma 知識全貌',
        titleEn: 'PRISMA KNOWLEDGE GRAPH',
        details: '結合維基百科，將破碎的資訊串聯成知識宇宙。',
        externalLink: 'https://prisma.oryn.tw',
        status: 'STABLE', // Blue
        version: 'v1.0.4',
        logo: '/Prisma 知識全貌 logo.png',
        actionText: '展開知識宇宙'
    },
    {
        id: 'thesis_fixer_legacy',
        title: '論文格式救星 (舊版)',
        titleEn: 'LEGACY UTILITY',
        details: '經典的自動校正工具，協助數千名研究生度過難關。',
        externalLink: 'https://thesis.oryn.tw',
        status: 'LEGACY', // Gray
        version: 'v0.9.2',
        logo: '/論文格式救星(舊版) logo.png',
        actionText: '啟動舊版程序'
    }
]

// --- Color Helpers ---
const getStatusColor = (status) => {
    switch (status) {
        case 'LATEST': return 'text-[#D4AF37] border-[#D4AF37]'
        case 'DEV': return 'text-emerald-400 border-emerald-400'
        case 'STABLE': return 'text-blue-400 border-blue-400'
        default: return 'text-neutral-400 border-neutral-400'
    }
}

export function EvolutionLab() {
    return (
        <section id="products" className="py-32 px-4 md:px-8 bg-[#020202] relative overflow-hidden border-t border-white/5">

            {/* Background: Clean, non-distracting grid */}
            <div className="absolute inset-0 bg-[#020202]">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header - Simple & Clear */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        實驗室 <span className="text-[#D4AF37]">.</span> 產品
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide">
                        REALIZED ASSETS & EVOLUTION
                    </p>
                </div>

                {/* Benton Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {releasedProducts.map((product, index) => (
                        <motion.a
                            key={product.id}
                            href={product.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" }}
                        >
                            {/* Hover Highlight (Lightweight) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Top Row: Logo & Status */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 p-2 flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors">
                                    <img src={product.logo} alt={product.title} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${getStatusColor(product.status)} bg-black/20`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-[10px] text-white/40 font-mono mb-4 tracking-widest uppercase">
                                    {product.titleEn}
                                </p>
                                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                                    {product.details}
                                </p>
                            </div>

                            {/* Fool-proof Action Button (Visually Distinct) */}
                            <div className="mt-8 pt-4 border-t border-white/5 group-hover:border-[#D4AF37]/20 transition-colors">
                                <div className="flex items-center justify-between text-[#D4AF37]">
                                    <span className="text-xs font-bold font-mono tracking-wider group-hover:underline decoration-[#D4AF37]/50 underline-offset-4">
                                        {product.actionText}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                            </div>
                        </motion.a>
                    ))}

                    {/* "More Coming" Placeholder (Last Card) */}
                    <div className="relative border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                            <span className="text-xl text-white">+</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">持續進化中</h3>
                        <p className="text-xs text-neutral-500 font-mono mt-2">More Artifacts Coming Soon</p>
                    </div>

                </div>
            </div>
        </section>
    )
}
