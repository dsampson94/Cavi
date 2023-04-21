import React from 'react';

const Compass = ({ direction }) => {
  const windDirectionToAngle = (direction) => {
    const compass = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5
    };

    return compass[direction] || 0;
  };

  const angle = windDirectionToAngle(direction);

  return (
    <div className="relative w-32 h-32 ml-3 mb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 border border-blue-500 rounded-full" />
      </div>
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-2">
        <span className="text-xs font-bold">N</span>
      </div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
        <span className="text-xs font-bold">S</span>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <span className="text-xs font-bold">E</span>
      </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <span className="text-xs font-bold">W</span>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-blue-500"
            style={ { transform: `rotate(${ angle - 180 }deg)` } }
            viewBox="0 0 24 24"
            fill="DodgerBlue"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Compass;
