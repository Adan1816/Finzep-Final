import React, { useState } from 'react';

const sectors = [
  {
    title: 'Education',
    subtitle: 'Empowering learning with digital payments',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=400',
    desc: 'Finzep streamlines fee collection, payroll, and vendor payments for schools, colleges, and edtech platforms.'
  },
  {
    title: 'Hospitality',
    subtitle: 'Seamless guest experiences',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400',
    desc: 'Hotels and restaurants use Finzep for instant payouts, supplier settlements, and digital tips.'
  },
  {
    title: 'Logistics',
    subtitle: 'Fast, reliable, and secure',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    desc: 'Automate driver payments, COD settlements, and vendor disbursements with Finzep.'
  },
  {
    title: 'E-commerce',
    subtitle: 'Powering online business',
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?w=400',
    desc: 'Finzep enables instant refunds, seller payouts, and seamless checkout for e-commerce platforms.'
  }
];

const SectorsStack = () => {
  const [topIdx, setTopIdx] = useState(0);
  const n = sectors.length;
  const rotations = [8, -6, 4, -10];

  const handleNav = (inc) => {
    setTopIdx((prev) => (prev + inc + n) % n);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start w-full">
      {/* Left: Stacked Cards */}
      <section className="relative flex flex-col items-center py-8 md:py-16 w-full md:w-[380px] min-w-[320px] max-w-[400px]">
        <div className="relative w-[340px] h-[420px] grid place-items-center">
          {sectors.map((sector, i) => {
            const offset = ((i - topIdx + n) % n);
            const isTop = offset === 0;
            const z = n - offset;
            const rotate = rotations[i % rotations.length];
            return (
              <article
                key={sector.title}
                className={`absolute left-0 top-0 w-full h-full rounded-2xl shadow-lg border border-white/40 bg-white/30 backdrop-blur-xl ring-1 ring-white/30 flex flex-col items-center transition-all duration-500 ${isTop ? 'scale-105' : 'scale-95'} ${isTop ? 'shadow-2xl' : 'shadow-lg'} ${isTop ? 'opacity-100' : 'opacity-80'}`}
                style={{
                  zIndex: z,
                  transform: `translateY(${offset * 12}px) rotate(${isTop ? 0 : rotate}deg)`,
                  WebkitBackdropFilter: 'blur(20px)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10) inset, 0 1.5px 8px 0 rgba(255,255,255,0.10)',
                }}
              >
                <img src={sector.image} alt={sector.title} className="w-full h-48 object-cover rounded-t-2xl" />
                <h2 className="text-2xl font-bold text-[#F18A41] mt-4 mb-1 text-center">{sector.title}</h2>
                <em className="block text-[#233831] text-base mb-2 text-center opacity-70">{sector.subtitle}</em>
                <p className="text-[#233831] text-sm text-center px-4 mb-4">{sector.desc}</p>
              </article>
            );
          })}
        </div>
        <div className="flex gap-8 mt-8">
          <button
            aria-label="previous"
            onClick={() => handleNav(-1)}
            className="w-12 h-12 rounded-full bg-[#9DADE5]/20 text-[#233831] text-2xl font-bold flex items-center justify-center border-2 border-[#9DADE5] hover:bg-[#9DADE5] hover:text-white transition-colors duration-200"
          >
            &#8592;
          </button>
          <button
            aria-label="next"
            onClick={() => handleNav(1)}
            className="w-12 h-12 rounded-full bg-[#9DADE5]/20 text-[#233831] text-2xl font-bold flex items-center justify-center border-2 border-[#9DADE5] hover:bg-[#9DADE5] hover:text-white transition-colors duration-200"
          >
            &#8594;
          </button>
        </div>
        <div className="mt-4 text-[#233831] text-sm opacity-70">{topIdx + 1} / {n}</div>
      </section>
      {/* Right: Details Card */}
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="w-full max-w-xl min-h-[420px] bg-white/30 border border-white/40 rounded-2xl shadow-lg shadow-white/10 backdrop-blur-xl ring-1 ring-white/30 p-8 flex flex-col justify-center"
          style={{
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10) inset, 0 1.5px 8px 0 rgba(255,255,255,0.10)',
          }}
        >
          <img src={sectors[topIdx].image} alt={sectors[topIdx].title} className="w-full h-56 object-cover rounded-xl mb-6" />
          <h2 className="text-3xl font-bold text-[#F18A41] mb-2">{sectors[topIdx].title}</h2>
          <em className="block text-[#233831] text-lg mb-4 opacity-70">{sectors[topIdx].subtitle}</em>
          <p className="text-[#233831] text-base mb-2">{sectors[topIdx].desc}</p>
        </div>
      </div>
    </div>
  );
};

export default SectorsStack; 