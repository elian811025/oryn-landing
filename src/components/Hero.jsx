import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// --- Shared Components for Hero ---

const TechnicalGridBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* 1. Base Grid Layer */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    opacity: 0.4
                }}
            />

            {/* 2. Secondary Fine Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)`,
                    backgroundSize: '15px 15px',
                    opacity: 0.2
                }}
            />

            {/* 3. Radial Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>
    )
}

function NavDropdown({ label, items, isOpen, onToggle }) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-1 hover:text-white transition-colors text-sm font-mono tracking-wider"
            >
                {label}
                <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full left-0 mt-2 min-w-[180px] py-2 bg-[#0a0a0a] border border-white/20 shadow-xl"
                    >
                        {items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-xs font-mono"
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

function MobileMenu({ isOpen, onClose }) {
    const menuItems = [
        {
            section: '關於我們', items: [
                { label: '開發者介紹', href: '#about' },
                { label: '產品區', href: '#products' },
            ]
        },
        {
            section: '留言板', items: [
                { label: '來聊聊天 / 聽聽你的想法', href: '#messages' },
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
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.2 }}
                        className="absolute right-0 top-0 h-full w-80 bg-[#050505] border-l border-white/10 p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mt-16 space-y-10">
                            {menuItems.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    {group.section && (
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-mono">
                                            {group.section}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        {group.items.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose}
                                                className="block py-2 text-white/80 hover:text-white transition-colors font-light"
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

export function Hero() {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] })
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const aboutItems = [
        { label: '開發者介紹', href: '#about' },
        { label: '產品區', href: '#products' },
    ]

    const labItems = [
        { label: '來聊聊天 / 聽聽你的想法', href: '#messages' },
    ]

    const handleDropdownToggle = (name) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    const handleNavClick = () => {
        setOpenDropdown(null)
    }

    return (
        <div ref={scrollRef} className="min-h-screen relative overflow-hidden flex flex-col bg-[#050505]">
            <TechnicalGridBackground />

            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full border-b border-white/5">
                <motion.img
                    src="/logo.png" alt="Oryn" className="h-8 w-auto opacity-80"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 0.8, x: 0 }} transition={{ duration: 0.6 }}
                />

                <motion.div
                    className="hidden lg:flex items-center gap-12 text-white/60"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <NavDropdown
                        label="關於我們"
                        items={aboutItems}
                        isOpen={openDropdown === 'about'}
                        onToggle={() => handleDropdownToggle('about')}
                    />
                    <NavDropdown
                        label="留言板"
                        items={labItems}
                        isOpen={openDropdown === 'lab'}
                        onToggle={() => handleDropdownToggle('lab')}
                    />

                </motion.div>

                <button
                    className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Hero Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-8 text-center">
                <motion.div
                    className="max-w-4xl mx-auto"
                    style={{ opacity }}
                >
                    {/* System Badge */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-white/20 bg-white/5">
                            <span className="w-1.5 h-1.5 bg-emerald-500"></span>
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.2em] uppercase">
                                ORYN 核心系統 [ORYN_CORE]
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight text-white"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        複雜的問題，<br className="md:hidden" />
                        簡單的答案
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-sm md:text-base text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed font-mono"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        我用程式碼搭建穩定的系統，為你處理生活與工作中的難題<br />
                        不講空話，只提供真正能解決問題的實用工具
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <a href="#products" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300">
                            <span className="relative z-10 flex items-center gap-3">
                                瀏覽工具列表
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </a>
                    </motion.div>
                </motion.div>
            </main>

            {/* Bottom Tech Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute bottom-0 left-8 p-4 font-mono text-[10px] text-white/20 hidden md:block">
                SYS_VER: 2.0.4<br />
                LATENCY: 12ms
            </div>
        </div>
    )
}
