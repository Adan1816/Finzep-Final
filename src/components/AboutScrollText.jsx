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
          { color: '#ffffff' },
          {
            color: '#06ffff',
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
              width: '14vw',
              duration: 0.5,
              ease: 'power2.out',
            });
            
            // Reveal animation
            gsap.to(revealLeft, {
              xPercent: -100,
              duration: 0.5,
              ease: 'power2.out',
            });
            
            gsap.to(revealRight, {
              xPercent: 100,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.05,
            });
          },
          onLeaveBack: () => {
            // Collapse wrapper
            gsap.to(wrapper, {
              width: 0,
              duration: 0.5,
              ease: 'power2.inOut',
            });
            
            // Hide animation
            gsap.to([revealLeft, revealRight], {
              xPercent: 0,
              duration: 0.5,
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
          { color: '#999999' },
          {
            color: '#ffffff',
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
        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-[13.75vw] max-h-[5.6vw] rounded-full bg-cyan-400 blur-[6.25vw] z-0 pointer-events-none"></span>
        
        {/* Image wrapper */}
        <span className="image-wrapper relative inline-block flex-shrink-0 overflow-hidden mx-[0.5vw] w-0 max-w-[14vw] h-[5.6vw]">
          <img
            src={imageSrc}
            alt={`Animation ${imageIndex + 1}`}
            className="absolute top-0 left-1/2 w-[14vw] h-full rounded object-cover transform -translate-x-1/2"
            loading="lazy"
          />
          <div className="reveal-left absolute top-0 left-0 w-1/2 h-full bg-gray-900 z-10 pointer-events-none"></div>
          <div className="reveal-right absolute top-0 right-0 w-1/2 h-full bg-gray-900 z-10 pointer-events-none"></div>
        </span>
      </span>
      
      <span className="ml-2">{children}</span>
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
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* Start Screen */}
      <section ref={startRef} className="relative flex items-center justify-center min-h-screen">
        {/* Blur background effect */}
        <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 translate-y-1/2 -z-10 w-[400px] h-[160px] bg-cyan-400 rounded-full blur-[300px]"></div>
        
        <div className="relative flex items-center justify-center flex-col max-w-[575px] text-center px-4">
          <div className="block w-[120px] mb-8">
            <div className="w-full h-8 bg-white rounded flex items-center justify-center text-gray-900 font-bold text-sm">
              YOUR LOGO
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-normal uppercase leading-tight mb-4 font-['Oswald']">
            SCROLLING ANIMATION
          </h1>
          
          <p className="text-lg lg:text-xl font-medium leading-relaxed text-gray-400 mb-20 font-['Poppins']">
            Dramatic text presentation is always a good choice. Scroll down to see the animation.
          </p>
          
          <div className="absolute top-full mt-20 left-1/2 transform -translate-x-1/2 w-5 animate-bounce">
            <div className="w-5 h-5 border-2 border-white border-t-0 border-l-0 transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* Text Animation */}
      <section className="flex items-center flex-col mx-[5vw] py-20">
        <div 
          ref={textAnimationRef}
          className="text-[6.5vw] lg:text-[7.35vw] leading-tight font-normal text-center uppercase font-['Oswald']"
        >
          {renderTextWithChars('Quality ', 'text-char')}
          <AnimatedWord imageIndex={0} wordIndex={0} imageSrc={images[0]}>
            is
          </AnimatedWord>
          {renderTextWithChars(' OUR VALUE.', 'text-char')}
          <br />
          {renderTextWithChars('We are sure about the quality ', 'text-char')}
          <AnimatedWord imageIndex={1} wordIndex={1} imageSrc={images[1]}>
            of
          </AnimatedWord>
          {renderTextWithChars(' our', 'text-char')}
          <br />
          {renderTextWithChars('services, since delivering pixel perfect ', 'text-char')}
          <AnimatedWord imageIndex={2} wordIndex={2} imageSrc={images[2]}>
            AND
          </AnimatedWord>
          <br />
          {renderTextWithChars('smooth product to our ', 'text-char')}
          <br />
          <AnimatedWord imageIndex={3} wordIndex={3} imageSrc={images[3]}>
            clients
          </AnimatedWord>
          {renderTextWithChars(' is our main goal.', 'text-char')}
        </div>
      </section>

      {/* Final Screen */}
      <section className="flex items-center flex-col mx-[5vw] py-8">
        <div 
          ref={finalRef}
          className="self-end max-w-[35vw] lg:max-w-full text-2xl lg:text-xl font-medium leading-relaxed text-center lg:text-center font-['Poppins']"
        >
          {renderTextWithChars(
            'By prioritizing quality throughout the development process and beyond, we create exceptional digital experiences that drive user engagement, satisfaction, and business success for our partners.',
            'final-char'
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutScrollText;