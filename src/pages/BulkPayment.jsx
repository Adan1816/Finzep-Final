import { motion } from 'framer-motion';

const BulkPayment = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bulk Payment</h1>
        <p className="text-xl text-gray-600">
          Efficiently distribute funds with our API-driven bulk payout solutions.
        </p>
      </div>
    </motion.div>
  );
};

export default BulkPayment; 