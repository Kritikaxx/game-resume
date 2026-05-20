import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGameStore } from './store/useGameStore';
import StartScreen from './components/hud/StartScreen';
import HUD from './components/hud/HUD';
import InfoCard from './components/hud/InfoCard';
import FinalScreen from './components/hud/FinalScreen';
import QuizPanel from './components/hud/QuizPanel';
import IntroRoom from './components/scenes/IntroRoom';
import SkillsRoom from './components/scenes/SkillsRoom';
import ProjectsRoom from './components/scenes/ProjectsRoom';
import EducationRoom from './components/scenes/EducationRoom';
import AchievementsRoom from './components/scenes/AchievementsRoom';
import ContactRoom from './components/scenes/ContactRoom';

const ZONE_POSITIONS = {
  intro:        [0,   0, 0],
  skills:       [12,  0, 0],
  projects:     [24,  0, 0],
  education:    [36,  0, 0],
  achievements: [48,  0, 0],
  contact:      [60,  0, 0],
};

// ─── Smooth camera controller ───────────────────────────────────────────────
function CameraRig() {
  const { camera, gl } = useThree();
  const cameraTarget = useGameStore(s => s.cameraTarget);

  const targetPos = useRef(new THREE.Vector3(0, 2, 7));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse look state
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      rotation.current.y -= dx * 0.003;   // left-right free rotation
      rotation.current.x -= dy * 0.003;   // up-down free rotation
      rotation.current.x = Math.max(-0.6, Math.min(0.6, rotation.current.x)); // clamp vertical
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    // Touch support
    const onTouchStart = (e) => {
      isDragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;
      rotation.current.y -= dx * 0.003;
      rotation.current.x -= dy * 0.003;
      rotation.current.x = Math.max(-0.6, Math.min(0.6, rotation.current.x));
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [gl]);

  useFrame((_, delta) => {
    // Smoothly move camera to zone target
    targetPos.current.set(cameraTarget[0], 2, 7);
    camera.position.lerp(targetPos.current, delta * 2.5);

    // Apply mouse look rotation around the zone center
    const lookX = cameraTarget[0] + Math.sin(rotation.current.y) * 5;
    const lookY = rotation.current.x * 5 + 1;
    const lookZ = Math.cos(rotation.current.y) * 5 - 3;

    targetLook.current.set(lookX, lookY, lookZ);
    currentLook.current.lerp(targetLook.current, delta * 8);
    camera.lookAt(currentLook.current);
  });

  return null;
}

export default function App() {
  const gameStarted = useGameStore(s => s.gameStarted);   
  const showFinal = useGameStore(s => s.showFinal);
  const quizActive = useGameStore(s => s.quizActive);

  return (
    <div className="w-screen h-screen relative bg-black">
      {!gameStarted && <StartScreen />}

      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 7]} fov={70} />
        <Suspense fallback={null}>
          <Stars radius={120} depth={60} count={6000} factor={4} fade />
          <ambientLight intensity={0.4} />
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
      {quizActive && <QuizPanel />}
      {showFinal && <FinalScreen />}
    </div>
  );
}