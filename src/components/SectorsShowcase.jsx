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
    const progress = progressRef.current;
    const imageContainer = cardsRef.current[0]; // Image container
    const contentContainer = cardsRef.current[2]; // Content container
    const contentElements = cardsRef.current.slice(3); // Text elements

    if (!section || !progress || !imageContainer || !contentContainer) return;

    // Set initial progress bar state
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left' });

    let currentIndex = 0;
    let isAnimating = false;

    const animateToSector = (newIndex) => {
      if (isAnimating || newIndex === currentIndex) return;
      
      isAnimating = true;
      const prevSector = sectors[currentIndex];
      const newSector = sectors[newIndex];
      
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
          currentIndex = newIndex;
        }
      });

      // Animate content fade out first
      tl.to(contentElements, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05
      });

      // Check if we're on desktop (md breakpoint and above)
      const isDesktop = window.innerWidth >= 768;
      
      // If switching between left and right positioning and on desktop
      if (prevSector.imagePosition !== newSector.imagePosition && isDesktop) {
        if (newSector.imagePosition === 'right') {
          // Slide image from left to right
          tl.to(imageContainer, {
            x: '100%',
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.2)
          .call(() => {
            // Update content and change layout order
            setActiveSector(newIndex);
            imageContainer.style.order = '2';
            contentContainer.style.order = '1';
          })
          .fromTo(imageContainer, 
            { x: '-100%' },
            { 
              x: '0%',
              duration: 0.5,
              ease: "power2.out"
            }
          );
        } else {
          // Slide image from right to left
          tl.to(imageContainer, {
            x: '-100%',
            duration: 0.5,
            ease: "power2.inOut"
          }, 0.2)
          .call(() => {
            // Update content and change layout order
            setActiveSector(newIndex);
            imageContainer.style.order = '1';
            contentContainer.style.order = '2';
          })
          .fromTo(imageContainer, 
            { x: '100%' },
            { 
              x: '0%',
              duration: 0.5,
              ease: "power2.out"
            }
          );
        }
      } else {
        // Same position or mobile - just update content with order change
        tl.call(() => {
          setActiveSector(newIndex);
          if (newSector.imagePosition === 'right') {
            imageContainer.style.order = '2';
            contentContainer.style.order = '1';
          } else {
            imageContainer.style.order = '1';
            contentContainer.style.order = '2';
          }
        }, null, 0.3);
      }

      // Animate content fade in
      tl.to(contentElements, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05
      }, "-=0.3");
    };

    const mainST = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${sectors.length * 100}vh`,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalSectors = sectors.length;
        const exactIndex = progress * (totalSectors - 1);
        const targetIndex = Math.round(exactIndex);
        const clampedIndex = Math.max(0, Math.min(targetIndex, totalSectors - 1));
        
        setScrollProgress(progress);
        
        if (clampedIndex !== currentIndex && !isAnimating) {
          animateToSector(clampedIndex);
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

    // Set initial flex order based on first sector
    if (sectors[0].imagePosition === 'right') {
      imageContainer.style.order = '2';
      contentContainer.style.order = '1';
    } else {
      imageContainer.style.order = '1';
      contentContainer.style.order = '2';
    }

    // Handle window resize
    const handleResize = () => {
      // Reset any transforms on resize
      gsap.set(imageContainer, { x: 0 });
      
      // Update order based on current sector and screen size
      const currentSector = sectors[activeSector];
      if (currentSector.imagePosition === 'right') {
        imageContainer.style.order = '2';
        contentContainer.style.order = '1';
      } else {
        imageContainer.style.order = '1';
        contentContainer.style.order = '2';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            {/* Single Card Container */}
            <div className={`bg-gradient-to-br ${sectors[activeSector]?.color} backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl min-h-[500px] flex flex-col md:flex-row overflow-hidden transition-all duration-500 ease-in-out`}>
              
              {/* Image Section - 30% */}
              <div 
                ref={(el) => (cardsRef.current[0] = el)}
                className="w-full h-64 md:w-[30%] md:h-auto flex-shrink-0 relative overflow-hidden"
              >
                <img 
                  ref={(el) => (cardsRef.current[1] = el)}
                  src={sectors[activeSector]?.image} 
                  alt={sectors[activeSector]?.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback icon */}
                <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-8xl filter drop-shadow-lg">
                    {sectors[activeSector]?.icon}
                  </div>
                </div>
              </div>
              
              {/* Content Section - 70% */}
              <div 
                ref={(el) => (cardsRef.current[2] = el)}
                className="w-full md:w-[70%] p-6 md:p-8 flex flex-col justify-center flex-1"
              >
                {/* Title */}
                <h2 
                  ref={(el) => (cardsRef.current[3] = el)}
                  className="text-2xl md:text-4xl font-bold text-[#233831] mb-3"
                >
                  {sectors[activeSector]?.title}
                </h2>
                {/* Subtitle */}
                <p 
                  ref={(el) => (cardsRef.current[4] = el)}
                  className="text-lg md:text-xl text-[#233831]/80 font-medium mb-4"
                >
                  {sectors[activeSector]?.subtitle}
                </p>
                {/* Description */}
                <p 
                  ref={(el) => (cardsRef.current[5] = el)}
                  className="text-base text-[#233831]/70 leading-relaxed mb-6"
                >
                  {sectors[activeSector]?.desc}
                </p>
                {/* Stats */}
                <div 
                  ref={(el) => (cardsRef.current[6] = el)}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                    <span className="text-[#233831] font-bold text-lg">{sectors[activeSector]?.stats}</span>
                  </div>
                  <div className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full px-6 py-3 text-white font-semibold">
                    Active Now
                  </div>
                </div>
                {/* Call to Action */}
                <button 
                  ref={(el) => (cardsRef.current[7] = el)}
                  className="bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#9DADE5] hover:to-[#F18A41] w-fit"
                >
                  Learn More
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
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