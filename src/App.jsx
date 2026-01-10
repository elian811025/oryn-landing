import { LanguageProvider } from './hooks/useTranslation'
import { Hero } from './components/Hero'
import { AboutMe } from './components/AboutMe'
import { ProductsSection } from './components/ProductsSection'
import { Wishlist } from './components/Wishlist'
import { CallToAction } from './components/CallToAction'
import { Footer } from './components/Footer'

function AppContent() {
    return (
        <div className="min-h-screen bg-background">
            <Hero />
            <AboutMe />
            <ProductsSection />
            <Wishlist />
            <CallToAction />
            <Footer />
        </div>
    )
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    )
}

export default App
