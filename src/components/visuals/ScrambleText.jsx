import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Glyph set for decoding effect (mix of katakana, tech symbols, numbers)
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789!@#$%^&*()_+'

export function ScrambleText({ children, className, delay = 0 }) {
    const [text, setText] = useState(children)
    const [isScrambling, setIsScrambling] = useState(false)
    const originalText = children

    // Scramble Logic
    const scramble = () => {
        let iteration = 0
        // Initial speed
        const interval = setInterval(() => {
            setText(
                originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index] // Return original char if resolved
                        }
                        // Random glyph
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                    })
                    .join("")
            )

            if (iteration >= originalText.length) {
                clearInterval(interval)
            }

            // Resolution speed
            iteration += 1 / 3
        }, 30) // Update every 30ms
    }

    // Effect on mount (Initial Decode)
    useEffect(() => {
        const timeout = setTimeout(() => {
            scramble()
        }, delay * 1000)
        return () => clearTimeout(timeout)
    }, [delay])

    const handleMouseEnter = () => {
        let iteration = 0
        const interval = setInterval(() => {
            setText(prev =>
                prev.split("").map((_, i) => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("")
            )
            iteration++
            if (iteration > 10) clearInterval(interval)
        }, 50)

        // Auto resolve after short burst
        setTimeout(() => scramble(), 500)
    }

    return (
        <motion.span
            className={`${className} inline-block cursor-pointer select-none`}
            onMouseEnter={handleMouseEnter}
            onHoverStart={handleMouseEnter} // Framer hook
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            {text}
        </motion.span>
    )
}
