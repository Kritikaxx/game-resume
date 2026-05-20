import { useGameStore } from '../../store/useGameStore';

const ZONES = ['intro', 'skills', 'projects', 'education', 'achievements', 'contact'];
const ICONS = { intro:'👤', skills:'⚡', projects:'🚀', education:'🎓', achievements:'🏆', contact:'📬' };

export default function HUD() {
  const { currentZone, visitedZones, collectedBadges, score, goToZone } = useGameStore();
  const progress = Math.round((visitedZones.length / ZONES.length) * 100);

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {ZONES.map(zone => (
          <button
            key={zone}
            onClick={() => goToZone(zone)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              currentZone === zone
                ? 'bg-cyan-400 text-black scale-110'
                : visitedZones.includes(zone)
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {ICONS[zone]} {zone.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Score */}
      <div className="absolute top-4 right-4 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
        <div className="text-cyan-400 font-bold">SCORE: {score}</div>
        <div className="text-gray-400">Badges: {collectedBadges.length} 🎖️</div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-64">
        <div className="text-white text-xs text-center mb-1">QUEST PROGRESS: {progress}%</div>
        <div className="bg-gray-700 rounded-full h-2">
          <div
            className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current zone label */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 text-cyan-300 text-lg font-bold tracking-widest uppercase">
        {ICONS[currentZone]} {currentZone} Zone
      </div>
    </>
  );
}