// AnimatedCards.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";

// Define our card data structure
interface CardData {
  id: string;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  startColor: string;
  endColor: string;
  contentAlignment?: "left" | "center" | "right";
  imageUrl: string;
}

// Props for our expanding cards container
interface AnimatedCardsProps {
  cards: CardData[];
  defaultExpandedIndex?: number; // Make initial expanded card configurable
}

// The animated cards component
const AnimatedCards: React.FC<AnimatedCardsProps> = ({
  cards,
  defaultExpandedIndex = 0, // Default to first card if not specified
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    defaultExpandedIndex
  );

  // Refs array to store references to content containers
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Set up the refs array based on the number of cards
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, cards.length);
  }, [cards.length]);

  return (
    <>
      <div className="flex space-x-4 h-[450px] relative">
        {cards.map((card, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={card.id}
              className="relative rounded-lg overflow-hidden transition-all duration-700 ease-in-out"
              style={{
                flex: isHovered ? "5" : "0.4",
                backgroundImage: `linear-gradient(to right, ${card.startColor}, ${card.endColor})`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(defaultExpandedIndex)}
            >
              {/* Wrapper for content that maintains its internal structure during transitions */}
              <div className="absolute top-0 left-0 w-full h-full">
                {/* Fixed-width text container that maintains its shape */}
                <div 
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: "400px", // Fixed width for text container
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(-20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                >
                  {/* Actual text content */}
                  <div className="h-full w-full flex flex-col pl-20 justify-center items-start text-left p-8">
                    <div>
                      <h2 className="text-3xl font-light text-white whitespace-nowrap">
                        {card.title}
                      </h2>
                      {card.subtitle && (
                        <h3 className="text-3xl font-light text-white whitespace-nowrap">
                          {card.subtitle}
                        </h3>
                      )}
                    </div>
                    <ul className="mt-6 space-y-4">
                      {card.bulletPoints.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-start space-x-2"
                        >
                          <div className="h-2 w-2 rounded-full bg-white flex-shrink-0"></div>
                          <span className="text-white text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Fixed-position image container */}
                <div 
                  className="absolute top-0 right-0 h-full"
                  style={{
                    width: "calc(100% - 450px)", // Takes remaining space
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 400ms ease-out",
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                >
                  <div className="h-full w-full flex items-center justify-center p-6 pr-20">
                    <div className="w-full h-72 rounded-lg overflow-hidden border border-white/30 bg-white/10">
                      {card.imageUrl ? (
                        <img 
                          src={card.imageUrl} 
                          alt={`${card.title} illustration`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card title when collapsed - appears only when card is not expanded */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transition: "opacity 300ms ease-in-out",
                }}
              >
                <h3 
                  className="text-white text-lg font-medium transform rotate-90 whitespace-nowrap"
                >
                  {card.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4 pb-4 ">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === hoveredIndex ? "w-6 bg-black" : "w-3 bg-gray-800"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
};

export default AnimatedCards;
export { type CardData }; // Export the CardData type for reuse