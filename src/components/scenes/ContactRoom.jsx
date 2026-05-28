import { Text, Torus } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function ContactRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);

  const contacts = [
    { label: '📧 Email',    value: resumeData.contact.email,    color: '#00FFFF' },
    { label: '🐙 GitHub',    value: resumeData.contact.github,   color: '#aaaaaa' },
    { label: '💼 LinkedIn',  value: resumeData.contact.linkedin, color: '#0088FF' },
  ];

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#001a1a" />
      </mesh>

      <Text position={[0, 3.5, 0]} fontSize={0.5} color="#00FFFF" anchorX="center">
        📬 CONTACT
      </Text>
      <Text position={[0, -0.1, 0]} fontSize={0.18} color="#888" anchorX="center">
      </Text>

      {contacts.map((c, i) => {
        const x = (i - 1) * 3.2;
        return (
          <group key={c.label} position={[x, 0.8, 0]}>
            <Torus
              args={[0.7, 0.2, 16, 32]}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCard({ title: c.label, content: c.value });
              }}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.4} />
            </Torus>

            {/* Label above */}
            <Text position={[0, 1.1, 0]} fontSize={0.2} color="white" anchorX="center">
              {c.label}
            </Text>
            {/* Detail below — shows what the card will reveal */}
            <Text position={[0, -1.1, 0]} fontSize={0.16} color={c.color} anchorX="center" maxWidth={2.8}>
              {c.value}
            </Text>
          </group>
        );
      })}
    </group>
  );
}