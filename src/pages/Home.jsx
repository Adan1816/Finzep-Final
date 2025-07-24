import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ServicesCarousel from '../components/ServicesCarousel';
import SectorsShowcase from '../components/SectorsShowcase';
import BlogCardsSection from '../components/BlogCardsSection';
import ScrollProgressCards from '../components/ScrollProgressCards';
import HeroGlobe from '../components/HeroGlobe';

const AnimatedCounter = ({ target, duration = 2000, isVisible = false }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isVisible, hasAnimated, target, duration]);

  return count.toLocaleString();
};

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const services = [
    { title: 'Bulk Payment API', description: 'Efficiently Distribute Funds With Our API-Driven Bulk Payout Solutions', image: '💰' },
    { title: 'UPI Payouts API', description: 'Enable Instant Cash Flow With API-Enabled UPI Transactions', image: '⚡' },
    { title: 'Initiate Payouts API', description: 'Schedule And Automate Payouts Seamlessly Through Our Flexible API', image: '🔄' },
    { title: 'Remittance API', description: 'Compliant And Reliable Remittance APIs For Secure Transfers', image: '🌍' },
    { title: 'PPI Wallets API', description: 'Offer A Digital Wallet Solution For Easy, API-Integrated Transactions', image: '💳' },
    { title: 'AadhaarPay API', description: 'Expand Reach With Aadhaar-Based Payments Through Our Secure APIs', image: '🆔' },
    { title: 'Credit Card Bill Payment API', description: 'Simplify Credit Card Bill Payments For Customers With API-Powered Processing', image: '💳' },
    { title: 'Utility Bill Payment API', description: 'Streamline Utility Payments With Our Convenient API Integration', image: '⚡' },
  ];

  const visibleCount = 4;
  const duplicatedServices = [...services, ...services];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  const getTransform = () => {
    return -(current * (100 / duplicatedServices.length));
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
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${(current % services.length) === idx ? 'bg-[#F18A41]' : 'bg-gray-300'}`}
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
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, text.length - 1));
        }, typingSpeed / 2);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(150);
      }
    }
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - 3D Globe */}
      <HeroGlobe />

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
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
                  <AnimatedCounter 
                    target={item.stat} 
                    duration={1800 + idx * 400} 
                    isVisible={statsVisible}
                  />
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
        </div>
        <div className="w-full">
          <ServicesCarousel />
        </div>
      </motion.section>

      {/* Sectors Section - Stacked Cards */}
      <motion.section
        id="sectors"
        className="relative bg-white w-full"
      >
        <SectorsShowcase />
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="relative w-full"
      >
        <BlogCardsSection />
      </motion.section>

      {/* Why Choose Finzep Section */}
      <motion.section
        id="features"
        className="relative w-full"
      >
        <ScrollProgressCards />
      </motion.section>
    </div>
  );
};

export default Home; 