import { createContext, useContext, useState, useCallback } from 'react'
import translations from '../i18n/translations.json'

// Create context for language state
const LanguageContext = createContext(null)

// Provider component
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en')

    const t = useCallback((key) => {
        // Support nested key lookup (e.g., "nav.products" or "products.deepflow.name")
        const langData = translations[language]
        if (!langData) return key

        const keys = key.split('.')
        let value = langData

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return key // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key
    }, [language])

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'en' ? 'zh' : 'en')
    }, [])

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

// Custom hook
export function useTranslation() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider')
    }

    return context
}
