"use client";
import dynamic from "next/dynamic";

// Dynamically import components

const HeroSection = dynamic(() => import("@/components/Home/HeroSection"));
const AboutUs = dynamic(() => import("@/components/Home/AboutUs"));
const MainContent = dynamic(() => import("@/components/Home/main-content"));
const LogoShowcaseClients = dynamic(() => import("@/components/Home/LogoShowcaseClients"));
const DevinCardsExample = dynamic(() => import("@/components/Home/DevinCardsExample"));
const BlogSection = dynamic(() => import("@/components/Home/BlogSection"));
const FAQ = dynamic(() => import("@/components/Home/FAQ"));
const SplineComponent = dynamic(
  () => import("@/components/Home/SplineComponent").then(mod => mod.SplineComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const Page = () => {
  return (
    <div>
      <HeroSection />
      {/* <AboutUs /> */}
      <MainContent />
      <DevinCardsExample />
      <BlogSection />
      <FAQ />
      <SplineComponent />
    </div>
  );
};

export default Page;