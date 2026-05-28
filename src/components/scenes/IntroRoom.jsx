import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function IntroRoom({ position }) {
  const sphereRef = useRef();
  const setActiveCard = useGameStore(s => s.setActiveCard);

  useFrame((_, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta;
      sphereRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0a1628" />
      </mesh>

      {/* Floating avatar sphere */}
      <Sphere
        ref={sphereRef}
        args={[1, 32, 32]}
        position={[0, 1.5, 0]}
        onClick={() => setActiveCard({
          title: resumeData.intro.name,
          subtitle: resumeData.intro.title,
          content: resumeData.intro.tagline,
        })}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <meshStandardMaterial color="#00FFFF" emissive="#0044FF" emissiveIntensity={0.3} wireframe />
      </Sphere>

      <Text position={[0, 3.2, 0]} fontSize={0.5} color="white" anchorX="center" font={undefined}>
        {resumeData.intro.name}
      </Text>
      <Text position={[0, 2.7, 0]} fontSize={0.25} color="#00FFFF" anchorX="center">
        {resumeData.intro.title}
      </Text>
      <Text position={[0, -0.3, 0]} fontSize={0.2} color="#888" anchorX="center">
      </Text>
    </group>
  );
}