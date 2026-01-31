import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SleevedDragon from './pages/SleevedDragon'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sleeved-dragon" element={<SleevedDragon />} />
            </Routes>
            {/* Vercel Tracking (Invisible to users) */}
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App
