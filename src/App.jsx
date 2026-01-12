import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ThesisFixer from './pages/ThesisFixer'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/thesis" element={<ThesisFixer />} />
            </Routes>
            {/* Vercel Tracking (Invisible to users) */}
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
