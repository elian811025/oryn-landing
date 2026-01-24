import { motion } from 'framer-motion'

// Slow underwater easeOut
const slowEase = [0, 0, 0.2, 1]

function InstagramIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    )
}

function TwitterIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

function LineIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
    )
}

function EmailIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    )
}

function ThreadsIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.15 2.5C6.918 2.5 2.664 6.754 2.664 11.986c0 5.23 4.254 9.486 9.486 9.486 2.38 0 4.572-.88 6.273-2.33l-1.397-1.428c-1.353 1.155-3.09 1.83-4.876 1.83-3.084 0-5.69-2.072-6.425-4.897h12.59c.142-.513.22-1.048.22-1.603 0-5.187-3.95-9.544-6.38-9.544zm0 2.058c3.55 0 6.31 3.23 6.31 7.486H5.84c.73-4.257 3.49-7.486 6.31-7.486z" />
            <path d="M12.72 17.5c-4.43 0-8.12-3.01-8.12-8.3C4.6 4.07 8.16 1 12.72 1c4.89 0 7.84 3.47 7.84 8.13 0 4.63-2.45 7.64-5.87 7.64-1.74 0-2.88-1.05-2.88-2.61h-.06c-.84 1.77-2.31 2.61-4.23 2.61-2.91 0-5.19-2.22-5.19-5.46 0-3.3 2.31-5.55 5.34-5.55 1.74 0 3.09.84 3.75 2.19h.06v-1.92h3.39v9.63c0 1.23.63 1.83 1.59 1.83.99 0 1.8-1.02 1.8-3.39 0-3.36-2.01-6.27-5.55-6.27-2.94 0-4.86 2.07-4.86 4.74 0 1.56.99 2.76 2.52 2.76.96 0 1.83-.51 2.28-1.44H13c-.63 1.89-2 2.94-3.57 2.94-2.19 0-3.69-1.68-3.69-3.99 0-2.4 1.74-4.05 3.96-4.05 1.47 0 2.58.78 3.12 1.95h.09V8.13h-3.39v.66c0 5.16 6.18 5.76 7.62 1.35.9-2.76-.09-5.64-4.74-5.64-4.14 0-7.23 3.06-7.23 7.56 0 4.38 3.09 7.47 7.59 7.47 2.22 0 4.17-.87 5.73-2.19l-1.35-1.5c-1.17 1.02-2.73 1.62-4.38 1.62z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
    )
}

export function Footer() {
    // Social links configuration
    const socialLinks = [
        {
            href: "https://line.me/ti/g2/AqkW48fj-3h8r6OtaOplbyt9TVOdXIkrCpH2cg?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
            label: "加入社群",
            Icon: LineIcon,
            highlight: true
        },
        {
            href: "https://www.instagram.com/oryn_saas?igsh=MTQyMXMwZnViMGk3eA==",
            label: "Instagram",
            Icon: InstagramIcon
        },
        {
            href: "https://www.threads.com/@oryn_saas",
            label: "Threads",
            Icon: ThreadsIcon
        },
        {
            href: "https://x.com/ORYN_tw",
            label: "Twitter",
            Icon: TwitterIcon
        },
    ]

    return (
        <motion.footer
            id="footer"
            className="py-16 px-8 bg-[#050505] border-t border-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: slowEase }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Social Links Grid - 5 Columns */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: slowEase }}
                >
                    {/* Social links (clickable) */}
                    {socialLinks.map(({ href, label, Icon, highlight }, index) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-xl
                                backdrop-blur-sm transition-all duration-300 relative group overflow-hidden
                                ${highlight
                                    ? 'bg-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                    : 'bg-white/5 border border-white/10 text-[#A1A1AA] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]'}
                            `}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2 + index * 0.1,
                                ease: slowEase
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Neon Flow Effect */}
                            <motion.div
                                className={`absolute inset-0 w-1/2 h-full opacity-0 group-hover:opacity-100 ${highlight ? 'bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'}`}
                                style={{ skewX: -20, filter: 'blur(10px)' }}
                                animate={{ x: ['-150%', '350%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Constant subtle flow for "Flamboyant" feel requested */}
                            <motion.div
                                className={`absolute inset-0 w-full h-full opacity-10 ${highlight ? 'bg-gradient-to-tr from-transparent via-[#D4AF37] to-transparent' : 'bg-gradient-to-tr from-transparent via-white to-transparent'}`}
                                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                                style={{ backgroundSize: '200% 200%' }}
                            />

                            <div className="relative z-10 flex flex-col items-center gap-3">
                                <Icon />
                                <span className="text-sm font-medium">{label}</span>
                            </div>
                        </motion.a>
                    ))}

                    {/* Email (static) */}
                    <motion.div
                        className="flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-xl bg-white/5 border border-white/10 text-[#A1A1AA] transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:text-[#D4AF37] hover:scale-105"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: slowEase
                        }}
                    >
                        <EmailIcon />
                        <span className="text-sm font-medium">Email</span>
                        <span className="text-[10px] sm:text-xs text-neutral-500 font-mono">oryn.tw@gmail.com</span>
                    </motion.div>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    className="text-center text-neutral-600 text-sm font-mono"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: slowEase }}
                >
                    © 2026 Oryn. 照亮未來。
                </motion.p>
            </div>
        </motion.footer>
    )
}
