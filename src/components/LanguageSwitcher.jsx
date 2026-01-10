import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

export function LanguageSwitcher() {
    const { language, toggleLanguage } = useTranslation()

    return (
        <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-md border border-primary/20 hover:border-primary/50 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className={`text-sm font-medium transition-colors duration-200 ${language === 'en' ? 'text-primary' : 'text-text-secondary'}`}>
                EN
            </span>
            <span className="text-text-muted">/</span>
            <span className={`text-sm font-medium transition-colors duration-200 ${language === 'zh' ? 'text-primary' : 'text-text-secondary'}`}>
                中
            </span>
        </motion.button>
    )
}
