import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// High-Definition Noise Shader for "The Conqueror"
// More detail, sharper contrast, "Event Horizon" feel
const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying float vDisplacement;
varying vec3 vPosition;

// Classic Perlin/Simplex Noise (simplified for brevity)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
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
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  
  // High frequency detailed noise for "surface texture"
  float detailNoise = snoise(position * 8.0 + uTime * 0.2) * 0.05;
  
  // Low frequency big waves
  float bigWave = snoise(position * 1.5 + uTime * 0.1) * 0.4;
  
  float totalDisplacement = detailNoise + bigWave;
  vDisplacement = totalDisplacement;
  
  vec3 newPosition = position + normal * totalDisplacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1; // Deep base
uniform vec3 uColor2; // Highlight
uniform vec3 uColor3; // Rim/Accent

varying vec2 vUv;
varying vec3 vNormal;
varying float vDisplacement;
varying vec3 vPosition;

void main() {
  // Fresnel for rim lighting - essential for "Cinematic" look
  vec3 viewDir = normalize(cameraPosition - vPosition); // Approximate view dir in object space (not perfect but works for sphere)
  // Actually standard way: use vNormal and view direction.
  // In tangent space, view vector is (0,0,1)? No.
  // Let's rely on vNormal's z component for simple fresnel in view space calculation if vNormal was transformed properly.
  // But vNormal here is from vertex shader, normalized.
  
  // Simple Rim Flow using normal z (facing camera)
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
  
  // Deep space contrast
  float mixVal = vDisplacement * 0.5 + 0.5; // 0 to 1
  
  vec3 baseColor = mix(uColor1, uColor2, mixVal);
  
  // Add intense highlights at peaks
  float peak = smoothstep(0.6, 1.0, mixVal);
  baseColor += vec3(peak) * uColor3 * 2.0;
  
  // Rim light addition
  baseColor += fresnel * uColor3 * 0.5;
  
  gl_FragColor = vec4(baseColor, 1.0);
}
`

export function CinematicCore() {
    const meshRef = useRef()
    const materialRef = useRef()

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#030305') }, // Void Black
        uColor2: { value: new THREE.Color('#1e1e2e') }, // Deep Grey
        uColor3: { value: new THREE.Color('#06b6d4') }  // Cyan Highlight
    }), [])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()

            // Dynamic color shift pulsing
            // Oscillate accent between Cyan and Purple slightly
            const time = state.clock.getElapsedTime()
            const accent = new THREE.Color('#06b6d4').lerp(new THREE.Color('#a855f7'), (Math.sin(time) + 1) * 0.5)
            meshRef.current.material.uniforms.uColor3.value = accent
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={[2.5, 2.5, 2.5]}>
            <icosahedronGeometry args={[1, 128]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            // wireframe // Optional: looks cool for "Analytic" feel
            />
        </mesh>
    )
}
