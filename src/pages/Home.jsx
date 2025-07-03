import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [text, setText] = useState('');
  const phrases = ["Finzep's Innovative Solutions", "Payment Solutions", "Business Growth"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white to-[#9DADE5] text-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl text-black md:text-6xl font-bold mb-6 drop-shadow-lg">
              Elevate Your Business with
            </h1>
            <h2 className="text-3xl text-[#F18A41] md:text-5xl font-bold mb-8 min-h-[60px] drop-shadow-lg">
              {text}
              <span className="animate-blink">|</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-black">
              Scalable platform and plug-and-play APIs simplify checkouts, payment management and effortlessly handle payments, payouts and corporate cards with Finzep and more...
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/aboutus"
                className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Learn More
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 w-full">
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
      </section>
    </div>
  );
};

export default Home; 