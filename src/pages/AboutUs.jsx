import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <p className="text-xl text-gray-600">
          Finzep revolutionizes financial management with secure, user-friendly solutions, driving financial inclusion for businesses and individuals while addressing modern financial challenges in the fintech space.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutUs; 