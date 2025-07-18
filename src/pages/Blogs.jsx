import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    title: 'Startup Finance: Laying the Foundation for Scalable Growth',
    description: 'Explore essential strategies and financial planning tips to help startups build a strong foundation for scalable and sustainable growth.',
    image: '/blog-images/StartupFinanceCover.png',
    alt: 'Abstract finance and growth illustration with orange and green tones.',
    link: '#',
    category: 'Finance',
    readTime: '5 min read',
    date: 'Dec 15, 2024'
  },
  {
    title: 'Simplifying Digital Bill Payments with BBPS Integration',
    description: 'Learn how BBPS integration streamlines digital bill payments, making transactions seamless, secure, and user-friendly for businesses and consumers.',
    image: '/blog-images/BBPSintegrationBlogCover.png',
    alt: 'Digital payment concept with bills and mobile devices in warm colors.',
    link: '#',
    category: 'Technology',
    readTime: '7 min read',
    date: 'Dec 12, 2024'
  },
  {
    title: 'RBI Compliance: A Catalyst for Financial Inclusion',
    description: 'Understand how RBI compliance drives financial inclusion, ensuring safe and accessible financial services for all segments of society.',
    image: '/blog-images/RBIcomplianceBlogCover.png',
    alt: 'Compliance and inclusion theme with diverse people and financial icons.',
    link: '#',
    category: 'Compliance',
    readTime: '6 min read',
    date: 'Dec 10, 2024'
  },
  {
    title: 'Last-Mile Banking: Advancing Access in India\'s Financial Landscape',
    description: 'Discover the impact of last-mile banking solutions in bridging the gap and advancing financial access across India.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    alt: 'Rural banking and access illustration with Indian landscape and fintech colors.',
    link: '#',
    category: 'Banking',
    readTime: '8 min read',
    date: 'Dec 8, 2024'
  },
  {
    title: 'Neo Banking in India: Driving the Shift to Digital-First Finance',
    description: 'Explore how neo banks are revolutionizing the Indian financial sector by offering digital-first, customer-centric banking experiences.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    alt: 'Modern digital banking interface with orange and green highlights.',
    link: '#',
    category: 'Digital Banking',
    readTime: '9 min read',
    date: 'Dec 5, 2024'
  },
  {
    title: 'Banking APIs: The Backbone of India\'s Fintech Infrastructure',
    description: 'Delve into the critical role of banking APIs in powering innovation and connectivity across India\'s fintech ecosystem.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    alt: 'API and fintech infrastructure concept with code and network graphics.',
    link: '#',
    category: 'Technology',
    readTime: '10 min read',
    date: 'Dec 3, 2024'
  },
  {
    title: 'The Strategic Role of NBFCs in India\'s Evolving Financial Ecosystem',
    description: 'Examine how NBFCs are shaping the future of finance in India by providing innovative solutions and expanding access to credit.',
    image: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=600&q=80',
    alt: 'NBFC and financial ecosystem with business and finance icons in site colors.',
    link: '#',
    category: 'Finance',
    readTime: '7 min read',
    date: 'Dec 1, 2024'
  },
];

const categories = ['All', 'Finance', 'Technology', 'Compliance', 'Banking', 'Digital Banking'];

const BlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    // Entrance animation
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
      gsap.to(content, { y: -10, duration: 0.4, ease: "power2.out" });
      gsap.to(card, { 
        y: -15, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.4, 
        ease: "power2.out" 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(content, { y: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(card, { 
        y: 0, 
        boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
        duration: 0.4, 
        ease: "power2.out" 
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/20 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          ref={imageRef}
          className="w-full h-full object-cover transition-transform duration-700"
          src={post.image}
          alt={post.alt}
          width={384}
          height={256}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {post.category}
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
          {post.date}
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#233831] leading-tight group-hover:text-[#F18A41] transition-colors duration-300">
          {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </div>
          
          {/* Read More Button */}
          <a
            href={post.link}
            className="inline-flex items-center gap-2 text-[#F18A41] font-semibold hover:text-[#9DADE5] transition-colors duration-300 group/link"
          >
            Read More
            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#F18A41]/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const headerRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Filter animation
    gsap.fromTo(filterRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? blogPosts 
      : blogPosts.filter(post => post.category === activeCategory);
    setFilteredPosts(filtered);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="w-full pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#F18A41] rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#9DADE5] rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#233831] rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#233831] mb-6 bg-gradient-to-r from-[#233831] via-[#F18A41] to-[#9DADE5] bg-clip-text text-transparent">
            Finzep Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, trends, and innovations in fintech, digital payments, and financial services
          </p>
        </div>

        {/* Category Filter */}
        <div ref={filterRef} className="mb-16">
          <div className="flex flex-wrap justify-start gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#F18A41] to-[#9DADE5] text-white shadow-lg shadow-[#F18A41]/25'
                    : 'bg-white/60 text-gray-400 border border-gray-100 hover:border-[#F18A41]/30 hover:bg-[#F18A41]/5 hover:text-[#F18A41] backdrop-blur-sm shadow-sm'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Subtle glow effect for active button */}
                {activeCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F18A41]/20 to-[#9DADE5]/20 rounded-full blur-sm -z-10" />
                )}
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={`${post.title}-${activeCategory}`} post={post} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-[#233831] mb-2">No articles found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blogs; 