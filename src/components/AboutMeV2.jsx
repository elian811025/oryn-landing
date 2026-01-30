import { motion } from 'framer-motion'

import SolarSystem from './visuals/SolarSystem'

// --- CSS 3D Text Component (Refined Typography) ---
function CSS3DText({ children, delay, variant = 'gold', size = 'normal' }) {
    // Sizing: Responsive for mobile
    // 'large' on mobile -> text-sm, on desktop -> 2xl/4xl
    // 'normal' on mobile -> text-xs, on desktop -> lg/2xl
    const fontSize = size === 'large' ? 'text-[30px] md:text-2xl lg:text-4xl' : 'text-base md:text-lg lg:text-2xl'

    // Unifying to Gold based on user feedback
    const colorClass = 'text-liquid-gold'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 1.0, ease: "easeOut" }}
            // Removed 'group' class to disable hover triggers logic if any remained
            className={`relative inline-block cursor-default select-none ${fontSize} font-calligraphy tracking-[0.15em] leading-relaxed`}
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
                            <h2 className="text-[40px] md:text-6xl lg:text-7xl font-calligraphy text-liquid-gold tracking-wider md:tracking-widest mb-10 md:mb-20 drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
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

                    {/* S-Rank Dungeon Gate - 深淵裂隙 */}
                    <a
                        href="https://grizzly-airedale-8a7.notion.site/ORYN-2f8f5699d46c806b9c47e6bfce823a21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-28 right-2 md:bottom-36 md:right-6 z-30 group cursor-pointer"
                        title="S級裂隙"
                    >
                        {/* The Gate Container */}
                        <div className="relative w-24 h-32 md:w-28 md:h-36">

                            {/* Danger Aura - Outer Pulse */}
                            <div className="absolute -inset-6 bg-gradient-to-t from-red-900/40 via-purple-900/30 to-transparent blur-3xl animate-pulse" />

                            {/* Reality Distortion Field */}
                            <div className="absolute -inset-4 bg-gradient-radial from-black via-purple-950/80 to-transparent blur-2xl opacity-80" />

                            {/* The Rift - Main Portal Shape (Vertical Oval) */}
                            <div className="absolute inset-0 overflow-hidden">
                                {/* Outer Crack Edge - Jagged */}
                                <div className="absolute inset-0 bg-gradient-to-b from-red-600/60 via-purple-800/80 to-red-900/60 rounded-[50%] blur-sm animate-pulse" style={{ clipPath: 'polygon(50% 0%, 65% 10%, 70% 25%, 68% 40%, 75% 55%, 70% 70%, 65% 85%, 50% 100%, 35% 85%, 30% 70%, 25% 55%, 32% 40%, 30% 25%, 35% 10%)' }} />

                                {/* Inner Void - Pure Darkness */}
                                <div className="absolute inset-2 bg-gradient-to-b from-black via-purple-950 to-black rounded-[50%]" style={{ clipPath: 'polygon(50% 5%, 62% 15%, 65% 30%, 63% 45%, 68% 58%, 63% 72%, 58% 88%, 50% 95%, 42% 88%, 37% 72%, 32% 58%, 37% 45%, 35% 30%, 38% 15%)' }} />

                                {/* Swirling Energy Inside */}
                                <div className="absolute inset-4 bg-gradient-to-tr from-red-900/50 via-transparent to-purple-900/50 rounded-[50%] animate-spin" style={{ animationDuration: '8s' }} />
                                <div className="absolute inset-4 bg-gradient-to-bl from-purple-800/40 via-transparent to-red-800/40 rounded-[50%] animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                            </div>

                            {/* Electric Cracks - Reality Breaking */}
                            <div className="absolute top-2 left-1/2 w-0.5 h-8 bg-gradient-to-b from-red-500 via-purple-400 to-transparent -translate-x-1/2 -rotate-12 opacity-60 animate-pulse" />
                            <div className="absolute top-4 left-1/3 w-0.5 h-6 bg-gradient-to-b from-purple-500 via-red-400 to-transparent rotate-6 opacity-50 animate-pulse" style={{ animationDelay: '0.3s' }} />
                            <div className="absolute bottom-6 right-1/3 w-0.5 h-5 bg-gradient-to-t from-red-500 via-purple-400 to-transparent -rotate-12 opacity-50 animate-pulse" style={{ animationDelay: '0.6s' }} />

                            {/* Floating Dark Particles */}
                            <div className="absolute top-1/4 left-0 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-bounce" style={{ animationDuration: '2s' }} />
                            <div className="absolute top-1/2 right-0 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.8)] animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                            <div className="absolute bottom-1/4 left-1 w-1 h-1 bg-red-400 rounded-full shadow-[0_0_6px_rgba(248,113,113,0.8)] animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />

                            {/* Ominous Eye in the Center */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-2 md:w-5 md:h-2.5">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full" />
                            </div>

                            {/* S-Rank Badge */}
                            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-lg rotate-12 shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse" />
                                <span className="relative text-white font-black text-lg md:text-xl drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>S</span>
                            </div>

                            {/* Hover Intensify Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute -inset-8 bg-gradient-to-t from-red-600/30 via-purple-600/20 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '0.5s' }} />
                            </div>
                        </div>

                        {/* Warning Label */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-950/90 backdrop-blur-sm rounded-lg border border-red-500/50 text-xs text-red-400 font-mono whitespace-nowrap opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                            <span className="mr-1 animate-pulse">⚠</span> 神秘傳送門 <span className="ml-1 animate-pulse">⚠</span>
                        </div>
                    </a>

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
