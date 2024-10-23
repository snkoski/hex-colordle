import React, { useRef, useEffect } from 'react';

interface GuessInputProps {
  currentGuess: string[];
  setCurrentGuess: (guess: string[]) => void;
  handleGuess: () => void;
  guessCount: number;
}

const GuessInput: React.FC<GuessInputProps> = ({
  currentGuess,
  setCurrentGuess,
  handleGuess,
  guessCount,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (currentGuess.every((char) => char === '')) {
      inputRefs.current[0]?.focus();
    }
  }, [currentGuess]);

  const handleChange = (index: number, value: string) => {
    const hexRegex = /^[0-9A-Fa-f]$/;
    if (value === '' || hexRegex.test(value)) {
      const newGuess = [...currentGuess];
      newGuess[index] = value.toUpperCase();
      setCurrentGuess(newGuess);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !currentGuess[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && currentGuess.every((char) => char !== '')) {
      handleGuess();
    }
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <span className="mr-2 text-2xl font-bold">#</span>
        {currentGuess.map((char, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="mx-1 w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
          />
        ))}
      </div>
      <button
        onClick={handleGuess}
        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Guess ({6 - guessCount} left)
      </button>
    </div>
  );
};

export default GuessInput;
