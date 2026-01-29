import { motion } from 'framer-motion'
import NeuralBackground from './visuals/NeuralBackground'
import { HolographicCard } from './visuals/HolographicCard'

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
    },
    {
        id: 'oryn_eyes',
        title: 'ORYN Eyes 舊手機監視器',
        titleEn: 'ORYN EYES SURVEILLANCE',
        details: '把閒置的舊手機變成監視器，只要用手機/電腦就可以監看。',
        externalLink: 'https://eyes.oryn.tw/',
        status: 'LATEST',
        version: 'v1.0.0',
        category: 'IOT_TOOL',
        logo: '/ORYN Eyes 舊手機監視器.png',
        actionText: '開啟監控系統'
    }
]

export function EvolutionLabV2() {
    return (
        <section id="products" className="py-32 px-4 bg-[#050505] relative overflow-hidden border-t border-white/5 min-h-screen">
            {/* The 3D Neural Nexus Background */}
            <NeuralBackground />

            {/* Content Container (z-10 to sit above canvas) */}
            <div className="max-w-7xl mx-auto relative z-10 pointer-events-none">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-6 pointer-events-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pointer-events-auto">
                    {releasedProducts.map((product, index) => (
                        <HolographicCard key={product.id} product={product} index={index} />
                    ))}

                    {/* Pending Node Placeholder - Tech Style */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-sm group min-h-[300px] rounded-xl overflow-hidden hover:bg-black/40 transition-colors"
                    >
                        {/* Tech Corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />

                        <h3 className="text-xl font-bold text-white/20 mb-2 group-hover:text-white/40 transition-colors">等待輸入 [AWAITING_INPUT]</h3>
                        <p className="font-mono text-xs text-white/20 mb-6 group-hover:text-white/30 transition-colors">下個迭代計算中...</p>

                        <a
                            href="#messages"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-xs font-mono text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 rounded"
                        >
                            <span>前往留言 [MESSAGE_BOARD]</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
