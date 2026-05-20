import { useGameStore } from '../../store/useGameStore';

export default function StartScreen() {
  const startGame = useGameStore(s => s.startGame);
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 text-white">
      <h1 className="text-6xl font-bold mb-4 text-cyan-400">🎮 RESUME QUEST</h1>
      <p className="text-xl text-gray-300 mb-2">Explore my professional world in 3D</p>
      <p className="text-sm text-gray-500 mb-8">Navigate zones • Collect badges • Discover my story</p>
      <div className="bg-gray-800 rounded-lg p-4 mb-8 text-sm text-gray-300 max-w-sm text-center">
        <p className="font-bold text-white mb-2">🕹️ Controls</p>
        <p>• Click zone buttons to explore sections</p>
        <p>• Click glowing objects to reveal info</p>
        <p>• Collect skill badges for bonus points</p>
        <p>• Click portals to move between zones</p>
      </div>
      <button
        onClick={startGame}
        className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xl rounded-full transition-all transform hover:scale-105"
      >
        START QUEST →
      </button>
    </div>
  );
}