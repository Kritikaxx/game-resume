import { Text, Octahedron } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function AchievementsRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#1f1000" />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={0.5} color="#FFD700" anchorX="center">🏆 ACHIEVEMENTS</Text>
      {resumeData.achievements.map((ach, i) => {
        const x = (i - 1) * 3;
        return (
          <group key={ach.title} position={[x, 1, 0]}>
            <Octahedron
              args={[0.8]}
              onClick={() => setActiveCard({ title: ach.title, subtitle: ach.org, content: `${ach.icon} ${ach.title}` })}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <meshStandardMaterial color="#aa6600" emissive="#FFD700" emissiveIntensity={0.4} />
            </Octahedron>
            <Text position={[0, -1.2, 0]} fontSize={0.22} color="white" anchorX="center">
              {ach.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}