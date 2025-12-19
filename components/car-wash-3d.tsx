"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function Car() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef}>
      {/* Car body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh position={[0, 1.3, -0.3]}>
        <boxGeometry args={[1.8, 0.8, 2]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.95, 1, 0]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshStandardMaterial color="#93c5fd" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.95, 1, 0]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshStandardMaterial color="#93c5fd" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Wheels */}
      {[-0.8, 0.8].map((x) =>
        [-1.2, 1.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.3, z]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
          </mesh>
        )),
      )}
    </group>
  )
}

function WaterDrops() {
  const dropsRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (dropsRef.current) {
      dropsRef.current.children.forEach((drop, index) => {
        const position = drop.position
        position.y -= 0.02
        if (position.y < -2) {
          position.y = 3
        }
      })
    }
  })

  return (
    <group ref={dropsRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[Math.random() * 4 - 2, Math.random() * 3, Math.random() * 4 - 2]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#87ceeb" />
    </>
  )
}

export function CarWash3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <Lights />
        <Car />
        <WaterDrops />
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}
