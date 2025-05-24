'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  /* first paint --------------------------------------------------------- */
  useEffect(() => {
    // hide after initial page fully loaded
    if (document.readyState === 'complete') setIsLoading(false);
    else window.addEventListener('load', () => setIsLoading(false), { once: true });
  }, []);

  /* subsequent route changes ------------------------------------------- */
  useEffect(() => {
    // pathname changes *after* the new route’s JS has been fetched,
    // so just flash the loader for UX consistency
    if (!isLoading) {
      setIsLoading(true);
      // small delay so the bar is visible but snappy
      const t = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LoadingScreen show={isLoading} />
      {children}
    </>
  );
}
