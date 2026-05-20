import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

export default function FinalScreen() {
  const { score, collectedBadges } = useGameStore();

  const handleExploreAgain = () => {
    // Full state reset
    useGameStore.setState({
      gameStarted: false,
      currentZone: 'intro',
      visitedZones: [],
      collectedBadges: [],
      activeCard: null,
      showFinal: false,
      score: 0,
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 text-white">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">QUEST COMPLETE!</h1>
        <p className="text-gray-300 mb-2">You explored all of {resumeData.intro.name}'s resume!</p>
        <div className="bg-gray-800 rounded-xl p-6 my-6 space-y-2">
          <p className="text-2xl font-bold">Final Score: <span className="text-yellow-400">{score}</span></p>
          <p>Badges Collected: {collectedBadges.length} 🎖️</p>
          <p className="text-gray-400 text-sm">Thanks for playing Resume Quest!</p>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href={`mailto:${resumeData.contact.email}`}
            className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400"
          >
            📬 Contact Me
          </a>
          <button
            onClick={handleExploreAgain}
            className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600"
          >
            ↩ Play Again
          </button>
        </div>
      </div>
    </div>
  );
}