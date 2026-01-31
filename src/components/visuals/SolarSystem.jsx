import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Stars, Sparkles, Float, Html, Line, shaderMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration, GodRays } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- 1. Custom Sun Shader Material ---
// Simulates a burning, turbulent surface
const SunMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(1.2, 0.8, 0) }, // HDR Color
    // Vertex Shader
    `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    // Simple noise function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
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
      // Moving noise texture
      float n = noise(vUv * 10.0 + time * 0.5);
      float n2 = noise(vUv * 20.0 - time * 0.2);
      
      // Fresnel-like edge glow
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      
      vec3 finalColor = color * (0.8 + n * 0.2 + n2 * 0.1);
      finalColor += vec3(1.0, 0.6, 0.1) * intensity * 2.0; // Corona glow

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ SunMaterial })

function Sun() {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) ref.current.time = clock.getElapsedTime()
    })

    return (
        <group>
            {/* Core - High Detail */}
            <mesh>
                <sphereGeometry args={[2.8, 64, 64]} />
                <sunMaterial ref={ref} transparent />
            </mesh>
            {/* Inner Glow */}
            <mesh scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[2.8, 32, 32]} />
                <meshBasicMaterial color="#FFAA00" transparent opacity={0.3} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>
            {/* Outer Glow Halo */}
            <mesh scale={[1.4, 1.4, 1.4]}>
                <sphereGeometry args={[2.8, 32, 32]} />
                <meshBasicMaterial color="#FF6600" transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>
            {/* Ultra Outer Glow */}
            <mesh scale={[1.8, 1.8, 1.8]}>
                <sphereGeometry args={[2.8, 16, 16]} />
                <meshBasicMaterial color="#FF4400" transparent opacity={0.1} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>
            {/* Golden Sparkles around sun */}
            <Sparkles count={200} scale={[12, 12, 12]} size={3} speed={0.4} color="#FFD700" />
            {/* Omni Light - Boosted */}
            <pointLight intensity={5} color="#FFD700" distance={150} decay={1.2} />
            <pointLight intensity={2} color="#FF6600" distance={80} decay={2} />
        </group>
    )
}

// --- 2. Asteroid Belt (Instanced Mesh) ---
function AsteroidBelt() {
    const count = 2500 // MAXIMUM ASTEROIDS!
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate static orbit data
    const asteroids = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            angle: Math.random() * Math.PI * 2,
            radius: 12.5 + Math.random() * 2.5, // Between Mars(11) and Jupiter(15)
            speed: (Math.random() * 0.5 + 0.5) * 0.5, // Variance
            yOffset: (Math.random() - 0.5) * 0.5, // Slight vertical spread
            scale: Math.random() * 0.08 + 0.02,
            rotationSpeed: Math.random() * 0.05
        }))
    }, [])

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.1
        asteroids.forEach((data, i) => {
            const r = data.radius
            const angle = data.angle + t * data.speed

            const x = Math.cos(angle) * r
            const z = Math.sin(angle) * r

            dummy.position.set(x, data.yOffset, z)
            dummy.scale.setScalar(data.scale)
            dummy.rotation.set(t * data.rotationSpeed, t * data.rotationSpeed, 0)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <dodecahedronGeometry args={[1, 0]} /> {/* Low poly rock */}
            <meshStandardMaterial color="#888888" roughness={0.8} />
        </instancedMesh>
    )
}

// --- 3. Constellations (Brighter & Thicker) ---
function Constellations() {
    const constellations = useMemo(() => {
        const lines = []
        const count = 20 // More constellations for epic sky
        const radius = 90

        for (let i = 0; i < count; i++) {
            const points = []
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            const cx = radius * Math.sin(phi) * Math.cos(theta)
            const cy = radius * Math.sin(phi) * Math.sin(theta)
            const cz = radius * Math.cos(phi)

            let currX = cx, currY = cy, currZ = cz
            points.push(new THREE.Vector3(currX, currY, currZ))

            const starCount = Math.floor(Math.random() * 5) + 3
            for (let j = 0; j < starCount; j++) {
                const spread = 12
                currX += (Math.random() - 0.5) * spread
                currY += (Math.random() - 0.5) * spread
                currZ += (Math.random() - 0.5) * spread
                points.push(new THREE.Vector3(currX, currY, currZ))
            }
            lines.push(points)
        }
        return lines
    }, [])

    return (
        <group>
            {constellations.map((points, i) => (
                <group key={i}>
                    <Line
                        points={points}
                        color="#FFFFFF"
                        opacity={0.3}
                        transparent
                        lineWidth={1.2}
                    />
                    {points.map((pt, j) => (
                        <mesh key={j} position={pt}>
                            <sphereGeometry args={[0.3, 6, 6]} />
                            <meshBasicMaterial color="white" toneMapped={false} /> {/* toneMapped false for Bloom */}
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    )
}

// --- Reusable Planet ---
function Planet({ radius, distance, speed, color, name, hasRing, emissive = false }) {
    const ref = useRef()
    const angleOffset = useMemo(() => Math.random() * Math.PI * 2, [])

    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.getElapsedTime() * 0.2
        const x = Math.cos(t * speed + angleOffset) * distance
        const z = Math.sin(t * speed + angleOffset) * distance
        ref.current.position.set(x, 0, z)
        ref.current.rotation.y += 0.005
    })

    return (
        <group ref={ref}>
            <mesh>
                <sphereGeometry args={[radius, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.6}
                    metalness={0.4}
                    emissive={emissive ? color : '#000000'}
                    emissiveIntensity={emissive ? 0.5 : 0}
                />
            </mesh>

            {/* Atmosphere Glow for Earth-likes */}
            {(name === 'Earth' || name === 'Venus') && (
                <mesh scale={[1.05, 1.05, 1.05]}>
                    <sphereGeometry args={[radius, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
                </mesh>
            )}

            {hasRing && (
                <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                    <ringGeometry args={[radius * 1.4, radius * 2.2, 32]} />
                    <meshStandardMaterial
                        color="#C0A080"
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            )}
        </group>
    )
}

function OrbitTrack({ distance }) {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[distance - 0.03, distance + 0.03, 64]} />
            <meshBasicMaterial color="#444" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
    )
}

function SolarSystemGroup(props) {
    const groupRef = useRef()
    useFrame((state) => {
        if (groupRef.current) {
            const mx = state.mouse.x * 0.05
            const my = state.mouse.y * 0.05
            groupRef.current.rotation.y = mx * 0.3
            groupRef.current.rotation.x = my * 0.1 + 0.1
        }
    })

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0]} {...props}>
            <Sun />

            <Planet radius={0.4} distance={4} speed={1.8} color="#A5A5A5" name="Mercury" />
            <OrbitTrack distance={4} />

            <Planet radius={0.7} distance={6} speed={1.4} color="#F5D0A9" name="Venus" />
            <OrbitTrack distance={6} />

            <Planet radius={0.8} distance={8.5} speed={1.0} color="#2E86C1" name="Earth" emissive={true} />
            <OrbitTrack distance={8.5} />

            <Planet radius={0.6} distance={11} speed={0.8} color="#C0392B" name="Mars" />
            <OrbitTrack distance={11} />

            {/* ASTEROID BELT HERE */}
            <AsteroidBelt />

            <Planet radius={2.2} distance={16} speed={0.4} color="#D4AC0D" name="Jupiter" />
            <OrbitTrack distance={16} />

            <Planet radius={1.9} distance={21} speed={0.3} color="#F5CBA7" name="Saturn" hasRing={true} />
            <OrbitTrack distance={21} />

            <Planet radius={1.3} distance={25} speed={0.2} color="#AED6F1" name="Uranus" />
            <OrbitTrack distance={25} />

            <Planet radius={1.3} distance={29} speed={0.15} color="#2874A6" name="Neptune" />
            <OrbitTrack distance={29} />
        </group>
    )
}

export default function SolarSystem() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-black">
            <Canvas camera={{ position: [0, 8, 30], fov: 40 }} dpr={[1, 2]} frameloop="always" gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.8, powerPreference: 'high-performance', antialias: true }}>
                <color attach="background" args={['#010101']} />

                {/* Lights */}
                <ambientLight intensity={0.05} />

                {/* Scene Content */}
                <SolarSystemGroup position={[-14, -8, -6]} />
                <Constellations />
                <Stars radius={150} depth={80} count={12000} factor={6} saturation={0.1} fade speed={0.5} />

                {/* Extra Sparkle Layer */}
                <Sparkles count={300} scale={[100, 100, 100]} size={2} speed={0.3} color="#FFFFFF" opacity={0.5} />

                {/* Post Processing - MAXIMUM SAUCE */}
                <EffectComposer disableNormalPass multisampling={4}>
                    {/* Bloom: EPIC GLOW */}
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={2.5} radius={0.8} levels={5} />
                    {/* Chromatic Aberration for cinematic feel */}
                    <ChromaticAberration offset={[0.002, 0.002]} radialModulation={true} modulationOffset={0.5} />
                    {/* Vignette: Cinematic border */}
                    <Vignette eskil={false} offset={0.05} darkness={1.0} />
                    {/* Film Grain */}
                    <Noise opacity={0.08} />
                </EffectComposer>
            </Canvas>

            {/* Overlay to darken for text readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            {/* Radial fade */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] opacity-80 pointer-events-none" />
        </div>
    )
}
