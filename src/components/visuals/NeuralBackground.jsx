import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls, Stars } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

function ParticleNetwork({ particleCount = 200, connectionDistance = 1.6 }) {
    const group = useRef()

    // Generate random particles
    const particles = useMemo(() => {
        const data = new Float32Array(particleCount * 3)
        random.inSphere(data, { radius: 10 })
        return data
    }, [particleCount])

    // Store connections
    const [lines, setLines] = useState(new Float32Array(0))

    // Animation - Rotate the group slowly
    useFrame((state, delta) => {
        if (!group.current) return
        group.current.rotation.x -= delta / 30
        group.current.rotation.y -= delta / 35
    })

    // Pre-calculate connections
    useMemo(() => {
        const connections = []
        const pos = particles
        const distSq = connectionDistance * connectionDistance

        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const x1 = pos[i * 3], y1 = pos[i * 3 + 1], z1 = pos[i * 3 + 2]
                const x2 = pos[j * 3], y2 = pos[j * 3 + 1], z2 = pos[j * 3 + 2]

                const d = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2
                if (d < distSq) {
                    connections.push(x1, y1, z1)
                    connections.push(x2, y2, z2)
                }
            }
        }
        setLines(new Float32Array(connections))
    }, [particles, connectionDistance])

    return (
        <group ref={group}>
            {/* Particles */}
            <Points positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#D4AF37" // ORYN Gold
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>

            {/* Connections (LineSegments) */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={lines.length / 3}
                        array={lines}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#D4AF37" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </group>
    )
}

export default function NeuralBackground() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas camera={{ position: [0, 0, 14], fov: 25 }} dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
                {/* Environment */}
                <color attach="background" args={['#050505']} />

                {/* Deep Space Dust */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Core Neural Network */}
                <ParticleNetwork particleCount={220} connectionDistance={2.0} />

                {/* Ambient Fog for Depth */}
                <fog attach="fog" args={['#050505', 12, 30]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    rotateSpeed={0.5}
                    // autoRotate 
                    // autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            {/* Gradient Overlay to blend with page content */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </div>
    )
}
