'use client';

import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

type Props = { show: boolean };

export default function LoadingScreen({ show }: Props) {
  const [progress, setProgress] = useState(0);

  /* ----------  core “real %” logic  ---------- */
  useEffect(() => {
    if (!show) return;

    // collect every resource that can fire a native `load` event
    const resources: (HTMLImageElement | HTMLLinkElement | HTMLScriptElement | HTMLVideoElement | HTMLAudioElement)[] =
      Array.from(
        document.querySelectorAll(
          'img,link[rel="stylesheet"],script,video,audio,iframe,object,embed'
        )
      );

    const alreadyLoaded = resources.filter(
      (el) => (el as any).complete || (el as any).readyState === 4
    ).length;

    let completed = alreadyLoaded;
    const total = resources.length || 1; // avoid /0

    const update = () => {
      completed += 1;
      setProgress(Math.min(99, Math.round((completed / total) * 100)));
    };

    // listen for the remainder
    resources.forEach((el) => {
      if ((el as any).complete || (el as any).readyState === 4) return;
      el.addEventListener('load', update, { once: true });
      el.addEventListener('error', update, { once: true });
    });

    // hard-stop if onload never fires for some asset
    const safety = setTimeout(() => setProgress(100), 8000);

    window.addEventListener('load', () => setProgress(100), { once: true });
    return () => clearTimeout(safety);
  }, [show]);

  /* ----------  visual layer  ---------- */
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Background Spline */}
      <Spline
        className="pointer-events-none absolute inset-0 h-full w-full"
        scene="https://prod.spline.design/p500Hz36wL4K3oiO/scene.splinecode"
        onLoad={() => setProgress((p) => (p < 90 ? 90 : p))}
      />

      {/* Centered progress UI */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-6">
        <span className="text-xl font-medium text-white drop-shadow-lg">
          {progress}%
        </span>

        <div className="h-2 w-64 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full w-full bg-teal-400"
            animate={{ x: `${progress - 100}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
