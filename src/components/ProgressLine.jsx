import React, { useState, useEffect } from 'react';

const ProgressLine = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'hero', label: 'Hero', color: '#F18A41' },
    { id: 'stats', label: 'Stats', color: '#9DADE5' },
    { id: 'services', label: 'Services', color: '#F18A41' },
    { id: 'sectors', label: 'Sectors', color: '#9DADE5' },
    { id: 'blog', label: 'Blog', color: '#F18A41' },
    { id: 'features', label: 'Features', color: '#9DADE5' },
    { id: 'footer', label: 'Footer', color: '#F18A41' }
  ];

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));

      // Determine active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      if (sectionElements.length > 0) {
        const scrollPosition = scrollTop + window.innerHeight / 3;
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const element = sectionElements[i];
          if (scrollPosition >= element.offsetTop) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, [sections]);

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        {/* Background line with glow effect */}
        <div className="w-1 h-96 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-200 animate-pulse opacity-50" />
          
          {/* Progress fill with gradient and glow */}
          <div 
            className="w-1 bg-gradient-to-b from-[#F18A41] via-[#F18A41] to-[#9DADE5] rounded-full transition-all duration-500 ease-out relative"
            style={{ height: `${progress}%` }}
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-[#F18A41] to-[#9DADE5] rounded-full blur-sm progress-glow"
              style={{ height: '100%' }}
            />
          </div>
        </div>
        
        {/* Section markers */}
        {sections.map((section, index) => {
          const sectionProgress = (index / (sections.length - 1)) * 100;
          const isActive = index === activeSection;
          const isCompleted = progress >= sectionProgress;
          
          return (
            <div key={section.id} className="absolute left-0 transform -translate-x-1/2">
              {/* Section dot with pulse animation when active */}
              <div 
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-500 ease-out ${
                  isActive ? 'scale-125 section-pulse' : 'scale-100'
                }`}
                style={{ 
                  top: `${sectionProgress}%`,
                  backgroundColor: isCompleted || isActive ? section.color : '#E5E7EB',
                  transform: `translateY(-50%) ${isActive ? 'scale(1.25)' : 'scale(1)'}`,
                  boxShadow: isActive ? `0 0 0 4px ${section.color}20` : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              
              {/* Section label with fade animation */}
              <div 
                className={`absolute -left-24 top-0 text-xs font-medium transition-all duration-500 ease-out ${
                  isActive ? 'text-[#F18A41] font-semibold' : 'text-gray-500'
                }`}
                style={{ 
                  top: `${sectionProgress}%`,
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap',
                  opacity: isActive ? 1 : 0.7
                }}
              >
                {section.label}
              </div>
              
              {/* Connection line to section with animation */}
              {isActive && (
                <div 
                  className="absolute top-0 w-0.5 bg-[#F18A41] transition-all duration-500 ease-out animate-pulse"
                  style={{ 
                    top: `${sectionProgress}%`,
                    transform: 'translateY(-50%)',
                    height: '2px',
                    left: '8px',
                    boxShadow: '0 0 8px rgba(241, 138, 65, 0.5)'
                  }}
                />
              )}
            </div>
          );
        })}
        
        {/* Progress indicator with glow */}
        <div 
          className="absolute -left-2 w-5 h-5 bg-[#F18A41] rounded-full border-4 border-white shadow-lg transition-all duration-500 ease-out animate-pulse"
          style={{ 
            top: `${progress}%`, 
            transform: 'translateY(-50%)',
            boxShadow: '0 0 0 4px rgba(241, 138, 65, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Progress percentage with fade animation */}
        <div 
          className="absolute -left-20 top-0 text-sm font-semibold text-[#F18A41] transition-all duration-500 ease-out"
          style={{ 
            top: `${progress}%`, 
            transform: 'translateY(-50%)',
            textShadow: '0 0 8px rgba(241, 138, 65, 0.3)'
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressLine; 