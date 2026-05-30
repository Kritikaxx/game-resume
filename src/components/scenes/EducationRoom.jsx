import { Text, Cylinder } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';

export default function EducationRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);

  const entries = [
    {
    label:    'University',
    title:    'University Education',
    subtitle: 'KIIT, Bhubaneswar',
    content:  'Degree:  B.Tech-Information Technology\nDuration:  2022-2026\nCGPA:  8.76',
    color:    '#1a1a5a',
    emissive: '#2222AA',
  },
  {
    label:    'Higher Secondary',
    title:    'School Education',
    subtitle: 'Loyola School, Jamshedpur',
    content:  'Class 12 (PCM with Computer Science)\nPercentage:  75.5%  |  Year: 2022\n\nClass 10\nPercentage:  92.2%  |  Year: 2020',
    color:    '#1a3a1a',
    emissive: '#22AA22',
  },
  ];

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0a0a1f" />
      </mesh>

      <Text position={[0, 3.5, 0]} fontSize={0.5} color="#8888FF" anchorX="center">
        🎓 EDUCATION
      </Text>
      <Text position={[0, -0.1, 0]} fontSize={0.18} color="#888" anchorX="center">
        
      </Text>

      {entries.map((entry, i) => {
        const x = (i - 0.5) * 4;
        return (
          <group key={entry.label} position={[x, 0.5, 0]}>
            <Cylinder
              args={[0.9, 0.9, 1.8, 6]}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCard({
                  title:    entry.title,
                  subtitle: entry.subtitle,
                  content:  entry.content,
                });
              }}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <meshStandardMaterial color={entry.color} emissive={entry.emissive} emissiveIntensity={0.4} />
            </Cylinder>

            {/* Clean label — just University / Higher Secondary */}
            <Text position={[0, 1.4, 0]} fontSize={0.22} color="white" anchorX="center">
              {entry.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}