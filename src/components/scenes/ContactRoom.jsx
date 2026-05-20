import { Text, Torus } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function ContactRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);
  const contacts = [
    { label: '📧 Email', value: resumeData.contact.email },
    { label: '🐙 GitHub', value: resumeData.contact.github },
    { label: '💼 LinkedIn', value: resumeData.contact.linkedin },
  ];

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#001a1a" />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={0.5} color="#00FFFF" anchorX="center">📬 CONTACT</Text>
      {contacts.map((c, i) => (
        <group key={c.label} position={[(i - 1) * 3, 0.5, 0]}>
          <Torus
            args={[0.7, 0.2, 16, 32]}
            onClick={() => setActiveCard({ title: c.label, content: c.value })}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
          >
            <meshStandardMaterial color="#006060" emissive="#00AAAA" emissiveIntensity={0.5} />
          </Torus>
          <Text position={[0, -1.2, 0]} fontSize={0.2} color="white" anchorX="center">
            {c.label}
          </Text>
        </group>
      ))}
    </group>
  );
}