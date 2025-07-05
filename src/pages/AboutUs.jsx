import React, { useEffect } from 'react';
import AboutScrollText from '../components/AboutScrollText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  useEffect(() => {
    // Additional animations for the About Us page
    const ctx = gsap.context(() => {
      // Cards animation
      gsap.fromTo('.card-item', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cards-container',
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

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
    <div className="min-h-screen w-full overflow-hidden">
      {/* Scroll Animation Section */}
      <AboutScrollText />

      {/* Additional Content Sections */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#F18A41] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To enhance financial accessibility with user-friendly solutions, lead the transition to digital payments for a more
                efficient ecosystem, and deliver top-tier financial products supported by exception customer service and technology.
              </p>
            </div>

            {/* Vision Card */}
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#F18A41] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
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
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#F18A41] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose</h3>
              <p className="text-gray-600 leading-relaxed">
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
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of fintech experts brings together years of experience 
              and a passion for creating innovative payment solutions.
            </p>
          </div>

          <div className="team-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-[#F18A41] to-[#9DADE5] flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Alex Johnson</h3>
                <p className="text-[#F18A41] font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  Leading technical innovation and ensuring our payment solutions meet the highest standards.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-[#9DADE5] to-[#F18A41] flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Chen</h3>
                <p className="text-[#F18A41] font-medium mb-3">Head of Product</p>
                <p className="text-gray-600 text-sm">
                  Bringing product expertise and user-focused solutions to our fintech platform.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-[#233831] to-[#9DADE5] flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Rodriguez</h3>
                <p className="text-[#F18A41] font-medium mb-3">Security Director</p>
                <p className="text-gray-600 text-sm">
                  Ensuring the highest security standards for all our payment processing solutions.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-[#F18A41] to-[#233831] flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emma Thompson</h3>
                <p className="text-[#F18A41] font-medium mb-3">Business Development</p>
                <p className="text-gray-600 text-sm">
                  Building strategic partnerships and driving business growth across markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Payment System?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how our innovative fintech solutions can revolutionize your business operations.
            </p>
            <button className="bg-white text-[#F18A41] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;