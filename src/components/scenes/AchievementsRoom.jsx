import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Octahedron } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

function SpinningOct({ onClick }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 1.2;
      ref.current.rotation.x += delta * 0.6;
      ref.current.rotation.z += delta * 0.3;
    }
  });
  return (
    <Octahedron
      ref={ref}
      args={[0.8]}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <meshStandardMaterial color="#aa6600" emissive="#FFD700" emissiveIntensity={0.5} />
    </Octahedron>
  );
}

export default function AchievementsRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1f1000" />
      </mesh>
      <Text position={[0, 3.5, 0]} fontSize={0.5} color="#FFD700" anchorX="center">
        🏆 ACHIEVEMENTS
      </Text>
      <Text position={[0, -0.2, 0]} fontSize={0.18} color="#888" anchorX="center">
        
      </Text>

      {resumeData.achievements.map((ach, i) => {
        const x = (i - 1) * 3;
        return (
          <group key={ach.title} position={[x, 1, 0]}>
            <SpinningOct
              onClick={(e) => {
                e.stopPropagation();
                setActiveCard({
                  title:   ach.title,
                  subtitle: ach.org,
                  content: `${ach.icon} ${ach.title}\n${ach.org}`,
                });
              }}
            />
            <Text position={[0, -1.3, 0]} fontSize={0.2} color="white" anchorX="center" maxWidth={2.5}>
              {ach.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}