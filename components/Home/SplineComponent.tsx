'use client';

import { useState, useEffect, JSX } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ChatPopup from '../chat-popup';
import type { SplineProps } from '@splinetool/react-spline';

// Define types for the wrapper component
type SplineWrapperProps = {
  onLoad?: () => void;
};

// Create a wrapper component for Spline
const SplineWrapper: React.FC<SplineWrapperProps> = ({ onLoad }) => {
  // Use any type here since we don't know the exact type from the dynamic import
  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<SplineProps> | null>(null);
  
  // Reference to store the Spline application instance
  const [splineApp, setSplineApp] = useState<any>(null);

  useEffect(() => {
    // Import Spline only on client side
    import('@splinetool/react-spline').then((module) => {
      setSplineComponent(() => module.default);
      // If load was fast, trigger onLoad callback
      if (onLoad) setTimeout(onLoad, 500);
    });
  }, [onLoad]);

  // Effect to disable interactions when splineApp is loaded
  useEffect(() => {
    if (splineApp && splineApp.spline) {
      // Disable all interactions
      if (splineApp.spline.runtime && splineApp.spline.runtime.controllers) {
        // Disable orbit controls
        if (splineApp.spline.runtime.controllers.orbit) {
          splineApp.spline.runtime.controllers.orbit.enabled = false;
        }
        
        // Disable selection
        if (splineApp.spline.runtime.controllers.selection) {
          splineApp.spline.runtime.controllers.selection.enabled = false;
        }
        
        // Disable transform controls
        if (splineApp.spline.runtime.controllers.transform) {
          splineApp.spline.runtime.controllers.transform.enabled = false;
        }
      }
    }
  }, [splineApp]);

  if (!SplineComponent) return null;

  return (
    <SplineComponent
      scene="https://prod.spline.design/uhlQ8Jkl6ibShhHe/scene.splinecode"
      onLoad={(spline) => {
        setSplineApp(spline);
        if (onLoad) onLoad();
      }}
    />
  );
};

export function SplineComponent(): JSX.Element {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };
 
  return (
    <>
      {/* Floating Spline 3D object */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 w-24 h-24 cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        )}
       
        <SplineWrapper 
          onLoad={() => setIsLoading(false)} 
        />
      </motion.div>
     
      {/* Chat Window */}
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}