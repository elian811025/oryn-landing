import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// Dropdown Menu Component
function NavDropdown({ label, items, isOpen, onToggle }) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
                {label}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 min-w-[180px] py-2 rounded-xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
                    >
                        {items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 text-[#A1A1AA] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors"
                                onClick={onToggle}
                            >
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Mobile Menu Component
function MobileMenu({ isOpen, onClose }) {
    const menuItems = [
        {
            section: '關於我們', items: [
                { label: '開發者介紹', href: '#about' },
                { label: '願望成真區', href: '#products' },
            ]
        },
        {
            section: '實驗室', items: [
                { label: '來聊聊天 / 聽聽你的想法', href: '#messages' },
                { label: '許願池', href: '#voting' },
                { label: '你的願望', href: '#wishlist' },
            ]
        },
        {
            section: null, items: [
                { label: '聊聊天', href: '#footer' },
            ]
        },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 lg:hidden"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="absolute right-0 top-0 h-full w-72 bg-[#0a0a0a] border-l border-white/10 p-6"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-[#A1A1AA] hover:text-[#D4AF37]"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Menu Content */}
                        <div className="mt-12 space-y-8">
                            {menuItems.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    {group.section && (
                                        <div className="text-xs uppercase tracking-wider text-[#D4AF37] mb-3 px-2">
                                            {group.section}
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        {group.items.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose}
                                                className="block px-2 py-3 text-[#EAEAEA] hover:text-[#D4AF37] transition-colors border-l-2 border-transparent hover:border-[#D4AF37] hover:pl-4"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Particle Canvas Component
const ParticleBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            const particleCount = Math.floor(window.innerWidth * 0.08) // Increased density to 8%
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5, // Larger particles (0.5 to 2.5) for visibility
                    vx: (Math.random() - 0.5) * 0.4, // Slightly faster
                    vy: (Math.random() - 0.5) * 0.4,
                    alpha: Math.random() * 0.8 + 0.2, // Higher starting opacity (0.2 to 1.0)
                    targetAlpha: Math.random() * 0.8 + 0.2,
                    fading: false
                })
            }
        }

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(p => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})` // Gold color
                ctx.fill()

                // Move
                p.x += p.vx
                p.y += p.vy

                // Wrap around
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                // Twinkle effect
                if (!p.fading) {
                    if (p.alpha < p.targetAlpha) p.alpha += 0.005
                    else {
                        p.fading = true
                        p.targetAlpha = Math.random() * 0.2
                    }
                } else {
                    if (p.alpha > p.targetAlpha) p.alpha -= 0.005
                    else {
                        p.fading = false
                        p.targetAlpha = Math.random() * 0.6 + 0.1
                    }
                }
            })

            animationFrameId = requestAnimationFrame(drawParticles)
        }

        resizeCanvas()
        createParticles()
        drawParticles()

        window.addEventListener('resize', () => {
            resizeCanvas()
            particles = [] // Reset particles on resize
            createParticles()
        })

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
}

export function Hero() {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const aboutItems = [
        { label: '開發者介紹', href: '#about' },
        { label: '願望成真區', href: '#products' },
    ]

    const labItems = [
        { label: '來聊聊天 / 聽聽你的想法', href: '#messages' },
        { label: '許願池', href: '#voting' },
        { label: '你的願望', href: '#wishlist' },
    ]

    const handleDropdownToggle = (name) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    // Close dropdowns when clicking outside
    const handleNavClick = () => {
        setOpenDropdown(null)
    }

    return (
        <div ref={scrollRef} className="min-h-screen relative overflow-hidden flex flex-col bg-[#050505]">
            {/* --- Advanced Background System --- */}

            {/* 1. Deep Space Base (Blackest Black) */}
            {/* 1. Deep Space Base (Blackest Black) */}
            <div className="absolute inset-0 bg-[#020202]">
                {/* Subtle Grid Pattern for Texture */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        opacity: [0.05, 0.12, 0.05],
                        backgroundPosition: ["0px 0px", "40px 40px"]
                    }}
                    transition={{
                        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    style={{
                        backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(to right, #D4AF37 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* 2. Elegant Golden Nebula Glows - INTENSIFIED */}
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#D4AF37]/10 blur-[100px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2], // Increased opacity
                    x: [0, 30, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-[#B8860B]/10 blur-[90px]"
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.35, 0.15], // Increased opacity
                    x: [0, -40, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* 3. Javascript Particle System (Performance Optimized Gold Dust) */}
            <ParticleBackground />

            {/* 4. Vignette for Focus */}
            {/* 4. Vignette for Focus - Tuned Down slighly to reveal bg */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />


            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <motion.img
                    src="/logo.png" alt="Oryn" className="h-10 w-auto"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                />

                {/* Desktop Navigation */}
                <motion.div
                    className="hidden lg:flex items-center gap-8 text-[#A1A1AA] font-medium"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* About Dropdown */}
                    <NavDropdown
                        label="關於我們"
                        items={aboutItems}
                        isOpen={openDropdown === 'about'}
                        onToggle={() => handleDropdownToggle('about')}
                    />

                    {/* Lab Dropdown */}
                    <NavDropdown
                        label="實驗室"
                        items={labItems}
                        isOpen={openDropdown === 'lab'}
                        onToggle={() => handleDropdownToggle('lab')}
                    />

                    {/* Standalone Link */}
                    <a
                        href="#footer"
                        className="hover:text-[#D4AF37] transition-colors"
                        onClick={handleNavClick}
                    >
                        心的願望
                    </a>
                </motion.div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-[#A1A1AA] hover:text-[#D4AF37] transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Hero Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-8 text-center">
                <motion.div
                    className="max-w-4xl mx-auto"
                    style={{ y, opacity }}
                >
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-block px-4 py-2 rounded-full bg-[#0a0a0a]/50 backdrop-blur-md text-[#D4AF37] text-sm font-medium mb-8 border border-[#D4AF37]/20 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)]">
                            ✨ Oryn 百寶袋
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-[#EAEAEA]"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        這裡有些好用的<span className="text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">神奇小工具</span><br />
                        幫你解決<span className="text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">討厭的麻煩事</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Oryn 每天都在進步 想要什麼新功能？直接告訴我，我把它做出來給你用！
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        <a href="#products" className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                進入實驗室
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}
