import { Text, Cylinder } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function EducationRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0a0a1f" />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={0.5} color="#8888FF" anchorX="center">🎓 EDUCATION</Text>
      {resumeData.education.map((edu, i) => (
        <group key={edu.degree} position={[(i - 0.5) * 3, 0.5, 0]}>
          <Cylinder
            args={[0.8, 0.8, 1.5, 6]}
            onClick={() => setActiveCard({
              title: edu.degree,
              subtitle: edu.school,
              content: `${edu.year} • ${edu.grade}`,
            })}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
          >
            <meshStandardMaterial color="#1a1a5a" emissive="#2222AA" emissiveIntensity={0.4} />
          </Cylinder>
          <Text position={[0, 1.2, 0]} fontSize={0.18} color="white" anchorX="center" maxWidth={2}>
            {edu.school}
          </Text>
        </group>
      ))}
    </group>
  );
}