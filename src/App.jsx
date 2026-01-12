import { Hero } from './components/Hero'
import { AboutMe } from './components/AboutMe'
import { EvolutionLab } from './components/EvolutionLab'
import { Footer } from './components/Footer'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <AboutMe />
            <EvolutionLab />
            <Footer />
            {/* Vercel Tracking (Invisible to users) */}
            <Analytics />
            <SpeedInsights />
        </div>
    )
}

export default App
