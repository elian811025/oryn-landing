import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Stars, Float, shaderMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- 1. Custom "Void Core" Shader ---
// A liquid, shifting energy sphere shader
const VoidMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.4, 1.0), rimColor: new THREE.Color(0.83, 0.68, 0.21) },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    uniform float time;

    // Perlin-ish noise for vertex displacement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        
        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
        
        // Permutations
        i = mod289(i); 
        vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                
        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        
        //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                      dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Displacement
      float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
      vec3 newPosition = position + normal * displacement;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    // Fragment Shader
    `
    uniform float time;
    uniform vec3 color;
    uniform vec3 rimColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Rim Lighting (Fresnel)
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      rim = pow(rim, 3.0);
      
      // Internal pulse
      float pulse = sin(time * 2.0) * 0.5 + 0.5;
      
      vec3 finalColor = mix(color, rimColor, rim);
      finalColor += rimColor * rim * pulse * 2.0;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ VoidMaterial })

function VoidCore() {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) ref.current.time = clock.getElapsedTime() * 0.5
    })

    return (
        <mesh scale={[2, 2, 2]}>
            {/* Icosahedron for more interesting vertices than Sphere */}
            <icosahedronGeometry args={[1, 64]} />
            <voidMaterial ref={ref} transparent />
        </mesh>
    )
}

// --- 2. Rotating Astrolabe Rings (Geometry) ---
function AstrolabeRings() {
    const groupRef = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.05
            groupRef.current.rotation.z = t * 0.02
        }
    })

    return (
        <group ref={groupRef}>
            {/* Ring 1 - Gold */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} />
            </mesh>
            {/* Ring 2 - Blue */}
            <mesh rotation={[-Math.PI / 4, 0, 0]}>
                <torusGeometry args={[4.2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
            </mesh>
            {/* Ring 3 - Outer Large */}
            <mesh rotation={[0, Math.PI / 6, 0]}>
                <torusGeometry args={[6.0, 0.05, 16, 100]} />
                <meshStandardMaterial color="#444" roughness={0.2} metalness={1} />
            </mesh>
        </group>
    )
}

// --- 3. Instanced Particles (Data Stream) ---
function DataStream() {
    const count = 800
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            t: Math.random() * 100,
            factor: 20 + Math.random() * 100,
            speed: 0.01 + Math.random() * 0.05,
            xFactor: 20 + Math.random() * 40,
            yFactor: 20 + Math.random() * 40,
            zFactor: 20 + Math.random() * 40,
            mx: 0,
            my: 0
        }))
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        particles.forEach((particle, i) => {
            let { t: pt, factor, speed, xFactor, yFactor, zFactor } = particle

            // Lissajous curve-ish movement
            const t2 = (pt + t) * speed
            dummy.position.set(
                Math.sin(t2 * 1) * 10 + Math.cos(t2 * 2) * 2,
                Math.cos(t2 * 1.5) * 8 + Math.sin(t2 * 1) * 2,
                Math.sin(t2 * 1) * 5 + Math.cos(t2 * 1.5) * 5
            )

            // Scale pulse
            const s = Math.cos(t) * 0.1 + 0.15
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} toneMapped={false} />
        </instancedMesh>
    )
}

// --- Main Composition ---
export default function VoidEvolutionBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-black pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
                <color attach="background" args={['#020202']} />

                <fog attach="fog" args={['#020202', 10, 30]} />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#0000ff" />

                {/* Objects */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group position={[5, 0, -5]}> {/* Offset to right side to balance UI */}
                        <VoidCore />
                        <AstrolabeRings />
                    </group>
                </Float>

                <DataStream />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Post Processing */}
                <EffectComposer disableNormalPass>
                    {/* Bloom: The "Divine" Glow */}
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} radius={0.5} />
                    {/* Noise: Film Grain */}
                    <Noise opacity={0.05} />
                    {/* Vignette: Cinematic Border */}
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
