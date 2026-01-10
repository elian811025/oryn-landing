import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Hero() {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Hero Background with Dark Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/hero-bg.png)' }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-background/70" />
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
            {/* Subtle radial glow from center */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

            {/* Navigation */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <motion.img
                    src="/logo.png"
                    alt="Oryn"
                    className="h-10 w-auto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                />

                <div className="flex items-center gap-8">
                    <motion.div
                        className="hidden md:flex gap-8 text-text-secondary"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <a href="#products" className="hover:text-primary transition-colors duration-300">{t('nav.products')}</a>
                        <a href="#wishlist" className="hover:text-primary transition-colors duration-300">{t('nav.wishlist')}</a>
                    </motion.div>

                    {/* Language Switcher */}
                    <LanguageSwitcher />
                </div>
            </nav>

            {/* Hero Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-surface/50 backdrop-blur-md text-primary text-sm font-medium mb-8 border border-primary/20">
                            ✨ Oryn
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <span className="bg-gradient-to-r from-text-primary via-primary to-primary-light bg-clip-text text-transparent">
                            {t('hero.headline')}
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    >
                        {t('hero.subheadline')}
                    </motion.p>

                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.a
                            href="#join"
                            className="px-8 py-4 bg-primary text-background font-semibold rounded-xl hover:bg-primary-light transition-all duration-300 glow hover:glow-intense"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t('cta.button')}
                        </motion.a>
                    </motion.div>
                </div>
            </main>

            {/* Scroll Indicator */}
            <motion.div
                className="relative z-10 pb-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-1.5 h-3 rounded-full bg-primary" />
                </motion.div>
            </motion.div>
        </div>
    )
}
