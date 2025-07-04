import React, { useRef, useEffect } from 'react';

const services = [
  {
    title: 'Payments',
    description: 'Seamless payment solutions for your business needs. Our comprehensive payment platform ensures secure, fast, and reliable transactions for businesses of all sizes.',
    icon: '💸',
    link: '#',
  },
  {
    title: 'Collections',
    description: 'Efficient and automated collections for faster cash flow. Streamline your receivables with intelligent automation and real-time tracking.',
    icon: '📥',
    link: '#',
  },
  {
    title: 'Verification APIs',
    description: 'Robust APIs for KYC, bank, and identity verification. Ensure compliance and security with our advanced verification solutions.',
    icon: '🔍',
    link: '#',
  },
  {
    title: 'SAAS',
    description: 'Powerful SaaS tools to streamline your financial operations. Cloud-based solutions that scale with your business growth.',
    icon: '☁️',
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
      
      .service-card {
        --card-color: #F18A41;
        --card-bg-color: #233831;
        --card-icon-size: 5rem;
        --card-title-font-size: 2.5rem;
        --card-title-margin-top: 2rem;
        
        background-color: var(--card-bg-color);
        padding: 1.5rem;
        color: var(--card-color);
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1fr 0 auto;
        grid-template-areas:
          "icon"
          "title"
          "description"
          "link";
        width: 100%;
        height: 360px;
        border-radius: 0.5rem;
        gap: 1rem;
        overflow: hidden;
        transition: all 0.5s ease-in-out;
        position: relative;
        z-index: 1;
      }
      
      .service-card::before {
        content: "";
        display: block;
        height: 0;
        width: 0;
        background-color: var(--card-color);
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
        z-index: -1;
      }
      
      .service-card:hover::before {
        height: 200%;
        width: 200%;
        border-radius: 0;
      }
      
      .service-card__icon {
        grid-area: icon;
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--card-icon-size);
        width: var(--card-icon-size);
        font-size: 3rem;
        transition: all 0.5s ease-in-out;
      }
      
      .service-card__title {
        grid-area: title;
        font-size: var(--card-title-font-size);
        margin-top: var(--card-title-margin-top);
        transition: all 0.5s ease-in-out;
        align-self: flex-end;
        font-weight: bold;
      }
      
      .service-card__description {
        grid-area: description;
        line-height: 1.4;
        opacity: 0;
        transform: translateY(1000px);
        transition: all 0.5s ease-in-out;
        color: var(--card-bg-color);
      }
      
      .service-card__link {
        grid-area: link;
        border: 2px solid var(--card-color);
        color: var(--card-color);
        background-color: var(--card-bg-color);
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        width: fit-content;
        height: fit-content;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.5s ease-in-out;
      }
      
      .service-card__link:hover {
        color: var(--card-bg-color);
        background-color: var(--card-color);
      }
      
      .service-card:hover {
        --card-color: #233831;
        --card-bg-color: #F18A41;
        --card-icon-size: 2.5rem;
        --card-title-margin-top: 0;
        --card-title-font-size: 1.5rem;
        
        grid-template-rows: auto auto auto auto;
        grid-template-areas:
          "icon"
          "title"
          "description"
          "link";
      }
      
      .service-card:hover .service-card__description {
        opacity: 1;
        transform: translateY(0);
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
            <div
              key={service.title + idx}
              className="flex-shrink-0 w-80 mx-5"
            >
              <div className="service-card">
                <div className="service-card__icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <a href={service.link} className="service-card__link">
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel; 