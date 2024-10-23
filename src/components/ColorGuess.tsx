import React from 'react';
import { Check, X } from 'lucide-react';

interface ColorGuessProps {
  guess: string;
  targetColor: string;
}

const ColorGuess: React.FC<ColorGuessProps> = ({ guess, targetColor }) => {
  const isCorrect = guess.toLowerCase() === targetColor.toLowerCase();

  return (
    <div className="flex items-center mb-2">
      <div
        className="w-8 h-8 mr-2 border border-gray-300"
        style={{ backgroundColor: guess }}
      ></div>
      <span className="font-mono">{guess}</span>
      {isCorrect ? (
        <Check className="ml-2 text-green-500" />
      ) : (
        <X className="ml-2 text-red-500" />
      )}
    </div>
  );
};

export default ColorGuess;