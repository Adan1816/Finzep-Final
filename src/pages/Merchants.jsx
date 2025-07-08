import React, { useState } from 'react';

const tabNames = [
  'Private Limited',
  'Sole Proprietorship',
  'Partnership',
  'LLP',
  'OPC',
];

const Merchants = () => {
  const [selected, setSelected] = useState(0);

  // Marker movement: 100% height / 5 tabs
  const markerTranslate = `translateY(calc(${selected} * 20%))`;

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#d3dce6] font-mono">
      <div className="w-4/5 h-[480px] min-h-[480px] max-h-[480px] rounded-[48px] border-[16px] border-[#ebf0f4] bg-[#dfe6ed] shadow-[16px_16px_48px_rgba(46,54,67,0.19)] overflow-hidden flex">
        <div className="relative flex flex-col justify-around w-full max-w-[240px] h-full py-8">
          {tabNames.map((name, idx) => (
            <button
              key={name}
              className={`text-right block w-[calc(100%-48px)] text-2xl font-bold cursor-pointer z-10 select-none transition-opacity duration-400 ${selected === idx ? 'opacity-100 text-[#525d6f]' : 'opacity-40 text-[#525d6f]'}`}
              style={{marginLeft: 'auto'}}
              onClick={() => setSelected(idx)}
            >
              {name}
            </button>
          ))}
          {/* Marker */}
          <div
            className="absolute w-full h-[200%] flex flex-col top-[-100%] left-0 transition-transform duration-200 ease-in-out pointer-events-none"
            style={{ transform: markerTranslate }}
          >
            <div className="bg-[#ebf0f4] shadow-[32px_32px_48px_rgba(46,54,67,0.08)] h-1/2 mb-auto rounded-b-[32px]"></div>
            <div className="bg-[#ebf0f4] shadow-[32px_32px_48px_rgba(46,54,67,0.08)] h-[calc(50%-72px)] rounded-t-[32px]"></div>
          </div>
        </div>
        {/* Content area (optional, can add tab content here) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-3xl font-semibold text-[#525d6f]">
            {tabNames[selected]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchants;
