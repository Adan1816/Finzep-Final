import { useEffect, useState } from 'react';

const sectionIds = [
  'hero',
  'stats',
  'services',
  'sectors',
  'blog',
  'features',
];

export default function ProgressLine() {
  const [positions, setPositions] = useState([]);
  const [activeSection, setActiveSection] = useState(0);

  // Calculate section positions on mount/resize
  useEffect(() => {
    function recalcPositions() {
      const pos = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (el) {
          return el.offsetTop;
        }
        return null;
      });
      setPositions(pos);
    }
    recalcPositions();
    window.addEventListener('resize', recalcPositions);
    return () => window.removeEventListener('resize', recalcPositions);
  }, []);

  // Track scroll to update active section
  useEffect(() => {
    function onScroll() {
      let current = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          if (el.getBoundingClientRect().top <= window.innerHeight * 0.3) {
            current = i;
          }
        }
      }
      setActiveSection(current);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Calculate dot position along the line
  const getDotPosition = () => {
    if (!positions.length) return 0;
    const start = positions[0] || 0;
    const end = positions[positions.length - 1] || 1;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY <= start) return 0;
    if (scrollY >= end) return 100;
    return ((scrollY - start) / (end - start)) * 100;
  };

  // Only show on large screens
  return (
    <div className="fixed left-6 top-1/2 z-50 hidden lg:block" style={{ transform: 'translateY(-50%)' }}>
      <div className="relative h-[70vh] w-8 flex flex-col items-center justify-center">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#F18A41] via-[#9DADE5] to-[#F18A41] rounded-full" />
        {/* Section markers */}
        {positions.map((pos, idx) => (
          <div
            key={sectionIds[idx]}
            className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${
              idx === activeSection ? 'bg-[#F18A41] scale-125 animate-pulse' : 'bg-[#9DADE5] scale-100'
            }`}
            style={{
              top: `calc(${(idx / (positions.length - 1)) * 100}% - 10px)`
            }}
          />
        ))}
        {/* Animated moving dot */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-[#F18A41] rounded-full border-4 border-white shadow-lg transition-all duration-500"
          style={{
            top: `calc(${getDotPosition()}% - 14px)`,
            boxShadow: '0 0 0 8px #f18a4133, 0 4px 8px rgba(0,0,0,0.1)',
            animation: 'section-pulse 2s ease-in-out infinite',
            zIndex: 10
          }}
        />
      </div>
    </div>
  );
} 