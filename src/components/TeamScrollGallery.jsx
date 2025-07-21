import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Team member data - name, title, and image
const uniqueTeamMembers = [
  {
    name: "Alex Johnson",
    title: "Chief Technology Officer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Sarah Chen",
    title: "Head of Product",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Mike Rodriguez",
    title: "Security Director",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Emma Thompson",
    title: "Business Development",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Priya Patel",
    title: "Lead Designer",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    title: "Operations Manager",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Lina Müller",
    title: "Marketing Lead",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }
];

const uniqueTeamImages = uniqueTeamMembers.map(m => m.img);

const TeamScrollGallery = () => {
  const galleryRef = useRef(null);
  const cardsRef = useRef(null);
  const seamlessLoopRef = useRef(null);
  const scrubRef = useRef(null);
  const triggerRef = useRef(null);

  // For seamless look: [last, ...uniqueTeamMembers, first]
  const visualTeamMembers = [
    uniqueTeamMembers[uniqueTeamMembers.length - 1],
    ...uniqueTeamMembers,
    uniqueTeamMembers[0],
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Gentle fade in for images
    gsap.to(galleryRef.current?.querySelectorAll("img") || [], { opacity: 1, delay: 0.1 });

    const spacing = 0.1;
    const snap = gsap.utils.snap(spacing);
    const allCards = gsap.utils.toArray(cardsRef.current?.children || []);
    // Animate only the real team members (skip the first and last visual dummies)
    const animCards = allCards.slice(1, allCards.length - 1);
    if (animCards.length === 0) return;

    // Set initial state for all cards (including dummies)
    gsap.set(allCards, { xPercent: 400, opacity: 0, scale: 0 });

    // Animate only the real cards
    const buildSeamlessLoop = (items, spacing) => {
      let overlap = Math.ceil(1 / spacing);
      let startTime = items.length * spacing + 0.5;
      let loopTime = (items.length + overlap) * spacing + 1;
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1, // Infinite repeat for seamless animation
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        }
      });
      let l = items.length + overlap * 2;
      let time = 0;
      let i, index, item;

      // Animate only the real cards
      for (i = 0; i < l; i++) {
        index = i % items.length;
        item = items[index];
        time = i * spacing;
        rawSequence
          .fromTo(
            item,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false
            },
            time
          )
          .fromTo(
            item,
            { xPercent: 400 },
            {
              xPercent: -400,
              duration: 1,
              ease: "none",
              immediateRender: false
            },
            time
          );
        i <= items.length && seamlessLoop.add("label" + i, time);
      }

      // Set up the scrubbing of the playhead
      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none"
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none"
          }
        );
      
      return seamlessLoop;
    };

    const seamlessLoop = buildSeamlessLoop(animCards, spacing);
    seamlessLoopRef.current = seamlessLoop;

    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true
    });
    scrubRef.current = scrub;

    // Calculate exact duration to show all unique team members
    const uniqueTeamCount = uniqueTeamImages.length; // 7 team members
    const timePerMember = spacing; // 0.1
    const totalTimeForAllMembers = uniqueTeamCount * timePerMember; // Time to show all 7 members
    
    // Calculate precise scroll distance needed (100vh per team member for smooth experience)
    const scrollDistanceNeeded = `+=${uniqueTeamCount * 100}vh`; // 700vh for 7 members
    
    // ScrollTrigger that drives the animation within the pinned section
    const trigger = ScrollTrigger.create({
      trigger: galleryRef.current.parentElement, // Use team section as trigger
      start: "top top",
      end: scrollDistanceNeeded, // Precise scroll distance based on team count
      scrub: 8, // Higher scrub value for slower, more controlled animation
      onUpdate(self) {
        // Calculate progress to show exactly all unique team members
        const progress = self.progress;
        const targetTime = Math.min(progress * seamlessLoop.duration(), totalTimeForAllMembers);
        
        scrub.vars.totalTime = snap(targetTime);
        scrub.invalidate().restart();
      }
    });
    triggerRef.current = trigger;

    const scrubTo = (totalTime) => {
      if (scrubRef.current && seamlessLoopRef.current) {
        const clampedTime = Math.max(0, Math.min(totalTime, totalTimeForAllMembers));
        scrubRef.current.vars.totalTime = clampedTime;
        scrubRef.current.invalidate().restart();
      }
    };

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, []);

  // Removed handleNext and handlePrev

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gradient-to-r from-[#002A76] to-[#001435] rounded-2xl mb-16" ref={galleryRef}>
      <ul className="absolute w-80 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" ref={cardsRef}>
        {visualTeamMembers.map((member, index) => (
          <li
            key={index}
            className="list-none p-0 m-0 w-80 h-96 text-center absolute top-0 left-0 rounded-xl flex flex-col items-center justify-end pb-8"
          >
            <img
              src={member.img}
              alt={member.name}
              className="max-w-[90%] opacity-0 h-full object-cover rounded-xl border-4 border-[#F18A41]"
            />
            {/* Name and Title overlay */}
            <div className="w-full px-3 mt-3">
              <div className="text-white font-semibold text-xl leading-tight truncate">{member.name}</div>
              <div className="text-[#F18A41] text-base leading-tight truncate">{member.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamScrollGallery; 