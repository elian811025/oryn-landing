import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function DimensionPortal() {
    return (
        <section className="relative py-20 px-4 bg-[#050505] border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                {/* Title */}
                <motion.h2
                    className="text-2xl md:text-3xl font-calligraphy text-white/80 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    探索創作者的內心世界
                </motion.h2>

                {/* Portal Link */}
                <Link to="/sleeved-dragon" className="inline-block group">
                    <motion.div
                        className="relative w-48 h-48 md:w-56 md:h-56 mx-auto cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Outer Glow */}
                        <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" />

                        {/* Spinning Rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '15s' }} />
                        <div className="absolute inset-4 rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
                        <div className="absolute inset-8 rounded-full border border-amber-400/30 animate-spin" style={{ animationDuration: '8s' }} />

                        {/* Portal Core */}
                        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden">
                            {/* Swirling Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/40 via-transparent to-cyan-600/30 animate-spin" style={{ animationDuration: '6s' }} />
                            <div className="absolute inset-0 bg-gradient-to-bl from-amber-600/20 via-transparent to-purple-600/30 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

                            {/* Center Glow */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-md animate-pulse" />
                            </div>
                        </div>

                        {/* Floating Particles */}
                        <div className="absolute top-4 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ animationDuration: '2s' }} />
                        <div className="absolute bottom-8 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(192,132,252,0.8)]" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                        <div className="absolute top-1/3 right-4 w-1 h-1 bg-amber-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(251,191,36,0.8)]" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                    </motion.div>

                    {/* Portal Label */}
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl font-calligraphy text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-amber-400 transition-all duration-500">
                            《袖隱蒼龍》
                        </p>
                        <p className="mt-2 text-sm text-white/40 group-hover:text-white/60 transition-colors font-mono tracking-wider">
                            點擊進入 →
                        </p>
                    </motion.div>
                </Link>
            </div>
        </section>
    )
}

export default DimensionPortal
