import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'RBI Compliances',
    description:
      'Stay updated with the latest RBI regulations and compliance requirements for fintechs. Our blog provides key updates, actionable insights, and practical guidance to help your business remain compliant and competitive in the evolving financial landscape. We break down complex regulatory changes into easy-to-understand articles, ensuring you never miss an important update.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-1.avif',
    alt: 'A modern skyscraper with glass facade reflecting a vibrant sunset sky.',
    link: '#',
  },
  {
    title: 'Financial Inclusion',
    description:
      'Discover how technology is bridging the gap and making financial services accessible to all segments of society. Explore digital solutions, case studies, and expert opinions that are driving financial inclusion across the globe. Our articles highlight real-world impact and offer practical steps for organizations to foster inclusion.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-2.avif',
    alt: 'Low-angle view of a modern glass skyscraper against a clear blue sky in Montreal, Canada.',
    link: '#',
  },
  {
    title: 'PA & PG',
    description:
      'Understand the evolving landscape of Payment Aggregators (PA) and Payment Gateways (PG) in India. Learn about new regulations, opportunities, and the impact of these changes on businesses and consumers alike. We provide in-depth analysis and expert commentary to help you navigate the payments ecosystem.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-3.avif',
    alt: 'Stunning Panama City skyline reflecting on water at twilight, showcasing modern architecture.',
    link: '#',
  },
  {
    title: 'StartUp Finance',
    description:
      'Explore essential financial strategies, funding options, and compliance tips for startups in the fintech space. Our blog covers everything you need to know to grow and sustain your fintech startup in a competitive market. Get actionable advice from industry leaders and learn how to overcome common challenges.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-4.avif',
    alt: "Breathtaking Kowloon skyline with skyscrapers and harbor at sunset, showcasing Hong Kong's urban beauty.",
    link: '#',
  },
];

const BlogCardsSection = () => {
  // Container animation for staggered effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] m-0 p-0">
      <div className="max-w-screen-xl mx-auto w-full px-8">
        <div className="flex justify-center mb-16">
          <AnimatedHeading delay={0.4} gradient={true}>Finzep Blog</AnimatedHeading>
        </div>
        <motion.ul 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.map((post, idx) => (
            <motion.li
              key={post.title}
              className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-md rounded-3xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 w-full"
              style={{ width: '1300px', height: '600px', maxWidth: '100%' }}
              initial={{
                opacity: 0,
                x: idx < 2 ? -80 : 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="visual">
                <img
                  className="w-full object-cover"
                  style={{ height: '260px' }}
                  src={post.image}
                  alt={post.alt}
                  width={1300}
                  height={260}
                />
              </div>
              <div className="flex flex-col flex-1 p-8">
                <div className="mb-4 flex-1">
                  <h3 className="title text-2xl font-bold text-[#F18A41] mb-4">{post.title}</h3>
                  <p className="desc text-gray-700 text-lg leading-relaxed line-clamp-5">{post.description}</p>
                </div>
                <div className="mt-auto">
                  <a
                    href={post.link}
                    className="card-link text-[#F18A41] font-semibold text-lg flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-[#e07935]"
                  >
                    Learn more
                    <svg className="w-5 h-5 text-[#F18A41] transition-transform duration-200 hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
          {/* 5th CTA Card */}
          <motion.li
            className="flex flex-col items-center justify-center bg-gradient-to-br from-[#F18A41]/90 to-[#9DADE5]/90 rounded-3xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 w-full min-h-[320px] p-8 group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          >
            <Link to="/blogs" className="flex flex-col items-center justify-center w-full h-full">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/80 mb-6 group-hover:bg-white">
                <svg className="w-10 h-10 text-[#F18A41]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </div>
              <span className="text-2xl font-bold text-white mb-2">See all blogs</span>
              <span className="text-base text-white/80">Explore more insights &rarr;</span>
            </Link>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
};

export default BlogCardsSection; 