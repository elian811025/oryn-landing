import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

// Social Icons as simple SVGs
function InstagramIcon() {
    return (
        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    )
}

function TwitterIcon() {
    return (
        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

function EmailIcon() {
    return (
        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    )
}

export function Footer() {
    const { t } = useTranslation()

    // Clickable social links
    const socialLinks = [
        { href: "https://www.instagram.com/oryn.tw?igsh=Ym42bW1nZXoyY2Ny", label: t('footer.instagram'), Icon: InstagramIcon },
        { href: "https://x.com/ORYN_tw", label: t('footer.twitter'), Icon: TwitterIcon },
    ]

    return (
        <motion.footer
            className="footer-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: slowEase }}
        >
            <div className="footer-container">
                <motion.div
                    className="social-links-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                >
                    {/* Social links (clickable) */}
                    {socialLinks.map(({ href, label, Icon }, index) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link-item"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2 + index * 0.1,
                                ease: slowEase
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="social-icon-wrapper">
                                <Icon />
                            </span>
                            <span className="social-label">{label}</span>
                        </motion.a>
                    ))}

                    {/* Email (static text, not clickable) */}
                    <motion.div
                        className="social-link-item social-link-static"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: slowEase
                        }}
                    >
                        <span className="social-icon-wrapper">
                            <EmailIcon />
                        </span>
                        <span className="social-label">{t('footer.email')}</span>
                        <span className="email-address">oryn.tw@gmail.com</span>
                    </motion.div>
                </motion.div>
                <motion.p
                    className="footer-copyright"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: slowEase }}
                >
                    {t('footer.copyright')}
                </motion.p>
            </div>
        </motion.footer>
    )
}
