import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeading = ({ 
  children, 
  className = "", 
  delay = 0,
  gradient = false,
  underline = true 
}) => {
  const headingRef = useRef(null);
  const underlineRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const heading = headingRef.current;
    const underlineEl = underlineRef.current;
    const words = wordsRef.current;

    if (!heading) return;

    // Split text into words for animation
    const text = heading.textContent;
    const wordsArray = text.split(' ');
    
    // Clear original text and create spans for each word
    heading.innerHTML = '';
    wordsRef.current = [];
    
    wordsArray.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.25em';
      heading.appendChild(span);
      wordsRef.current.push(span);
    });

    // Set initial states
    gsap.set(wordsRef.current, {
      y: 50,
      opacity: 0,
      rotateX: -90,
      transformOrigin: 'center bottom'
    });

    if (underlineEl) {
      gsap.set(underlineEl, {
        scaleX: 0,
        transformOrigin: 'left center'
      });
    }

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate words in sequence
    tl.to(wordsRef.current, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: delay
    });

    // Animate underline
    if (underlineEl) {
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');
    }

    return () => {
      tl.kill();
    };
  }, [children, delay]);

  return (
    <div className="relative inline-block">
      <h2
        ref={headingRef}
        className={`text-4xl md:text-5xl font-bold text-center ${
          gradient 
            ? 'bg-gradient-to-r from-[#F18A41] to-[#9DADE5] bg-clip-text text-transparent' 
            : 'text-[#233831]'
        } ${className}`}
        style={{ perspective: '1000px' }}
      >
        {children}
      </h2>
      
      {underline && (
        <div
          ref={underlineRef}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#F18A41] to-[#9DADE5] rounded-full"
          style={{ width: '60%' }}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#F18A41]/20 rounded-full animate-pulse" />
      <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#9DADE5]/20 rounded-full animate-pulse delay-1000" />
    </div>
  );
};

export default AnimatedHeading; 