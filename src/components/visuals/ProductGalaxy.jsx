import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Text, Float, OrbitControls, Stars, Trail, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'

// --- Planet Shader Definition ---
const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float seed;
    varying vec2 vUv;
    varying vec3 vNormal;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898 + seed, 78.233 + seed))) * 43758.5453123);
    }

    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        // Fresnel
        float viewAngle = dot(vNormal, vec3(0.0, 0.0, 1.0)); // Simple view vector approx
        float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0); 
        rim = pow(rim, 3.0);

        // Turbulent texture with seed
        float n = noise(vUv * 10.0 + time * 0.1 + seed);
        float n2 = noise(vUv * 20.0 - time * 0.05 + seed * 2.0);
        
        vec3 color = mix(colorA, colorB, n * 0.5 + n2 * 0.5);
        color += vec3(0.8, 0.9, 1.0) * rim * 1.5;

        gl_FragColor = vec4(color, 1.0);
    }
`

function PlanetNode({ product, index, total }) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    // --- Golden Spiral Layout ---
    const phi = (Math.sqrt(5) + 1) / 2
    const goldenAngle = (2 - phi) * (2 * Math.PI)

    // Adjusted spread for better 3D look
    const spiralRadius = 24
    const density = 0.9

    const r = Math.sqrt(index + 3) * 6 * density
    const theta = index * goldenAngle

    const x = r * Math.cos(theta)
    const z = r * Math.sin(theta)
    const y = (Math.random() - 0.5) * 8 // Increased vertical spread for more 3D volume

    const initialPos = useMemo(() => new THREE.Vector3(x, y, z), [x, y, z])

    // Unique random seed for texture variety
    const seed = useMemo(() => Math.random() * 100, [])

    const colors = useMemo(() => {
        switch (product.status) {
            case 'LATEST': return { a: '#D4AF37', b: '#8a6e18' } // Gold
            case 'DEV': return { a: '#34d399', b: '#065f46' } // Emerald
            case 'STABLE': return { a: '#60a5fa', b: '#1e3a8a' } // Blue
            case 'LEGACY': return { a: '#9ca3af', b: '#4b5563' } // Gray
            default: return { a: '#ffffff', b: '#888888' }
        }
    }, [product.status])

    // Create unique material uniforms per instance to prevent color bleeding
    const uniforms = useMemo(() => ({
        time: { value: 0 },
        colorA: { value: new THREE.Color(colors.a) },
        colorB: { value: new THREE.Color(colors.b) },
        seed: { value: seed }
    }), [colors, seed])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005 + (index * 0.0001)

            // Update uniforms
            meshRef.current.material.uniforms.time.value = t

            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(2.0, 2.0, 2.0), 0.1)
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
            }
        }
    })

    return (
        <group position={initialPos}>
            {/* Guide Line Removed as per user request */}

            <Trail width={0.5} length={4} color={colors.a} attenuation={(t) => t * t}>
                {/* Trail attached to the moving planet group */}
            </Trail>

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
                    onClick={() => window.open(product.externalLink, '_blank')}
                >
                    <sphereGeometry args={[2, 64, 64]} />
                    <shaderMaterial
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={uniforms}
                        transparent
                    />
                </mesh>
            </Float>

            {/* Orbit Ring */}
            {product.status === 'LATEST' && (
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                    <ringGeometry args={[2.8, 2.9, 64]} />
                    <meshBasicMaterial color={colors.a} transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
            )}

            {/* Holographic Label - MAXIMIZED */}
            <Html
                position={[0, 3, 0]}
                center
                style={{
                    pointerEvents: 'none',
                    // whiteSpace: 'nowrap', // ALLOW WRAPPING 
                    opacity: hovered ? 1 : 0.6,
                    transition: 'opacity 0.3s',
                    zIndex: hovered ? 10 : 0
                }}
            >
                <div className={`
                    flex flex-col items-center
                    ${hovered ? 'scale-110' : 'scale-90'} transition-transform duration-300
                `}>
                    <div className={`
                        backdrop-blur-xl border p-6 rounded-2xl shadow-2xl transition-all duration-300 w-[400px]
                        ${hovered
                            ? 'bg-black/95 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.3)]'
                            : 'bg-black/40 border-white/10'}
                    `}>
                        <div className="flex items-center gap-3 justify-center mb-2">
                            <span className={`w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]`} style={{ color: colors.a, backgroundColor: colors.a }} />
                            <h3 className="text-white font-bold text-xl tracking-wider">{product.title}</h3>
                        </div>

                        {hovered && (
                            <div className="mt-3 text-center">
                                <p className="text-xs text-white/50 font-mono mb-4 tracking-widest uppercase border-b border-white/10 pb-2">{product.titleEn}</p>
                                <p className="text-sm text-neutral-200 leading-7 mb-5 w-full text-justify px-2 font-light tracking-wide whitespace-normal">
                                    {product.details}
                                </p>
                                <div className="text-[#D4AF37] text-sm font-bold font-mono tracking-widest pt-2 flex items-center justify-center gap-2 group cursor-pointer hover:text-white transition-colors border-t border-white/10">
                                    ACCESS DATA_NODE <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Html>
        </group>
    )
}

function GalacticCore() {
    return (
        <group>
            <pointLight intensity={3} color="#D4AF37" distance={60} decay={1.5} />
            {/* Event Horizon */}
            <mesh scale={[1, 1, 1]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            {/* Accretion Disk Glow */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} side={THREE.BackSide} />
            </mesh>
            <Sparkles count={300} scale={15} size={3} speed={0.4} opacity={0.6} color="#D4AF37" />
        </group>
    )
}

export default function ProductGalaxy({ products }) {
    // Detect mobile/touch device
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-black">
            <Canvas camera={{ position: [0, 30, 50], fov: 50 }}>
                <color attach="background" args={['#010101']} />

                <ambientLight intensity={0.1} />
                <Stars radius={200} depth={50} count={10000} factor={6} saturation={0} fade />

                {/* 
                   Mobile: Disable touch rotation so users can scroll past
                   Desktop: Enable mouse rotation for interactive experience
                */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={!isMobile}  // Disable rotation on mobile
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enableDamping={true}
                    dampingFactor={0.05}
                    minDistance={10}
                    maxDistance={100}
                    // These ensure touch events don't block scrolling on mobile
                    touches={{ ONE: isMobile ? null : 1, TWO: isMobile ? null : 2 }}
                />

                <group rotation={[0, 0, 0]}>
                    <GalacticCore />
                    {products.map((product, i) => (
                        <PlanetNode
                            key={product.id}
                            product={product}
                            index={i}
                            total={products.length}
                        />
                    ))}
                </group>

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.5} />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                    <Noise opacity={0.06} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
