import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

function SkillBadge({ skill, index, total }) {
  const ref = useRef();

  const collectedBadges = useGameStore(s => s.collectedBadges ?? []);
  const setActiveCard   = useGameStore(s => s.setActiveCard);
  const addScore        = useGameStore(s => s.addScore);
  const collected       = collectedBadges.includes(skill.name);

  const angle = (index / total) * Math.PI * 2;
  const x     = Math.cos(angle) * 2.5;
  const z     = Math.sin(angle) * 2.5;

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8;
      ref.current.rotation.x += delta * 0.3;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const current = useGameStore.getState().collectedBadges ?? [];
    if (!current.includes(skill.name)) {
      useGameStore.setState({ collectedBadges: [...current, skill.name] });
      addScore(50);
    }
    setActiveCard({
      title:    skill.name,
      subtitle: `Proficiency: ${skill.level}%`,
      content:  collected ? 'Already collected!' : '+50 points collected!',
      tags:     [skill.name],
    });
  };

  return (
    <group position={[x, 0.5, z]}>
      <Box
        ref={ref}
        args={[0.8, 0.8, 0.8]}
        onClick={handleClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={()  => document.body.style.cursor = 'default'}
      >
        <meshStandardMaterial
          color={collected ? '#FFD700' : skill.color}
          emissive={collected ? '#FFD700' : skill.color}
          emissiveIntensity={collected ? 0.9 : 0.25}
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
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0d1f0d" />
      </mesh>
      <Text position={[0, 3.5, 0]} fontSize={0.5} color="#00FF88" anchorX="center">
        ⚡ SKILLS
      </Text>
      <Text position={[0, -0.2, 0]} fontSize={0.18} color="#888" anchorX="center">
      </Text>
      {resumeData.skills.map((skill, i) => (
        <SkillBadge
          key={skill.name}
          skill={skill}
          index={i}
          total={resumeData.skills.length}
        />
      ))}
    </group>
  );
}