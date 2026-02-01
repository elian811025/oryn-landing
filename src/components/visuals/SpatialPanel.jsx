import React from 'react'
import { motion } from 'framer-motion'

export function SpatialPanel({ title, subtitle, icon, buttonText, buttonLink, color = "cyan" }) {

    // VisionOS Inspired Colors
    // Richer, thicker glass feel
    const theme = color === 'cyan' ? {
        border: "border-cyan-200/20",
        shadow: "shadow-[0_8px_32px_0_rgba(6,182,212,0.2)]",
        glow: "from-cyan-400/30 to-blue-400/30",
        text: "text-cyan-50",
        btnText: "text-cyan-950",
        btnBg: "bg-white/90 hover:bg-white",
        accent: "text-cyan-300"
    } : {
        border: "border-purple-200/20",
        shadow: "shadow-[0_8px_32px_0_rgba(168,85,247,0.2)]",
        glow: "from-purple-400/30 to-pink-400/30",
        text: "text-purple-50",
        btnText: "text-purple-950",
        btnBg: "bg-white/90 hover:bg-white",
        accent: "text-purple-300"
    }

    return (
        <motion.div
            className="relative group p-[1px] rounded-[32px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} // Apple-like spring
        >
            {/* 1. Reflective Border Layer (Animates on hover) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.border} via-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none`} />

            {/* 2. Main Glass Material */}
            <div className={`
                relative h-full
                bg-white/5 backdrop-blur-3xl saturate-150
                rounded-[31px]
                border border-white/10
                flex flex-col p-10
                ${theme.shadow}
                transition-all duration-500
            `}>
                {/* Inner Specular Highlight */}
                <div className="absolute inset-0 rounded-[31px] bg-gradient-to-b from-white/20 to-transparent opacity-40 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full items-center text-center">

                    {/* Icon Container with Volume */}
                    <motion.div
                        className={`
                            w-20 h-20 mb-8 
                            rounded-2xl 
                            bg-gradient-to-br ${theme.glow}
                            backdrop-blur-md 
                            border border-white/20
                            shadow-inner
                            flex items-center justify-center
                        `}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-4xl filter drop-shadow-md">{icon}</span>
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <div className="text-white/80 leading-relaxed mb-10 text-lg font-light tracking-wide w-full text-left">
                        {subtitle}
                    </div>

                    {/* Button - Pill Shape, Solid Contrast */}
                    <a
                        href={buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto"
                    >
                        <motion.button
                            className={`
                                px-8 py-4 
                                rounded-full 
                                ${theme.btnBg} 
                                ${theme.btnText}
                                font-bold text-sm tracking-widest uppercase
                                shadow-lg
                                transition-all duration-300
                            `}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -10px rgba(255,255,255,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {buttonText}
                        </motion.button>
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
