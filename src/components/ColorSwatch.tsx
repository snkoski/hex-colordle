import React from 'react';

interface ColorSwatchProps {
  color: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => {
  return (
    <div className="mb-8">
      <div
        className="w-32 h-32 rounded-lg shadow-lg"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ColorSwatch;