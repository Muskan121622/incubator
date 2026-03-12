import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Incubator({ riskScore }: { riskScore: number }) {
  const group = useRef<THREE.Group>(null);
  
  const color = useMemo(() => {
    if (riskScore < 30) return new THREE.Color("#22C55E");
    if (riskScore < 65) return new THREE.Color("#F59E0B");
    return new THREE.Color("#EF4444");
  }, [riskScore]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.3;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.6, 0.15, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.8]} />
        <meshStandardMaterial color={color} transparent opacity={0.15} wireframe />
      </mesh>
      {/* Hood */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.3, 0.3, 0.75]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} />
      </mesh>
      {/* Glow sphere */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function IncubatorVisualization({ riskScore }: { riskScore: number }) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-sm text-primary mb-2 neon-text-blue">3D Incubator Model</h3>
      <div className="h-48">
        <Canvas camera={{ position: [0, 0.5, 3], fov: 40 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 2, 2]} intensity={0.8} />
          <Incubator riskScore={riskScore} />
        </Canvas>
      </div>
    </div>
  );
}
