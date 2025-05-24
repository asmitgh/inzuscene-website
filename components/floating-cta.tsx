"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-6 bottom-6 z-50"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl mb-4 max-w-xs"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Need help?</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Let's discuss how our solutions can help your business grow and innovate.
                </p>
                
                <div className="space-y-2">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#3825e2] to-[#38ba99] hover:shadow-lg"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#3825e2] text-[#3825e2]"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
              isOpen 
                ? "bg-gray-200 dark:bg-gray-700" 
                : "bg-gradient-to-r from-[#3825e2] to-[#38ba99]"
            }`}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}