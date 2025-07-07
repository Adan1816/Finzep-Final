import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F18A41] to-[#9DADE5] items-center justify-center relative overflow-hidden"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite'
        }}
      >
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        
        {/* Content on gradient side */}
        <div className="text-center text-white z-10 px-8">
          <div className="mx-auto h-24 w-24 mb-8">
            <img 
              src="/finzep-logo-navbar.png" 
              alt="Finzep Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Join Finzep</h1>
          <p className="text-xl text-white/90 mb-6">Transform your payment experience</p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Easy Setup</h3>
                <p className="text-sm text-white/80">Get started in minutes</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="text-sm text-white/80">Bank-level security standards</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-white/80">Instant payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 bg-white"
      >
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Logo - only visible on mobile */}
          <div className="lg:hidden text-center">
            <div className="mx-auto h-16 w-16 mb-6">
              <img 
                src="/finzep-logo-navbar.png" 
                alt="Finzep Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-[#233831] mb-2">Create Account</h2>
            <p className="text-gray-600">Join Finzep and transform your payment experience</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F18A41] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#F18A41] focus:ring-[#F18A41] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#F18A41] font-medium hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#F18A41] font-medium hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#F18A41] to-[#9DADE5] hover:from-[#9DADE5] hover:to-[#F18A41] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F18A41] transition-all duration-200 shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-white group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                Create Account
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#F18A41] hover:text-[#9DADE5] transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup; 