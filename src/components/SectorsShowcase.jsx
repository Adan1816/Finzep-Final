import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sectors = [
  {
    title: 'Education',
    subtitle: 'Empowering learning with digital payments',
    desc: 'Finzep streamlines fee collection, payroll, and vendor payments for schools, colleges, and edtech platforms.'
  },
  {
    title: 'Hospitality',
    subtitle: 'Seamless guest experiences',
    desc: 'Hotels and restaurants use Finzep for instant payouts, supplier settlements, and digital tips.'
  },
  {
    title: 'Logistics',
    subtitle: 'Fast, reliable, and secure',
    desc: 'Automate driver payments, COD settlements, and vendor disbursements with Finzep.'
  },
  {
    title: 'E-commerce',
    subtitle: 'Powering online business',
    desc: 'Finzep enables instant refunds, seller payouts, and seamless checkout for e-commerce platforms.'
  }
];

const sectorColors = [
  'from-green-200 to-green-400',
  'from-blue-200 to-blue-400',
  'from-purple-200 to-purple-400',
  'from-orange-200 to-orange-400',
];

const SectorsShowcase = () => {
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const slideRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const listItems = listRef.current.querySelectorAll('li');
    const slides = slideRefs.current;
    const fill = fillRef.current;
    const pinSection = sectionRef.current;

    // Set initial states
    gsap.set(listItems, { color: '#fffce1' });
    gsap.set(listItems[0], { color: '#0ae448' });
    gsap.set(slides, { autoAlpha: 0 });
    gsap.set(slides[0], { autoAlpha: 1 });
    gsap.set(fill, {
      scaleY: 1 / sectors.length,
      transformOrigin: 'top left',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: 'top top',
        end: '+=' + sectors.length * 50 + '%',
        pin: true,
        scrub: true,
        // markers: true, // Uncomment for debugging
      },
    });

    sectors.forEach((_, i) => {
      const prev = i - 1;
      if (prev >= 0) {
        tl.set(listItems[i], { color: '#0ae448' }, 0.5 * i)
          .to(
            slides[i],
            { autoAlpha: 1, duration: 0.2 },
            '<'
          )
          .set(listItems[prev], { color: '#fffce1' }, '<')
          .to(
            slides[prev],
            { autoAlpha: 0, duration: 0.2 },
            '<'
          );
      }
    });
    tl.to({}, {})
      .to(
        fill,
        {
          scaleY: 1,
          transformOrigin: 'top left',
          ease: 'none',
          duration: tl.duration() - 0.5,
        },
        0
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full py-0">
      <div ref={sectionRef} className="w-screen relative left-1/2 right-1/2 -mx-[50vw] border-t-2 border-b-2 border-gray-200 pt-[150px] pr-[100px] py-0" style={{ background: 'linear-gradient(135deg, #002A76 0%, #001435 100%)' }}>
        <div className="w-full flex flex-row items-stretch relative py-0 min-h-[80vh]" style={{minHeight:'80vh'}}>
          {/* Left: List and fill */}
          <div className="flex flex-col justify-center relative z-10 pr-8" style={{minWidth: '180px', height: '100%'}}>
            <ul ref={listRef} className="text-2xl md:text-3xl font-bold flex flex-col h-full text-[#fffce1] pl-10 space-y-20">
              {sectors.map((sector, i) => (
                <li key={sector.title}>{sector.title}</li>
              ))}
            </ul>
            <div ref={fillRef} className="absolute left-0 top-0 w-1 bg-[#0ae448] rounded" style={{height: '100%', zIndex: 1, minHeight: '100px'}}></div>
          </div>
          {/* Right: Slides */}
          <div className="flex-1 relative min-h-[300px] flex items-center justify-center">
            {sectors.map((sector, i) => (
              <div
                key={sector.title}
                ref={el => (slideRefs.current[i] = el)}
                className={`slide absolute w-4/5 h-[340px] md:h-[400px] right-0 top-0 opacity-0 invisible rounded-3xl shadow-3xl flex flex-col justify-center items-center bg-white border-2 border-[#e5e7eb] transition-all duration-500 z-20`}
                style={{
                  color: '#233831',
                  padding: '2.5rem',
                  boxShadow: '0 12px 48px 0 rgba(31,38,135,0.18), 0 2px 8px 0 rgba(0,0,0,0.10)',
                }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#233831]">{sector.title}</h2>
                <em className="block text-lg md:text-xl mb-2 text-[#233831] opacity-70">{sector.subtitle}</em>
                <p className="text-base md:text-lg text-[#233831] text-center max-w-xl">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsShowcase; 