import { Hero } from '../components/Hero'
import { MessageBoard } from '../components/MessageBoard'
import { AboutMeV2 } from '../components/AboutMeV2'
import { EvolutionLab } from '../components/EvolutionLab'
import { Footer } from '../components/Footer'

function Home() {
    return (
        <div className="min-h-screen bg-[#050505]">
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Message Board (互動中心) */}
            <MessageBoard />

            {/* 3. Developer Intro (開發者介紹) */}
            <AboutMeV2 />

            {/* 4. Released Products (已完成產品) */}
            <EvolutionLab />

            {/* 5. Socials & Footer */}
            <Footer />
        </div>
    )
}

export default Home
