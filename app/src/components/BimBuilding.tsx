import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Edges, Grid } from "@react-three/drei"
import { type MotionValue } from "framer-motion"
import * as THREE from "three"

const FLOORS = 7
const FLOOR_GAP = 0.52

/* One floor slab that assembles into place as scroll progress passes its slot */
function Floor({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  const baseY = (i - (FLOORS - 1) / 2) * FLOOR_GAP
  const w = 2.4 - i * 0.11 // gentle taper toward the top

  useFrame(() => {
    const p = progress.get()
    const start = (i / FLOORS) * 0.72
    const local = THREE.MathUtils.clamp((p - start) / 0.26, 0, 1)
    const eased = local * local * (3 - 2 * local) // smoothstep
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(baseY - 3.2, baseY, eased)
      const s = THREE.MathUtils.lerp(0.4, 1, eased)
      group.current.scale.set(s, s, s)
      group.current.rotation.y = THREE.MathUtils.lerp(0.9, 0, eased)
    }
    if (mat.current) mat.current.opacity = 0.42 * eased
  })

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[w, 0.34, w]} />
        <meshStandardMaterial
          ref={mat}
          color="#0A1330"
          transparent
          opacity={0}
          emissive="#0794D9"
          emissiveIntensity={0.25}
          metalness={0.4}
          roughness={0.5}
        />
        <Edges color="#22D3EE" />
      </mesh>
    </group>
  )
}

function Building({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) {
      // Ambient rotation + a nudge from scroll depth
      group.current.rotation.y += delta * 0.28 + progress.get() * delta * 0.6
    }
  })
  return (
    <group ref={group} position={[0, 0.2, 0]} rotation={[0.12, 0.4, 0]}>
      {Array.from({ length: FLOORS }).map((_, i) => (
        <Floor key={i} i={i} progress={progress} />
      ))}
      {/* Site-plan grid beneath the model */}
      <Grid
        position={[0, -(FLOORS / 2) * FLOOR_GAP - 0.1, 0]}
        args={[12, 12]}
        cellSize={0.5}
        cellColor="#0e3a5a"
        sectionSize={2}
        sectionColor="#155e83"
        fadeDistance={11}
        fadeStrength={2}
        infiniteGrid
      />
    </group>
  )
}

export default function BimBuilding({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [4.4, 2.6, 5.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.1} />
      <pointLight position={[5, 7, 5]} intensity={55} color="#22D3EE" />
      <pointLight position={[-6, -1, -4]} intensity={28} color="#0794D9" />
      <Building progress={progress} />
    </Canvas>
  )
}
