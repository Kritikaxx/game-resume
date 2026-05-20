import { useGameStore } from '../../store/useGameStore';

export default function QuizPanel() {
  const { quizQuestion, answerQuiz, closeQuiz } = useGameStore();
  if (!quizQuestion) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 border border-yellow-400 rounded-2xl p-6 max-w-md w-full mx-4 text-white">
        <div className="text-yellow-400 text-xs font-bold mb-1 uppercase tracking-widest">
          🎯 Quick Challenge — earn 150 pts!
        </div>
        <h2 className="text-xl font-bold mb-5">{quizQuestion.question}</h2>
        <div className="grid grid-cols-1 gap-3">
          {quizQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answerQuiz(i === quizQuestion.correct, quizQuestion.id)}
              className="w-full py-3 px-4 bg-gray-800 hover:bg-yellow-600 hover:text-black rounded-xl text-left text-sm font-medium transition-all"
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>
        <button onClick={closeQuiz} className="mt-4 text-gray-500 text-xs hover:text-gray-300">
          Skip (no points)
        </button>
      </div>
    </div>
  );
}