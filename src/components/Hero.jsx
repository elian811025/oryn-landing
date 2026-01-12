import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
                { label: '已完成產品', href: '#products' },
            ]
        },
        {
            section: '實驗室', items: [
                { label: '互動中心', href: '#messages' },
                { label: '排行榜', href: '#voting' },
                { label: '許願區', href: '#wishlist' },
            ]
        },
        {
            section: null, items: [
                { label: '社群', href: '#footer' },
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

export function Hero() {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const aboutItems = [
        { label: '開發者介紹', href: '#about' },
        { label: '已完成產品', href: '#products' },
    ]

    const labItems = [
        { label: '互動中心', href: '#messages' },
        { label: '排行榜', href: '#voting' },
        { label: '許願區', href: '#wishlist' },
    ]

    const handleDropdownToggle = (name) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    // Close dropdowns when clicking outside
    const handleNavClick = () => {
        setOpenDropdown(null)
    }

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#050505]">
            {/* Hero Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: 'url(/hero-bg.png)' }} />
            <div className="absolute inset-0 bg-[#000000]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />

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
                        社群
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
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="inline-block px-4 py-2 rounded-full bg-[#0a0a0a] backdrop-blur-md text-[#D4AF37] text-sm font-medium mb-8 border border-[#D4AF37]/20">
                            ✨ Oryn 協議進化
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-[#EAEAEA]"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        在喧囂的世界裡<br />
                        為心靈築一座<span className="text-[#D4AF37]">安放的島嶼</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Oryn 是一個正在生長的有機體。<br />我們釋出了基因控制權，現在，由你決定它該長出什麼器官
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        <a href="#products" className="inline-block px-10 py-4 bg-[#D4AF37] text-black font-bold text-lg rounded-xl hover:bg-[#B8860B] transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/20 transform hover:-translate-y-1">
                            進入實驗室
                        </a>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
