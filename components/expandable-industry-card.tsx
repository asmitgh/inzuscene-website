"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ExpandableIndustryCardProps {
  title: string;
  description: string;
  image: string;
  stats: {
    label: string;
    value: string;
  }[];
  color: string;
}

export function ExpandableIndustryCard({
  title,
  description,
  image,
  stats,
  color
}: ExpandableIndustryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500",
        "h-[200px] hover:h-[400px]"
      )}
      initial={false}
      animate={{ height: isExpanded ? 400 : 200 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      style={{
        backgroundColor: color
      }}
    >
      <div className="relative h-full w-full">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-end text-white">
          <motion.h3 
            className="text-2xl font-bold mb-2"
            animate={{ opacity: 1 }}
          >
            {title}
          </motion.h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white/90 mb-4">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}