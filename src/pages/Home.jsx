import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServicesCarousel from '../components/ServicesCarousel';
import SectorsStack from '../components/SectorsStack';
import BlogCardsSection from '../components/BlogCardsSection';
import ProgressLine from '../components/ProgressLine';
import Navbar from '../components/Navbar';


// Animated Counter component
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let frame;
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return <span>{count.toLocaleString()}</span>;
};

// Carousel component
const services = [
  { title: 'Payments', description: 'Seamless payment solutions for your business needs.', image: '💸' },
  { title: 'Collections', description: 'Efficient and automated collections for faster cash flow.', image: '📥' },
  { title: 'Verification APIs', description: 'Robust APIs for KYC, bank, and identity verification.', image: '🔍' },
  { title: 'SAAS', description: 'Powerful SaaS tools to streamline your financial operations.', image: '☁️' },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const visibleCount = 3;
  const total = services.length;
  
  // Duplicate services for infinite scroll
  const duplicatedServices = [...services, ...services];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        // Reset to 0 when we reach the end of original services
        if (next >= total) {
          // Use setTimeout to reset position after animation completes
          setTimeout(() => setCurrent(0), 50);
          return next;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  // Calculate transform percentage
  const getTransform = () => {
    const cardWidth = 100 / visibleCount; // Each card takes 1/3 of visible width
    return -(current * cardWidth);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(duplicatedServices.length * 100) / visibleCount}%`,
            transform: `translateX(${getTransform()}%)`,
          }}
        >
          {duplicatedServices.map((service, idx) => (
            <div
              key={`${service.title}-${idx}`}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / duplicatedServices.length}%` }}
            >
              <div className="bg-gradient-to-br from-[#F18A41]/10 to-[#9DADE5]/10 rounded-xl shadow-lg flex flex-col items-center justify-center py-12 mx-2 h-full">
                <div className="text-6xl mb-4">{service.image}</div>
                <div className="text-2xl font-bold text-[#F18A41] mb-2">{service.title}</div>
                <div className="text-base text-gray-800 text-center max-w-xs">{service.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${(current % total) === idx ? 'bg-[#F18A41]' : 'bg-gray-300'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [text, setText] = useState('');
  const phrases = ["Finzep's Innovative Solutions", "Payment Solutions", "Business Growth"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [logoProgress, setLogoProgress] = useState(0); // 0 = hero, 1 = navbar
  const heroLogoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const navbarLogoRef = useRef(null);
  const [logoRects, setLogoRects] = useState({ hero: null, navbar: null });

  // Measure logo positions/sizes
  useEffect(() => {
    function measureRects() {
      const heroRect = heroLogoRef.current?.getBoundingClientRect();
      const navbarRect = navbarLogoRef.current?.getBoundingClientRect();
      setLogoRects({ hero: heroRect, navbar: navbarRect });
    }
    measureRects();
    window.addEventListener('resize', measureRects);
    return () => window.removeEventListener('resize', measureRects);
  }, []);

  // Track scroll and interpolate logo position
  useEffect(() => {
    function onScroll() {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      // Animate between hero (start) and navbar (end) over a short scroll (160px)
      const start = window.innerHeight * 0.9;
      const end = start - 160;
      let progress = 0;
      if (rect.bottom <= end) progress = 1;
      else if (rect.bottom >= start) progress = 0;
      else progress = 1 - (rect.bottom - end) / (start - end);
      setLogoProgress(Math.max(0, Math.min(1, progress)));
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Calculate transform for the animated logo
  let logoStyle = { opacity: 0, pointerEvents: 'none' };
  if (logoRects.hero && logoRects.navbar) {
    // Interpolate position and scale
    const x = logoRects.hero.left + (logoRects.navbar.left - logoRects.hero.left) * logoProgress;
    const y = logoRects.hero.top + (logoRects.navbar.top - logoRects.hero.top) * logoProgress;
    const w = logoRects.hero.width + (logoRects.navbar.width - logoRects.hero.width) * logoProgress;
    const h = logoRects.hero.height + (logoRects.navbar.height - logoRects.hero.height) * logoProgress;
    logoStyle = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: w,
      height: h,
      transform: `translate(${x}px, ${y}px)` + (logoProgress === 0 ? '' : ''),
      transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), width 0.5s, height 0.5s',
      zIndex: 200,
      opacity: 1,
      pointerEvents: 'none',
    };
  }

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const shouldDelete = isDeleting;
    const shouldMoveToNextPhrase = !shouldDelete && text === currentPhrase;
    const shouldStartDeleting = shouldMoveToNextPhrase;
    const shouldMoveToNextIndex = shouldDelete && text === '';

    const timeout = setTimeout(() => {
      if (shouldStartDeleting) {
        setIsDeleting(true);
        setTypingSpeed(50);
      } else if (shouldMoveToNextIndex) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setTypingSpeed(150);
      } else {
        setText(
          shouldDelete
            ? currentPhrase.substring(0, text.length - 1)
            : currentPhrase.substring(0, text.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed]);

  useEffect(() => {
    function onScroll() {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      // If the bottom of the hero section is above the navbar, trigger logo in navbar
      if (rect.bottom <= 80) {
        // setLogoInNavbar(true); // This state is no longer needed
      } else {
        // setLogoInNavbar(false); // This state is no longer needed
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ProgressLine removed */}
      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroSectionRef}
        className="relative bg-gradient-to-br from-white to-[#9DADE5] text-white w-full min-h-[calc(100vh-4rem)] pt-24 pb-12 flex items-center justify-center"
        style={{ overflow: 'hidden' }}
      >
        {/* The hero logo is only visible for measurement, not shown to user */}
        <img
          ref={heroLogoRef}
          src="/FINZEP-LOGO-hiDef.png"
          alt="Finzep Logo Large"
          className="mx-auto invisible"
          style={{ maxWidth: '370px', width: '30vw', height: 'auto', display: 'block', position: 'relative', marginTop: '-50px' }}
        />
      </motion.section>
      {/* Animated logo morphs between hero and navbar */}
      {logoRects.hero && logoRects.navbar && (
        <img
          src="/FINZEP-LOGO-hiDef.png"
          alt="Finzep Logo Animated"
          style={logoStyle}
        />
      )}
      {/* Pass navbarLogoRef to Navbar for measurement */}
      <Navbar navbarLogoRef={navbarLogoRef} navbarLogoStyle={{ height: '6.5rem' }} />

      {/* Stats Section */}
      <motion.section
        id="stats"
        className="relative py-20 bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: 250000,
                label: 'Retailers',
                description: 'Empowering 250,000+ retailers with seamless payment solutions.'
              },
              {
                stat: 50000,
                label: 'Merchants',
                description: 'Serving 50,000 merchants across diverse industries.'
              },
              {
                stat: 3000,
                label: 'Distributors',
                description: 'Trusted by 3,000 distributors for efficient transactions.'
              },
              {
                stat: 200000,
                label: 'Transactions Everyday',
                description: 'Processing over 200,000 transactions every single day.'
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#F18A41]/10 to-[#9DADE5]/10 rounded-xl shadow-lg p-8 flex flex-col items-center">
                <div className="text-5xl font-extrabold text-[#F18A41] mb-2">
                  <AnimatedCounter target={item.stat} duration={1800 + idx * 400} />
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{item.label}</div>
                <div className="text-gray-600 text-center">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section - New Carousel */}
      <motion.section
        id="services"
        className="relative py-20 bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Our Services</h2>
          <ServicesCarousel />
        </div>
      </motion.section>

      {/* Sectors Section - Stacked Cards */}
      <motion.section
        id="sectors"
        className="relative bg-white w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Sectors We Serve</h2>
          <SectorsStack />
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="relative w-full"
      >
        <BlogCardsSection />
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="relative py-20 bg-gray-50 w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Finzep?
            </h2>
            <p className="text-xl text-gray-600 w-full">
              Our comprehensive suite of financial solutions is designed to help your business grow and succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'User Friendly Solutions',
                description: 'Intuitive and easy-to-use financial management tools for efficient operations.',
                icon: '🎯',
              },
              {
                title: 'Security and Compliance',
                description: 'Advanced encryption and compliance measures to protect your data and transactions.',
                icon: '🔒',
              },
              {
                title: 'Financial Services',
                description: 'Comprehensive range of services tailored to meet diverse financial needs.',
                icon: '💼',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 