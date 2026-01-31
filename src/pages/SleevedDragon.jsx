import { AboutMeV2 } from '../components/AboutMeV2'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function SleevedDragon() {
    return (
        <div className="min-h-screen bg-[#050505] relative">
            {/* Back Button */}
            <Link
                to="/"
                className="fixed top-6 left-6 z-50 group"
            >
                <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-lg">←</span>
                    <span className="text-sm font-mono tracking-wider">返回官網</span>
                </motion.div>
            </Link>

            {/* The Poem Section - Full Page */}
            <AboutMeV2 />
        </div>
    )
}

export default SleevedDragon
