import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

export function AboutMe() {
    const { t } = useTranslation()

    // Split the body text by newlines for multi-paragraph rendering
    const bodyText = t('about.body')
    const paragraphs = bodyText.split('\n').filter(p => p.trim() !== '')

    return (
        <section className="about-section">
            <motion.div
                className="about-container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: slowEase }}
            >
                <motion.h2
                    className="about-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                >
                    {t('about.title')}
                </motion.h2>
                <motion.div
                    className="about-body"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.25, ease: slowEase }}
                >
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="about-paragraph">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}
