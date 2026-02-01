import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Float, Stars } from '@react-three/drei'
import { CinematicCore } from './CinematicCore'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

function SceneContent() {
    const scroll = useScroll()
    const coreRef = useRef()
    const state = useThree()

    useFrame((state, delta) => {
        // Core Animation based on Scroll
        // 0: Intro (Center)
        // 0.5: Engineer (Left)
        // 1.0: Partner (Right)

        const r1 = scroll.range(0, 1 / 3)
        const r2 = scroll.range(1 / 3, 1 / 3)
        const r3 = scroll.range(2 / 3, 1 / 3)

        // Position Logic: Interpolate based on scroll offset
        // Intro: [0, 0, 0]
        // Engineer: [2, 0, -2] (Shift Right to make room for Left text)
        // Partner: [-2, 0, -2] (Shift Left to make room for Right text)

        const scrollOffset = scroll.offset // 0 to 1

        let targetPos = [0, 0, 0]
        if (scrollOffset < 0.5) {
            // Intro to Engineer
            const t = scrollOffset * 2 // 0 to 1
            targetPos = [THREE.MathUtils.lerp(0, 3, t), 0, THREE.MathUtils.lerp(0, -2, t)]
        } else {
            // Engineer to Partner
            const t = (scrollOffset - 0.5) * 2 // 0 to 1
            targetPos = [THREE.MathUtils.lerp(3, -3, t), 0, -2]
        }

        // Smooth Camera/Object movement
        // Actually moving the object is easier than moving camera for this simple scene
        if (coreRef.current) {
            // Smoothly damp position
            coreRef.current.position.lerp(new THREE.Vector3(...targetPos), delta * 2)

            // Rotation speed increases with scroll
            coreRef.current.rotation.x = scrollOffset * Math.PI
            coreRef.current.rotation.z = scrollOffset * Math.PI * 0.5
        }

        // Dynamic Lighting Color Shift
        // Intro: Blue/Black
        // Eng: Cyan
        // Partner: Purple
    })

    return (
        <group ref={coreRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
                <CinematicCore />
            </Float>
            <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" distance={20} />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" distance={20} />
        </group>
    )
}

export default function CinematicConqueror() {
    return (
        <div className="h-screen w-full bg-[#030305]">
            <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
                <color attach="background" args={['#030305']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.1} />

                <ScrollControls pages={3} damping={0.2}>
                    <SceneContent />

                    {/* HTML Overlay Content */}
                    <Scroll html style={{ width: '100%' }}>

                        {/* 1. HERO SECTION */}
                        <section className="h-screen flex flex-col items-center justify-center relative pointer-events-none">
                            <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white mix-blend-difference z-10 opacity-90">
                                ORYN
                            </h1>
                            <div className="text-xl md:text-2xl font-mono tracking-[1em] text-cyan-500 mt-8 uppercase z-10">
                                Recruitment
                            </div>
                            <div className="absolute bottom-10 animate-bounce text-white/30 font-mono text-xs">
                                SCROLL TO INITIATE
                            </div>
                        </section>

                        {/* 2. ENGINEER SECTION (Left aligned text) */}
                        <section className="h-screen flex items-center px-10 md:px-20 relative">
                            <div className="max-w-xl text-left pointer-events-auto">
                                <div className="text-cyan-500 font-mono text-xs tracking-widest mb-4">
                                    // 01_MAINTENANCE_PROTOCOL
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9]">
                                    CODE<br />ARCHITECT
                                </h2>
                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
                                    我不需要重複造輪子的人。我需要能讀懂複雜架構、追求極致穩定的守護者。
                                    <br /><br />
                                    <span className="text-white/40">如果你是純粹的構建者，請繼續前行。</span>
                                </p>
                                <a
                                    href="https://line.me/ti/p/KQtP1DrhGy"
                                    target="_blank"
                                    className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-cyan-400 transition-colors"
                                >
                                    <span>APPLY_NOW</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </section>

                        {/* 3. PARTNER SECTION (Right aligned text) */}
                        <section className="h-screen flex items-center justify-end px-10 md:px-20 relative">
                            <div className="max-w-xl text-right pointer-events-auto flex flex-col items-end">
                                <div className="text-purple-500 font-mono text-xs tracking-widest mb-4">
                                    // 02_BUSINESS_EXPANSION
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9]">
                                    EMPIRE<br />BUILDER
                                </h2>
                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
                                    產品已經就緒。現在需要的是能將它推向世界的野心家。拿結果來說話，利潤你來定。
                                    <br /><br />
                                    <span className="text-white/40">我們不需要員工，我們尋找統治者。</span>
                                </p>
                                <a
                                    href="https://line.me/ti/p/KQtP1DrhGy"
                                    target="_blank"
                                    className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-purple-400 transition-colors"
                                >
                                    <span>←</span>
                                    <span>CONTACT_CEO</span>
                                </a>
                            </div>
                        </section>

                    </Scroll>
                </ScrollControls>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.5} intensity={1.5} mipmapBlur />
                    <Noise opacity={0.1} />
                    <Vignette eskil={false} offset={0.1} darkness={1.0} />
                    <ChromaticAberration offset={[0.001, 0.001]} />
                </EffectComposer>
            </Canvas>

            {/* Fixed Overlay UI (Back Button, etc) */}
            <div className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-auto">
                <a href="/" className="text-white font-mono text-sm tracking-widest hover:underline decoration-cyan-500 underline-offset-4">
                    ← RETURN_TO_BASE
                </a>
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 z-50 mix-blend-difference">
                {/* This would need state from scroll to animate, skipping for minimalism */}
                <div className="absolute top-0 w-[3px] -left-[1px] h-full bg-cyan-500/50" />
            </div>
        </div>
    )
}
