import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

function SkillBadge({ skill, index, total }) {
  const ref = useRef();
  const { collectBadge, collectedBadges, setActiveCard } = useGameStore();
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const collected = collectedBadges.includes(skill.name);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });

  return (
    <group position={[x, 0.5, z]}>
      <Box
        ref={ref}
        args={[0.8, 0.8, 0.8]}
        onClick={() => {
          collectBadge(skill.name);
          setActiveCard({ title: skill.name, content: `Proficiency: ${skill.level}%`, tags: [skill.name] });
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <meshStandardMaterial
          color={collected ? '#FFD700' : skill.color}
          emissive={collected ? '#FFD700' : skill.color}
          emissiveIntensity={collected ? 0.8 : 0.2}
        />
      </Box>
      <Text position={[0, -0.8, 0]} fontSize={0.2} color="white" anchorX="center">
        {collected ? '✓ ' : ''}{skill.name}
      </Text>
    </group>
  );
}

export default function SkillsRoom({ position }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0d1f0d" />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={0.5} color="#00FF88" anchorX="center">⚡ SKILLS</Text>
      <Text position={[0, -0.3, 0]} fontSize={0.2} color="#888" anchorX="center">
        Click badges to collect them!
      </Text>
      {resumeData.skills.map((skill, i) => (
        <SkillBadge key={skill.name} skill={skill} index={i} total={resumeData.skills.length} />
      ))}
    </group>
  );
}