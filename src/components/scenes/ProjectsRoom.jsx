import { Text, Box } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function ProjectsRoom({ position }) {
  const setActiveCard = useGameStore(s => s.setActiveCard);

  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#1a0a1a" />
      </mesh>
      <Text position={[0, 3, 0]} fontSize={0.5} color="#FF88FF" anchorX="center">🚀 PROJECTS</Text>

      {resumeData.projects.map((project, i) => {
        const x = (i - 1) * 2.5;
        return (
          <group key={project.name} position={[x, 0.5, 0]}>
            <Box
              args={[1.8, 2, 0.2]}
              onClick={() => setActiveCard({
                title: project.name,
                content: project.description,
                tags: project.tech,
                link: project.link,
              })}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'default'}
            >
              <meshStandardMaterial color="#2a0a4a" emissive="#4400AA" emissiveIntensity={0.3} />
            </Box>
            <Text position={[0, 1.2, 0.2]} fontSize={0.2} color="white" anchorX="center" maxWidth={1.5}>
              {project.name}
            </Text>
          </group>
        );
      })}
      <Text position={[0, -0.3, 0]} fontSize={0.2} color="#888" anchorX="center">
      </Text>
    </group>
  );
}