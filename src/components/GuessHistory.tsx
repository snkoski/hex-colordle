import React from 'react';

interface GuessHistoryProps {
  guesses: string[];
  targetColor: string;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ guesses, targetColor }) => {
  const getCharacterStatus = (guess: string, index: number) => {
    const char = guess[index];
    if (char === targetColor[index]) {
      return 'correct';
    }
    if (targetColor.includes(char)) {
      const charCountInTarget = targetColor.split(char).length - 1;
      const charCountInGuessBeforeIndex = guess.substring(0, index).split(char).length - 1;
      if (charCountInGuessBeforeIndex < charCountInTarget) {
        return 'present';
      }
    }
    return 'absent';
  };

  return (
    <div className="w-full max-w-md mb-4">
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} className="flex items-center mb-2">
          <span className="mr-2 text-2xl font-bold">#</span>
          {guess.split('').map((char, charIndex) => (
            <div
              key={charIndex}
              className={`w-12 h-12 flex items-center justify-center text-2xl font-bold border rounded-lg
                ${getCharacterStatus(guess, charIndex) === 'correct' ? 'bg-green-500 text-white' : 
                  getCharacterStatus(guess, charIndex) === 'present' ? 'bg-yellow-500 text-white' : 
                  'bg-gray-300'}`}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GuessHistory;