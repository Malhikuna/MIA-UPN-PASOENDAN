import React from 'react';

interface MapSliderProps {
  radius: number;
  onRadiusChange: (value: number) => void;
}

const MapSlider: React.FC<MapSliderProps> = ({radius, onRadiusChange}) => {
  return (
    <div
      className="absolute bottom-2 right-2 mb-4 p-2 w-64 bg-white/70 border border-gray-300 rounded-md shadow-lg z-30">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="radius-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Tampilkan radius:
        </label>
        <span className="text-sm font-bold text-primary-content">
          {radius} km
        </span>
      </div>
      <input
        type="range"
        id="radius-slider"
        min={100}
        max={300}
        step={10}
        value={radius}
        onChange={(e) => onRadiusChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default MapSlider;