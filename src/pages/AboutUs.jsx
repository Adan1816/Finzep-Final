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
      // Hero section animation
      gsap.fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
      
      gsap.fromTo('.hero-text', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
      );

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="hero-text text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are a forward-thinking digital agency dedicated to crafting exceptional 
              web experiences that drive results and exceed expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll Animation Section */}
      <AboutScrollText />

      {/* Additional Content Sections */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with cutting-edge digital solutions that transform 
                their online presence and drive sustainable growth.
              </p>
            </div>

            {/* Vision Card */}
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading digital agency that sets new standards for 
                innovation, quality, and client satisfaction in the industry.
              </p>
            </div>

            {/* Values Card */}
            <div className="card-item bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality, integrity, innovation, and client success are at the heart 
                of everything we do. These values guide our decisions and relationships.
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
              Our diverse team of experts brings together years of experience 
              and a passion for creating exceptional digital experiences.
            </p>
          </div>

          <div className="team-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Alex Johnson</h3>
                <p className="text-cyan-600 font-medium mb-3">Creative Director</p>
                <p className="text-gray-600 text-sm">
                  Leading creative vision and ensuring every project meets our high standards.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Chen</h3>
                <p className="text-cyan-600 font-medium mb-3">Lead Developer</p>
                <p className="text-gray-600 text-sm">
                  Bringing technical expertise and innovative solutions to every project.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Rodriguez</h3>
                <p className="text-cyan-600 font-medium mb-3">UX Designer</p>
                <p className="text-gray-600 text-sm">
                  Crafting intuitive user experiences that delight and engage users.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="team-member bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emma Thompson</h3>
                <p className="text-cyan-600 font-medium mb-3">Project Manager</p>
                <p className="text-gray-600 text-sm">
                  Ensuring projects are delivered on time and exceed client expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 text-cyan-100 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss your next project.
            </p>
            <button className="bg-white text-cyan-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;