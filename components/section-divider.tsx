"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  type?: "wave" | "curve" | "triangle" | "arrows";
  color?: string;
  height?: number;
  flipY?: boolean;
}

export function SectionDivider({
  type = "wave",
  color = "#ffffff",
  height = 80,
  flipY = false,
}: SectionDividerProps) {
  const getPath = () => {
    switch (type) {
      case "wave":
        return "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";
      case "curve":
        return "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z";
      case "triangle":
        return "M500,2.27L0,500H1000V0L500,2.27Z";
      case "arrows":
        return "M-3,154.5L497,0L997,154.5V0H-3V154.5z";
      default:
        return "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
      <motion.svg
        initial={{ opacity: 0, y: flipY ? -20 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: flipY ? "rotate(180deg)" : undefined,
        }}
      >
        <path
          d={getPath()}
          fill={color}
        />
      </motion.svg>
    </div>
  );
}