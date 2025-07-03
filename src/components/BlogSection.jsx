import React from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: 'Fintech Innovations',
    image: 'https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true',
    summary: 'Explore the latest trends and innovations in the fintech industry, and how they are shaping the future of payments.',
    link: '/blog/fintech-innovations',
  },
  {
    title: 'API Integrations',
    image: 'https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true',
    summary: 'Learn how seamless API integrations can transform your business operations and customer experience.',
    link: '/blog/api-integrations',
  },
  {
    title: 'Scaling E-commerce',
    image: 'https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true',
    summary: 'Discover strategies for scaling your e-commerce business with modern payment and payout solutions.',
    link: '/blog/scaling-ecommerce',
  },
  {
    title: 'Secure Transactions',
    image: 'https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true',
    summary: "Understand the best practices for ensuring secure and compliant digital transactions in today's world.",
    link: '/blog/secure-transactions',
  },
];

const BlogSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 bg-white">
      <h2 className="text-3xl font-bold text-[#233831] mb-8 text-center">Latest Blog Posts</h2>
      <div className="container flex flex-wrap justify-center gap-8 max-w-5xl">
        {blogs.map((blog, idx) => (
          <div key={blog.title} className="card group cursor-pointer relative overflow-hidden">
            {/* Face 1 */}
            <div className="face face1 bg-[#F18A41] flex flex-col justify-center items-center rounded-xl shadow-lg absolute top-0 left-0 w-full h-full z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-8">
              <div className="content opacity-100 transition-opacity duration-500 flex flex-col items-center">
                <img src={blog.image} alt={blog.title} className="max-w-[110px]" />
                <h3 className="mt-2 text-white text-xl font-bold text-center">{blog.title}</h3>
              </div>
            </div>
            {/* Face 2 */}
            <div className="face face2 bg-[#233831] flex flex-col justify-center items-center rounded-xl shadow-2xl p-6 absolute top-0 left-0 w-full h-full z-20 opacity-0 translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="content flex flex-col items-center">
                <p className="text-white text-base text-center">{blog.summary}</p>
                <Link
                  to={blog.link}
                  className="mt-4 inline-block font-bold border border-white text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-white hover:text-[#233831]"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .card {
          width: 380px;
          height: 260px;
          perspective: 1000px;
        }
        .face {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 1rem;
        }
      `}</style>
    </section>
  );
};

export default BlogSection; 