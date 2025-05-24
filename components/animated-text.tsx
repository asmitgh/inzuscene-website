"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function AnimatedText({ text, className = "", once = true }: AnimatedTextProps) {
  const [replay, setReplay] = useState(true);
  
  // Handle animation replay
  useEffect(() => {
    if (!once) {
      const interval = setInterval(() => {
        setReplay(false);
        setTimeout(() => setReplay(true), 10);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [once]);

  // Create an array of words from the text
  const words = text.split(" ");

  // Variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      {replay && (
        <motion.div
          style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
          variants={container}
          initial="hidden"
          animate="visible"
          className={className}
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              style={{ marginRight: "0.25em" }}
              key={index}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      )}
    </>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({ 
  text, 
  className = "", 
  speed = 10, 
  delay = 0 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting
    if (currentIndex === 0) {
      timeout = setTimeout(() => {
        setCurrentIndex(1);
        setDisplayedText(text.charAt(0));
      }, delay);
      return () => clearTimeout(timeout);
    }
    
    // Continue typing if not complete
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
    } else {
      setIsComplete(true);
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, delay]);

  return (
    <div className={className}>
      <span>{displayedText}</span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="inline-block ml-1 w-2 h-5 bg-current"
        />
      )}
    </div>
  );
}