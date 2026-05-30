import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder, Sphere } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';

const EXPERIENCES = [
  {
    id: 'tata',
    company: 'Tata Steel',
    role: 'SDE Intern',
    period: 'May-June 2024',
    content: 'Engineered a Vendor Monitoring System using C# and ASP.NET.\nAutomated canteen operations achieving 40% cost reduction.\nImplemented real-time tracking to optimize vendor scheduling.',
    color: '#1a3a5c',
    emissive: '#2266AA',
    shape: 'box',
  },
  {
    id: 'ascendons',
    company: 'Ascendons Tech',
    role: 'SDE Intern',
    period: 'May-Aug 2025',
    content: 'Developed responsive web apps using TypeScript, Tailwind CSS, Angular and Java.\nBuilt scalable UI components with cross-device compatibility.\nWorked in an agile startup environment.',
    color: '#1a3a1a',
    emissive: '#22AA44',
    shape: 'sphere',
  },
  {
  id: 'deloitte',
  company: 'Deloitte',
  role: 'Analyst- Dev Trainee',
  period: 'Jan 2026-Present',
  content: 'Virtual Developer Intern|Marketing & Commerce Dept\nBase Location: Bhubaneswar CEC\n\nWeeks 1-3: Structured onboarding sessions covering client interaction, SQL, React and Agile methodologies.\nPhase 2: Completed fullstack development courses spanning JavaScript, SQL, AI fundamentals and modern web technologies.\nCurrent: Assigned a Three.js XR Developer course, building expertise in immersive 3D and extended reality experiences.',
  color:   '#3a1a1a',
  emissive:'#AA2244',
  shape:   'cylinder',
},
];

function FloatingBox({ experience, position, onClick }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.15;
    }
  });

  const commonProps = {
    ref,
    onClick,
    onPointerOver: () => document.body.style.cursor = 'pointer',
    onPointerOut:  () => document.body.style.cursor = 'default',
  };

  const material = (
    <meshStandardMaterial
      color={experience.color}
      emissive={experience.emissive}
      emissiveIntensity={0.5}
    />
  );

  return (
    <>
      {experience.shape === 'box' && (
        <Box {...commonProps} args={[1.4, 1.4, 1.4]} position={position}>
          {material}
        </Box>
      )}
      {experience.shape === 'sphere' && (
        <Sphere {...commonProps} args={[0.85, 32, 32]} position={position}>
          {material}
        </Sphere>
      )}
      {experience.shape === 'cylinder' && (
        <Cylinder {...commonProps} args={[0.7, 0.7, 1.4, 8]} position={position}>
          {material}
        </Cylinder>
      )}
    </>
  );
}

export default function ExperienceRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);

  return (
    <group position={position}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#0a1520" />
      </mesh>

      {/* Ambient glow rings on floor */}
      {EXPERIENCES.map((exp, i) => {
        const x = (i - 1) * 4;
        return (
          <mesh key={exp.id + '_ring'} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.48, 0]}>
            <ringGeometry args={[1.2, 1.6, 32]} />
            <meshStandardMaterial color={exp.emissive} emissive={exp.emissive} emissiveIntensity={0.3} transparent opacity={0.4} />
          </mesh>
        );
      })}

      <Text position={[0, 3.5, 0]} fontSize={0.5} color="#44AAFF" anchorX="center">
        💼 EXPERIENCE
      </Text>
      <Text position={[0, -0.1, 0]} fontSize={0.18} color="#888" anchorX="center">
      </Text>

      {EXPERIENCES.map((exp, i) => {
        const x = (i - 1) * 4;
        return (
          <group key={exp.id}>
            <FloatingBox
              experience={exp}
              position={[x, 1, 0]}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCard({
                  title:   exp.company,
                  subtitle: `${exp.role}  •  ${exp.period}`,
                  content: exp.content,
                });
              }}
            />
            {/* Company name */}
            <Text position={[x, 2.2, 0]} fontSize={0.22} color="white" anchorX="center" maxWidth={3.5}>
              {exp.company}
            </Text>
            {/* Role */}
            <Text position={[x, 1.9, 0]} fontSize={0.15} color="#44AAFF" anchorX="center" maxWidth={3.5}>
              {exp.role}
            </Text>
          </group>
        );
      })}
    </group>
  );
}