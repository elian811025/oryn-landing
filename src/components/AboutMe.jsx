import { motion } from 'framer-motion'

const TechnicalGrid = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: 0.2
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
)

// --- Animation Components ---

const TIMING = {
    duration: 15,
    times: {
        stormEnd: 0.53,    // 8s
        rainbowStart: 0.66, // 10s
        rainbowEnd: 0.93,   // 14s
    }
}

const LightningArcs = () => {
    // Helper to generate jagged "lightning" path segments
    const jaggedPath = (points) => points.map(([x, y]) => `L ${x} ${y}`).join(" ")

    // Cycle opacity: Active during 0-8s, OFF during rainbow (10-14s)
    const cycleOpacity = {
        opacity: [1, 1, 0, 0, 1], // On -> On -> Off -> Off -> On
        transition: {
            duration: 15,
            item: [0, 0.53, 0.6, 0.93, 1],
            repeat: Infinity,
            ease: "linear"
        }
    }

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg mx-1 my-1"
            animate={{ opacity: [1, 0, 0, 1] }} // Global container for the "Pause" effect
            transition={{
                duration: 15,
                times: [0, 0.53, 0.93, 1], // Fade out at 8s, back in at 14s
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <filter id="lightning-glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Top Edge Full */}
                <motion.path
                    d="M0,0 L10,2 L20,-2 L30,2 L40,-2 L50,2 L60,-2 L70,2 L80,-2 L90,2 L100,0"
                    vectorEffect="non-scaling-stroke"
                    stroke="#fff"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#lightning-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0, 0, 1, 0],
                        opacity: [0, 1, 0, 0, 1, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 2,
                        times: [0, 0.1, 0.2, 0.6, 0.7, 0.8]
                    }}
                />

                {/* Right Edge Full */}
                <motion.path
                    d="M100,0 L102,10 L98,20 L102,30 L98,40 L102,50 L98,60 L102,70 L98,80 L102,90 L100,100"
                    vectorEffect="non-scaling-stroke"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#lightning-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 1
                    }}
                />

                {/* Bottom Edge Full */}
                <motion.path
                    d="M100,100 L90,98 L80,102 L70,98 L60,102 L50,98 L40,102 L30,98 L20,102 L10,98 L0,100"
                    vectorEffect="non-scaling-stroke"
                    stroke="#fff"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#lightning-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0, 0, 1, 0],
                        opacity: [0, 1, 0, 0, 1, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        times: [0, 0.1, 0.2, 0.5, 0.6, 0.7]
                    }}
                />

                {/* Left Edge Full */}
                <motion.path
                    d="M0,100 L-2,90 L2,80 L-2,70 L2,60 L-2,50 L2,40 L-2,30 L2,20 L-2,10 L0,0"
                    vectorEffect="non-scaling-stroke"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#lightning-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        delay: 0.5
                    }}
                />
            </svg>
        </motion.div>
    )
}

const DragonThroneBorder = ({ children }) => {
    return (
        <div className="relative p-1">
            {/* 1. Main Gold Border with Gradient */}
            <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.1)]" />

            {/* NEW: Border Lightning Effect */}
            <LightningArcs />

            {/* 2. Ornate Corners (Imperial Claws/Clouds Style) */}
            <svg className="absolute top-0 left-0 w-16 h-16 text-[#D4AF37] z-20" viewBox="0 0 100 100" fill="none">
                <path d="M2 100 V 20 Q 2 2 20 2 H 100" stroke="currentColor" strokeWidth="2" />
                <path d="M15 100 V 25 Q 15 15 25 15 H 100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <rect x="0" y="0" width="8" height="8" fill="currentColor" />
            </svg>
            <svg className="absolute top-0 right-0 w-16 h-16 text-[#D4AF37] rotate-90 z-20" viewBox="0 0 100 100" fill="none">
                <path d="M2 100 V 20 Q 2 2 20 2 H 100" stroke="currentColor" strokeWidth="2" />
                <path d="M15 100 V 25 Q 15 15 25 15 H 100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <rect x="0" y="0" width="8" height="8" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-16 h-16 text-[#D4AF37] rotate-180 z-20" viewBox="0 0 100 100" fill="none">
                <path d="M2 100 V 20 Q 2 2 20 2 H 100" stroke="currentColor" strokeWidth="2" />
                <path d="M15 100 V 25 Q 15 15 25 15 H 100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <rect x="0" y="0" width="8" height="8" fill="currentColor" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-16 h-16 text-[#D4AF37] -rotate-90 z-20" viewBox="0 0 100 100" fill="none">
                <path d="M2 100 V 20 Q 2 2 20 2 H 100" stroke="currentColor" strokeWidth="2" />
                <path d="M15 100 V 25 Q 15 15 25 15 H 100" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <rect x="0" y="0" width="8" height="8" fill="currentColor" />
            </svg>

            {/* 3. Side Pillars (Tech-Carvings) */}
            <div className="absolute top-1/4 bottom-1/4 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="absolute top-1/4 bottom-1/4 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 p-5 md:p-16 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden">
                {children}
            </div>
        </div>
    )
}

