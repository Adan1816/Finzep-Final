import React, { useEffect, useRef } from 'react';
import AboutScrollText from '../components/AboutScrollText';
import TeamScrollGallery from '../components/TeamScrollGallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const graffitiRef = useRef(null);
  
  // Immediate scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Additional animations for the About Us page
    const ctx = gsap.context(() => {
      // Cards animation with smooth batch fade-in from bottom
      ScrollTrigger.batch('.card-item', {
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.10,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        onLeaveBack: batch => {
          gsap.to(batch, {
            opacity: 0,
            y: 40,
            stagger: 0.10,
            duration: 0.4,
            ease: 'power2.in',
          });
        },
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      });
      gsap.set('.card-item', { opacity: 0, y: 40 });





      // Team section pinning animation
      ScrollTrigger.create({
        trigger: '.team-section',
        start: 'top top',
        end: '+=700vh', // Precise scroll distance for 7 team members (100vh each)
        pin: true,
        pinSpacing: true, // Allow space for pinned content
        anticipatePin: 1,
        onUpdate(self) {
          // Let the inner gallery handle its own animation
          // When animation completes, this will automatically release the pin
        }
      });

      // CTA section animation
      gsap.fromTo('.cta-content', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
          }
        }
      );
    });

    // Ensure page starts from top after all ScrollTrigger setup
    setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Graffiti scroll animation
    const handleScroll = () => {
      const section = document.getElementById('about-graffiti-section');
      if (!section || !graffitiRef.current) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate scroll progress (0 at top, 1 at bottom)
      const progress = Math.min(1, Math.max(0, 1 - rect.top / (rect.height - windowHeight/2)));
      // Move inward up to 80px from each side
      const translate = 80 * progress;
      graffitiRef.current.style.transform = `translate(${translate}px, ${translate}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top left, #23243a 0%, #101014 100%)',
      minHeight: '100vh',
      color: '#e5e7eb',
    }}>
      {/* Scroll Animation Section */}
      <AboutScrollText />

      {/* Additional Content Sections */}
      <section id="about-graffiti-section" className="py-20 bg-white relative overflow-hidden">
        {/* Animated Graffiti Background */}
        <div ref={graffitiRef} className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" style={{opacity: 0.22, transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'}}>
          <svg width="100vw" height="100%" viewBox="0 0 2000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <g>
              {/* Row 1 */}
              <text x="60" y="100" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              <text x="400" y="100" fontSize="48" fontFamily="monospace" fill="#001a46">💸</text>
              <text x="800" y="100" fontSize="36" fontFamily="monospace" fill="#9DADE5">↑</text>
              <text x="1200" y="100" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              <text x="1600" y="100" fontSize="48" fontFamily="monospace" fill="#001a46">📈</text>
              <text x="1900" y="100" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              {/* Row 2 */}
              <text x="200" y="350" fontSize="48" fontFamily="monospace" fill="#001a46">💰</text>
              <text x="600" y="350" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              <text x="1000" y="350" fontSize="36" fontFamily="monospace" fill="#9DADE5">↓</text>
              <text x="1400" y="350" fontSize="48" fontFamily="monospace" fill="#001a46">💸</text>
              <text x="1800" y="350" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              {/* Row 3 */}
              <text x="60" y="600" fontSize="36" fontFamily="monospace" fill="#9DADE5">↑</text>
              <text x="400" y="600" fontSize="48" fontFamily="monospace" fill="#001a46">📈</text>
              <text x="800" y="600" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              <text x="1200" y="600" fontSize="48" fontFamily="monospace" fill="#001a46">💰</text>
              <text x="1600" y="600" fontSize="36" fontFamily="monospace" fill="#9DADE5">↓</text>
              <text x="1900" y="600" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              {/* Row 4 (bottom) */}
              <text x="200" y="900" fontSize="48" fontFamily="monospace" fill="#001a46">💸</text>
              <text x="600" y="900" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
              <text x="1000" y="900" fontSize="36" fontFamily="monospace" fill="#9DADE5">↑</text>
              <text x="1400" y="900" fontSize="48" fontFamily="monospace" fill="#001a46">💰</text>
              <text x="1800" y="900" fontSize="60" fontFamily="monospace" fill="#F18A41">₹</text>
            </g>
          </svg>
        </div>
        <style>{`
          @keyframes finance-bg-move {
            0% { transform: translateY(0) translateX(0); }
            100% { transform: translateY(-40px) translateX(-40px); }
          }
          .animate-finance-bg {
            animation: finance-bg-move 18s linear infinite alternate;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="card-item about-service-card max-w-[350px] rounded-3xl p-2 md:p-6 bg-white shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border-4 border-[#001435] flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden">
              <div className="relative z-10 w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-semibold text-white mb-4 tracking-wide"><span className="text-[#F18A41]">Mission</span></h3>
              <p className="relative z-10 text-gray-400 leading-relaxed text-lg md:text-xl text-center">
                To enhance financial accessibility with user-friendly solutions, lead the transition to digital payments for a more
                efficient ecosystem, and deliver top-tier financial products supported by exception customer service and technology.
              </p>
            </div>

            {/* Vision Card */}
            <div className="card-item about-service-card max-w-[350px] rounded-3xl p-2 md:p-6 bg-white shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border-4 border-[#001435] flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden">
              <div className="relative z-10 w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-semibold text-white mb-4 tracking-wide"><span className="text-[#F18A41]">Vision</span></h3>
              <p className="relative z-10 text-gray-400 leading-relaxed text-lg md:text-xl text-center">
              Finzep envisions a future of 
              financial inclusion, enabling 
              secure and accessible 
              transactions for all. We aim to 
              redefine financial management 
              with innovative solutions and 
              drive digital service adoption for 
              inclusive growth.
              </p>
            </div>

            {/* Purpose Card */}
            <div className="card-item about-service-card max-w-[350px] rounded-3xl p-2 md:p-6 bg-white shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border-4 border-[#001435] flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden">
              <div className="relative z-10 w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="relative z-10 text-2xl font-semibold text-white mb-4 tracking-wide"><span className="text-[#F18A41]">Purpose</span></h3>
              <p className="relative z-10 text-gray-400 leading-relaxed text-lg md:text-xl text-center">
              To empower businesses with 
              cutting-edge tools, 
              technologies, and fintech 
              capabilities to thrive in the 
              digital age streamlining 
              operations, enhancing 
              accessibility & fostering 
              scalable growth.
              </p>
            </div>
          </div>
          <style>{`
            .about-service-card {
              position: relative;
              overflow: hidden;
              background: #fff;
              border: 4px solid #001435;
              transition: background-color 0.5s, color 0.5s, border-color 0.5s;
            }
            .about-service-card::before {
              content: "";
              display: block;
              height: 0;
              width: 0;
              background-color: #F18A41;
              position: absolute;
              bottom: 0;
              right: 0;
              transform: translate(50%, 50%);
              border-radius: 50%;
              transition: all 0.5s;
              z-index: 0;
            }
            .about-service-card:hover::before {
              height: 200%;
              width: 200%;
              border-radius: 0;
            }
            .about-service-card:hover {
              background: #F18A41 !important;
              color: #fff !important;
              border-color: #374151 !important;
            }
            .about-service-card:hover h3,
            .about-service-card:hover h3 * {
              color: #001a46 !important;
              transition: color 0.5s;
            }
            .about-service-card:hover svg {
              stroke: #001a46 !important;
              transition: stroke 0.5s;
            }
            .about-service-card:hover p {
              color: #fff !important;
              transition: color 0.5s;
            }
            .about-service-card > * {
              position: relative;
              z-index: 10;
            }
          `}</style>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section py-20 relative z-10" style={{ background: 'linear-gradient(135deg, #002A76 0%, #001435 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our <span className="text-[#F18A41]">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our diverse team of fintech experts brings together years of experience 
              and a passion for creating innovative payment solutions.
            </p>
          </div>

          {/* Team Scroll Gallery Animation */}
          <TeamScrollGallery />


        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 mt-20 bg-gradient-to-br from-[#F18A41]/90 to-[#9DADE5]/90 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="text-white">Transform</span> Your Payment System?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how our innovative fintech solutions can revolutionize your business operations.
            </p>
            <button className="bg-white text-[#F18A41] font-semibold px-8 py-3 rounded-lg hover:bg-white/90 hover:text-[#e07935] transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;