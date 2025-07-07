import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ServicesCarousel from '../components/ServicesCarousel';
import SectorsStack from '../components/SectorsStack';
import BlogCardsSection from '../components/BlogCardsSection';

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
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="relative w-full min-h-[calc(100vh-4rem)] pt-24 pb-12 flex items-center justify-center"
        style={{
          overflow: 'hidden',
          backgroundColor: '#fff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.08'%3E%3Ctext x='40' y='120' font-size='60' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Ctext x='200' y='200' font-size='48' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Crect x='350' y='100' width='80' height='20' rx='6' fill='%23233831'/%3E%3Crect x='370' y='140' width='40' height='20' rx='6' fill='%23233831'/%3E%3Cpath d='M100 400 l40 -40 l40 40' stroke='%23233831' stroke-width='8' fill='none'/%3E%3Crect x='120' y='320' width='20' height='60' rx='6' fill='%23233831'/%3E%3Crect x='160' y='340' width='20' height='40' rx='6' fill='%23233831'/%3E%3Crect x='200' y='360' width='20' height='20' rx='6' fill='%23233831'/%3E%3Ctext x='500' y='500' font-size='60' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Ctext x='420' y='420' font-size='48' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Ctext x='300' y='80' font-size='36' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Ctext x='100' y='500' font-size='36' font-family='monospace' fill='%23233831'%3E%E2%82%B9%3C/text%3E%3Crect x='250' y='300' width='30' height='10' rx='3' fill='%23233831'/%3E%3Crect x='280' y='320' width='20' height='10' rx='3' fill='%23233831'/%3E%3Crect x='310' y='340' width='10' height='10' rx='3' fill='%23233831'/%3E%3Cpath d='M500 200 l20 -20 l20 20' stroke='%23233831' stroke-width='5' fill='none'/%3E%3Crect x='520' y='220' width='10' height='30' rx='3' fill='%23233831'/%3E%3Crect x='540' y='240' width='10' height='20' rx='3' fill='%23233831'/%3E%3Crect x='560' y='260' width='10' height='10' rx='3' fill='%23233831'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="relative flex items-center justify-center flex-col w-full max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 text-[#233831] max-w-full">
            Finzep aims to revolutionize the Digital Payments & Collection system via 3 flagship solutions
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-gray-600 mb-16 sm:mb-20 max-w-3xl">
            Transforming the future of financial technology with innovative solutions.
          </p>
          
          <div className="absolute top-full mt-16 sm:mt-20 left-1/2 transform -translate-x-1/2 w-5 animate-bounce">
            <div className="w-5 h-5 border-2 border-[#233831] border-t-0 border-l-0 transform rotate-45"></div>
          </div>
        </div>
      </motion.section>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Secure & Reliable',
                description: 'Bank-level security with 99.9% uptime guarantee',
                icon: '🔒'
              },
              {
                title: 'Easy Integration',
                description: 'Simple APIs and comprehensive documentation',
                icon: '⚡'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support and technical assistance',
                icon: '🛟'
              },
              {
                title: 'Scalable Solutions',
                description: 'Grow with confidence using our scalable infrastructure',
                icon: '📈'
              },
              {
                title: 'Compliance Ready',
                description: 'Built-in compliance with all major financial regulations',
                icon: '✅'
              },
              {
                title: 'Cost Effective',
                description: 'Competitive pricing with transparent fee structure',
                icon: '💰'
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home; 