import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';

export default function PortalDoor({ position, targetZone, label }) {
  const ref = useRef();
  const goToZone = useGameStore(s => s.goToZone);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={() => goToZone(targetZone)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <torusGeometry args={[1, 0.1, 16, 32]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="#00FFFF" anchorX="center">
        {label}
      </Text>
    </group>
  );
}