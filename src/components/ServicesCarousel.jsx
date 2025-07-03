import React, { useRef, useEffect } from 'react';

const services = [
  {
    title: 'Payments',
    description: 'Seamless payment solutions for your business needs.',
    image: '/finzep-logo-navbar.png',
    link: '#',
  },
  {
    title: 'Collections',
    description: 'Efficient and automated collections for faster cash flow.',
    image: '/finzep-logo-navbar.png',
    link: '#',
  },
  {
    title: 'Verification APIs',
    description: 'Robust APIs for KYC, bank, and identity verification.',
    image: '/finzep-logo-navbar.png',
    link: '#',
  },
  {
    title: 'SAAS',
    description: 'Powerful SaaS tools to streamline your financial operations.',
    image: '/finzep-logo-navbar.png',
    link: '#',
  },
];

const ANIMATION_DURATION = 30; // seconds

const ServicesCarousel = () => {
  const carouselRef = useRef(null);

  // Duplicate services for seamless infinite scroll
  const allServices = [...services, ...services];

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes scroll-carousel {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .services-carousel-track {
        display: flex;
        width: calc(2 * ${services.length} * 18rem + 2 * ${services.length} * 2rem);
        animation: scroll-carousel ${ANIMATION_DURATION}s linear infinite;
      }
      .services-carousel-paused {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleMouseEnter = () => {
    if (carouselRef.current) {
      carouselRef.current.classList.add('services-carousel-paused');
    }
  };
  const handleMouseLeave = () => {
    if (carouselRef.current) {
      carouselRef.current.classList.remove('services-carousel-paused');
    }
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div
        className="relative overflow-hidden w-full max-w-6xl"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="services-carousel-track"
          ref={carouselRef}
        >
          {allServices.map((service, idx) => (
            <article
              key={service.title + idx}
              className="relative flex-shrink-0 w-80 h-[420px] mx-5 bg-white/30 border border-white/40 rounded-2xl shadow-lg shadow-white/10 backdrop-blur-xl ring-1 ring-white/30 flex flex-col items-center transition-transform duration-300 hover:scale-105"
              style={{
                WebkitBackdropFilter: 'blur(20px)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10) inset, 0 1.5px 8px 0 rgba(255,255,255,0.10)',
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <h2 className="text-2xl font-bold text-[#F18A41] mt-4 mb-2 text-center">{service.title}</h2>
              <div className="flex-1 flex flex-col justify-between px-4 pb-4">
                <p className="text-[#233831] text-base text-center mb-4">{service.description}</p>
                <a
                  href={service.link}
                  className="inline-block border border-[#F18A41] text-[#F18A41] rounded px-4 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-[#F18A41] hover:text-white"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel; 