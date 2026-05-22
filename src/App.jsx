import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGameStore } from './store/useGameStore';
import StartScreen from './components/hud/StartScreen';
import HUD from './components/hud/HUD';
import InfoCard from './components/hud/InfoCard';
import FinalScreen from './components/hud/FinalScreen';
import GameOverlay from './components/games/GameOverlay';
import IntroRoom from './components/scenes/IntroRoom';
import SkillsRoom from './components/scenes/SkillsRoom';
import ProjectsRoom from './components/scenes/ProjectsRoom';
import EducationRoom from './components/scenes/EducationRoom';
import AchievementsRoom from './components/scenes/AchievementsRoom';
import ContactRoom from './components/scenes/ContactRoom';

const ZONE_POSITIONS = {
  intro:        [0,   0, 0],
  skills:       [14,  0, 0],
  projects:     [28,  0, 0],
  education:    [42,  0, 0],
  achievements: [56,  0, 0],
  contact:      [70,  0, 0],
};

function CameraRig() {
  const { gl } = useThree();
  const cameraTarget = useGameStore(s => s.cameraTarget);
  const cameraZoomed = useGameStore(s => s.cameraZoomed);

  const isDragging = useRef(false);
  const lastMouse  = useRef({ x: 0, y: 0 });
  const rotation   = useRef({ x: 0, y: 0 });
  const targetRot  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;
    const down = (e) => { isDragging.current = true;  lastMouse.current = { x: e.clientX, y: e.clientY }; };
    const up   = ()  => { isDragging.current = false; };
    const move = (e) => {
      if (!isDragging.current) return;
      targetRot.current.y -= (e.clientX - lastMouse.current.x) * 0.003;
      targetRot.current.x -= (e.clientY - lastMouse.current.y) * 0.003;
      targetRot.current.x  = Math.max(-0.5, Math.min(0.5, targetRot.current.x));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    canvas.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', move);
    return () => {
      canvas.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mousemove', move);
    };
  }, [gl]);

  useFrame((state, delta) => {
    rotation.current.x += (targetRot.current.x - rotation.current.x) * delta * 6;
    rotation.current.y += (targetRot.current.y - rotation.current.y) * delta * 6;

    const zoomedZ = cameraZoomed ? 3   : 9;
    const zoomedY = cameraZoomed ? 1.5 : 3;
    const targetX = cameraTarget[0];

    const desiredPos = new THREE.Vector3(targetX, zoomedY, zoomedZ);
    state.camera.position.lerp(desiredPos, delta * (cameraZoomed ? 3 : 2));

    const lookX = targetX + Math.sin(rotation.current.y) * 6;
    const lookY = rotation.current.x * 4 + 1;
    const lookZ = Math.cos(rotation.current.y) * 6 - 4;
    state.camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

export default function App() {
  const gameStarted = useGameStore(s => s.gameStarted);
  const showFinal   = useGameStore(s => s.showFinal);
  const activeGame  = useGameStore(s => s.activeGame);

  return (
    <div className="w-screen h-screen relative bg-black select-none">
      {!gameStarted && <StartScreen />}

      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 3, 9]} fov={70} />
        <Suspense fallback={null}>
          <Stars radius={120} depth={60} count={7000} factor={4} fade />
          <ambientLight intensity={0.35} />
          <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow />
          <Environment preset="night" />
          <CameraRig />
          <IntroRoom        position={ZONE_POSITIONS.intro} />
          <SkillsRoom       position={ZONE_POSITIONS.skills} />
          <ProjectsRoom     position={ZONE_POSITIONS.projects} />
          <EducationRoom    position={ZONE_POSITIONS.education} />
          <AchievementsRoom position={ZONE_POSITIONS.achievements} />
          <ContactRoom      position={ZONE_POSITIONS.contact} />
        </Suspense>
      </Canvas>

      {gameStarted && <HUD />}
      <InfoCard />
      {activeGame  && <GameOverlay />}
      {showFinal   && <FinalScreen />}
    </div>
  );
}