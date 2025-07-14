import React, { useRef, useState, useEffect } from 'react';

const ScrollProgressCards = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observers = [];
    const currentCardRefs = cardRefs.current;

    currentCardRefs.forEach((card, index) => {
      if (card) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => new Set([...prev, index]));
            }
          },
          {
            threshold: 0.2, // Trigger when 20% of the card is visible
            rootMargin: '0px 0px -100px 0px' // Start animation 100px before the card is fully visible
          }
        );

        observer.observe(card);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const cards = [
    {
      title: "Real-time transaction monitoring and fraud detection",
      chart: {
        events: [
          { label: "Suspicious Activity", date: "2:30 PM" },
          { label: "Fraud Alert", date: "2:32 PM" }
        ],
        note: "Blocked within 30 seconds"
      },
      vs: "Traditional payment processors",
      vsText: "Manual monitoring with delayed response times, often taking hours to detect and block fraudulent transactions"
    },
    {
      title: "Instant API integration with comprehensive documentation",
      opportunity: {
        type: "Integration",
        text: "Go live in under 24 hours"
      },
      vs: "Traditional payment processors",
      vsText: "Complex integration processes requiring weeks of development and multiple rounds of testing and approval"
    },
    {
      title: "AI-powered risk assessment and compliance monitoring",
      feature: {
        type: "Alert",
        text: "Compliance check passed automatically"
      },
      vs: "Traditional payment processors",
      vsText: "Manual compliance checks with outdated systems, requiring extensive paperwork and long approval cycles"
    },
    {
      title: "Automated settlement and reconciliation",
      feature: {
        type: "Action",
        text: "Settled 50,000+ transactions today"
      },
      vs: "Traditional payment processors",
      vsText: "Manual settlement processes requiring multiple bank visits and days of reconciliation work"
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Main Content */}
      <div
        ref={containerRef}
        className="w-full"
        style={{ margin: 0, padding: 0 }}
      >
        <div>
          {Array.from({ length: Math.ceil(cards.length / 2) }).map((_, pairIdx) => {
            const firstCardIdx = pairIdx * 2;
            const secondCardIdx = firstCardIdx + 1;
            const isFirstPair = pairIdx === 0;
            const isLastPair = pairIdx === Math.ceil(cards.length / 2) - 1;
            let marginBottom = 0;
            if (isFirstPair) {
              marginBottom = 80;
            } else if (!isLastPair) {
              marginBottom = 80;
            }
            return (
              <div
                key={pairIdx}
                style={{
                  marginBottom: `${marginBottom}px`,
                  paddingTop: isFirstPair ? '40px' : 0,
                  paddingBottom: isLastPair ? '40px' : 0,
                }}
              >
                {[firstCardIdx, secondCardIdx].map((index) =>
                  cards[index] ? (
                    <div
                      key={index}
                      ref={(el) => (cardRefs.current[index] = el)}
                      className={`flex flex-col justify-center items-center transition-all duration-1000 ease-out ${
                        visibleCards.has(index)
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-12'
                      }`}
                    >
                      {/* FINZEP Card */}
                      <div className={`bg-gradient-to-br from-[#F18A41]/10 to-[#9DADE5]/10 border border-[#F18A41]/20 text-gray-900 rounded-2xl p-12 mb-4 w-full max-w-5xl shadow-2xl flex flex-col transition-all duration-1000 ease-out delay-200 ${
                        visibleCards.has(index)
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-8'
                      }`}>
                        <div className="flex items-center justify-between mb-8">
                          <div className="font-bold text-2xl text-[#233831]">FINZEP</div>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#F18A41]/20 rounded-full flex items-center justify-center">
                              <span className="text-[#F18A41] text-lg">⚡</span>
                            </div>
                            <div className="text-base text-gray-600">
                              {cards[index].chart?.note || cards[index].opportunity?.text || cards[index].feature?.text}
                            </div>
                          </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-10 leading-tight flex-grow text-[#233831]">
                          {cards[index].title}
                        </h2>

                        {/* Chart visualization for first card */}
                        {index === 0 && (
                          <div className="relative h-40 mb-6">
                            <svg className="w-full h-full">
                              <path
                                d="M 50 80 Q 200 60 350 40 Q 500 20 650 30"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                                fill="none"
                              />
                              <circle cx="200" cy="55" r="5" fill="#F18A41" />
                              <circle cx="500" cy="25" r="5" fill="#F18A41" />
                              <text x="150" y="120" className="text-sm fill-gray-600">2:30 PM</text>
                              <text x="450" y="120" className="text-sm fill-gray-600">2:32 PM</text>
                            </svg>
                            <div className="absolute top-4 right-4 space-y-2">
                              <div className="text-sm text-gray-600">Fraud Alert</div>
                              <div className="text-sm text-gray-600">Suspicious Activity</div>
                            </div>
                          </div>
                        )}

                        {/* Opportunity/Feature badge */}
                        {(cards[index].opportunity || cards[index].feature) && (
                          <div className="flex items-center space-x-3 mb-6">
                            <div className={`px-4 py-2 rounded-full text-base font-medium ${
                              cards[index].opportunity 
                                ? 'bg-green-100 text-green-700' 
                                : cards[index].feature?.type === 'Alert'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {cards[index].opportunity?.type || cards[index].feature?.type}
                            </div>
                            <span className="text-base text-gray-600">
                              {cards[index].opportunity?.text || cards[index].feature?.text}
                            </span>
                          </div>
                        )}

                        <div className="text-sm text-gray-500 text-center mt-auto">
                          * All features powered by advanced AI and real-time processing
                        </div>
                      </div>

                      {/* VS Card */}
                      <div className={`bg-gray-100 border border-gray-200 rounded-2xl p-12 w-full max-w-5xl flex flex-col transition-all duration-1000 ease-out delay-400 ${
                        visibleCards.has(index)
                          ? 'opacity-100 transform translate-y-0'
                          : 'opacity-0 transform translate-y-8'
                      }`}>
                        <div className="flex items-center space-x-4 mb-8">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-700 text-base font-bold">VS</span>
                          </div>
                          <div className="text-gray-700 font-semibold text-lg">{cards[index].vs}</div>
                        </div>

                        <p className="text-gray-600 text-xl leading-relaxed flex-grow flex items-center">
                          {cards[index].vsText}
                        </p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollProgressCards; 