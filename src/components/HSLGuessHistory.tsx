import React from 'react';

interface HSLGuessHistoryProps {
  guesses: { h: number; s: number; l: number }[];
  targetHSL: { h: number; s: number; l: number };
}

const HSLGuessHistory: React.FC<HSLGuessHistoryProps> = ({ guesses, targetHSL }) => {
  const getValueStatus = (guessValue: number, targetValue: number, type: 'h' | 's' | 'l') => {
    if (guessValue === targetValue) return 'correct';
    
    const threshold = type === 'h' ? 15 : 10;
    const diff = Math.abs(guessValue - targetValue);
    
    if (type === 'h' && diff > 180) {
      diff = 360 - diff;
    }
    
    return diff <= threshold ? 'close' : 'far';
  };

  return (
    <div className="w-full max-w-md mb-4">
      {guesses.map((guess, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="mr-2 text-xl font-bold">hsl(</span>
          <div
            className={`w-16 h-12 flex items-center justify-center text-xl font-bold border rounded-lg mx-1
              ${getValueStatus(guess.h, targetHSL.h, 'h') === 'correct' ? 'bg-green-500 text-white' : 
                getValueStatus(guess.h, targetHSL.h, 'h') === 'close' ? 'bg-yellow-500 text-white' : 
                'bg-gray-300'}`}
          >
            {guess.h}
          </div>
          <span className="mx-1">,</span>
          <div
            className={`w-16 h-12 flex items-center justify-center text-xl font-bold border rounded-lg mx-1
              ${getValueStatus(guess.s, targetHSL.s, 's') === 'correct' ? 'bg-green-500 text-white' : 
                getValueStatus(guess.s, targetHSL.s, 's') === 'close' ? 'bg-yellow-500 text-white' : 
                'bg-gray-300'}`}
          >
            {guess.s}
          </div>
          <span className="mx-1">%,</span>
          <div
            className={`w-16 h-12 flex items-center justify-center text-xl font-bold border rounded-lg mx-1
              ${getValueStatus(guess.l, targetHSL.l, 'l') === 'correct' ? 'bg-green-500 text-white' : 
                getValueStatus(guess.l, targetHSL.l, 'l') === 'close' ? 'bg-yellow-500 text-white' : 
                'bg-gray-300'}`}
          >
            {guess.l}
          </div>
          <span className="ml-1">%)</span>
        </div>
      ))}
    </div>
  );
};

export default HSLGuessHistory;