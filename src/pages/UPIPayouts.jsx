import { motion } from 'framer-motion';

const UPIPayouts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">UPI Payouts</h1>
        <p className="text-xl text-gray-600">
          Enable instant cash flow with API-enabled UPI transactions.
        </p>
      </div>
    </motion.div>
  );
};

export default UPIPayouts; 