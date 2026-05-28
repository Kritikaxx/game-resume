import { useGameStore } from '../../store/useGameStore';

export default function InfoCard() {
  const { activeCard, closeCard } = useGameStore();
  if (!activeCard) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60" onClick={closeCard}>
      <div
        className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 max-w-md w-full mx-4 text-white"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">{activeCard.title}</h2>
        {activeCard.subtitle && (
          <p className="text-gray-400 text-sm mb-3">{activeCard.subtitle}</p>
        )}
        <p className="text-gray-200 mb-4 whitespace-pre-line">{activeCard.content}</p>
        {activeCard.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeCard.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-cyan-900 text-cyan-300 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        {activeCard.link && (
          <a
            href={activeCard.link}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 text-sm underline block mb-2"
          >
            🔗 View Project
          </a>
        )}
        <button
          onClick={closeCard}
          className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
