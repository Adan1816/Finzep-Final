import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sectors = [
  {
    title: 'Education',
    subtitle: 'Empowering learning with digital payments',
    desc: 'Finzep streamlines fee collection, payroll, and vendor payments for schools, colleges, and edtech platforms.',
    icon: '🎓',
    stats: '500+ Schools',
    color: 'from-[#F18A41]/20 to-[#9DADE5]/20'
  },
  {
    title: 'Hospitality',
    subtitle: 'Seamless guest experiences',
    desc: 'Hotels and restaurants use Finzep for instant payouts, supplier settlements, and digital tips.',
    icon: '🏨',
    stats: '200+ Hotels',
    color: 'from-[#9DADE5]/20 to-[#F18A41]/20'
  },
  {
    title: 'Logistics',
    subtitle: 'Fast, reliable, and secure',
    desc: 'Automate driver payments, COD settlements, and vendor disbursements with Finzep.',
    icon: '🚛',
    stats: '1000+ Drivers',
    color: 'from-[#F18A41]/20 to-[#9DADE5]/20'
  },
  {
    title: 'E-commerce',
    subtitle: 'Powering online business',
    desc: 'Finzep enables instant refunds, seller payouts, and seamless checkout for e-commerce platforms.',
    icon: '🛒',
    stats: '300+ Platforms',
    color: 'from-[#9DADE5]/20 to-[#F18A41]/20'
  }
];

const SectorsShowcase = () => {
  const [activeSector, setActiveSector] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const progress = progressRef.current;

    if (!section || !cards.length || !progress) return;

    // Set initial progress bar state
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${sectors.length * 100}vh`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const sectorIndex = Math.floor(progress * sectors.length);
          const clampedIndex = Math.min(sectorIndex, sectors.length - 1);
          
          // Update scroll progress for smooth progress bar
          setScrollProgress(progress);
          
          if (clampedIndex !== activeSector) {
            setActiveSector(clampedIndex);
          }
        }
      }
    });

    // Animate progress bar smoothly with GSAP
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${sectors.length * 100}vh`,
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [activeSector]);

  const handleSectorClick = (index) => {
    setActiveSector(index);
  };

  return (
    <section ref={sectionRef} className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#233831]">
              Exploring Sectors ({activeSector + 1} of {sectors.length})
            </h3>
            <div className="text-sm text-[#233831]/70">
              {Math.round(scrollProgress * 100)}% Complete
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full"
            />
          </div>
        </div>

        {/* Sector Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {sectors.map((sector, index) => (
            <button
              key={sector.title}
              onClick={() => handleSectorClick(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeSector === index
                  ? 'bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white shadow-lg'
                  : 'bg-white text-[#233831] border-2 border-gray-200 hover:border-[#F18A41]/50 hover:bg-[#F18A41]/5'
              }`}
            >
              <span className="mr-2">{sector.icon}</span>
              {sector.title}
            </button>
          ))}
        </div>

        {/* Sector Cards */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          <div className="w-full h-full">
            {sectors.map((sector, index) => (
              activeSector === index && (
                <div
                  key={sector.title}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="w-full h-full animate-in fade-in-0 zoom-in-95 duration-500"
                >
                  <div className={`bg-gradient-to-br ${sector.color} backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl h-full flex flex-col justify-center items-center text-center`}>
                    
                    {/* Icon */}
                    <div className="text-8xl mb-6 filter drop-shadow-lg">
                      {sector.icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-[#233831] mb-4">
                      {sector.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-[#233831]/80 font-medium mb-6">
                      {sector.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-lg text-[#233831]/70 max-w-2xl leading-relaxed mb-8">
                      {sector.desc}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                        <span className="text-[#233831] font-bold text-lg">{sector.stats}</span>
                      </div>
                      <div className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full px-6 py-3 text-white font-semibold">
                        Active Now
                      </div>
                    </div>

                    {/* Call to Action */}
                    <button className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#9DADE5] hover:to-[#F18A41]">
                      Learn More
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Sector Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {sectors.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSectorClick(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeSector === index
                  ? 'bg-gradient-to-r from-[#F18A41] to-[#9DADE5] scale-125'
                  : 'bg-gray-300 hover:bg-[#F18A41]/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        {activeSector < sectors.length - 1 && (
          <div className="flex flex-col items-center mt-8 text-[#233831]/60">
            <div className="text-sm font-medium mb-2">Scroll to continue</div>
            <div className="w-6 h-6 animate-bounce">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectorsShowcase; 