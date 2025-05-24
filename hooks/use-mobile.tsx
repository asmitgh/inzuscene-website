// hooks/use-mobile.tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Safe check for browser environment
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      if (!isInitialized) setIsInitialized(true)
    }
    
    // Modern event listener for broader browser support
    try {
      mql.addEventListener("change", onChange)
    } catch (e) {
      // Fallback for older browsers
      mql.addListener(onChange)
    }
    
    // Initial check
    onChange()
    
    return () => {
      try {
        mql.removeEventListener("change", onChange)
      } catch (e) {
        // Fallback for older browsers
        mql.removeListener(onChange)
      }
    }
  }, [isInitialized])

  // Return false during SSR, then actual value once mounted
  return isMobile
}