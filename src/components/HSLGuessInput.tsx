import React, { useRef, useEffect } from 'react';

interface HSLGuessInputProps {
  currentGuess: { h: string; s: string; l: string };
  setCurrentGuess: (guess: { h: string; s: string; l: string }) => void;
  handleGuess: () => void;
  guessCount: number;
}

const HSLGuessInput: React.FC<HSLGuessInputProps> = ({
  currentGuess,
  setCurrentGuess,
  handleGuess,
  guessCount,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 3);
  }, []);

  useEffect(() => {
    if (!currentGuess.h && !currentGuess.s && !currentGuess.l) {
      inputRefs.current[0]?.focus();
    }
  }, [currentGuess]);

  const validateInput = (value: string, type: 'h' | 's' | 'l') => {
    const num = parseInt(value);
    if (value === '') return true;
    if (isNaN(num)) return false;
    
    switch (type) {
      case 'h':
        return num >= 0 && num < 360;
      case 's':
      case 'l':
        return num >= 0 && num <= 100;
    }
  };

  const handleChange = (type: 'h' | 's' | 'l', value: string, index: number) => {
    if (validateInput(value, type)) {
      setCurrentGuess({ ...currentGuess, [type]: value });
      if (value.length && index < 2) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !currentGuess[['h', 's', 'l'][index] as 'h' | 's' | 'l'] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter' && currentGuess.h && currentGuess.s && currentGuess.l) {
      handleGuess();
    }
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <span className="mr-2 text-xl font-bold">hsl(</span>
        <input
          ref={el => (inputRefs.current[0] = el)}
          type="text"
          maxLength={3}
          value={currentGuess.h}
          onChange={e => handleChange('h', e.target.value, 0)}
          onKeyDown={e => handleKeyDown(0, e)}
          placeholder="H"
          className="w-16 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="mx-1">,</span>
        <input
          ref={el => (inputRefs.current[1] = el)}
          type="text"
          maxLength={3}
          value={currentGuess.s}
          onChange={e => handleChange('s', e.target.value, 1)}
          onKeyDown={e => handleKeyDown(1, e)}
          placeholder="S"
          className="w-16 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="mx-1">%,</span>
        <input
          ref={el => (inputRefs.current[2] = el)}
          type="text"
          maxLength={3}
          value={currentGuess.l}
          onChange={e => handleChange('l', e.target.value, 2)}
          onKeyDown={e => handleKeyDown(2, e)}
          placeholder="L"
          className="w-16 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="ml-1">%)</span>
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

export default HSLGuessInput;