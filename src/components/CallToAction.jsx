import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

// API endpoint
const API_URL = 'https://script.google.com/macros/s/AKfycbx0iHPuV0RmRjvMBY9-E7GbymxRFSLaDVECkktA0sSQzAoIBh5acKeLsEn_G414b6Q5zw/exec'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

export function CallToAction() {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email.trim()) return

        setIsSubmitting(true)
        setError(null)

        try {
            // POST to Google Sheets API
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ type: 'email', content: email.trim() }),
            })

            // Google Scripts with no-cors returns opaque response,
            // so we assume success if no network error
            setIsSubmitted(true)
            console.log('Email submitted:', email)
        } catch (err) {
            console.error('Submission error:', err)
            setError('提交失敗，請稍後再試。')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="join" className="cta-section">
            <motion.div
                className="cta-container"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: slowEase }}
            >
                <motion.h2
                    className="cta-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                >
                    {t('cta.title')}
                </motion.h2>
                <motion.p
                    className="cta-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
                >
                    {t('cta.description')}
                </motion.p>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.form
                            key="form"
                            className="cta-form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: slowEase }}
                        >
                            <input
                                type="email"
                                className="cta-input"
                                placeholder={t('cta.placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                required
                            />
                            {error && (
                                <p className="cta-error">{error}</p>
                            )}
                            <motion.button
                                type="submit"
                                className="cta-button"
                                disabled={isSubmitting || !email.trim()}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSubmitting ? (
                                    <span className="cta-loading">
                                        <span className="loading-dot" />
                                        <span className="loading-dot" />
                                        <span className="loading-dot" />
                                    </span>
                                ) : (
                                    t('cta.button')
                                )}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            className="cta-success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: slowEase }}
                        >
                            <span className="success-icon">✨</span>
                            <p className="success-message">
                                歡迎加入靜謐名單。當我們準備好了，將與您聯繫。
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}
