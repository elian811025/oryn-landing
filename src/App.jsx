import { Hero } from './components/Hero'
import { AboutMe } from './components/AboutMe'
import { EvolutionLab } from './components/EvolutionLab'
import { Footer } from './components/Footer'

function App() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <AboutMe />
            <EvolutionLab />
            <Footer />
        </div>
    )
}

export default App
