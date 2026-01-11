import { motion } from 'framer-motion'

export function Hero() {
    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Hero Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-bg.png)' }} />
            <div className="absolute inset-0 bg-background/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <motion.img
                    src="/logo.png" alt="Oryn" className="h-10 w-auto"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                />
                <div className="flex gap-8 text-text-secondary font-medium">
                    <a href="#about" className="hover:text-primary transition-colors">關於開發者</a>
                    <a href="#evolution" className="hover:text-primary transition-colors">進化實驗室</a>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-block px-4 py-2 rounded-full bg-surface/50 backdrop-blur-md text-primary text-sm font-medium mb-8 border border-primary/20">
                            ✨ Oryn 協議進化
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        在喧囂的世界裡<br />
                        為心靈築一座<span className="text-primary glow">安放的島嶼</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Oryn 是一個正在生長的有機體。<br />我們釋出了基因控制權，現在，由你決定它該長出什麼器官
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        <a href="#evolution" className="inline-block px-10 py-4 bg-primary text-background font-bold text-lg rounded-xl hover:bg-primary-light transition-all duration-300 glow hover:glow-intense transform hover:-translate-y-1">
                            進入實驗室 ⚡
                        </a>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
