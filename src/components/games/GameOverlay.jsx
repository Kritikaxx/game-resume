import { useGameStore } from '../../store/useGameStore';
import QuizGame     from './QuizGame';
import MemoryGame   from './MemoryGame';
import TicTacToe    from './TicTacToe';
import RPSGame      from './RPSGame';
import ScrambleGame from './ScrambleGame';

export default function GameOverlay() {
  const activeGame = useGameStore(s => s.activeGame);

  const map = {
    quiz_intro:   <QuizGame zone="intro"   />,
    memory:       <MemoryGame             />,
    tictactoe:    <TicTacToe             />,
    rps:          <RPSGame              />,
    scramble:     <ScrambleGame         />,
    quiz_contact: <QuizGame zone="contact" />,
  };

  return (
    // pointer-events-none on wrapper so canvas drag still works
    // pointer-events-auto only on the card itself
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-lg mx-4">
        {map[activeGame] || null}
      </div>
    </div>
  );
}