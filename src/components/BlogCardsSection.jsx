import React from 'react';

const blogPosts = [
  {
    title: 'RBI Compliances',
    description:
      'Stay updated with the latest RBI regulations and compliance requirements for financial institutions and fintech startups.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-1.avif',
    alt: 'A modern skyscraper with glass facade reflecting a vibrant sunset sky.',
    link: '#',
  },
  {
    title: 'Financial Inclusion',
    description:
      'Discover how technology is bridging the gap and making financial services accessible to all segments of society.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-2.avif',
    alt: 'Low-angle view of a modern glass skyscraper against a clear blue sky in Montreal, Canada.',
    link: '#',
  },
  {
    title: 'PA & PG',
    description:
      'Understand the evolving landscape of Payment Aggregators (PA) and Payment Gateways (PG) in India and their regulatory framework.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-3.avif',
    alt: 'Stunning Panama City skyline reflecting on water at twilight, showcasing modern architecture.',
    link: '#',
  },
  {
    title: 'StartUp Finance',
    description:
      'Explore essential financial strategies, funding options, and compliance tips for startups in the fintech space.',
    image:
      'https://raw.githubusercontent.com/mobalti/open-props-interfaces/refs/heads/main/hdr-palettes-astro-op/src/assets/images/img-4.avif',
    alt: "Breathtaking Kowloon skyline with skyscrapers and harbor at sunset, showcasing Hong Kong's urban beauty.",
    link: '#',
  },
];

const BlogCardsSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#233831] mb-10 text-center">Finzep Blog</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

export default BlogCardsSection; 