import React, { useEffect, useRef } from 'react';
import AboutScrollText from '../components/AboutScrollText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const teamGridRef = useRef(null);

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

      // Team section animation
      gsap.fromTo('.team-member', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.team-container',
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Animate team grid gap
      if (teamGridRef.current) {
        gsap.set(teamGridRef.current, { gap: '4rem' });
        ScrollTrigger.create({
          trigger: teamGridRef.current,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
          onUpdate: self => {
            // Animate gap from 4rem (64px) to 2rem (32px)
            const progress = Math.min(1, Math.max(0, self.progress));
            const gap = 64 - (32 * progress);
            teamGridRef.current.style.gap = `${gap}px`;
          }
        });
      }

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

    return () => ctx.revert();
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="card-item rounded-3xl p-10 md:p-12 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border border-[#23243a] flex flex-col items-center text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(241,138,65,0.10)]">
              <div className="w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">Our <span className="text-[#F18A41]">Mission</span></h3>
              <p className="text-gray-400 leading-relaxed text-base">
                To enhance financial accessibility with user-friendly solutions, lead the transition to digital payments for a more
                efficient ecosystem, and deliver top-tier financial products supported by exception customer service and technology.
              </p>
            </div>

            {/* Vision Card */}
            <div className="card-item rounded-3xl p-10 md:p-12 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border border-[#23243a] flex flex-col items-center text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(241,138,65,0.10)]">
              <div className="w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">Our <span className="text-[#F18A41]">Vision</span></h3>
              <p className="text-gray-400 leading-relaxed text-base">
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
            <div className="card-item rounded-3xl p-10 md:p-12 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 shadow-[0_4px_32px_0_rgba(31,38,135,0.10)] border border-[#23243a] flex flex-col items-center text-center backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_rgba(241,138,65,0.10)]">
              <div className="w-14 h-14 bg-transparent rounded-lg flex items-center justify-center mb-7">
                <svg className="w-8 h-8 text-[#F18A41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide"><span className="text-[#F18A41]">Purpose</span></h3>
              <p className="text-gray-400 leading-relaxed text-base">
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #002A76 0%, #001435 100%)' }}>
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

          <div className="team-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" ref={teamGridRef} style={{gap: '4rem'}}>
            {/* Team Member 1 */}
            <div className="team-member max-w-xs w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 border border-[#23243a] flex flex-col items-center text-center" style={{ boxShadow: '8px 8px 24px -8px #F18A41aa, 0 4px 16px 0 rgba(241,138,65,0.10)' }}>
              <div className="w-full h-64 bg-gradient-to-br from-[#23243a] to-[#181926] flex items-center justify-center">
                <div className="w-24 h-24 bg-[#101014] rounded-full flex items-center justify-center border-2 border-[#23243a]">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Alex Johnson</h3>
                <p className="text-[#F18A41] font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-400 text-sm">
                  Leading technical innovation and ensuring our payment solutions meet the highest standards.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="team-member max-w-xs w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 border border-[#23243a] flex flex-col items-center text-center" style={{ boxShadow: '8px 8px 24px -8px #F18A41aa, 0 4px 16px 0 rgba(241,138,65,0.10)' }}>
              <div className="w-full h-64 bg-gradient-to-br from-[#23243a] to-[#181926] flex items-center justify-center">
                <div className="w-24 h-24 bg-[#101014] rounded-full flex items-center justify-center border-2 border-[#23243a]">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Sarah Chen</h3>
                <p className="text-[#F18A41] font-medium mb-3">Head of Product</p>
                <p className="text-gray-400 text-sm">
                  Bringing product expertise and user-focused solutions to our fintech platform.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="team-member max-w-xs w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 border border-[#23243a] flex flex-col items-center text-center" style={{ boxShadow: '8px 8px 24px -8px #F18A41aa, 0 4px 16px 0 rgba(241,138,65,0.10)' }}>
              <div className="w-full h-64 bg-gradient-to-br from-[#23243a] to-[#181926] flex items-center justify-center">
                <div className="w-24 h-24 bg-[#101014] rounded-full flex items-center justify-center border-2 border-[#23243a]">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Mike Rodriguez</h3>
                <p className="text-[#F18A41] font-medium mb-3">Security Director</p>
                <p className="text-gray-400 text-sm">
                  Ensuring the highest security standards for all our payment processing solutions.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="team-member max-w-xs w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-[#181926]/80 to-[#101014]/90 border border-[#23243a] flex flex-col items-center text-center" style={{ boxShadow: '8px 8px 24px -8px #F18A41aa, 0 4px 16px 0 rgba(241,138,65,0.10)' }}>
              <div className="w-full h-64 bg-gradient-to-br from-[#23243a] to-[#181926] flex items-center justify-center">
                <div className="w-24 h-24 bg-[#101014] rounded-full flex items-center justify-center border-2 border-[#23243a]">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Emma Thompson</h3>
                <p className="text-[#F18A41] font-medium mb-3">Business Development</p>
                <p className="text-gray-400 text-sm">
                  Building strategic partnerships and driving business growth across markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to <span className="text-[#F18A41]">Transform</span> Your Payment System?
            </h2>
            <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">
              Let's discuss how our innovative fintech solutions can revolutionize your business operations.
            </p>
            <button className="bg-[#F18A41] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#ffb26b] hover:text-[#23243a] transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;