import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../scrollState.js'

/* ─── Torus knot mesh ─────────────────────────────────────────────────────── */
function TorusKnot() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const p = scrollState.heroProgress   // 0 → 1 during hero pin

    /* Continuous Y rotation + gentle X wobble */
    meshRef.current.rotation.y += delta * 0.28
    meshRef.current.rotation.x  = Math.sin(state.clock.elapsedTime * 0.18) * 0.18

    /* Scroll-driven: drift right + scale up (lerped for buttery feel) */
    const targetX     = p * 4.0
    const targetScale = 1 + p * 0.65

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x, targetX, 0.07,
    )
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 0.07,
    )
  })

  return (
    <mesh ref={meshRef}>
      {/* p=2, q=3 → classic trefoil look */}
      <torusKnotGeometry args={[1.1, 0.38, 220, 40, 2, 3]} />
      <meshPhysicalMaterial
        color="#0c1d3e"
        roughness={0.12}
        metalness={0.95}
        emissive="#1840a0"
        emissiveIntensity={0.35}
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        reflectivity={1}
      />
    </mesh>
  )
}

/* ─── Floating particles ──────────────────────────────────────────────────── */
function Particles({ count = 120 }) {
  const ref = useRef()

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 18
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
  }

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.018
    ref.current.rotation.x = state.clock.elapsedTime * 0.009
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4f8ef7"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── Canvas export ───────────────────────────────────────────────────────── */
export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      gl={{
        antialias:            true,
        alpha:                true,
        toneMapping:          THREE.ACESFilmicToneMapping,
        toneMappingExposure:  1.3,
      }}
      style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[6, 6, 5]}   intensity={2.5} color="#4f8ef7" />
      <directionalLight position={[-4, -3, -3]} intensity={1.2} color="#d0c8ff" />
      <pointLight       position={[0, -5, 4]}   intensity={1.0} color="#4f8ef7" decay={2} />
      <pointLight       position={[3, 4, -2]}   intensity={0.8} color="#ffffff" decay={2} />

      <TorusKnot />
      <Particles />
    </Canvas>
  )
}
