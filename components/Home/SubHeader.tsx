// SubHeader.tsx
"use client";
import React from "react";

interface SubHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  highlightedText,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-2 pt-20 pb-10 text-center">
  <h2 className="text-6xl leading-tight text-black">
    <span className="text-transparent bg-clip-text bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600     ">
    {title}{" "}{highlightedText}
    </span>
  </h2>
  <p className="mt-8 mb-12 max-w-4xl text-lg font-medium text-black">
    {description}
  </p>
</div>

  );
};

export default SubHeader;