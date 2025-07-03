import React, { useState } from "react";

const NAV_LINKS = [
  { name: "About Us", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Merchants", href: "#merchants" },
  { name: "Developer API", href: "#developer-api" },
  { name: "NAD", href: "#nad" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/20 backdrop-blur-xl transition-all duration-300" style={{ WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <img
                src="/finzep-logo-navbar.png"
                alt="Finzep Logo"
                className="h-8 w-auto transition-transform group-hover:scale-105"
                style={{ maxHeight: '2.5rem' }}
              />
              {/* Optionally, keep the text for accessibility or branding */}
              {/* <span className="text-2xl font-extrabold tracking-tight" style={{ color: '#F18A41' }}>
                Finzep
              </span> */}
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#233831] hover:text-[#F18A41] transition-colors font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <a
              href="#login"
              className="text-[#233831] hover:text-[#F18A41] font-medium px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
            >
              Login
            </a>
            <a
              href="#signup"
              className="bg-[#F18A41] text-white font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#233831] hover:text-[#F18A41] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F18A41]"
              aria-label="Toggle menu"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-xl" style={{ WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-[#233831] hover:text-[#F18A41] font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#login"
              className="block text-[#233831] hover:text-[#F18A41] font-medium px-3 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>
            <a
              href="#signup"
              className="block bg-[#F18A41] text-white font-semibold px-3 py-2 rounded-lg shadow hover:bg-[#233831] hover:text-[#F18A41] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F18A41]"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 