const PoeticLayer = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* 1. Wheel of Fate (輪長轉) - Always turning */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" />
                    <path d="M50 2 V 98 M2 50 H 98" stroke="currentColor" strokeWidth="0.1" />
                    <path d="M16 16 L 84 84 M84 16 L 16 84" stroke="currentColor" strokeWidth="0.1" />
                </svg>
            </motion.div>

            {/* 2. Call Wind & Rain (呼風喚雨) - Rain Particles */}
            {/* Rain fades out when rainbow appears */}
            <motion.div
                className="absolute inset-0"
                animate={{ opacity: [1, 0, 0, 1] }}
                transition={{
                    duration: 15,
                    times: [0, 0.53, 0.93, 1], // Matches storm cycle
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`rain-${i}`}
                        className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
                        style={{
                            height: Math.random() * 50 + 20,
                            left: `${Math.random() * 100}%`,
                            top: -100
                        }}
                        animate={{ top: '120%' }}
                        transition={{
                            duration: Math.random() * 1 + 0.5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                        }}
                    />
                ))}
            </motion.div>

            {/* 3. The Neon Rainbow (氣如虹) - Appears when rain stops */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent"
                style={{ mixBlendMode: 'screen' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{
                    duration: 15,
                    // 0-0.53(8s): Off
                    // 0.6(9s): Fade In start? 
                    // 0.66(10s): Fully On
                    // 0.93(14s): Fade Out
                    times: [0, 0.53, 0.66, 0.86, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Horizontal Sweeping Beam */}
                <motion.div
                    className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
                    animate={{ left: ['-20%', '120%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 9 }} // Only moves during rainbow phase roughly
                />
            </motion.div>

            {/* 4. Thorns (荊棘) - Bottom jagged shapes */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 transform scale-y-[-1]">
                <svg viewBox="0 0 1440 320" className="w-full h-full text-[#333]">
                    <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    )
}

const SurgingClouds = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Layer 1: Deep Slow Clouds (Nebula-like) */}
            <motion.div
                className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-slate-900/10 rounded-full blur-[150px]"
                animate={{
                    x: [-100, 100],
                    rotate: [0, 45],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute -bottom-[50%] -right-[20%] w-[150%] h-[150%] bg-zinc-800/10 rounded-full blur-[150px]"
                animate={{
                    x: [100, -100],
                    rotate: [0, -45],
                    scale: [1, 1.5, 1]
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />

            {/* Layer 2: Drifting Mist (Lighter) */}
            <motion.div
                className="absolute top-1/3 left-[-50%] w-[200%] h-[50vh] bg-gradient-to-r from-transparent via-slate-500/5 to-transparent blur-[80px]"
                animate={{ x: ['-20%', '0%'] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear"
                }}
            />

            {/* Layer 3: Vertical Surge (Rising steam/energy) */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[100vh] bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"
            />
        </div>
    )
}

const DragonSpirit = () => {
    // Sinuous "Dragon" curves
    const dragonPath = "M100 400 C 150 200, 300 100, 500 100 S 800 200, 850 400 S 700 700, 500 700 S 200 600, 150 400"

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 1. Dynamic Storm/Mist Background */}
            <motion.div
                className="absolute inset-0 bg-[#050505]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Rotating nebulas */}
                <motion.div
                    className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-emerald-900/10 rounded-full blur-[120px]"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-indigo-900/10 rounded-full blur-[120px]"
                    animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* 2. Floating "Spirit Embers" (Scales) */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                    initial={{
                        opacity: 0,
                        x: Math.random() * 1000,
                        y: Math.random() * 800,
                        scale: 0
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        y: [null, Math.random() * -100], // Float up
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut"
                    }}
                />
            ))}
            {/* 3. The Dragon (SVG Layers) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="dragonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                    </linearGradient>
                    <filter id="glow-strong">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Main Energy Body */}
                <motion.path
                    d="M150,600 C300,500 400,700 600,400 S 800,100 400,200 S 100,300 300,500"
                    fill="none"
                    stroke="url(#dragonGradient)"
                    strokeWidth="3" // Thicker stroke
                    strokeLinecap="round"
                    filter="url(#glow-strong)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                        pathOffset: [0, 2, 0] // Move faster/further
                    }}
                    transition={{
                        duration: 6, // Faster speed
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }}
                />

                {/* The "Dragon Head" (Leading Glow) */}
                <motion.path
                    d="M150,600 C300,500 400,700 600,400 S 800,100 400,200 S 100,300 300,500"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 0.2, 0], // Short segment "chasing"
                        opacity: [0, 1, 0],
                        pathOffset: [0, 2, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                    }}
                />

                {/* Secondary "Thunder" Arcs */}
                <motion.path
                    d="M300,300 L350,250 L400,300"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4, delay: 1 }}
                />
                <motion.path
                    d="M700,500 L650,550 L600,500"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 6, delay: 3 }}
                />
            </svg>

            {/* 4. Ambient Lightning Flashes (Intensified) */}
            <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0, 0, 0.1, 0] }}
                transition={{
                    duration: 3, // Faster interaction
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.6, 0.7, 1],
                    repeatDelay: 2
                }}
            />
        </div>
    )
}

