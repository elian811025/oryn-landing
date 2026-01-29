// --- Imports ---
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductGalaxy from './visuals/ProductGalaxy'

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
        details: '上傳WORD檔，自動校正格式',
        externalLink: 'https://thesis.oryn.tw',
        status: 'LEGACY', // Gray
        version: 'v0.9.2',
        logo: '/論文格式救星(舊版) logo.png',
        actionText: '啟動舊版程序'
    }
]

// Status color mapping
const getStatusColor = (status) => {
    switch (status) {
        case 'LATEST': return '#D4AF37' // Gold
        case 'DEV': return '#34d399' // Emerald
        case 'STABLE': return '#60a5fa' // Blue
        case 'LEGACY': return '#9ca3af' // Gray
        default: return '#ffffff'
    }
}

// --- Mobile Product Card Component ---
function MobileProductCard({ product, index }) {
    const color = getStatusColor(product.status)

    return (
        <motion.a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{ boxShadow: `0 0 20px ${color}20` }}
        >
            <div className="flex items-center gap-3">
                {/* Status Dot */}
                <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />

                {/* Title & Details */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base truncate">{product.title}</h3>
                    <p className="text-white/50 text-xs font-mono tracking-wider mt-0.5">{product.titleEn}</p>
                </div>

                {/* Arrow */}
                <span className="text-white/40 text-lg">→</span>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm mt-3 leading-relaxed line-clamp-2">
                {product.details}
            </p>
        </motion.a>
    )
}

// --- Starry Background for Mobile ---
function MobileStarryBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-[#050510] to-[#020202]" />

            {/* Stars */}
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Subtle nebula glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />
        </div>
    )
}

export function EvolutionLab() {
    // Detect mobile/touch device
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section
            id="products"
            className={`w-full bg-[#020202] relative overflow-hidden border-t border-white/5 ${isMobile ? 'min-h-screen py-20' : 'h-screen'}`}
        >
            {/* Header */}
            <div className={`${isMobile ? 'relative mb-8' : 'absolute top-10 left-0 right-0'} z-20 pointer-events-none`}>
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-xl">
                        實驗室 <span className="text-[#D4AF37]">.</span> 產品
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide drop-shadow-md">
                        REALIZED ASSETS & EVOLUTION
                    </p>
                </div>
            </div>

            {/* Conditional Rendering: Mobile Cards vs Desktop Galaxy */}
            {isMobile ? (
                <>
                    {/* Mobile: Starry Background + Card List */}
                    <MobileStarryBackground />
                    <div className="relative z-10 px-4 space-y-3">
                        {releasedProducts.map((product, i) => (
                            <MobileProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* Desktop: Full 3D Planetary System */}
                    <ProductGalaxy products={releasedProducts} />

                    {/* Desktop Instruction */}
                    <div className="absolute bottom-10 w-full text-center pointer-events-none z-20">
                        <p className="text-white/30 text-xs font-mono tracking-[0.3em]">
                            DRAG TO EXPLORE • CLICK TO ENTER
                        </p>
                    </div>
                </>
            )}
        </section>
    )
}

