import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useGameStore } from './store/useGameStore';
import StartScreen from './components/hud/StartScreen';
import HUD from './components/hud/HUD';
import InfoCard from './components/hud/InfoCard';
import FinalScreen from './components/hud/FinalScreen';
import IntroRoom from './components/scenes/IntroRoom';
import SkillsRoom from './components/scenes/SkillsRoom';
import ProjectsRoom from './components/scenes/ProjectsRoom';
import EducationRoom from './components/scenes/EducationRoom';
import AchievementsRoom from './components/scenes/AchievementsRoom';
import ContactRoom from './components/scenes/ContactRoom';
import PortalDoor from './components/shared/PortalDoor';

const ZONE_POSITIONS = {
  intro:          [0, 0, 0],
  skills:         [10, 0, 0],
  projects:       [20, 0, 0],
  education:      [30, 0, 0],
  achievements:   [40, 0, 0],
  contact:        [50, 0, 0],
};

const ZONES = ['intro', 'skills', 'projects', 'education', 'achievements', 'contact'];

export default function App() {
  const { gameStarted, currentZone } = useGameStore();
  const showFinal = useGameStore(s => s.showFinal); // ← CHANGE 1: was useGameStore.getState().showFinal
  const pos = ZONE_POSITIONS[currentZone];

  return (
    <div className="w-screen h-screen relative bg-black">
      {!gameStarted && <StartScreen />}

      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        shadows
      >
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <Environment preset="night" />

          <IntroRoom position={ZONE_POSITIONS.intro} />
          <SkillsRoom position={ZONE_POSITIONS.skills} />
          <ProjectsRoom position={ZONE_POSITIONS.projects} />
          <EducationRoom position={ZONE_POSITIONS.education} />
          <AchievementsRoom position={ZONE_POSITIONS.achievements} />
          <ContactRoom position={ZONE_POSITIONS.contact} />

          {ZONES.slice(0, -1).map((zone, i) => (
            <PortalDoor
              key={zone}
              position={[ZONE_POSITIONS[zone][0] + 4, 0, 0]}
              targetZone={ZONES[i + 1]}
              label={`→ ${ZONES[i + 1].toUpperCase()}`}
            />
          ))}

          <OrbitControls
            key={currentZone}
            target={pos}
            enablePan={false}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2}
            makeDefault
          />
        </Suspense>
      </Canvas>

      {gameStarted && <HUD />}
      <InfoCard />
      {showFinal && <FinalScreen />} {/* ← CHANGE 2: now uses the reactive variable above */}
    </div>
  );
}