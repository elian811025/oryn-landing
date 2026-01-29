import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Cloud, Float } from '@react-three/drei'
import * as THREE from 'three'

// --- Rotating Nebula Cluster ---
function NebulaCluster() {
    return (
        <group>
            {/* Deep Purple Core */}
            <Cloud
                opacity={0.3}
                speed={0.2} // Rotation speed
                width={20}
                depth={5}
                segments={10}
                texture="/clouds.png" // Drei uses procedural texture if missing, or we rely on default
                color="#2a0a4e"
                position={[0, 0, -10]}
            />
            {/* Gold Highlights */}
            <Cloud
                opacity={0.1}
                speed={0.3}
                width={15}
                depth={2}
                segments={5}
                color="#D4AF37"
                position={[5, 2, -8]}
            />
            {/* Cyan Drift */}
            <Cloud
                opacity={0.1}
                speed={0.1}
                width={15}
                depth={2}
                segments={5}
                color="#00bcd4"
                position={[-5, -2, -8]}
            />
        </group>
    )
}

function MovingStars() {
    const ref = useRef()
    useFrame((state) => {
        if (ref.current) {
            // Slow constant rotation
            ref.current.rotation.y += 0.0003
            ref.current.rotation.x += 0.0001

            // Mouse interaction (Parallax)
            const mx = state.mouse.x * 0.1
            const my = state.mouse.y * 0.1
            ref.current.rotation.y += (mx - ref.current.rotation.y) * 0.05
            ref.current.rotation.x += (my - ref.current.rotation.x) * 0.05
        }
    })
    return (
        <group ref={ref}>
            {/* Background Stardust (Dense, Far) */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

            {/* Mid-range Gold Dust (Sparkles) */}
            <Sparkles
                count={500}
                track={false} // Don't track camera, just rotate with group 
                scale={20}
                size={2}
                speed={0.5}
                opacity={0.8}
                color="#D4AF37"
            />

            {/* Active Floating Particles (Close, Large) */}
            <Sparkles
                count={50}
                track={false}
                scale={15}
                size={6}
                speed={1}
                opacity={0.6}
                color="#ffffff"
            />
        </group>
    )
}

export default function CosmicOcean() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#000000']} />

                {/* Cinematic Lighting */}
                <ambientLight intensity={0.2} />
                {/* A warm star stimulating simple GI */}
                <pointLight position={[10, 10, -5]} color="#D4AF37" intensity={2} distance={30} />

                {/* The Universe */}
                <MovingStars />
                <NebulaCluster />

            </Canvas>

            {/* Overlays for depth and blending */}
            {/* Top/Bottom Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 pointer-events-none" />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-60 pointer-events-none" />
        </div>
    )
}
