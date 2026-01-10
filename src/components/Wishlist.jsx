import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

// API endpoint
const API_URL = 'https://script.google.com/macros/s/AKfycbx0iHPuV0RmRjvMBY9-E7GbymxRFSLaDVECkktA0sSQzAoIBh5acKeLsEn_G414b6Q5zw/exec'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

export function Wishlist() {
    const { t } = useTranslation()
    const [wish, setWish] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!wish.trim()) return

        setIsSubmitting(true)
        setError(null)

        try {
            // POST to Google Sheets API
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({ type: 'wishlist', content: wish.trim() }),
            })

            // Google Scripts with no-cors returns opaque response, 
            // so we assume success if no network error
            setIsSubmitted(true)
            console.log('Wishlist submitted:', wish)
        } catch (err) {
            console.error('Submission error:', err)
            setError('提交失敗，請稍後再試。')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="wishlist" className="wishlist-section">
            <motion.div
                className="wishlist-container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: slowEase }}
            >
                <motion.h2
                    className="wishlist-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                >
                    {t('wishlist.title')}
                </motion.h2>
                <motion.p
                    className="wishlist-description"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
                >
                    {t('wishlist.description')}
                </motion.p>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.form
                            key="form"
                            className="wishlist-form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: slowEase }}
                        >
                            <textarea
                                className="wishlist-textarea"
                                placeholder="告訴我們，您心目中的理想秩序是什麼樣子？..."
                                value={wish}
                                onChange={(e) => setWish(e.target.value)}
                                rows={4}
                                disabled={isSubmitting}
                            />
                            {error && (
                                <p className="wishlist-error">{error}</p>
                            )}
                            <motion.button
                                type="submit"
                                className="wishlist-submit-btn"
                                disabled={isSubmitting || !wish.trim()}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSubmitting ? (
                                    <span className="wishlist-loading">
                                        <span className="loading-dot" />
                                        <span className="loading-dot" />
                                        <span className="loading-dot" />
                                    </span>
                                ) : (
                                    '送出許願'
                                )}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            className="wishlist-success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: slowEase }}
                        >
                            <span className="success-icon">✨</span>
                            <p className="success-message">
                                收到您的訊號了。我們會將這份期待寫入 Oryn 的基因裡。
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}
