import { useEffect, useState } from 'react';

export default function SectionCover({ show, sectionName }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let timeout;
    if (show) {
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 w-full h-full z-50 flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
      style={{
        background: 'rgba(241, 138, 65, 0.95)',
        transitionProperty: 'opacity, transform',
      }}
    >
      <span className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg animate-fade-in">
        {sectionName}
      </span>
    </div>
  );
} 