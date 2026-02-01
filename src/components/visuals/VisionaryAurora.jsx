import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex Noise (standard implementation)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 st = vUv;
    float time = uTime * 0.1;
    
    // Smooth flowing coordinates
    float noise1 = snoise(st * 3.0 + time);
    float noise2 = snoise(st * 6.0 - time * 0.5);
    
    // Combining noise for fluid movement
    float flow = noise1 * 0.5 + noise2 * 0.25;
    
    // Deep, Elegant Color Palette
    // Base: Deep Indigo/Black
    vec3 colorBg = vec3(0.02, 0.02, 0.08);
    
    // Aurora 1: Soft Cyan
    vec3 color1 = vec3(0.1, 0.6, 0.8);
    
    // Aurora 2: Nebular Purple/Pink
    vec3 color2 = vec3(0.6, 0.2, 0.8);
    
    // Aurora 3: Subtle Gold/White highlight
    vec3 color3 = vec3(0.9, 0.8, 0.9);
    
    // Mixing Logic
    vec3 finalColor = colorBg;
    
    // Flow 1
    float alpha1 = smoothstep(0.3, 0.7, snoise(st * 2.0 + vec2(time * 0.2, time * 0.1)) + 0.5);
    finalColor = mix(finalColor, color1, alpha1 * 0.3);
    
    // Flow 2
    float alpha2 = smoothstep(0.4, 0.8, snoise(st * 3.0 - vec2(time * 0.15, time * 0.25)) + 0.4);
    finalColor = mix(finalColor, color2, alpha2 * 0.3);
    
    // Flow 3 (Highlights)
    float alpha3 = smoothstep(0.6, 0.9, snoise(st * 4.0 + vec2(time * 0.3, -time * 0.1)) + 0.3);
    finalColor = mix(finalColor, color3, alpha3 * 0.1);
    
    // Final soft vignette
    float dist = distance(st, vec2(0.5));
    finalColor *= 1.0 - dist * 0.5;

    gl_FragColor = vec4(finalColor, 1.0);
}
`

export function VisionaryAurora() {
    const meshRef = useRef()
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) }
    }), [])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, -5]} scale={[25, 15, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}
