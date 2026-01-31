import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function SpiralGalaxy() {
    const points = useRef()

    // Generate Spiral Galaxy Particles
    const particleCount = 800
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount; i++) {
            // Golden Angle Spiral
            const angle = i * 0.5
            const radius = 5 + (i * 0.05) // Spiral out

            // Add some randomness/arms
            const armOffset = (i % 3) * (Math.PI * 2 / 3)
            const randomSpread = (Math.random() - 0.5) * 2.0

            const x = Math.cos(angle + armOffset) * radius + randomSpread
            const z = Math.sin(angle + armOffset) * radius + randomSpread
            const y = (Math.random() - 0.5) * (Math.max(5 - radius * 0.1, 0.5)) // Thicker at center

            pos[i * 3] = x
            pos[i * 3 + 1] = y * 0.5 // Flattened disk
            pos[i * 3 + 2] = z
        }
        return pos
    }, [])

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y += 0.001 // Slow rotation
            points.current.rotation.z = 0.1 // Slight tilt
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#D4AF37" // Gold
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default function FooterGalaxy() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
            <Canvas camera={{ position: [0, 15, 0], fov: 60 }} dpr={1} gl={{ alpha: true, powerPreference: 'high-performance' }}>
                {/* Downward looking camera at the spiral */}
                <SpiralGalaxy />
                <Stars radius={50} depth={20} count={400} factor={3} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    )
}
