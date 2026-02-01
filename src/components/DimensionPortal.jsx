import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Custom CSS Animation Keyframes
const portalStyles = `
@keyframes vortexSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@keyframes vortexSpinReverse {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}
@keyframes dragonPulse {
    0%, 100% { 
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3), 0 0 100px rgba(212, 175, 55, 0.1);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 50px rgba(212, 175, 55, 0.8), 0 0 100px rgba(212, 175, 55, 0.5), 0 0 150px rgba(212, 175, 55, 0.2);
        transform: scale(1.02);
    }
}
@keyframes coreGlow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
}
@keyframes lightningFlash {
    0%, 90%, 100% { opacity: 0; }
    92%, 98% { opacity: 1; }
}
@keyframes electricPulse {
    0%, 100% { 
        box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 80px rgba(220, 38, 38, 0.4), 0 0 120px rgba(0, 0, 0, 0.8);
    }
    50% { 
        box-shadow: 0 0 60px rgba(239, 68, 68, 1), 0 0 120px rgba(220, 38, 38, 0.6), 0 0 180px rgba(0, 0, 0, 0.9);
    }
}
@keyframes riseParticle {
    0% { transform: translateY(0) translateX(0); opacity: 1; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-280px) translateX(5px); opacity: 0; }
}
@keyframes thunderStrike {
    0%, 85%, 100% { opacity: 0; transform: scaleY(0.8); }
    88%, 92% { opacity: 1; transform: scaleY(1); }
}
@keyframes energyFlow {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 200%; }
}
`

