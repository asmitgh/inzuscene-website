"use client";

import { useState, useEffect, ReactNode, createContext, useContext } from "react";

// Create a context to share loading state across components
interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isLoading: true });

// Custom hook to access loading state
export const useLoading = () => useContext(LoadingContext);

interface PreloaderProps {
  children: ReactNode;
}

export default function Preloader({ children }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  // Handle loading completion
  useEffect(() => {
    const handleLoad = () => {
      // Immediately start the transition
      setIsLoading(false);
    };

    // Register for assets loading completion
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {/* Loader overlay with single smooth transition */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-100 transition-opacity duration-300 ease-out ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <img
          src="/images/Logo.png"
          alt="Company Logo"
          className="h-[8rem] w-[24rem] mb-4"
        />
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-4 text-gray-500 uppercase tracking-widest">Loading</p>
      </div>

      {/* App content */}
      <div className="transition-opacity duration-300 ease-in" style={{ opacity: isLoading ? 0 : 1 }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}