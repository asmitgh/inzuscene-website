"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLoading } from '@/components/Preloader';

const App = () => {
  // Get loading state from context
  const { isLoading } = useLoading();
  
  /*──────────── refs ───────────*/
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoplayCompletedRef = useRef<boolean>(false);
  const isAutoplayingRef = useRef<boolean>(false);
  const lastFrameRef = useRef<number>(5);
  const animationInitializedRef = useRef<boolean>(false);

  /*──────────── states ───────────*/
  const [currentFrame, setCurrentFrame] = useState(5);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const manualIndex = useTransform(scrollYProgress, [0, 1], [5, 240]);

  /*──────────── preload frames ───────────*/
  const images = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const frames: HTMLImageElement[] = [];
    for (let i = 5; i <= 240; i++) {
      const img = new window.Image();
      img.src = `/scroll/${i}.webp`;
      frames.push(img);
    }
    return frames;
  }, []);

  const preloadFirstFrames = async () => {
    let loadedCount = 0;
    await Promise.all(
      images.slice(0, 10).map(img =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            loadedCount++;
            resolve();
          } else {
            img.onload = () => {
              loadedCount++;
              resolve();
            };
          }
        }),
      ),
    );
    if (loadedCount >= 5) {
      setImagesLoaded(true);
    }
  };

  /*──────────── draw frame ───────────*/
  const renderFrame = useCallback((idx: number) => {
    const frameIndex = Math.max(5, Math.min(Math.round(idx), 240)) - 5;
    const img = images[frameIndex];
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.complete) {
      const frame = frameIndex + 5;
      setCurrentFrame(frame);
      lastFrameRef.current = frame;
      
      const aspectRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
      if (aspectRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * aspectRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / aspectRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [images]);

  /*──────────── always render frame based on scroll ───────────*/
  useMotionValueEvent(manualIndex, "change", (latest) => {
    renderFrame(latest);
  });

  /*──────────── handle interruption ───────────*/
  const handleInterruption = useCallback(() => {
    if (isAutoplayingRef.current) {
      isAutoplayingRef.current = false;
    }
  }, []);

  /*──────────── autoplay animation ───────────*/
  useEffect(() => {
    // Only start autoplay when preloader is finished AND images are loaded
    if (!imagesLoaded || isLoading || autoplayCompletedRef.current || animationInitializedRef.current) return;

    // Render first frame immediately to prevent blank canvas
    renderFrame(5);
    
    // Mark that we've initialized the animation
    animationInitializedRef.current = true;
    isAutoplayingRef.current = true;
    
    let isMounted = true;
    const duration = 6750; // ms
    const totalScrollHeight = containerRef.current?.scrollHeight || 6750;
    const viewportHeight = window.innerHeight;
    const maxScroll = totalScrollHeight - viewportHeight;

    let animationFrameId: number;
    let startTime: number | null = null;

    const smoothStep = (t: number) => t * t * (3 - 2 * t);

    const animate = (timestamp: number) => {
      if (!isMounted || !isAutoplayingRef.current) return;
      
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = smoothStep(rawProgress);

      // Set scroll position
      const scrollY = easedProgress * maxScroll;
      window.scrollTo(0, scrollY);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isAutoplayingRef.current = false;
        autoplayCompletedRef.current = true;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, isLoading, renderFrame]);

  /*──────────── detect manual user scroll ───────────*/
  useEffect(() => {
    const handleUserScroll = () => {
      handleInterruption();
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchstart', handleUserScroll, { passive: true });
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        handleInterruption();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchstart', handleUserScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleInterruption]);

  /*──────────── preload first frames ───────────*/
  useEffect(() => {
    preloadFirstFrames();
  }, []);

  /*──────────── JSX ───────────*/
  return (
    <div
      ref={containerRef}
      className="h-[6750px]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`
        body::-webkit-scrollbar{display:none}
        html, body {
          overscroll-behavior: none;
          margin: 0;
          padding: 0;
          scroll-behavior: auto;
        }
      `}</style>

      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default App;