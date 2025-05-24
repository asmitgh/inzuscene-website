"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    id: 'erp',
    icon: '🏢',
    title: 'ERP Solutions',
    description: 'Enterprise resource planning solutions that streamline operations and boost efficiency.',
    color: '#3825e2'
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and migration services for modern enterprises.',
    color: '#38ba99'
  },
  {
    id: 'lowcode',
    icon: '⚡',
    title: 'Low-Code Development',
    description: 'Rapid application development with minimal coding requirements.',
    color: '#a855f7'
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with advanced analytics.',
    color: '#f59e0b'
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets.',
    color: '#ec4899'
  }
];

export function OrbitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      
      if (isInView && !isSticky) {
        setIsSticky(true);
        document.body.style.overflow = 'hidden';
      } else if (!isInView && isSticky) {
        setIsSticky(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isSticky]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      const index = Math.floor(value * services.length);
      if (index !== activeService) {
        setActiveService(Math.min(index, services.length - 1));
        
        // Trigger scroll to next section when all services are viewed
        if (index >= services.length - 1) {
          document.body.style.overflow = '';
          setIsSticky(false);
        }
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeService]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen relative flex items-center justify-center py-20",
        isSticky && "fixed top-0 left-0 right-0 z-50"
      )}
    >
      <div className="container relative">
        <div className="flex items-center justify-between">
          {/* Orbit */}
          <div className="w-1/2 relative">
            <motion.div 
              className="relative w-[400px] h-[400px]"
              style={{ rotate }}
            >
              {services.map((service, index) => {
                const angle = (index * 360) / services.length;
                const isActive = index === activeService;
                
                return (
                  <motion.div
                    key={service.id}
                    className={cn(
                      "absolute w-16 h-16 rounded-full flex items-center justify-center",
                      "bg-white shadow-lg transition-all duration-300",
                      isActive ? "scale-125" : "scale-100"
                    )}
                    style={{
                      top: `${Math.sin((angle * Math.PI) / 180) * 180 + 200}px`,
                      left: `${Math.cos((angle * Math.PI) / 180) * 180 + 200}px`,
                    }}
                    animate={{
                      backgroundColor: isActive ? service.color : "#ffffff",
                      color: isActive ? "#ffffff" : "#000000",
                    }}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Service Info */}
          <div className="w-1/2">
            <motion.div
              key={services[activeService].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl"
            >
              <div 
                className="text-4xl mb-4"
                style={{ color: services[activeService].color }}
              >
                {services[activeService].icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {services[activeService].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {services[activeService].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}