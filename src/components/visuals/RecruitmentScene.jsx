import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { CoreEnergy } from './CoreEnergy'
import { SoulParticles } from './SoulParticles'

function CameraRig() {
    useFrame((state) => {
        // Slow camera drift
        const t = state.clock.getElapsedTime()
        state.camera.position.x = Math.sin(t * 0.1) * 2
        state.camera.position.y = Math.cos(t * 0.1) * 1
        state.camera.lookAt(0, 0, 0)
    })
    return null
}

export default function RecruitmentScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{
                    pixelRatio: window.devicePixelRatio,
                    antialias: false, // For post-processing performance
                    toneMapping: THREE.ReinhardToneMapping,
                    toneMappingExposure: 1.5
                }}
            >
                {/* Scene Content */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.0} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={1.0} color="#a855f7" />

                <CoreEnergy />
                <SoulParticles count={3000} />
                <CameraRig />

                {/* Post Processing */}
                <EffectComposer disableNormalPass>
                    {/* Glowing Core */}
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={1.5}
                        mipmapBlur
                    />

                    {/* Filmic Grain */}
                    <Noise opacity={0.05} />

                    {/* Cinematic Vignette */}
                    <Vignette
                        eskil={false}
                        offset={0.1}
                        darkness={1.1}
                    />

                    {/* Subtle Lens Distortion */}
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={[0.002, 0.002]}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
