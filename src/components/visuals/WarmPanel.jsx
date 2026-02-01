import React from 'react'
import { motion } from 'framer-motion'

export function WarmPanel({ title, subtitle, icon, buttonText, buttonLink }) {

    // "Quiet Luxury" Theme
    // Warm, sophisticated, tactile
    const theme = {
        // Base: High transparency white + blur
        bg: "bg-white/60 backdrop-blur-xl",
        // Border: Very faint warm grey
        border: "border-[#E5E0D8]",
        // Shadow: Soft, diffused warm shadow
        shadow: "shadow-[0_20px_40px_-5px_rgba(100,90,80,0.05)]",
        // Typography
        title: "text-[#3C3836]", // Warm Charcoal
        body: "text-[#5F5B56]",  // Warm Taupe
        accent: "text-[#A67B5B]", // Clay (for bold parts)
        // Button
        btnBg: "bg-[#3C3836] hover:bg-[#2A2726]",
        btnText: "text-[#FDFCF8]",
        btnRing: "ring-[#E5E0D8]"
    }

    return (
        <motion.div
            className={`
                relative group 
                rounded-[24px] 
                ${theme.bg}
                border border-[#E5E0D8]/50 
                ${theme.shadow}
                overflow-hidden
                transition-all duration-700
            `}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: "0 30px 60px -10px rgba(100,90,80,0.1)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Paper Texture Overlay (Optional, for feel) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full items-center text-center">

                {/* Icon Container - Minimalist */}
                <motion.div
                    className="
                        w-12 h-12 mb-4 
                        flex items-center justify-center
                        opacity-80
                    "
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    {/* Render Icon with Dark Ink Color */}
                    {React.cloneElement(icon, { color: "#3C3836" })}
                </motion.div>

                {/* Title */}
                <h2 className={`text-2xl md:text-3xl font-bold ${theme.title} mb-4 tracking-tight font-sans`}>
                    {title}
                </h2>

                {/* Subtitle */}
                <div className={`leading-relaxed mb-6 text-base md:text-lg font-normal ${theme.body} w-full text-left font-sans`}>
                    {subtitle}
                </div>

                {/* Button - Understated Luxury */}
                <a
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                >
                    <motion.button
                        className={`
                            px-6 py-3
                            rounded-md 
                            ${theme.btnBg} 
                            ${theme.btnText}
                            font-medium text-sm tracking-[0.15em] uppercase
                            shadow-sm
                            border border-transparent
                            hover:shadow-md
                            transition-all duration-300
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {buttonText}
                    </motion.button>
                </a>
            </div>
        </motion.div>
    )
}
