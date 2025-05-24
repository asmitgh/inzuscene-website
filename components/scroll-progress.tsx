"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3825e2] to-[#38ba99] z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

export function ScrollSections({ 
  sections = [],
  className = "",
}: { 
  sections: string[],
  className?: string 
}) {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id));
      const validSectionElements = sectionElements.filter(el => el !== null) as HTMLElement[];
      
      if (validSectionElements.length === 0) return;
      
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      for (let i = validSectionElements.length - 1; i >= 0; i--) {
        const section = validSectionElements[i];
        if (scrollPosition >= section.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className={`hidden lg:flex flex-col fixed left-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
      {sections.map((section, index) => (
        <motion.a
          key={index}
          href={`#${section}`}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
          className="w-3 h-3 mb-4 rounded-full cursor-pointer transition-colors duration-300"
          style={{
            backgroundColor: activeSection === index ? '#3825e2' : '#ccc',
          }}
        />
      ))}
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ end, duration = 2, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (typeof window !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      
      const element = document.getElementById(`count-${end}`);
      if (element) observer.observe(element);
    }
    
    return () => {
      if (observer) observer.disconnect();
    };
  }, [end]);
  
  useEffect(() => {
    if (!isInView) return;
    
    let frameRate = 1000 / 60;
    let totalFrames = Math.round(duration * 60);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(end * progress));
      
      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, frameRate);
    
    return () => clearInterval(counter);
  }, [isInView, end, duration]);

  return (
    <span id={`count-${end}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}