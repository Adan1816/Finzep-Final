import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'stats', label: 'Stats', color: '#F18A41' },
  { id: 'services', label: 'Services', color: '#9DADE5' },
  { id: 'sectors', label: 'Sectors', color: '#F18A41' },
  { id: 'blog', label: 'Blog', color: '#9DADE5' },
  { id: 'features', label: 'Features', color: '#F18A41' },
  { id: 'footer', label: 'Footer', color: '#9DADE5' }
];

export default function ProgressLine() {
  const [progress, setProgress] = useState(0); // 0-1
  const [checkpoints, setCheckpoints] = useState([]); // [{topPct, ...section}]
  const [activeSection, setActiveSection] = useState(0);
  const [barReady, setBarReady] = useState(false);
  const [barMode, setBarMode] = useState('hidden'); // 'hidden', 'absolute-top', 'fixed', 'absolute-bottom'
  const [barStyle, setBarStyle] = useState({ height: 0, top: 0 });

  // Calculate bar range and checkpoints on mount/resize
  useEffect(() => {
    function recalc() {
      const hero = document.getElementById('hero');
      const footer = document.getElementById('footer');
      if (!hero || !footer) {
        setBarReady(false);
        return;
      }
      const barStart = hero.offsetTop + hero.offsetHeight;
      const barEnd = footer.offsetTop;
      const barHeight = barEnd - barStart - 32; // 32px padding above footer
      if (barHeight <= 0) {
        setBarReady(false);
        return;
      }
      // For each section, calculate its top as a percentage of the bar
      const cpts = sections.map((section) => {
        const el = document.getElementById(section.id);
        let pct = 0;
        if (el) {
          pct = ((el.offsetTop - barStart) / barHeight) * 100;
          pct = Math.max(0, Math.min(100, pct));
        }
        return { ...section, topPct: pct };
      });
      setCheckpoints(cpts);
      setBarReady(true);
      setBarStyle({ height: barHeight, top: barStart });
    }
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // Update progress, active section, and bar mode on scroll
  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById('hero');
      const footer = document.getElementById('footer');
      if (!hero || !footer) {
        setBarMode('hidden');
        return;
      }
      const barStart = hero.offsetTop + hero.offsetHeight;
      const barEnd = footer.offsetTop;
      // const barHeight = barEnd - barStart - 32; // removed unused var
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      // Bar mode logic
      if (scrollY + 64 < barStart) {
        setBarMode('absolute-top'); // before hero ends
      } else if (scrollY + winH > barEnd) {
        setBarMode('absolute-bottom'); // at or past footer
      } else {
        setBarMode('fixed'); // in main content
      }
      // Progress calculation
      let pct = 0;
      if (scrollY <= barStart) pct = 0;
      else if (scrollY >= barEnd - winH / 2) pct = 1;
      else pct = (scrollY - barStart) / (barEnd - barStart - winH / 2);
      setProgress(Math.max(0, Math.min(1, pct)));
      // Find active section
      let active = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollY + winH / 3 >= el.offsetTop) {
          active = i;
        }
      }
      setActiveSection(active);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!barReady) return null;

  // Always render the anchor at the end of the hero
  const anchor = (() => {
    const hero = document.getElementById('hero');
    if (!hero) return null;
    const anchorTop = hero.offsetTop + hero.offsetHeight - 12; // 12px offset for dot
    return (
      <div
        className="absolute left-8 z-50 hidden lg:block"
        style={{ top: anchorTop, pointerEvents: 'none' }}
      >
        <div className="w-6 h-6 bg-[#F18A41] rounded-full border-4 border-white shadow-lg" />
        <div className="text-xs text-[#F18A41] font-bold mt-1 ml-2 select-none">Start</div>
      </div>
    );
  })();

  // Bar position logic
  let barPosition = {};
  if (barMode === 'absolute-top') {
    barPosition = {
      position: 'absolute',
      left: '2rem',
      top: barStyle.top,
      height: barStyle.height,
    };
  } else if (barMode === 'fixed') {
    barPosition = {
      position: 'fixed',
      left: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      height: barStyle.height,
    };
  } else if (barMode === 'absolute-bottom') {
    barPosition = {
      position: 'absolute',
      left: '2rem',
      top: barStyle.top + barStyle.height,
      height: 0,
    };
  } else {
    // hidden
    return anchor;
  }

  return (
    <>
      {anchor}
      <div
        className="z-50 hidden lg:block"
        style={barPosition}
      >
        <div className="relative w-16 h-full flex items-center">
          {/* Bar background */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full overflow-visible">
            {/* Progress fill */}
            <div
              className="w-1 bg-gradient-to-b from-[#F18A41] via-[#F18A41] to-[#9DADE5] rounded-full transition-all duration-500 ease-out"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          {/* Checkpoints */}
          {checkpoints.map((cpt, i) => (
            <div
              key={cpt.id}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `calc(${cpt.topPct}% )` }}
            >
              {/* Dot */}
              <div
                className={`w-5 h-5 rounded-full border-4 border-white shadow-lg transition-all duration-500 ease-out ${
                  i === activeSection ? 'scale-125 section-pulse' : 'scale-100'
                }`}
                style={{
                  backgroundColor: progress * 100 >= cpt.topPct ? cpt.color : '#E5E7EB',
                  zIndex: 2
                }}
              />
              {/* Label */}
              <div
                className={`absolute -left-32 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ease-out whitespace-nowrap ${
                  i === activeSection ? 'bg-[#F18A41] text-white font-semibold' : 'bg-white text-gray-600 border border-gray-200'
                }`}
                style={{
                  boxShadow: i === activeSection ? '0 2px 8px rgba(241, 138, 65, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                  opacity: 1
                }}
              >
                {cpt.label}
              </div>
            </div>
          ))}
          {/* Progress indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#F18A41] rounded-full border-4 border-white shadow-lg transition-all duration-500 ease-out"
            style={{
              top: `calc(${progress * 100}% )`,
              boxShadow: '0 0 0 4px rgba(241, 138, 65, 0.2), 0 4px 8px rgba(0,0,0,0.1)',
              animation: progress > 0 ? 'section-pulse 2s ease-in-out infinite' : 'none',
              zIndex: 3
            }}
          />
          {/* Progress percentage */}
          <div
            className="absolute left-10 top-0 px-2 py-1 bg-[#F18A41] text-white text-xs font-semibold rounded-full transition-all duration-500 ease-out"
            style={{
              top: `calc(${progress * 100}% )`,
              transform: 'translateY(-50%)',
              textShadow: '0 0 8px rgba(241, 138, 65, 0.3)',
              boxShadow: '0 2px 8px rgba(241, 138, 65, 0.3)',
              zIndex: 4
            }}
          >
            {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </>
  );
} 