import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { name: "About Us", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Merchants", href: "#merchants" },
  { name: "Developer API", href: "#developer-api" },
];

const PRODUCT_LINKS = [
  { name: "Bulk Payment API", desc: "Efficiently Distribute Funds With Our API-Driven Bulk Payout Solutions", href: "/bulkPayment" },
  { name: "UPI Payouts API", desc: "Enable Instant Cash Flow With API-Enabled UPI Transactions", href: "/upiPayouts" },
  { name: "Initiate Payouts API", desc: "Schedule And Automate Payouts Seamlessly Through Our Flexible API", href: "#" },
  { name: "Remittance API", desc: "Compliant And Reliable Remittance APIs For Secure Transfers", href: "#" },
  { name: "PPI Wallets API", desc: "Offer A Digital Wallet Solution For Easy, API-Integrated Transactions", href: "#" },
  { name: "AadhaarPay API", desc: "Expand Reach With Aadhaar-Based Payments Through Our Secure APIs", href: "#" },
  { name: "Credit Card Bill Payment API", desc: "Simplify Credit Card Bill Payments For Customers With API-Powered Processing", href: "#" },
  { name: "Utility Bill Payment API", desc: "Streamline Utility Payments With Our Convenient API Integration", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef(null);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClick(e) {
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
    }
    if (productOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [productOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/20 backdrop-blur-xl transition-all duration-300" style={{ WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center w-full relative">
          {/* Left: Nav Links */}
          <div className="flex flex-1 items-center space-x-6">
            {/* Product Dropdown */}
            <div
              className="relative"
              ref={productRef}
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium px-2 py-1 rounded flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={productOpen}
                style={{ background: 'none' }}
                tabIndex={-1}
                type="button"
              >
                Product
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
            <Link to="/aboutus" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium px-2 py-1 rounded">About Us</Link>
            <a href="#merchants" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium px-2 py-1 rounded">Merchants</a>
            <a href="#developer-api" className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium px-2 py-1 rounded">Developer API</a>
          </div>

          {/* Center: Logo - Absolutely positioned in exact center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center">
              <img
                src="/finzep-logo-navbar.png"
                alt="Finzep Logo"
                className="h-8 w-auto hover:opacity-80 transition-opacity duration-200"
              />
            </Link>
          </div>

          {/* Right Side Buttons - right on desktop, hamburger on mobile */}
          <div className="flex items-center ml-auto">
            {/* Desktop login/signup */}
            <div className="hidden md:flex md:items-center md:space-x-3 pr-0">
              <Link
                to="/login"
                className="text-[#233831] hover:text-[#F18A41] font-medium px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#F18A41] text-white font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
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
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-xl" style={{ WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            {/* Mobile Logo */}
            <div className="flex justify-center py-4 border-b border-white/20">
              <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img
                  src="/finzep-logo-navbar.png"
                  alt="Finzep Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            {/* Product Dropdown for Mobile */}
            <button
              className="flex items-center justify-between w-full text-white hover:text-[#233831] font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41] bg-white/10 shadow hover:bg-white"
              onClick={() => setMobileProductOpen((open) => !open)}
              aria-expanded={mobileProductOpen}
              style={{ background: 'rgba(34,34,34,0.25)' }}
            >
              <span>Product</span>
              <svg className={`w-4 h-4 ml-2 transition-transform ${mobileProductOpen ? 'rotate-180' : ''} group-hover:text-[#233831]`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
            {/* Other nav links */}
            {NAV_LINKS.map((link) => (
              link.name === 'About Us' ? (
                <Link
                  key={link.name}
                  to="/aboutus"
                  className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-[#233831] hover:text-[#F18A41] font-medium px-2 py-2 rounded transition-colors bg-white/90"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
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
  );
} 