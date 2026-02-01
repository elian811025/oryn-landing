import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const particleVertexShader = `
uniform float uTime;
attribute float aScale;
attribute vec3 aRandom; // x: radius offset, y: speed offset, z: phase
varying vec3 vColor;

void main() {
  // Spiral logic
  float time = uTime * (0.2 + aRandom.y * 0.2);
  float radius = 4.0 + aRandom.x * 3.0 + sin(time * 0.5 + aRandom.z) * 1.0;
  float angle = time + aRandom.z * 6.28;
  
  // Height calculation with loop
  float height = mod(time * 2.0 + aRandom.z * 10.0, 20.0) - 10.0;
  
  vec3 pos = vec3(
    cos(angle) * radius,
    height,
    sin(angle) * radius
  );
  
  // Instance position
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Scale based on position and randomness
  float scale = aScale * (1.0 + sin(time * 3.0 + aRandom.z) * 0.5);
  mvPosition.xyz += position * scale;
  
  gl_Position = projectionMatrix * mvPosition;
  
  // Color variation: Cyan to Purple based on height and randomness
  vec3 cyan = vec3(0.02, 0.71, 0.83); // #06b6d4
  vec3 purple = vec3(0.66, 0.33, 0.97); // #a855f7
  
  float mixFactor = (pos.y + 10.0) / 20.0;
  mixFactor = clamp(mixFactor + sin(time + aRandom.z) * 0.2, 0.0, 1.0);
  
  vColor = mix(cyan, purple, mixFactor);
}
`

const particleFragmentShader = `
varying vec3 vColor;

void main() {
  // Circular particle soft edge
  vec2 uv = gl_PointCoord; // Only for Points, for Mesh we use uv
  // Since we use InstancedMesh with Sphere/Plane, we use standard uv
  
  // Simple distance from center for glow pulse
  // But wait, standard geometry specific logic
  
  gl_FragColor = vec4(vColor, 0.8);
}
`

// Replacing simple Fragment with one that works for spheres
const meshFragmentShader = `
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
}
`

export function SoulParticles({ count = 2000 }) {
    const meshRef = useRef()

    // Shader Uniforms
    const uniforms = useRef({
        uTime: { value: 0 }
    })

    // Generate random attributes for instances
    const { aRandom, aScale } = useMemo(() => {
        const randomArray = new Float32Array(count * 3)
        const scaleArray = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randomArray[i * 3] = Math.random() // Radius
            randomArray[i * 3 + 1] = Math.random() // Speed
            randomArray[i * 3 + 2] = Math.random() // Phase
            scaleArray[i] = Math.random() * 0.1 + 0.02 // Size
        }

        return {
            aRandom: randomArray,
            aScale: scaleArray
        }
    }, [count])

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[1, 8, 8]}>
                <instancedBufferAttribute attach="attributes-aRandom" args={[aRandom, 3]} />
                <instancedBufferAttribute attach="attributes-aScale" args={[aScale, 1]} />
            </sphereGeometry>
            <shaderMaterial
                vertexShader={particleVertexShader}
                fragmentShader={meshFragmentShader}
                uniforms={uniforms.current}
                transparent={true}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    )
}
