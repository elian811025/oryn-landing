import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SleevedDragon from './pages/SleevedDragon'
import Recruitment from './pages/Recruitment'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sleeved-dragon" element={<SleevedDragon />} />
                <Route path="/recruitment" element={<Recruitment />} />
            </Routes>
            {/* Vercel Tracking (Invisible to users) */}
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
