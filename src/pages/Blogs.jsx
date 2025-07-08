import React from 'react';

const blogPosts = [
  {
    title: 'Startup Finance: Laying the Foundation for Scalable Growth',
    description: 'Explore essential strategies and financial planning tips to help startups build a strong foundation for scalable and sustainable growth.',
    image: '/blog-images/StartupFinanceCover.png',
    alt: 'Abstract finance and growth illustration with orange and green tones.',
    link: '#',
  },
  {
    title: 'Simplifying Digital Bill Payments with BBPS Integration',
    description: 'Learn how BBPS integration streamlines digital bill payments, making transactions seamless, secure, and user-friendly for businesses and consumers.',
    image: '/blog-images/BBPSintegrationBlogCover.png',
    alt: 'Digital payment concept with bills and mobile devices in warm colors.',
    link: '#',
  },
  {
    title: 'RBI Compliance: A Catalyst for Financial Inclusion',
    description: 'Understand how RBI compliance drives financial inclusion, ensuring safe and accessible financial services for all segments of society.',
    image: '/blog-images/RBIcomplianceBlogCover.png',
    alt: 'Compliance and inclusion theme with diverse people and financial icons.',
    link: '#',
  },
  {
    title: 'Last-Mile Banking: Advancing Access in India’s Financial Landscape',
    description: 'Discover the impact of last-mile banking solutions in bridging the gap and advancing financial access across India.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    alt: 'Rural banking and access illustration with Indian landscape and fintech colors.',
    link: '#',
  },
  {
    title: 'Neo Banking in India: Driving the Shift to Digital-First Finance',
    description: 'Explore how neo banks are revolutionizing the Indian financial sector by offering digital-first, customer-centric banking experiences.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    alt: 'Modern digital banking interface with orange and green highlights.',
    link: '#',
  },
  {
    title: 'Banking APIs: The Backbone of India’s Fintech Infrastructure',
    description: 'Delve into the critical role of banking APIs in powering innovation and connectivity across India’s fintech ecosystem.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    alt: 'API and fintech infrastructure concept with code and network graphics.',
    link: '#',
  },
  {
    title: 'The Strategic Role of NBFCs in India’s Evolving Financial Ecosystem',
    description: 'Examine how NBFCs are shaping the future of finance in India by providing innovative solutions and expanding access to credit.',
    image: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=600&q=80',
    alt: 'NBFC and financial ecosystem with business and finance icons in site colors.',
    link: '#',
  },
];

const Blogs = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#233831] mb-10 text-center">Finzep Blog</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <li
              key={post.title}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="visual">
                <img
                  className="w-full h-48 object-cover"
                  src={post.image}
                  alt={post.alt}
                  width={384}
                  height={192}
                />
              </div>
              <div className="flex flex-col flex-1 justify-between p-6">
                <div className="mb-6">
                  <h3 className="title text-xl font-bold text-[#F18A41] mb-2">{post.title}</h3>
                  <p className="desc text-gray-700 text-base">{post.description}</p>
                </div>
                <a
                  href={post.link}
                  className="card-link text-[#F18A41] font-semibold flex items-center gap-2 hover:underline"
                >
                  Learn more
                  <svg className="w-4 h-4 text-[#F18A41]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs; 