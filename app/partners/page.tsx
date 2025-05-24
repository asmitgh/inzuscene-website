"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/scroll-progress";
import { LogoCarousel } from "@/components/partners-carousel";
import { useIsMobile } from "@/hooks/use-mobile"; // Import the hook
import { SplineComponent } from "@/components/Home/SplineComponent"
export default function PartnersPage() {
  const isMobile = useIsMobile(); // Use the hook to detect mobile
  
  return (
    <div className="pt-16 md:pt-20">
      <ScrollProgress />
      <SplineComponent />
      {/* Hero Section - Reduced padding on mobile */}
      <section className="relative py-12 md:py-[8rem] bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              Our Partners, Our Power
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/80">
              We collaborate with global leaders to deliver intelligent, secure, and scalable digital solutions
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Partners Carousel */}
      <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Technology & Strategic Partners</h2>
          <LogoCarousel type="partners" />
        </div>
      </section>
      
      {/* Partnership Approach */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Our Approach to Partnership
          </h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 mb-6 md:mb-16">
            {[
              {
                icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-[#3825e2]" />,
                title: "Strategic Alignment",
                description: "We build lasting relationships based on shared values, vision, and commitment to innovation."
              },
              {
                icon: <Zap className="h-6 w-6 md:h-8 md:w-8 text-[#38ba99]" />,
                title: "Technical Excellence",
                description: "Our certified experts ensure seamless integration and optimal utilization of partner technologies."
              },
              {
                icon: <Globe className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />,
                title: "Global Impact",
                description: "Together with our partners, we deliver transformative solutions across industries and regions."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl shadow-md md:shadow-lg"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {[
              {
                title: "Partner Benefits",
                items: [
                  "Access to Inzuscene's global client base",
                  "Joint marketing and business development",
                  "Technical enablement and certification",
                  "Collaborative innovation opportunities",
                  "Dedicated partner success team"
                ]
              },
              {
                title: "Partnership Models",
                items: [
                  "Technology Alliance Partners",
                  "System Integration Partners",
                  "Solution Development Partners",
                  "Consulting Partners",
                  "Channel Partners"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl shadow-md md:shadow-lg"
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">{section.title}</h3>
                <ul className="space-y-2 md:space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3825e2] rounded-full mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Clients Section */}
      <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Our Valued Customers</h2>
          <LogoCarousel type="clients" />
        </div>
      </section>
      
      {/* CTA Section - Optimized for mobile */}
      <section className="py-12 md:py-24 morphing-bg text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              Let's Build Together
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8">
              Join our ecosystem of innovation and help shape the future of enterprise technology
            </p>
            <Button 
              size={isMobile ? "default" : "lg"}
              className="bg-white text-[#3825e2] hover:bg-gray-100 w-full sm:w-auto"
              asChild
            >
              <Link href="/contact">Become a Partner</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
