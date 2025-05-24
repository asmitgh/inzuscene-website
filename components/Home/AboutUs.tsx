// components/AboutUs.tsx
import { useEffect, useRef } from "react";
import Image from "next/image";
import LogoShowcasePartners from "./LogoShowcasePartners";
import dynamic from 'next/dynamic';
import LogoShowcaseClients from "./LogoShowcaseClients";

const stats = [
  { value: "100+", label: "Man Years of Leadership Experience" },
  { value: "400+", label: "Man Years of Project Management" },
  { value: "10+", label: "Global Partners" },
  { value: "99%", label: "Customer Retention" },
];

export default function AboutUs() {
  const observerRefs = {
    heroText: useRef<HTMLDivElement>(null),
    teamLeftImage: useRef<HTMLDivElement>(null),
    teamRightTopImage: useRef<HTMLDivElement>(null),
    teamRightBottomImage: useRef<HTMLDivElement>(null),
    statsSection: useRef<HTMLDivElement>(null),
    hyrersTitleSection: useRef<HTMLDivElement>(null),
    hyrersDescriptionSection: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Improved observer settings for more responsive animations
    const observerOptions = {
      threshold: 0.01, // Fire when just 1% visible (more responsive)
      rootMargin: "0px 0px -100px 0px", // Less negative margin so animations trigger earlier
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Add a small delay before starting observations to ensure DOM is ready
    setTimeout(() => {
      Object.values(observerRefs).forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 pt-20 mt-20">
        {/* Hero Text */}
        {/* <div
          ref={observerRefs.heroText}
          className="text-left mb-10 opacity-0 transition-opacity duration-500 ease-out"
        >
          <div className="text-[60px] text-center">
            <span className="text-[40px] leading-[60px] font-[500] bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   ">Together,{" "}
            We Build What’s Next. </span>
          </div>
        </div> */}

        {/* Team Images - Taller images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          {/* Left large image - Taller */}
          <div
            ref={observerRefs.teamLeftImage}
            className="lg:col-span-2 relative h-110 lg:h-140 rounded-xl overflow-hidden opacity-0 transition-opacity duration-500 ease-out"
          >
            <div className="w-full h-full bg-gray-200 rounded-xl relative">
              <Image
                src="/images/team1.jpg"
                alt="Team collaborating"
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Right column small images - Taller */}
          <div className="flex flex-col gap-8">
            <div
              ref={observerRefs.teamRightTopImage}
              className="relative h-52 lg:h-64 rounded-xl overflow-hidden opacity-0 transition-opacity duration-500 ease-out"
            >
              <div className="w-full h-full bg-gray-200 rounded-xl relative">
                <Image
                  src="/images/team2.jpg"
                  alt="Team meeting"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
            <div
              ref={observerRefs.teamRightBottomImage}
              className="relative h-52 lg:h-64 rounded-xl overflow-hidden opacity-0 transition-opacity duration-500 ease-out"
            >
              <div className="w-full h-full bg-gray-200 rounded-xl relative">
                <Image
                  src="/images/team3.jpg"
                  alt="Working person"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <LogoShowcasePartners />
          <LogoShowcaseClients />
        </div>

        {/* Stats Section */}
        {/* <div
          ref={observerRefs.statsSection}
          className="relative mb-20 opacity-0 transition-opacity duration-700 delay-600"
        >
          <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-10 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-teal-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-base text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-xl -z-10" />
        </div> */}
      </div>
    </div>
  );
}
