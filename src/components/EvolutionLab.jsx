// --- Imports ---
import { useState, useEffect } from 'react'
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

export function EvolutionLab() {
    // Detect mobile/touch device
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section
            id="products"
            className="h-screen w-full bg-[#020202] relative overflow-hidden border-t border-white/5"
            style={{ touchAction: isMobile ? 'pan-y' : 'none' }}  // Allow vertical scroll on mobile
        >

            {/* Header Overlay - Absolute Position to float over Canvas */}
            <div className="absolute top-10 left-0 right-0 z-20 pointer-events-none">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-xl">
                        實驗室 <span className="text-[#D4AF37]">.</span> 產品
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base font-light tracking-wide drop-shadow-md">
                        REALIZED ASSETS & EVOLUTION
                    </p>
                </div>
            </div>

            {/* The Planetary System */}
            <ProductGalaxy products={releasedProducts} />

            {/* Instruction Overlay - Different text for mobile vs desktop */}
            <div className="absolute bottom-10 w-full text-center pointer-events-none z-20">
                <p className="text-white/30 text-xs font-mono tracking-[0.3em]">
                    {isMobile ? 'TAP TO ENTER • SCROLL TO CONTINUE' : 'DRAG TO EXPLORE • CLICK TO ENTER'}
                </p>
            </div>

        </section>
    )
}
