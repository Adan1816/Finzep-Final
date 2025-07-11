import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutScrollText = () => {
  const startRef = useRef(null);
  const textAnimationRef = useRef(null);
  const finalRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    // Set up smooth scrolling (optional - you can use your preferred smooth scroll library)
    const ctx = gsap.context(() => {
      // Main Text Animation - Color change on scroll
      const mainTextChars = textAnimationRef.current?.querySelectorAll('.text-char');
      if (mainTextChars) {
        gsap.fromTo(
          mainTextChars,
          { color: '#9DADE5' },
          {
            color: '#F18A41',
            stagger: 0.05,
            scrollTrigger: {
              trigger: textAnimationRef.current,
              start: 'top bottom',
              end: 'bottom center',
              scrub: 1,
            },
          }
        );
      }

      // Image Animations for each word
      wordRefs.current.forEach((wordRef, index) => {
        if (!wordRef) return;
        
        const wrapper = wordRef.querySelector('.image-wrapper');
        const revealLeft = wordRef.querySelector('.reveal-left');
        const revealRight = wordRef.querySelector('.reveal-right');
        
        if (!wrapper || !revealLeft || !revealRight) return;

        // Set initial states
        gsap.set(wrapper, { width: 0 });
        gsap.set([revealLeft, revealRight], { xPercent: 0 });

        ScrollTrigger.create({
          trigger: wordRef,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            // Expand wrapper
            gsap.to(wrapper, {
              width: '12vw',
              duration: 0.6,
              ease: 'power2.out',
            });
            
            // Reveal animation
            gsap.to(revealLeft, {
              xPercent: -100,
              duration: 0.6,
              ease: 'power2.out',
            });
            
            gsap.to(revealRight, {
              xPercent: 100,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.08,
            });
          },
          onLeaveBack: () => {
            // Collapse wrapper
            gsap.to(wrapper, {
              width: 0,
              duration: 0.6,
              ease: 'power2.inOut',
            });
            
            // Hide animation
            gsap.to([revealLeft, revealRight], {
              xPercent: 0,
              duration: 0.6,
              ease: 'power2.inOut',
            });
          },
        });
      });

      // Final Text Animation
      const finalTextChars = finalRef.current?.querySelectorAll('.final-char');
      if (finalTextChars) {
        gsap.fromTo(
          finalTextChars,
          { color: '#23243a' },
          {
            color: '#fff',
            stagger: 0.05,
            scrollTrigger: {
              trigger: finalRef.current,
              start: 'top bottom-=15%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const addWordRef = (el, index) => {
    wordRefs.current[index] = el;
  };

  const renderTextWithChars = (text, className) => {
    return text.split('').map((char, index) => (
      <span key={index} className={`${className} inline-block`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const AnimatedWord = ({ children, imageIndex, wordIndex, imageSrc }) => (
    <span 
      ref={(el) => addWordRef(el, wordIndex)}
      className="relative inline-block whitespace-nowrap"
    >
      <span className="relative inline-block">
        {/* Blur background */}
        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-[12vw] max-h-[4.5vw] rounded-full bg-orange-400 blur-[4vw] z-0 pointer-events-none"></span>
        
        {/* Image wrapper */}
        <span className="image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.3vw] w-0 max-w-[12vw] h-[4.5vw]">
          <img
            src={imageSrc}
            alt={`Animation ${imageIndex + 1}`}
            className="absolute top-0 left-1/2 w-[12vw] h-full rounded object-cover transform -translate-x-1/2"
            loading="lazy"
          />
          <div className="reveal-left absolute top-0 left-0 w-1/2 h-full bg-gray-900 z-10 pointer-events-none"></div>
          <div className="reveal-right absolute top-0 right-0 w-1/2 h-full bg-gray-900 z-10 pointer-events-none"></div>
        </span>
      </span>
      
      <span className="ml-2 text-[#F18A41]">{children}</span>
    </span>
  );

  // Sample images - replace with your actual images
  const images = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=200&fit=crop'
  ];

  return (
    <div className="w-full text-white font-sans overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top left, #23243a 0%, #101014 100%)'
    }}>
      {/* Start Screen */}
      <section ref={startRef} className="relative flex items-center justify-center min-h-screen w-full px-0">
        {/* Blur background effect */}
        <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 translate-y-1/2 -z-10 w-[300px] h-[120px] bg-orange-400 rounded-full blur-[200px]"></div>
        
        <div className="relative flex items-center justify-center flex-col w-full max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          <div className="block w-[80px] sm:w-[100px] lg:w-[120px] mb-6 sm:mb-8">
            <img 
              src="/finzep-logo-navbar.png" 
              alt="Finzep Logo"
              className="w-full h-auto"
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-white max-w-full">
            Finzep aims to revolutionize the Digital Payments & Collection system via 3 flagship solutions
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-gray-300 mb-16 sm:mb-20 max-w-3xl">
            Transforming the future of financial technology with innovative solutions.
          </p>
          
          <div className="absolute top-full mt-16 sm:mt-20 left-1/2 transform -translate-x-1/2 w-5 animate-bounce">
            <div className="w-5 h-5 border-2 border-white border-t-0 border-l-0 transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* Text Animation */}
      <section className="flex items-center flex-col w-full px-2 sm:px-4 lg:px-6 py-12 sm:py-16">
        <div className="w-full max-w-7xl">
          <div 
            ref={textAnimationRef}
            className="text-[5.5vw] sm:text-[4.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] leading-tight font-bold text-center uppercase break-words"
          >
            {renderTextWithChars('Transforming ', 'text-char')}
            <AnimatedWord imageIndex={0} wordIndex={0} imageSrc={images[0]}>
              API
            </AnimatedWord>
            {renderTextWithChars(' Banking, Neo Banking,', 'text-char')}
            <br />
            {renderTextWithChars('Connected Banking, and ', 'text-char')}
            <AnimatedWord imageIndex={1} wordIndex={1} imageSrc={images[1]}>
              TSP
            </AnimatedWord>
            {renderTextWithChars(' Business', 'text-char')}
            <br />
            {renderTextWithChars('Models directly with ', 'text-char')}
            <AnimatedWord imageIndex={2} wordIndex={2} imageSrc={images[2]}>
              India's
            </AnimatedWord>
            <br />
            {renderTextWithChars('Leading Banks with ', 'text-char')}
            <AnimatedWord imageIndex={3} wordIndex={3} imageSrc={images[3]}>
              seamless
            </AnimatedWord>
            {renderTextWithChars(' solutions.', 'text-char')}
          </div>
        </div>
      </section>

      {/* Final Screen */}
      <section className="flex items-center flex-col w-full px-2 sm:px-4 lg:px-6 py-12 sm:py-16">
        <div className="w-full max-w-5xl">
          <div 
            ref={finalRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-center max-w-full"
          >
            {renderTextWithChars(
              'Driving fintech innovation through cutting-edge API solutions, empowering businesses with scalability and efficiency across India.',
              'final-char'
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutScrollText;