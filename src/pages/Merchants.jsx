import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabNames = [
  'Private Limited',
  'Sole Proprietorship',
  'Partnership',
  'LLP',
  'OPC',
];

const tabContents = [
  'Content for Private Limited',
  'Content for Sole Proprietorship',
  'Content for Partnership',
  'Content for LLP',
  'Content for OPC',
];

const Merchants = () => {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const [markerStyle, setMarkerStyle] = useState({ top: 0, height: 0 });

  useLayoutEffect(() => {
    if (tabRefs.current[selected]) {
      const el = tabRefs.current[selected];
      setMarkerStyle({
        top: el.offsetTop,
        height: el.offsetHeight,
      });
    }
  }, [selected]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e7ecf3] py-12 px-2 font-mono">
      <div className="w-full max-w-5xl min-h-[520px] rounded-3xl bg-white/80 shadow-2xl border border-white/40 flex flex-col md:flex-row overflow-hidden relative" style={{backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)'}}>
        {/* Connected Tab Group */}
        <div className="relative flex flex-col items-center justify-center min-w-[260px] bg-white/60 py-10 px-4 md:px-6 border-r border-white/30">
          <div className="relative w-full flex flex-col gap-2 rounded-2xl bg-white/60 shadow-inner overflow-hidden">
            {/* Animated Marker */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute left-0 w-full z-0 rounded-2xl bg-[#F18A41]/20 shadow-lg"
              style={{
                top: markerStyle.top,
                height: markerStyle.height,
                pointerEvents: 'none',
                boxShadow: '0 4px 24px 0 rgba(241,138,65,0.10)',
                border: '1.5px solid #F18A41',
                background: 'rgba(241,138,65,0.10)'
              }}
            />
            {tabNames.map((name, idx) => (
              <button
                key={name}
                ref={el => tabRefs.current[idx] = el}
                className={`relative z-10 w-full h-14 flex items-center px-6 text-base md:text-lg font-semibold transition-all duration-200 outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 border-none focus:border-none
                  ${selected === idx
                    ? 'text-[#F18A41] font-bold'
                    : 'text-[#233831] hover:bg-[#F18A41]/10 hover:text-[#F18A41]'}
                `}
                style={{ background: 'transparent', borderRadius: 12, border: 'none', outline: 'none' }}
                onClick={() => setSelected(idx)}
                tabIndex={0}
                type="button"
                autoComplete="off"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        {/* Content area with animation */}
        <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-white/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#233831] tracking-wide text-center drop-shadow-sm mb-6">
                {tabNames[selected]}
              </div>
              <div className="text-lg md:text-xl text-[#233831] text-center max-w-2xl mx-auto">
                {tabContents[selected]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Merchants;
