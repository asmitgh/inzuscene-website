'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Search, MapPin, Box, Code, Sparkles } from "lucide-react";

// Define particles as a constant outside the component
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 15,
}));

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Hide the navbar, footer, and other layout elements
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const splineComponent = document.querySelector('.spline-component');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (scrollProgress && scrollProgress instanceof HTMLElement) scrollProgress.style.display = 'none';
    if (splineComponent && splineComponent instanceof HTMLElement) splineComponent.style.display = 'none';
    
    // Track mouse position for the compass area icons only
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    // Show particles after a slight delay for a better loading experience
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 500);

    window.addEventListener("mousemove", handleMouseMove);
    
    // Cleanup function to restore visibility when navigating away
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
      
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (scrollProgress && scrollProgress instanceof HTMLElement) scrollProgress.style.display = '';
      if (splineComponent && splineComponent instanceof HTMLElement) splineComponent.style.display = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4 overflow-hidden">
      {/* Override title */}
      <div style={{ display: 'none' }}>
        <title>Page Not Found | Inzuscene</title>
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 animate-gradient-slow"></div>
      </div>

      {/* Floating particles with static animations (no mouse interaction) */}
      {showParticles && PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 opacity-20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `staticFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
          }}
        />
      ))}

      <div className="max-w-md w-full mx-auto text-center space-y-8 relative z-10">
        {/* Main decorative element */}
        <div className="relative h-64 w-64 mx-auto">
          {/* Concentric gradient circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-gradient-to-br from-teal-400/30 via-blue-500/20 to-indigo-600/30 animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-teal-400/40 via-blue-500/30 to-indigo-600/40 animate-pulse [animation-delay:150ms]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-teal-400/50 via-blue-500/40 to-indigo-600/50 animate-pulse [animation-delay:300ms]"></div>
          </div>
          
          {/* Central compass icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Compass 
                className="h-16 w-16 text-indigo-600 animate-spin-slow"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(79, 70, 229, 0.4))",
                }}
              />
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
            </div>
          </div>

          {/* Interactive floating elements that respond to mouse movement (only in compass region) */}
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{ 
              top: `${(1 - mousePosition.y) * 40}%`, 
              right: `${(1 - mousePosition.x) * 20}%` 
            }}
          >
            <Search className="h-8 w-8 text-teal-500 animate-float" />
          </div>
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{ 
              bottom: `${mousePosition.y * 40}%`, 
              left: `${mousePosition.x * 20}%` 
            }}
          >
            <MapPin className="h-8 w-8 text-blue-500 animate-float-delayed" />
          </div>
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{ 
              top: `${mousePosition.y * 60}%`, 
              left: `${(1 - mousePosition.x) * 20}%` 
            }}
          >
            <Code className="h-6 w-6 text-indigo-600 animate-float" />
          </div>
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{ 
              bottom: `${(1 - mousePosition.y) * 60}%`, 
              right: `${mousePosition.x * 20}%` 
            }}
          >
            <Box className="h-6 w-6 text-teal-500 animate-float-delayed" />
          </div>
        </div>

        {/* Text content with gradient */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text animate-gradient sm:text-7xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-indigo-900">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has
            been moved.
          </p>
        </div>

        {/* Action button with hover effect */}
        <div className="pt-8 space-y-4">
          <Button 
            asChild 
            size="lg" 
            className="px-8 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 hover:from-teal-500 hover:via-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            If you believe this is an error, please contact{" "}
            <a href="mailto:support@inzuscene.com" className="text-blue-500 hover:text-blue-700 underline">
              support
            </a>
            .
          </p>
        </div>
      </div>

      {/* Sparkles effect */}
      <div className="absolute bottom-12 right-12 opacity-70 animate-bounce-slow">
        <Sparkles className="h-10 w-10 text-indigo-600" />
      </div>
    </div>
  );
}