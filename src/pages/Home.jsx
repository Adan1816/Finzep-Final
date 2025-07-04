import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServicesCarousel from '../components/ServicesCarousel';
import SectorsStack from '../components/SectorsStack';
import BlogCardsSection from '../components/BlogCardsSection';
import ProgressLine from '../components/ProgressLine';
import SectionCover from '../components/SectionCover';

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

const sectionMeta = [
  { id: 'hero', name: 'Home' },
  { id: 'stats', name: 'Stats' },
  { id: 'services', name: 'Services' },
  { id: 'sectors', name: 'Sectors' },
  { id: 'blog', name: 'Blog' },
  { id: 'features', name: 'Features' },
];

const Home = () => {
  const [text, setText] = useState('');
  const phrases = ["Finzep's Innovative Solutions", "Payment Solutions", "Business Growth"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [activeSection, setActiveSection] = useState(null);
  const [coverTrigger, setCoverTrigger] = useState({});

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
      let current = null;
      for (let i = 0; i < sectionMeta.length; i++) {
        const el = document.getElementById(sectionMeta[i].id);
        if (el) {
          if (el.getBoundingClientRect().top <= window.innerHeight * 0.3 && el.getBoundingClientRect().bottom > window.innerHeight * 0.2) {
            current = sectionMeta[i].id;
          }
        }
      }
      if (current && activeSection !== current) {
        setActiveSection(current);
        setCoverTrigger((prev) => ({ ...prev, [current]: (prev[current] || 0) + 1 }));
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSection]);

  return (
    <div className="min-h-screen">
      {/* ProgressLine removed */}
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="relative bg-gradient-to-br from-white to-[#9DADE5] text-white w-full min-h-[calc(100vh-4rem)] pt-24 pb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['hero']} sectionName="Home" />
        <div className="w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full h-full items-center justify-between">
            {/* Left: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start h-full min-h-[400px] mt-8 md:mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 className="text-2xl md:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg text-center md:text-left text-black">
                  Elevate Your Business with
                </h1>
                <h2 className="text-lg md:text-5xl font-bold mb-6 md:mb-8 min-h-[40px] md:min-h-[60px] drop-shadow-lg text-[#F18A41] text-center md:text-left">
                  {text}
                  <span className="animate-blink">|</span>
                </h2>
                <p className="text-base md:text-2xl mb-8 md:mb-12 max-w-3xl text-black text-center md:text-left">
                  Scalable platform and plug-and-play APIs simplify checkouts, payment management and effortlessly handle payments, payouts and corporate cards with Finzep and more...
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full items-center md:items-start justify-center md:justify-start">
                  <Link
                    to="/aboutus"
                    className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors w-full sm:w-auto text-center"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
            </div>
            {/* Right: Media Placeholder */}
            <div className="hidden md:flex w-1/2 h-full items-center justify-center">
              {/* Add your media (image, animation, etc.) here */}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        id="stats"
        className="relative py-20 bg-white w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['stats']} sectionName="Stats" />
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['services']} sectionName="Services" />
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Our Services</h2>
          <ServicesCarousel />
        </div>
      </motion.section>

      {/* Sectors Section - Stacked Cards */}
      <motion.section
        id="sectors"
        className="relative bg-white w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['sectors']} sectionName="Sectors" />
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Sectors We Serve</h2>
          <SectorsStack />
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        id="blog"
        className="relative w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['blog']} sectionName="Blog" />
        <BlogCardsSection />
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="relative py-20 bg-gray-50 w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionCover show={!!coverTrigger['features']} sectionName="Features" />
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Finzep?
            </h2>
            <p className="text-xl text-gray-600 w-full">
              Our comprehensive suite of financial solutions is designed to help your business grow and succeed.
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
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