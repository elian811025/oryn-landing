import { motion } from 'framer-motion'

import SolarSystem from './visuals/SolarSystem'

// --- CSS 3D Text Component (Refined Typography) ---
function CSS3DText({ children, delay, variant = 'gold', size = 'normal' }) {
    // Sizing: Responsive for mobile
    // 'large' on mobile -> text-sm, on desktop -> 2xl/4xl
    // 'normal' on mobile -> text-xs, on desktop -> lg/2xl
    const fontSize = size === 'large' ? 'text-sm md:text-2xl lg:text-4xl' : 'text-xs md:text-lg lg:text-2xl'

    // Unifying to Gold based on user feedback
    const colorClass = 'text-liquid-gold'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 1.0, ease: "easeOut" }}
            // Removed 'group' class to disable hover triggers logic if any remained
            className={`relative inline-block cursor-default select-none ${fontSize} font-serif tracking-[0.1em] leading-relaxed font-bold`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Back Layer (Shadow/Depth) */}
            <span className="absolute inset-0 select-none text-black/60 blur-[2px] translate-z-[-4px] translate-y-[4px]">
                {children}
            </span>

            {/* Front Layer (Main) - Removed group-hover transforms */}
            <span className={`relative z-10 block ${colorClass}`}>
                {children}
            </span>
        </motion.div>
    )
}

export function AboutMeV2() {
    return (
        <section id="about" className="relative py-32 px-4 md:px-0 bg-[#050505] overflow-hidden border-t border-white/5 min-h-[90vh] flex items-center justify-center">

            {/* 1. The 3D Layer (Solar System) */}
            <SolarSystem />

            {/* 2. Content Layer (Unbounded) */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
            >
                <div className="relative py-20 px-4 md:px-0 flex flex-col items-center justify-center min-h-[800px]">

                    {/* Poem - Cinematic Layout */}
                    <div className="perspective-[1000px] space-y-16 md:space-y-24 text-center mb-48">
                        <div>
                            {/* Title - Responsive size */}
                            <h2 className="text-2xl md:text-6xl lg:text-7xl font-black font-serif text-liquid-gold tracking-wider md:tracking-widest mb-10 md:mb-20 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                                《袖隱蒼龍》
                            </h2>
                        </div>

                        {/* Staggered Lines - Mobile: split at comma */}
                        <div className="space-y-6 md:space-y-16">

                            <div className="md:-translate-x-16">
                                <CSS3DText delay={0.2} size="large">
                                    <span className="block md:inline">寒門難鎖凌雲志，</span>
                                    <span className="block md:inline">淺水焉能困蛟龍。</span>
                                </CSS3DText>
                            </div>

                            <div className="md:translate-x-16">
                                <CSS3DText delay={0.4} size="large">
                                    <span className="block md:inline">獨履荊棘闢乾坤，</span>
                                    <span className="block md:inline">暗蓄風雷破長空。</span>
                                </CSS3DText>
                            </div>

                            <div className="md:-translate-x-16">
                                <CSS3DText delay={0.6} size="large">
                                    <span className="block md:inline">千回敗處心不死，</span>
                                    <span className="block md:inline">捲土重來氣如虹。</span>
                                </CSS3DText>
                            </div>

                            <div className="md:translate-x-16">
                                <CSS3DText delay={0.8} size="large">
                                    <span className="block md:inline">一朝局定輪長轉，</span>
                                    <span className="block md:inline">呼風喚雨傲蒼穹。</span>
                                </CSS3DText>
                            </div>
                        </div>
                    </div>

                    {/* Signature */}
                    <div className="absolute bottom-10 right-8 md:right-20 text-right opacity-80 z-20">
                        <p className="text-sm font-mono text-[#D4AF37] mb-2 tracking-[0.5em] uppercase">Authorized_By</p>
                        <p className="text-4xl md:text-5xl font-bold text-white tracking-[0.2em] drop-shadow-lg">ORYN</p>
                        <p className="text-sm text-white/50 mt-2 font-mono tracking-widest">影子建築師</p>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default AboutMeV2