export function AboutMe() {
    return (
        <section id="about" className="py-32 px-4 md:px-8 bg-[#050505] relative overflow-hidden border-t border-white/5">
            <TechnicalGrid />
            <SurgingClouds />
            <DragonSpirit />

            <motion.div
                className="max-w-4xl mx-auto relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Dragon Throne Container */}
                <DragonThroneBorder>
                    {/* Poetic Effects Layer */}
                    <PoeticLayer />

                    <div className="relative z-20">
                        <div className="absolute -top-3 -left-3 text-[10px] font-mono text-white/20 bg-[#050505] px-2 tracking-widest z-30">
                            MANIFESTO_LOG
                        </div>

                        {/* Center Wrapper for Alignment */}
                        <div className="flex flex-col items-center mb-12 text-center pt-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    《袖隱蒼龍》
                                </h2>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 text-base md:text-2xl text-white/80 leading-relaxed font-light font-serif tracking-wider md:tracking-widest drop-shadow-md">
                                <p>寒門難鎖凌雲志，淺水焉能困蛟龍。</p>
                                <p>獨履荊棘闢乾坤，暗蓄風雷破長空。</p>
                                <p>千回敗處心不死，捲土重來氣如虹。</p>
                                <p>一朝局定輪長轉，呼風喚雨傲蒼穹。</p>
                            </div>
                        </div>

                        {/* Footer Signature */}
                        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-end opacity-80">
                            <div className="text-right">
                                <p className="text-sm font-mono text-emerald-500 mb-1 tracking-widest uppercase">//_AUTHORIZED_BY</p>
                                <p className="text-2xl font-bold text-white tracking-wider">ORYN</p>
                                <p className="text-sm text-white/40 mt-1 font-mono">影子建築師</p>
                            </div>
                        </div>
                    </div>
                </DragonThroneBorder>
            </motion.div>
        </section>
    )
}
