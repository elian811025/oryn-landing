import { Hero } from '../components/Hero'
import { MessageBoard } from '../components/MessageBoard'
import { AboutMe } from '../components/AboutMe'
import { EvolutionLab } from '../components/EvolutionLab'
import { VotingSection } from '../components/VotingSection'
import { Footer } from '../components/Footer'

function Home() {
    return (
        <div className="min-h-screen bg-[#050505]">
            {/* 1. Hero Section */}
            <Hero />

            {/* 2. Message Board (互動中心) */}
            <MessageBoard />

            {/* 3. Developer Intro (開發者介紹) */}
            <AboutMe />

            {/* 4. Released Products (已完成產品) */}
            <EvolutionLab />

            {/* 5. Voting & Leaderboard (許願排行榜) */}
            <VotingSection />

            {/* 6. Wishlist is now part of VotingSection */}

            {/* 7. Socials & Footer */}
            <Footer />
        </div>
    )
}

export default Home
