"use client"

import { useState, useRef } from "react"
import Spline from "@splinetool/react-spline"
import { cn } from "@/lib/utils"

interface SplineChatButtonProps {
  onClick: () => void
  className?: string
}

export default function SplineChatButton({ onClick, className }: SplineChatButtonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const splineRef = useRef(null)

  const handleSplineLoad = () => {
    setIsLoading(false)
  }

  return (
    <div
      className={cn(
        "relative cursor-pointer",
        isLoading ? "w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600" : "w-20 h-20",
        className,
      )}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/ty8HQcmGqZMF5Yez/scene.splinecode"
        onLoad={handleSplineLoad}
        ref={splineRef}
      />
    </div>
  )
}
