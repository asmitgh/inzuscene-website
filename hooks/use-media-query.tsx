import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media query matches
 * @param query The media query to match against
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Default to false during SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set initial value
      setMatches(media.matches);

      // Define callback
      const updateMatches = () => {
        setMatches(media.matches);
      };

      // Listen for changes
      if (media.addEventListener) {
        media.addEventListener('change', updateMatches);
      } else {
        // Fallback for older browsers
        media.addListener(updateMatches);
      }

      // Cleanup
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener('change', updateMatches);
        } else {
          // Fallback for older browsers
          media.removeListener(updateMatches);
        }
      };
    }
    
    // Return no-op cleanup function if window is not defined
    return () => {};
  }, [query]);

  return matches;
}