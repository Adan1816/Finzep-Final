import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Bulk Payment', path: '/bulkPayment' },
      { label: 'UPI Payouts', path: '/upiPayouts' },
      { label: 'Corporate Card', path: '/corporate-card' },
    ],
    sectors: [
      { label: 'Healthcare', path: '/sectors/healthcare' },
      { label: 'Education', path: '/sectors/education' },
      { label: 'E-commerce', path: '/sectors/ecommerce' },
      { label: 'Real Estate', path: '/sectors/real-estate' },
    ],
    company: [
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
    ],
  };

  return (
    <footer id="footer" className="relative bg-white/80 backdrop-blur-xl border-t border-white/10" style={{
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(156,163,175,0.18) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(107,114,128,0.12) 1px, transparent 0)
      `,
      backgroundSize: '20px 20px, 40px 40px',
      backgroundPosition: '0 0, 10px 10px'
    }}>
      {/* Enhanced glassy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 backdrop-blur-lg"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/">
              <img
                src="/finzep-logo-navbar.png"
                alt="Finzep"
                className="h-8 w-auto mb-4 hover:opacity-80 transition-opacity duration-200"
              />
            </Link>
            <p className="text-gray-800 mb-4 font-medium">
              Elevate your business with Finzep's innovative solutions. Scalable platform and plug-and-play APIs simplify checkouts, payment management and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold text-orange-700 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-800 hover:text-orange-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors Links */}
          <div>
            <h3 className="text-sm font-bold text-orange-700 tracking-wider uppercase mb-4">
              Sectors
            </h3>
            <ul className="space-y-4">
              {footerLinks.sectors.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-800 hover:text-orange-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-sm font-bold text-orange-700 tracking-wider uppercase mb-4">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/aboutus" className="text-gray-800 hover:text-orange-600 transition-colors font-medium">
                  About Us
                </Link>
              </li>
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-800 hover:text-orange-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/20" />

        {/* Contact Information Section - No Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Address */}
          <div className="flex items-start">
            <svg className="h-5 w-5 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-orange-700 mb-1">Address</h4>
              <p className="text-gray-800 text-sm font-medium">
                411, REGUS TOWER, 4TH FLOOR, PLOT NO 18, SEC-142<br />
                Nepz Post Office, Gautam Buddha Nagar, Noida Uttar Pradesh<br />
                India, 201305
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <svg className="h-5 w-5 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-orange-700 mb-1">Email</h4>
              <a href="mailto:contact@finzep.com" className="text-gray-800 hover:text-orange-600 transition-colors text-sm font-medium">
                info@finzep.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start">
            <svg className="h-5 w-5 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-orange-700 mb-1">Phone</h4>
              <a href="tel:+911234567890" className="text-gray-800 hover:text-orange-600 transition-colors text-sm font-medium">
                +91-9151838538
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-white/20" />

        {/* Copyright and Legal Links - No Box */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 text-sm font-medium">
            © {new Date().getFullYear()} Finzep. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 