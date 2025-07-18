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
  const graffitiRef = useRef(null);

  useEffect(() => {
    // Dramatic header animation on page load/reload
    gsap.fromTo(headerRef.current,
      { 
        opacity: 0, 
        y: -100, 
        scale: 0.5,
        rotationX: -90
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationX: 0,
        duration: 1.2, 
        ease: "back.out(1.7)",
        delay: 0.2
      }
    );

    // Filter animation
    gsap.fromTo(filterRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power3.out" }
    );

    // Graffiti scroll animation
    const handleScroll = () => {
      const section = document.getElementById('blogs-graffiti-section');
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
    <section id="blogs-graffiti-section" className="w-full pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen relative overflow-hidden">
      {/* Animated Graffiti Background */}
      <div ref={graffitiRef} className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" style={{opacity: 0.15, transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'}}>
        <svg width="100vw" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <style>
              {`
                .float-left-to-right-1 {
                  animation: floatLeftToRight1 45s linear infinite;
                }
                .float-left-to-right-2 {
                  animation: floatLeftToRight2 50s linear infinite;
                }
                .float-left-to-right-3 {
                  animation: floatLeftToRight3 55s linear infinite;
                }
                .float-left-to-right-4 {
                  animation: floatLeftToRight4 48s linear infinite;
                }
                .float-left-to-right-5 {
                  animation: floatLeftToRight5 52s linear infinite;
                }
                .float-left-to-right-6 {
                  animation: floatLeftToRight6 47s linear infinite;
                }
                .float-left-to-right-7 {
                  animation: floatLeftToRight7 53s linear infinite;
                }
                .float-left-to-right-8 {
                  animation: floatLeftToRight8 49s linear infinite;
                }
                
                @keyframes floatLeftToRight1 {
                  0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(480px) translateY(-10px) rotate(90deg); }
                  50% { transform: translateX(960px) translateY(5px) rotate(180deg); }
                  75% { transform: translateX(1440px) translateY(-5px) rotate(270deg); }
                  100% { transform: translateX(2020px) translateY(0px) rotate(360deg); }
                }
                
                @keyframes floatLeftToRight2 {
                  0% { transform: translateX(-120px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(460px) translateY(8px) rotate(-90deg); }
                  50% { transform: translateX(940px) translateY(-8px) rotate(-180deg); }
                  75% { transform: translateX(1420px) translateY(12px) rotate(-270deg); }
                  100% { transform: translateX(2040px) translateY(0px) rotate(-360deg); }
                }
                
                @keyframes floatLeftToRight3 {
                  0% { transform: translateX(-80px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(500px) translateY(-15px) rotate(120deg); }
                  50% { transform: translateX(980px) translateY(10px) rotate(240deg); }
                  75% { transform: translateX(1460px) translateY(-8px) rotate(360deg); }
                  100% { transform: translateX(2000px) translateY(0px) rotate(480deg); }
                }
                
                @keyframes floatLeftToRight4 {
                  0% { transform: translateX(-110px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(470px) translateY(12px) rotate(-120deg); }
                  50% { transform: translateX(950px) translateY(-12px) rotate(-240deg); }
                  75% { transform: translateX(1430px) translateY(8px) rotate(-360deg); }
                  100% { transform: translateX(2030px) translateY(0px) rotate(-480deg); }
                }
                
                @keyframes floatLeftToRight5 {
                  0% { transform: translateX(-90px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(490px) translateY(-8px) rotate(180deg); }
                  50% { transform: translateX(970px) translateY(15px) rotate(360deg); }
                  75% { transform: translateX(1450px) translateY(-10px) rotate(540deg); }
                  100% { transform: translateX(2010px) translateY(0px) rotate(720deg); }
                }
                
                @keyframes floatLeftToRight6 {
                  0% { transform: translateX(-100px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(485px) translateY(10px) rotate(-180deg); }
                  50% { transform: translateX(965px) translateY(-10px) rotate(-360deg); }
                  75% { transform: translateX(1445px) translateY(6px) rotate(-540deg); }
                  100% { transform: translateX(2025px) translateY(0px) rotate(-720deg); }
                }
                
                @keyframes floatLeftToRight7 {
                  0% { transform: translateX(-130px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(450px) translateY(-12px) rotate(150deg); }
                  50% { transform: translateX(930px) translateY(12px) rotate(300deg); }
                  75% { transform: translateX(1410px) translateY(-6px) rotate(450deg); }
                  100% { transform: translateX(2050px) translateY(0px) rotate(600deg); }
                }
                
                @keyframes floatLeftToRight8 {
                  0% { transform: translateX(-70px) translateY(0px) rotate(0deg); }
                  25% { transform: translateX(510px) translateY(6px) rotate(-150deg); }
                  50% { transform: translateX(990px) translateY(-6px) rotate(-300deg); }
                  75% { transform: translateX(1470px) translateY(10px) rotate(-450deg); }
                  100% { transform: translateX(1990px) translateY(0px) rotate(-600deg); }
                }
              `}
            </style>
          </defs>
          <g>
            {/* Row 1 - Top - Floating Icons */}
            <text x="80" y="80" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-1">₹</text>
            <text x="200" y="120" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-2">💸</text>
            <text x="350" y="90" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-3">↑</text>
            <text x="500" y="110" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-4">₹</text>
            <text x="650" y="85" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-5">📈</text>
            <text x="800" y="105" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-6">₹</text>
            <text x="950" y="95" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-7">💰</text>
            <text x="1100" y="115" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-8">↓</text>
            <text x="1250" y="80" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-1">₹</text>
            <text x="1400" y="100" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-2">💳</text>
            <text x="1550" y="90" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-3">↑</text>
            <text x="1700" y="110" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-4">₹</text>
            <text x="1820" y="85" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-5">🏦</text>
            <text x="50" y="140" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-6">💎</text>
            <text x="300" y="60" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-7">🔒</text>
            <text x="750" y="140" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-8">⚡</text>
            
                         {/* Row 2 - Floating Icons */}
             <text x="120" y="220" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-3">💰</text>
             <text x="280" y="240" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-4">₹</text>
             <text x="420" y="210" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-5">↓</text>
             <text x="580" y="230" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-6">💸</text>
             <text x="720" y="220" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-7">₹</text>
             <text x="880" y="240" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-8">📈</text>
             <text x="1020" y="210" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-1">↑</text>
             <text x="1180" y="230" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-2">₹</text>
             <text x="1320" y="220" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-3">🏧</text>
             <text x="1480" y="240" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-4">💎</text>
             <text x="1620" y="210" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-5">₹</text>
             <text x="1780" y="230" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-6">📊</text>
             <text x="40" y="260" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-7">🔐</text>
             <text x="500" y="180" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-8">💹</text>
             <text x="900" y="190" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-1">⭐</text>
            
                         {/* Row 3 - Floating Icons */}
             <text x="60" y="360" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-2">↑</text>
             <text x="220" y="340" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-3">📈</text>
             <text x="360" y="370" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-4">₹</text>
             <text x="520" y="350" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-5">💰</text>
             <text x="660" y="360" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-6">↓</text>
             <text x="820" y="340" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-7">₹</text>
             <text x="960" y="370" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-8">💸</text>
             <text x="1120" y="350" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-1">↑</text>
             <text x="1260" y="360" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-2">₹</text>
             <text x="1420" y="340" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-3">🏪</text>
             <text x="1560" y="370" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-4">🚀</text>
             <text x="1720" y="350" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-5">₹</text>
             <text x="30" y="390" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-6">🔑</text>
             <text x="450" y="320" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-7">💫</text>
             <text x="1050" y="320" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-8">🎯</text>
             
             {/* Row 4 - Floating Icons */}
             <text x="140" y="480" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-1">💰</text>
             <text x="300" y="500" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-2">₹</text>
             <text x="440" y="470" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-3">↑</text>
             <text x="600" y="490" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-4">💸</text>
             <text x="740" y="480" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-5">₹</text>
             <text x="900" y="500" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-6">📈</text>
             <text x="1040" y="470" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-7">↓</text>
             <text x="1200" y="490" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-8">₹</text>
             <text x="1340" y="480" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-1">💼</text>
             <text x="1500" y="500" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-2">🌟</text>
             <text x="1640" y="470" fontSize="45" fontFamily="monospace" fill="#F18A41" className="float-left-to-right-3">₹</text>
             <text x="1800" y="490" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-4">🏆</text>
             <text x="80" y="520" fontSize="30" fontFamily="monospace" fill="#9DADE5" className="float-left-to-right-5">💡</text>
             <text x="550" y="440" fontSize="35" fontFamily="monospace" fill="#233831" className="float-left-to-right-6">🎨</text>
            
            {/* Row 5 */}
            <text x="80" y="620" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="240" y="600" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="380" y="630" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="540" y="610" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="680" y="620" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="840" y="600" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="980" y="630" fontSize="35" fontFamily="monospace" fill="#233831">💸</text>
            <text x="1140" y="610" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="1280" y="620" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1440" y="600" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="1580" y="630" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="1740" y="610" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            
            {/* Row 6 */}
            <text x="160" y="740" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="320" y="760" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="460" y="730" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="620" y="750" fontSize="35" fontFamily="monospace" fill="#233831">💸</text>
            <text x="760" y="740" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="920" y="760" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="1060" y="730" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="1220" y="750" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1360" y="740" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="1520" y="760" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="1660" y="730" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1820" y="750" fontSize="35" fontFamily="monospace" fill="#233831">💸</text>
            
            {/* Row 7 */}
            <text x="100" y="880" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="260" y="860" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="400" y="890" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="560" y="870" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="700" y="880" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="860" y="860" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1000" y="890" fontSize="35" fontFamily="monospace" fill="#233831">💸</text>
            <text x="1160" y="870" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="1300" y="880" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1460" y="860" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="1600" y="890" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="1760" y="870" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            
            {/* Row 8 - Bottom */}
            <text x="180" y="1020" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="340" y="1000" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="480" y="1030" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="640" y="1010" fontSize="35" fontFamily="monospace" fill="#233831">💸</text>
            <text x="780" y="1020" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="940" y="1000" fontSize="35" fontFamily="monospace" fill="#233831">📈</text>
            <text x="1080" y="1030" fontSize="30" fontFamily="monospace" fill="#9DADE5">↓</text>
            <text x="1240" y="1010" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
            <text x="1380" y="1020" fontSize="35" fontFamily="monospace" fill="#233831">💰</text>
            <text x="1540" y="1000" fontSize="30" fontFamily="monospace" fill="#9DADE5">↑</text>
            <text x="1680" y="1030" fontSize="45" fontFamily="monospace" fill="#F18A41">₹</text>
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#233831] bg-gradient-to-r from-[#233831] via-[#F18A41] to-[#9DADE5] bg-clip-text text-transparent">
            Finzep Blog
          </h1>
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