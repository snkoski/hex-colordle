import React, { useState, useEffect } from 'react';
import ColorSwatch from './components/ColorSwatch';
import GuessInput from './components/GuessInput';
import GuessHistory from './components/GuessHistory';
import { getRandomNamedColor, type NamedColor } from './utils/colors';

function App() {
  const [targetColor, setTargetColor] = useState<NamedColor>(getRandomNamedColor());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState(['', '', '', '', '', '']);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setTargetColor(getRandomNamedColor());
  }, []);

  const handleGuess = () => {
    const guess = currentGuess.join('');
    if (guess.length !== 6) {
      return;
    }

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess(['', '', '', '', '', '']);

    if (guess === targetColor.hex) {
      setWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setTargetColor(getRandomNamedColor());
    setGuesses([]);
    setCurrentGuess(['', '', '', '', '', '']);
    setGameOver(false);
    setWon(false);
    setShowDebug(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Hex Colordle</h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <ColorSwatch color={`#${targetColor.hex}`} />
          <p>{targetColor.name}</p>
          {showDebug && (
            <div className="mb-4 p-2 bg-gray-100 rounded">
              <code className="text-sm font-mono">#{targetColor.hex}</code>
            </div>
          )}
          <GuessHistory guesses={guesses} targetColor={targetColor.hex} />
          {!gameOver && (
            <GuessInput
              currentGuess={currentGuess}
              setCurrentGuess={setCurrentGuess}
              handleGuess={handleGuess}
              guessCount={guesses.length}
            />
          )}
          {gameOver && (
            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">
                {won ? 'Good Job!' : 'Game Over!'}
              </h2>
              <p className="text-xl mb-6">
                The color was <span className="font-mono">"{targetColor.name}"</span>
                <br />
                <span className="font-mono">#{targetColor.hex}</span>
              </p>
              <button
                onClick={resetGame}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>
      </div>
    </div>
  );
}

export default App;