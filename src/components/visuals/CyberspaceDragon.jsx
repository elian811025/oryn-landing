import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Stars, Trail, Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3, CatmullRomCurve3 } from 'three'

// --- Thunder Lighting ---
function ThunderStorm() {
    const light = useRef()

    useFrame(({ clock }) => {
        if (!light.current) return
        const t = clock.getElapsedTime()

        // Random flashes
        if (Math.random() > 0.98) {
            light.current.intensity = 5 + Math.random() * 10
            light.current.position.x = (Math.random() - 0.5) * 20
        } else {
            light.current.intensity = THREE.MathUtils.lerp(light.current.intensity, 0, 0.1)
        }
    })

    return <pointLight ref={light} color="#4f46e5" distance={30} decay={2} />
}

// --- The Cyber Skeleton ---
function CyberSkeleton() {
    const { viewport } = useThree()
    const group = useRef()

    // 1. Create the Spine Path (Infinite Figure-8 or Sine Wave)
    const curve = useMemo(() => {
        // Points for a long winding path
        const points = []
        for (let i = 0; i < 20; i++) {
            points.push(new THREE.Vector3(
                Math.sin(i * 0.5) * 8,
                (i - 10) * 1, // Vertical span
                Math.cos(i * 0.5) * 5
            ))
        }
        return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
    }, [])

    const instances = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const count = 40 // Vertebrae count

    useFrame(({ clock, mouse }) => {
        if (!instances.current) return

        const t = clock.getElapsedTime() * 0.5

        // Animate the "Flow" along the curve
        // We sample points along the curve based on time
        for (let i = 0; i < count; i++) {
            // Calculate position on curve (0 to 1)
            // We shift the 'window' of the dragon along the curve over time
            // To make it look like it's swimming, the "t" offset moves.
            // But since the curve is static, we just move the sampling points?
            // Better: Animate the curve itself? No, too expensive.
            // Move sampling:

            const gap = 0.015 // Distance between bones
            const baseT = (t * 0.2) % 1 // Loop

            // Current position index implies offset
            // We want the head at 'current t', tail behind it.
            let curvePos = baseT - (i * gap)

            // Wrap around logic for infinite loop simulation would require a closed loop
            // For now, let's just use a Sine wave math instead of a restricted curve object for infinite flow
            // It's smoother.
        }

        // --- MATH BASED SPINE (Smoother than Spline sampling for infinite scroll) ---
        for (let i = 0; i < count; i++) {
            const indexOffset = i * 0.3
            const timeOffset = t * 2

            // Winding "Snake" Math
            // x = sin wave + large orbit
            const x = Math.sin(timeOffset - indexOffset) * 4 + Math.cos(timeOffset * 0.3) * 2
            const y = Math.cos(timeOffset - indexOffset) * 2 + Math.sin(timeOffset * 0.2) * 1.5 - 2 // Bias down slightly
            // z = depth modulation
            const z = Math.sin(timeOffset * 0.5 - indexOffset) * 3

            dummy.position.set(x, y, z)

            // Rotation: Look at next point?
            // Simple tangent approximation:
            const nextX = Math.sin(timeOffset - (indexOffset - 0.1)) * 4 + Math.cos(timeOffset * 0.3) * 2
            const nextY = Math.cos(timeOffset - (indexOffset - 0.1)) * 2
            const nextZ = Math.sin(timeOffset * 0.5 - (indexOffset - 0.1)) * 3
            dummy.lookAt(nextX, nextY, nextZ)

            // Scale: Taper towards tail (higher i)
            // Head (i=0) is biggest
            const scale = Math.max(0.2, (1 - i / count) * 1.2)
            dummy.scale.set(scale, scale, scale * 1.5) // Elongated

            dummy.updateMatrix()
            instances.current.setMatrixAt(i, dummy.matrix)
        }
        instances.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={instances} args={[null, null, count]}>
            {/* Geometric "Bone" Shape */}
            <octahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
                color="#111"
                emissive="#D4AF37"
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={1}
                wireframe={true} // Tech skeleton feel
            />
        </instancedMesh>
    )
}

function StormDebris() {
    const mesh = useRef()
    const count = 300
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 10,
            speed: Math.random() * 0.05,
            rot: Math.random() * 0.05
        }))
    }, [])

    useFrame(() => {
        if (!mesh.current) return

        particles.forEach((p, i) => {
            p.y += p.speed
            p.x += Math.sin(p.y) * 0.01

            if (p.y > 10) p.y = -10

            dummy.position.set(p.x, p.y, p.z)
            dummy.rotation.x += p.rot
            dummy.rotation.y += p.rot
            dummy.scale.set(0.1, 0.1, 0.1)

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#333" transparent opacity={0.4} />
        </instancedMesh>
    )
}

export default function CyberspaceDragon() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#020202']} />

                {/* Cinematic Storm Lighting */}
                <ambientLight intensity={0.1} />
                <ThunderStorm />
                <pointLight position={[10, 10, 10]} color="#D4AF37" intensity={2} />
                <spotLight position={[0, 0, 10]} angle={0.5} penumbra={1} intensity={1} color="#555" />

                {/* The Beast */}
                <CyberSkeleton />

                {/* The Storm */}
                <StormDebris />

                {/* Background Depth */}
                <Stars radius={60} depth={40} count={3000} factor={4} saturation={0} fade speed={2} />

                {/* Fog for Abyss */}
                <fog attach="fog" args={['#020202', 5, 25]} />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80 pointer-events-none" />
            {/* Scanline Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 opacity-20 pointer-events-none bg-[length:100%_4px,3px_100%]" />
        </div>
    )
}
