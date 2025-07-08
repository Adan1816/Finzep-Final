import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: "About Us", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Merchants", href: "#merchants" },
  { name: "Developer API", href: "https://apidocs.finzep.com/" },
];

const PRODUCT_LINKS = [
  { name: "Payments", desc: "Comprehensive payment processing solutions for all your business needs", href: "#" },
  { name: "Collections", desc: "Efficient collection services to streamline your receivables management", href: "#" },
  { name: "Verifications", desc: "Advanced verification services for secure and compliant transactions", href: "#" },
  { name: "Solutions", desc: "Tailored fintech solutions to drive your business growth", href: "#" },
];

const MERCHANT_LINKS = [
  { name: "Private Ltd.", desc: "Solutions tailored for Private Limited Companies", href: "#" },
  { name: "Sole Proprietorship", desc: "Payment solutions for individual business owners", href: "#" },
  { name: "Partnership", desc: "Customized solutions for partnership firms", href: "#" },
  { name: "LLP", desc: "Limited Liability Partnership payment solutions", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef(null);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [merchantOpen, setMerchantOpen] = useState(false);
  const merchantRef = useRef(null);
  const [mobileMerchantOpen, setMobileMerchantOpen] = useState(false);
  const location = useLocation();

  // Floating tablet nav visibility state
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e) {
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
      if (merchantRef.current && !merchantRef.current.contains(e.target)) {
        setMerchantOpen(false);
      }
    }
    if (productOpen || merchantOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [productOpen, merchantOpen]);

  // Handle logo click - scroll to top if on same page, navigate if different page
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If on different page, let the Link handle navigation (which will scroll to top via ScrollToTop component)
  };

  return (
    <>
      {/* SVG Dotted Grid Background */}
      <svg
        style={{ position: 'fixed', width: '100vw', height: '120px', left: 0, top: 0, zIndex: 98, pointerEvents: 'none' }}
        width="100%"
        height="120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dottedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.10)" />
          </pattern>
        </defs>
        <rect width="100%" height="120" fill="url(#dottedGrid)" />
      </svg>

      {/* Floating Tablet Navbar */}
      <nav
        className={`fixed left-1/2 top-8 z-[100] transform -translate-x-1/2 transition-all duration-500
          ${showNav ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'}
          w-[99vw] max-w-7xl rounded-full shadow-2xl bg-white/30 border border-white/40 flex items-center px-20 py-4
        `}
        style={{
          WebkitBackdropFilter: 'blur(32px)',
          backdropFilter: 'blur(32px)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10), 0 1px 8px 0 rgba(255,255,255,0.10) inset',
          border: '1.5px solid rgba(255,255,255,0.40)',
          background: 'linear-gradient(120deg, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.18) 100%)',
        }}
      >
        {/* Custom Shadow Under Navbar */}
        <div
          style={{
            position: 'absolute',
            zIndex: 0,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: '999vw',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        />
          {/* Left: Nav Links */}
        <div className="flex flex-1 items-center space-x-1 min-w-0 pr-16 justify-start">
            {/* Product Dropdown */}
            <div
              className="relative"
              ref={productRef}
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium py-1 pl-0 rounded flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={productOpen}
                style={{ background: 'none', paddingLeft: 0, paddingRight: 10 }}
                tabIndex={-1}
                type="button"
              >
                Product
              </button>
              {productOpen && (
                <div
                  className="absolute left-0 min-w-full w-[420px] rounded-2xl shadow-lg shadow-white/10 border border-white/40 backdrop-blur-xl ring-1 ring-white/30 z-50 overflow-hidden animate-fadeIn"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    WebkitBackdropFilter: 'blur(20px)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10) inset, 0 1.5px 8px 0 rgba(0,0,0,0.10)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    willChange: 'backdrop-filter'
                  }}
                >
                  <div className="pt-2 p-4 grid grid-cols-1 gap-2">
                    {PRODUCT_LINKS.map(link => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="flex items-start gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/80 hover:backdrop-blur-2xl hover:shadow-[0_0_16px_2px_rgba(241,138,65,0.35)] focus:shadow-[0_0_16px_2px_rgba(241,138,65,0.45)]"
                      >
                        <span className="mt-1 text-[#F18A41]">
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.15"/><path d="M7 10l3 3 3-3" stroke="#F18A41" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <span>
                          <span className="block font-semibold text-[#233831]">{link.name}</span>
                          <span className="block text-xs text-[#233831] opacity-80">{link.desc}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Other nav links */}
            <Link to="/aboutus" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium py-1 rounded" style={{ paddingRight: 10 }}>About Us</Link>
          
          {/* Merchants Dropdown */}
          <div
            className="relative"
            ref={merchantRef}
            onMouseEnter={() => setMerchantOpen(true)}
            onMouseLeave={() => setMerchantOpen(false)}
          >
            <button
              className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium py-1 rounded flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={merchantOpen}
              style={{ background: 'none', paddingLeft: 0, paddingRight: 10 }}
              tabIndex={-1}
              type="button"
            >
              Merchants
            </button>
            {merchantOpen && (
              <div
                className="absolute left-0 min-w-full w-[420px] rounded-2xl shadow-lg shadow-white/10 border border-white/40 backdrop-blur-xl ring-1 ring-white/30 z-50 overflow-hidden animate-fadeIn"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  WebkitBackdropFilter: 'blur(20px)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10) inset, 0 1.5px 8px 0 rgba(0,0,0,0.10)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  willChange: 'backdrop-filter'
                }}
              >
                <div className="pt-2 p-4 grid grid-cols-1 gap-2">
                  {MERCHANT_LINKS.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="flex items-start gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/80 hover:backdrop-blur-2xl hover:shadow-[0_0_16px_2px_rgba(241,138,65,0.35)] focus:shadow-[0_0_16px_2px_rgba(241,138,65,0.45)]"
                    >
                      <span className="mt-1 text-[#F18A41]">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.15"/><path d="M7 10l3 3 3-3" stroke="#F18A41" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-[#233831]">{link.name}</span>
                        <span className="block text-xs text-[#233831] opacity-80">{link.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blogs Button */}
          <Link to="/blogs" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium py-1 rounded" style={{ paddingRight: 10 }}>Blogs</Link>

          <a href="https://apidocs.finzep.com/" target="_blank" rel="noopener noreferrer" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium py-1 rounded" style={{ paddingRight: 10 }}>Developer API</a>
        </div>

        {/* Center: Logo - Absolutely positioned in exact center, with extra margin to avoid overlap */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-8">
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <img
              src="/finzep-logo-navbar.png"
              alt="Finzep Logo"
              className="h-10 w-auto hover:opacity-80 transition-opacity duration-200"
              style={{ maxWidth: '120px' }}
            />
          </Link>
          </div>

          {/* Right Side Buttons - right on desktop, hamburger on mobile */}
        <div className="flex items-center ml-auto min-w-0">
            {/* Desktop login/signup */}
          <div className="hidden md:flex md:items-center md:space-x-4 pr-0">
            <Link
              to="/login"
              className="text-[#233831] hover:text-[#F18A41] font-medium px-5 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              >
                Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#F18A41] text-white font-semibold px-7 py-2 rounded-full shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              >
                Sign Up
            </Link>
            </div>
            {/* Hamburger - only on mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#F18A41] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F18A41] shadow"
                aria-label="Toggle menu"
                style={{ background: 'rgba(34,34,34,0.25)' }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-xl" style={{ WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
              {/* Mobile Logo */}
              <div className="flex justify-center py-4 border-b border-white/20">
                <Link to="/" className="flex items-center" onClick={(e) => {
                  setMobileOpen(false);
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}>
                  <img
                    src="/finzep-logo-navbar.png"
                    alt="Finzep Logo"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
            {/* Product Dropdown for Mobile */}
            <button
              className="flex items-center justify-between w-full text-white hover:text-[#233831] font-medium px-3 py-2 rounded transition-colors bg-white/10 shadow hover:bg-white"
              onClick={() => setMobileProductOpen((open) => !open)}
              aria-expanded={mobileProductOpen}
              style={{ background: 'rgba(34,34,34,0.25)' }}
            >
              <span>Product</span>
            </button>
            {mobileProductOpen && (
              <div className="pl-4 py-2 space-y-1">
                {PRODUCT_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="font-semibold">{link.name}</div>
                    <div className="text-xs text-gray-600">{link.desc}</div>
                  </a>
                ))}
              </div>
            )}
              
              {/* Merchants Dropdown for Mobile */}
              <button
                className="flex items-center justify-between w-full text-white hover:text-[#233831] font-medium px-3 py-2 rounded transition-colors bg-white/10 shadow hover:bg-white"
                onClick={() => setMobileMerchantOpen((open) => !open)}
                aria-expanded={mobileMerchantOpen}
                style={{ background: 'rgba(34,34,34,0.25)' }}
              >
                <span>Merchants</span>
              </button>
              {mobileMerchantOpen && (
                <div className="pl-4 py-2 space-y-1">
                  {MERCHANT_LINKS.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="font-semibold">{link.name}</div>
                      <div className="text-xs text-gray-600">{link.desc}</div>
                    </a>
                  ))}
                </div>
              )}
            {/* Other nav links */}
            <Link
              to="/aboutus"
              className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>
            {/* Blogs Button for Mobile */}
            <Link
              to="/blogs"
              className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Blogs
            </Link>
            <a
              href="https://apidocs.finzep.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Developer API
            </a>
              <Link
                to="/login"
              className="block text-[#233831] hover:text-[#F18A41] font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              onClick={() => setMobileOpen(false)}
            >
              Login
              </Link>
              <Link
                to="/signup"
              className="block bg-[#F18A41] text-white font-semibold px-3 py-2 rounded-lg shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
              </Link>
            </div>
        </div>
      )}
    </nav>
    </>
  );
} 