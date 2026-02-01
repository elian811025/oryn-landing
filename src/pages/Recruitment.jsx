import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
// import { Canvas } from '@react-three/fiber' // Removed R3F for "Quiet Luxury" pure CSS feel
import { WarmPanel } from '../components/visuals/WarmPanel'
import { IconEngineer, IconPartner } from '../components/visuals/RecruitmentIcons'

function Recruitment() {
    return (
        <div className="min-h-screen relative overflow-hidden font-sans bg-[#FDFCF8]">

            {/* Inject Google Fonts for "Quiet Luxury" Typography */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@400;700&display=swap');
                .font-serif-tc { font-family: 'Noto Serif TC', serif; }
                .font-sans-tc { font-family: 'Noto Sans TC', sans-serif; }
            `}</style>

            {/* 1. Minimalist Background (Warm Paper) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle Grain */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Soft Gradient Light Leak (Top Left) */}
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-amber-100/30 rounded-full blur-[120px]" />

                {/* Soft Gradient Light Leak (Bottom Right) */}
                <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-stone-100/40 rounded-full blur-[120px]" />
            </div>

            {/* Floating Navigation */}
            <nav className="fixed top-0 left-0 right-0 p-8 z-50 flex justify-between items-start">
                {/* Back Button - Minimalist Dark */}
                <Link to="/">
                    <motion.div
                        className="
                            flex items-center gap-3 px-6 py-3 
                            bg-white/50 backdrop-blur-md border border-[#E5E0D8] rounded-full 
                            text-[#3C3836] hover:bg-white/80 transition-all cursor-pointer shadow-sm
                        "
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-xl">←</span>
                        <span className="text-base font-medium tracking-wide font-sans-tc">返回首頁</span>
                    </motion.div>
                </Link>

                {/* Brand Mark - Modern Editorial */}
                <div className="hidden md:block text-[#A67B5B] font-serif-tc font-bold tracking-widest text-sm uppercase">
                    ORYN &middot; EST. 2026
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-6 pt-24 md:p-12 md:pt-28">

                {/* Hero Text - Editorial Style */}
                <motion.div
                    className="text-center mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#3C3836] mb-4 tracking-tight font-sans-tc">
                        <span className="text-[#A67B5B]">建構</span> · 願景
                    </h1>
                    <p className="text-[#5F5B56] text-lg md:text-xl font-normal tracking-wide max-w-3xl mx-auto font-sans-tc leading-relaxed">
                        "加入 ORYN。理性與直覺的交會處。"
                    </p>
                </motion.div>

                {/* Warm Panels Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-[1400px] w-full">

                    {/* Panel A - Engineer */}
                    <WarmPanel
                        icon={<IconEngineer />}
                        title="後端系統維護"
                        subtitle={
                            <div className="flex flex-col gap-8 font-sans-tc">
                                <p className="leading-loose">
                                    我擅長 0 到 1 的極速開發與原型驗證，但我需要一位追求極致穩定的夥伴。 如果你對於重構代碼、優化系統效能、建立自動化流程有獨到的執著，且能讀懂高密度邏輯，請來接手這個已驗證的系統。
                                </p>
                                <p className="text-center font-bold text-[#A67B5B] text-base md:text-lg mt-2 font-sans-tc">
                                    這不是教學場，我們需要即戰力。
                                </p>
                            </div>
                        }
                        buttonText="申請代碼審查"
                        buttonLink="https://line.me/ti/p/KQtP1DrhGy"
                    />

                    {/* Panel B - Partner */}
                    <WarmPanel
                        icon={<IconPartner />}
                        title="共同創辦人"
                        subtitle={
                            <div className="flex flex-col gap-8 font-sans-tc">
                                <p className="leading-loose">
                                    武器庫已經備妥。 我手上有 4 個完成度極高、且具備市場潛力的 MVP (包含 ORYN 系列)，專注於產品研發是我的核心優勢。 我正在尋找一位能操盤市場、制定定價策略、且有實戰變現能力的夥伴。
                                </p>
                                <p className="text-center font-bold text-[#A67B5B] text-base md:text-lg mt-2 font-sans-tc">
                                    我不談空想，如果你有戰績，我們直接談利潤分配。
                                </p>
                            </div>
                        }
                        buttonText="洽談商業合作"
                        buttonLink="https://line.me/ti/p/KQtP1DrhGy"
                    />

                </div>

                {/* Footer Note */}
                <div className="mt-8 md:mt-12 text-[#5F5B56]/40 text-sm font-sans-tc tracking-widest uppercase">
                    Designed for Excellence
                </div>

            </div>
        </div>
    )
}

export default Recruitment
