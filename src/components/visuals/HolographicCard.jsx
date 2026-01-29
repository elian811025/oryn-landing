import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HolographicCard({ product, index }) {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        constrect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - constrect.left, y: e.clientY - constrect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative text-left h-full w-full overflow-hidden transition-all duration-300 group rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
        // Corner clip for tech feel (optional, using rounded-xl for now for cleaner glass look but adding tech borders)
        >
            {/* 1. Dynamic Spotlight Gradient */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.15), transparent 40%)`,
                }}
            />

            {/* 2. Border Gradient Follower (The shiny rim) */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212, 175, 55, 0.4), transparent 40%)`,
                    maskImage: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
                    maskComposite: "exclude",
                    padding: "1px", // The border width
                    borderRadius: "inherit"
                }}
            />

            {/* 3. Tech Decor Lines (HUD Elements) */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/30 group-hover:bg-[#D4AF37] transition-colors duration-500" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-white/30 group-hover:bg-[#D4AF37] transition-colors duration-500" />

            <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-white/30 group-hover:bg-[#D4AF37] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-white/30 group-hover:bg-[#D4AF37] transition-colors duration-500" />

            {/* Top right scanner marker */}
            <svg className="absolute top-4 right-4 text-white/10 w-6 h-6 group-hover:text-[#D4AF37]/50 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 7V3h-4M3 17v4h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


            {/* Content Layer */}
            <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-500">
                        <img src={product.logo} alt={product.title} className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100" />
                    </div>

                    <div className="text-right flex flex-col items-end">
                        <span className="font-mono text-[10px] text-[#D4AF37] border border-[#D4AF37]/30 px-1 py-0.5 rounded bg-[#D4AF37]/5 mb-1">
                            {product.status}
                        </span>
                        <span className="font-mono text-[9px] text-white/30">
                            VER: {product.version}
                        </span>
                    </div>
                </div>

                {/* Title Group */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.title}
                    </h3>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">
                        {product.titleEn}
                    </p>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-4 group-hover:border-[#D4AF37]/50 transition-colors">
                    {product.details}
                </p>

                {/* Action Area (Bottom) */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-[#D4AF37] transition-colors">
                // SYSTEM_READY
                    </span>

                    <a
                        href={product.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors"
                    >
                        {product.actionText}
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </div>

            {/* Background Grid Pattern (Subtle texture) */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />
        </motion.div>
    );
}
