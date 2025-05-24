"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useIsMobile } from "@/hooks/use-mobile";

// Use the actual logo data from the provided file
const partners = [
  { name: "IFS", logo: "/logos/6.svg" },
  { name: "Boomi", logo: "/logos/7.svg" },
  { name: "EnterpriseDB", logo: "/logos/8.svg" },
  { name: "Cisco", logo: "/logos/9.svg" },
  { name: "Bitdefender", logo: "/logos/10.svg" },
  { name: "TigerGraph", logo: "/logos/11.svg" },
  { name: "CyberArk", logo: "/logos/12.svg" },
  { name: "AWS", logo: "/logos/13.svg" },
  { name: "Pagentra", logo: "/logos/14.svg" },
  { name: "Pagero", logo: "/logos/15.svg" },
  { name: "SolarWinds", logo: "/logos/16.svg" },
  { name: "Odoo", logo: "/logos/17.svg" },
  { name: "Trend Micro", logo: "/logos/18.svg" },
  { name: "Fortinet", logo: "/logos/19.svg" },
  { name: "Palo Alto Networks", logo: "/logos/20.svg" },
  { name: "New Partner 1", logo: "/logos/21.svg" },
  { name: "New Partner 2", logo: "/logos/22.svg" },
];

const clients = [
  { name: "Tata Steel", logo: "/logos/clients/26.svg" },
  { name: "Port of Duqm", logo: "/logos/clients/27.svg" },
  { name: "Tracker", logo: "/logos/clients/28.svg" },
  { name: "Launch", logo: "/logos/clients/29.svg" },
  { name: "GIBB", logo: "/logos/clients/30.svg" },
  { name: "MTN", logo: "/logos/clients/31.svg" },
  { name: "Instituto del Rosario", logo: "/logos/clients/32.svg" },
  { name: "NOMAC", logo: "/logos/clients/33.svg" },
  { name: "CIRC", logo: "/logos/clients/34.svg" },
  { name: "Pilansberg Platinum Mines", logo: "/logos/clients/35.svg" },
  { name: "SEYPEC", logo: "/logos/clients/36.svg" },
  { name: "Deloitte", logo: "/logos/clients/37.svg" },
  // { name: "SAAB", logo: "/logos/clients/38.svg" },
  { name: "NHPC Limited", logo: "/logos/clients/39.svg" },
  { name: "Rwanda Energy Group", logo: "/logos/clients/40.svg" },
  { name: "Royal Court Affairs", logo: "/logos/clients/41.svg" },
  { name: "New Client 1", logo: "/logos/clients/42.svg" },
  { name: "New Client 2", logo: "/logos/clients/43.svg" },
  { name: "New Client 1", logo: "/logos/clients/44.svg" },
  { name: "New Client 2", logo: "/logos/clients/45.svg" },
];


interface LogoCarouselProps {
  type: 'partners' | 'clients';
}

export function LogoCarousel({ type }: LogoCarouselProps) {
  const isMobile = useIsMobile();
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const logos = type === 'partners' ? partners : clients;
  
  // Adjust animation speed based on screen size
  const animationDuration = isMobile ? 15 : 19;
  
  useEffect(() => {
    const scroll1 = scrollRef1.current;
    const scroll2 = scrollRef2.current;

    if (scroll1 && scroll2) {
      const scrollContent1 = scroll1.querySelector('.scroll-content');
      const scrollContent2 = scroll2.querySelector('.scroll-content');

      if (scrollContent1 && scrollContent2) {
        scrollContent1.setAttribute('style', `animation: scroll-left ${animationDuration}s linear infinite;`);
        scrollContent2.setAttribute('style', `animation: scroll-right ${animationDuration}s linear infinite;`);
      }
    }
    
    // Pause animations when tab is not visible to improve performance
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      const scroll1Content = scrollRef1.current?.querySelector('.scroll-content');
      const scroll2Content = scrollRef2.current?.querySelector('.scroll-content');
      
      if (scroll1Content && scroll2Content) {
        if (isVisible) {
          scroll1Content.setAttribute('style', `animation: scroll-left ${animationDuration}s linear infinite;`);
          scroll2Content.setAttribute('style', `animation: scroll-right ${animationDuration}s linear infinite;`);
        } else {
          scroll1Content.setAttribute('style', 'animation-play-state: paused;');
          scroll2Content.setAttribute('style', 'animation-play-state: paused;');
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animationDuration]);

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-20%); }
          100% { transform: translateX(0); }
        }
        .scroll-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        .scroll-content {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
        }
        /* Add touch-action manipulation for better mobile experience */
        .scroll-container {
          touch-action: pan-x;
        }
        /* Add performance optimizations */
        .scroll-content {
          backface-visibility: hidden;
        }
      `}</style>

      <div ref={scrollRef1} className="scroll-container mb-1 md:mb-2">
        <div className="scroll-content">
          {[...logos, ...logos].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              className="inline-block mx-1 md:mx-2"
            >
              <div className="bg-white dark:bg-gray-800 p-1 md:p-2 w-15 h-15 md:w-36 md:h-36 lg:w-48 lg:h-48 flex items-center justify-center rounded shadow-sm">
                <div className="relative w-full h-full">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 144px, 192px"
                    className="object-contain p-1 md:p-2"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={scrollRef2} className="scroll-container">
        <div className="scroll-content">
          {[...logos.reverse(), ...logos].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              className="inline-block mx-1 md:mx-2"
            >
              <div className="bg-white dark:bg-gray-800 p-1 md:p-2 w-15 h-15 md:w-36 md:h-36 lg:w-48 lg:h-48 flex items-center justify-center rounded shadow-sm">
                <div className="relative w-full h-full">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 144px, 192px"
                    className="object-contain p-1 md:p-2"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
