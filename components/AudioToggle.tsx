"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const AudioToggle: React.FC = () => {
  // Set isPlaying to true by default
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Auto-play when component mounts
    if (isPlaying) {
      // We need to handle auto-play restrictions in browsers
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, update state to reflect actual state
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
          setIsIndicatorActive(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center">
      <button
        onClick={toggleAudio}
        className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg flex items-center justify-center gap-1 border border-gray-300 transition-all duration-300"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        <audio
          ref={audioRef}
          className="hidden"
          src="/audio/bgm.mp3"
          loop
        />
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={clsx(
              "indicator-line w-1 mx-0.5 rounded-full bg-indigo-600 transition-all duration-300",
              isIndicatorActive 
                ? "animate-sound-wave opacity-100" 
                : "h-2 opacity-50"
            )}
            style={{
              animationDelay: `${bar * 0.15}s`,
              height: isIndicatorActive ? `${Math.max(3, bar * 4)}px` : '8px',
            }}
          />
        ))}
      </button>
      <span className="mt-2 text-xs font-medium text-white bg-black/70 px-2 py-1 rounded-full">
        {isPlaying ? "Sound On" : "Sound Off"}
      </span>
    </div>
  );
};

export default AudioToggle;