export function DimensionPortal() {
    return (
        <section className="relative py-20 px-4 bg-[#050505] border-t border-white/5">
            {/* Inject custom animations */}
            <style>{portalStyles}</style>

            <div className="max-w-6xl mx-auto text-center">
                {/* Portals Container - Side by Side */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-28">

                    {/* ===== 袖隱蒼龍 - Premium Golden Dragon Portal ===== */}
                    <Link to="/sleeved-dragon" className="inline-block group">
                        <motion.div
                            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Massive Outer Glow - Golden */}
                            <div
                                className="absolute -inset-16 blur-3xl"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.4) 0%, rgba(180, 140, 40, 0.2) 40%, transparent 70%)',
                                    animation: 'dragonPulse 3s ease-in-out infinite'
                                }}
                            />

                            {/* Dragon Energy Rings - Multiple Layers */}
                            <div
                                className="absolute -inset-4 rounded-full"
                                style={{
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    animation: 'vortexSpin 20s linear infinite'
                                }}
                            />
                            <div
                                className="absolute -inset-2 rounded-full"
                                style={{
                                    border: '2px solid rgba(212, 175, 55, 0.4)',
                                    borderStyle: 'dashed',
                                    animation: 'vortexSpinReverse 15s linear infinite'
                                }}
                            />
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 0deg, transparent, rgba(212, 175, 55, 0.3), transparent, rgba(180, 140, 40, 0.2), transparent)',
                                    animation: 'vortexSpin 8s linear infinite'
                                }}
                            />
                            <div
                                className="absolute inset-2 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 180deg, transparent, rgba(139, 92, 246, 0.2), transparent, rgba(212, 175, 55, 0.25), transparent)',
                                    animation: 'vortexSpinReverse 6s linear infinite'
                                }}
                            />

                            {/* Main Portal Frame - Glowing Gold */}
                            <div
                                className="absolute inset-4 rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.8) 0%, rgba(180, 140, 40, 0.6) 50%, rgba(212, 175, 55, 0.8) 100%)',
                                    padding: '3px',
                                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                {/* Inner Void with Dragon Energy */}
                                <div
                                    className="w-full h-full rounded-full overflow-hidden relative"
                                    style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)' }}
                                >
                                    {/* Swirling Dragon Mist */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'conic-gradient(from 0deg at 50% 50%, transparent, rgba(139, 92, 246, 0.4), transparent, rgba(212, 175, 55, 0.3), transparent)',
                                            animation: 'vortexSpin 5s linear infinite'
                                        }}
                                    />
                                    <div
                                        className="absolute inset-4"
                                        style={{
                                            background: 'conic-gradient(from 90deg at 50% 50%, transparent, rgba(212, 175, 55, 0.35), transparent, rgba(139, 92, 246, 0.25), transparent)',
                                            animation: 'vortexSpinReverse 4s linear infinite'
                                        }}
                                    />

                                    {/* Dragon Eye Core */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-10 h-10 rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle at 30% 30%, #ffd700, #d4af37, #b8860b)',
                                                boxShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.5)',
                                                animation: 'coreGlow 2.5s ease-in-out infinite'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Orbiting Energy Sparks */}
                            <div className="absolute inset-0" style={{ animation: 'vortexSpin 10s linear infinite' }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 1), 0 0 20px rgba(251, 191, 36, 0.6)' }} />
                            </div>
                            <div className="absolute inset-0" style={{ animation: 'vortexSpinReverse 8s linear infinite' }}>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full" style={{ boxShadow: '0 0 8px rgba(192, 132, 252, 1)' }} />
                            </div>
                            <div className="absolute inset-0" style={{ animation: 'vortexSpin 12s linear infinite' }}>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full" style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 1)' }} />
                            </div>
                        </motion.div>

                        {/* Portal Label */}
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-xl md:text-2xl font-calligraphy text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 group-hover:from-purple-400 group-hover:via-amber-400 group-hover:to-purple-400 transition-all duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                                《袖隱蒼龍》
                            </p>
                            <p className="mt-2 text-sm text-white/40 group-hover:text-amber-400/80 transition-colors font-mono tracking-wider">
                                點擊進入 →
                            </p>
                        </motion.div>
                    </Link>

                    {/* ===== S-Rank Gate - Red & Black Lightning Style ===== */}
                    <a
                        href="https://grizzly-airedale-8a7.notion.site/ORYN-2f8f5699d46c806b9c47e6bfce823a21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group"
                    >
                        <motion.div
                            className="relative w-28 h-48 md:w-32 md:h-56 mx-auto cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Massive Outer Glow - Deep Red */}
                            <div
                                className="absolute -inset-16 blur-3xl"
                                style={{
                                    background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.5) 0%, rgba(127, 29, 29, 0.3) 40%, rgba(0, 0, 0, 0.4) 70%, transparent 90%)',
                                    animation: 'electricPulse 2s ease-in-out infinite'
                                }}
                            />

                            {/* Lightning Cracks - Red Electric */}
                            <div className="absolute -inset-6 pointer-events-none">
                                {/* Top lightning bolts */}
                                <div className="absolute top-0 left-1/3 w-0.5 h-12 -translate-y-8 origin-bottom" style={{ background: 'linear-gradient(to top, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.4), transparent)', animation: 'thunderStrike 3s ease-in-out infinite', boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}>
                                    <div className="absolute top-0 left-0 w-4 h-0.5 bg-red-500/60 -rotate-45" />
                                </div>
                                <div className="absolute top-0 right-1/3 w-0.5 h-10 -translate-y-6 origin-bottom" style={{ background: 'linear-gradient(to top, rgba(239, 68, 68, 0.8), transparent)', animation: 'thunderStrike 3.5s ease-in-out infinite 0.5s', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }}>
                                    <div className="absolute top-2 right-0 w-3 h-0.5 bg-red-500/50 rotate-45" />
                                </div>
                                {/* Side lightning */}
                                <div className="absolute top-1/4 -left-4 w-8 h-0.5" style={{ background: 'linear-gradient(to left, rgba(239, 68, 68, 0.9), transparent)', animation: 'lightningFlash 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)' }} />
                                <div className="absolute top-1/3 -right-5 w-10 h-0.5" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.9), transparent)', animation: 'lightningFlash 2.5s ease-in-out infinite 1s', boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }} />
                                <div className="absolute bottom-1/3 -left-6 w-10 h-0.5" style={{ background: 'linear-gradient(to left, rgba(239, 68, 68, 0.7), transparent)', animation: 'lightningFlash 3s ease-in-out infinite 0.7s', boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }} />
                                <div className="absolute bottom-1/4 -right-4 w-8 h-0.5" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.8), transparent)', animation: 'lightningFlash 2.2s ease-in-out infinite 1.5s', boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)' }} />
                                {/* Bottom cracks */}
                                <div className="absolute bottom-0 left-1/4 w-0.5 h-8 translate-y-6" style={{ background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.8), transparent)', animation: 'thunderStrike 4s ease-in-out infinite 0.3s', boxShadow: '0 0 6px rgba(239, 68, 68, 0.7)' }} />
                                <div className="absolute bottom-0 right-1/4 w-0.5 h-6 translate-y-4" style={{ background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.7), transparent)', animation: 'thunderStrike 3.8s ease-in-out infinite 0.8s', boxShadow: '0 0 5px rgba(239, 68, 68, 0.6)' }} />
                            </div>

                            {/* Gate Frame - Crimson Border with Black Core */}
                            <div
                                className="absolute inset-0 rounded-[50%/8%]"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.9) 0%, rgba(185, 28, 28, 1) 20%, rgba(127, 29, 29, 1) 50%, rgba(185, 28, 28, 1) 80%, rgba(239, 68, 68, 0.9) 100%)',
                                    padding: '4px',
                                    boxShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(185, 28, 28, 0.5), 0 0 100px rgba(127, 29, 29, 0.3), inset 0 0 30px rgba(239, 68, 68, 0.3)'
                                }}
                            >
                                {/* Inner Void - Deep Black */}
                                <div
                                    className="w-full h-full rounded-[50%/8%] overflow-hidden relative"
                                    style={{ background: 'radial-gradient(ellipse at center, #1a0505 0%, #0a0000 40%, #000000 100%)' }}
                                >
                                    {/* Dark Energy Vortex */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(220, 38, 38, 0.3) 60deg, transparent 120deg, rgba(0, 0, 0, 0.8) 180deg, transparent 240deg, rgba(185, 28, 28, 0.25) 300deg, transparent 360deg)',
                                            animation: 'vortexSpin 8s linear infinite'
                                        }}
                                    />
                                    <div
                                        className="absolute inset-4"
                                        style={{
                                            background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(127, 29, 29, 0.4) 90deg, transparent 180deg, rgba(0, 0, 0, 0.9) 270deg, transparent 360deg)',
                                            animation: 'vortexSpinReverse 6s linear infinite'
                                        }}
                                    />

                                    {/* Vertical Energy Flow */}
                                    <div
                                        className="absolute inset-x-4 inset-y-0"
                                        style={{
                                            background: 'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.2) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(185, 28, 28, 0.2) 75%, transparent 100%)',
                                            backgroundSize: '100% 200%',
                                            animation: 'energyFlow 3s linear infinite'
                                        }}
                                    />

                                    {/* Central Dark Eye */}
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                background: 'radial-gradient(circle at 40% 40%, rgba(220, 38, 38, 0.6), rgba(0, 0, 0, 0.9))',
                                                boxShadow: '0 0 20px rgba(220, 38, 38, 0.6), inset 0 0 15px rgba(0, 0, 0, 0.8)',
                                                animation: 'coreGlow 2s ease-in-out infinite'
                                            }}
                                        />
                                    </div>

                                    {/* Inner Electric Particles */}
                                    <div className="absolute inset-0">
                                        <div className="absolute top-[15%] left-[25%] w-1 h-1 bg-red-500 rounded-full animate-ping opacity-60" style={{ animationDuration: '2s', boxShadow: '0 0 6px rgba(239, 68, 68, 1)' }} />
                                        <div className="absolute top-[35%] right-[20%] w-1.5 h-1.5 bg-red-600 rounded-full animate-ping opacity-50" style={{ animationDuration: '2.5s', animationDelay: '0.5s', boxShadow: '0 0 8px rgba(220, 38, 38, 1)' }} />
                                        <div className="absolute bottom-[25%] left-[35%] w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40" style={{ animationDuration: '3s', animationDelay: '1s', boxShadow: '0 0 6px rgba(248, 113, 113, 1)' }} />
                                        <div className="absolute top-[55%] right-[30%] w-0.5 h-0.5 bg-red-300 rounded-full animate-ping opacity-70" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
                                        <div className="absolute bottom-[40%] left-[20%] w-1 h-1 bg-red-500 rounded-full animate-ping opacity-50" style={{ animationDuration: '2.2s', animationDelay: '0.8s', boxShadow: '0 0 5px rgba(239, 68, 68, 1)' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Rising Dark Particles */}
                            <div className="absolute inset-0 overflow-visible pointer-events-none">
                                <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-red-500 rounded-full" style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 1)', animation: 'riseParticle 3s ease-out infinite' }} />
                                <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-red-600 rounded-full" style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 1)', animation: 'riseParticle 3.5s ease-out infinite 0.5s' }} />
                                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-red-400 rounded-full" style={{ boxShadow: '0 0 6px rgba(248, 113, 113, 1)', animation: 'riseParticle 2.8s ease-out infinite 1s' }} />
                                <div className="absolute bottom-0 left-[35%] w-0.5 h-0.5 bg-red-500 rounded-full" style={{ boxShadow: '0 0 4px rgba(239, 68, 68, 1)', animation: 'riseParticle 4s ease-out infinite 1.5s' }} />
                                <div className="absolute bottom-0 right-[35%] w-1 h-1 bg-red-600 rounded-full" style={{ boxShadow: '0 0 5px rgba(220, 38, 38, 1)', animation: 'riseParticle 3.2s ease-out infinite 2s' }} />
                            </div>
                        </motion.div>

                        {/* Portal Label */}
                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 group-hover:from-red-400 group-hover:via-orange-400 group-hover:to-red-500 transition-all duration-500 tracking-wide drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                S 級傳送門
                            </p>
                            <p className="mt-2 text-sm text-white/40 group-hover:text-red-400/80 transition-colors font-mono tracking-wider">
                                點擊進入 →
                            </p>
                        </motion.div>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default DimensionPortal
