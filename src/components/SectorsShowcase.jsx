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
    color: 'from-[#F18A41]/20 to-[#9DADE5]/20',
    imagePosition: 'left',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Hospitality',
    subtitle: 'Seamless guest experiences',
    desc: 'Hotels and restaurants use Finzep for instant payouts, supplier settlements, and digital tips.',
    icon: '🏨',
    stats: '200+ Hotels',
    color: 'from-[#9DADE5]/20 to-[#F18A41]/20',
    imagePosition: 'right',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Logistics',
    subtitle: 'Fast, reliable, and secure',
    desc: 'Automate driver payments, COD settlements, and vendor disbursements with Finzep.',
    icon: '🚛',
    stats: '1000+ Drivers',
    color: 'from-[#F18A41]/20 to-[#9DADE5]/20',
    imagePosition: 'left',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'E-commerce',
    subtitle: 'Powering online business',
    desc: 'Finzep enables instant refunds, seller payouts, and seamless checkout for e-commerce platforms.',
    icon: '🛒',
    stats: '300+ Platforms',
    color: 'from-[#9DADE5]/20 to-[#F18A41]/20',
    imagePosition: 'right',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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

  return (
    <section ref={sectionRef} className="w-full py-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Sectors We Serve</h2>
        
        {/* Progress Bar Only (no headings/percent) */}
        <div className="w-full mb-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full"
            />
          </div>
        </div>
        {/* Sector Cards */}
        <div className="relative min-h-[500px] flex items-center justify-center mt-2">
          <div className="w-full h-full">
            {sectors.map((sector, index) => (
              activeSector === index && (
                <div
                  key={sector.title}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="w-full animate-in fade-in-0 zoom-in-95 duration-500"
                >
                  <div className={`bg-gradient-to-br ${sector.color} backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl min-h-[500px] flex flex-col md:flex-row overflow-hidden`}>
                    {/* Image Section - 30% (Left Position) */}
                    {sector.imagePosition === 'left' && (
                      <div className="w-full h-64 md:w-[30%] md:h-auto flex-shrink-0 relative">
                        <img 
                          src={sector.image} 
                          alt={sector.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback icon */}
                        <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="text-8xl filter drop-shadow-lg">
                            {sector.icon}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Content Section - 70% */}
                    <div className="w-full md:w-[70%] p-6 md:p-8 flex flex-col justify-center flex-1">
                      {/* Title */}
                      <h2 className="text-2xl md:text-4xl font-bold text-[#233831] mb-3">
                        {sector.title}
                      </h2>
                      {/* Subtitle */}
                      <p className="text-lg md:text-xl text-[#233831]/80 font-medium mb-4">
                        {sector.subtitle}
                      </p>
                      {/* Description */}
                      <p className="text-base text-[#233831]/70 leading-relaxed mb-6">
                        {sector.desc}
                      </p>
                      {/* Stats */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                        <div className="bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                          <span className="text-[#233831] font-bold text-lg">{sector.stats}</span>
                        </div>
                        <div className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full px-6 py-3 text-white font-semibold">
                          Active Now
                        </div>
                      </div>
                      {/* Call to Action */}
                      <button className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#9DADE5] hover:to-[#F18A41] w-fit">
                        Learn More
                        <span className="ml-2">→</span>
                      </button>
                    </div>

                    {/* Image Section - 30% (Right Position) */}
                    {sector.imagePosition === 'right' && (
                      <div className="w-full h-64 md:w-[30%] md:h-auto flex-shrink-0 relative order-first md:order-last">
                        <img 
                          src={sector.image} 
                          alt={sector.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback icon */}
                        <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="text-8xl filter drop-shadow-lg">
                            {sector.icon}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        {/* Sector Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {sectors.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeSector === index
                  ? 'bg-gradient-to-r from-[#F18A41] to-[#9DADE5] scale-125'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        {/* Scroll Indicator */}
        {activeSector < sectors.length - 1 && (
          <div className="flex flex-col items-center mt-6 text-[#233831]/60">
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