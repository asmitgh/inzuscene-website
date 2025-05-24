"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightCircle, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


export interface ServiceCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  technologies: string[];
  benefits: string[];
  caseStudies: {
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] // Custom spring-like ease
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Custom hook to detect clicks outside of a component
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export function ServiceCard({ service }: { service: ServiceCardProps }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("benefits");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle outside click for modal
  useOutsideClick(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Function to navigate between tabs on mobile
  const navigateTab = (direction: 'prev' | 'next') => {
    const tabs = ["benefits", "technologies", "faqs"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  return (
    <>
      <motion.div
        className="h-full overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 group cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(true)}
      >
        <div className="h-48 sm:h-56 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 rounded-full p-2 shadow-md">
            <span className="text-2xl">{service.icon}</span>
          </div>
          
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-[#3825e2] dark:text-blue-300 rounded-full shadow-sm">
              {service.category}
            </span>
          </div>
        </div>

        <div className="p-5 relative z-10 -mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-5 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-[#3825e2] transition-colors duration-200">
              {service.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {service.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {service.technologies.length > 3 && (
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full">
                  +{service.technologies.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center text-[#3825e2] font-medium group-hover:translate-x-1 transition-transform duration-200">
              View Details <ArrowRightCircle className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              ref={modalRef}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] mx-auto overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header Area */}
              <div className="h-auto sm:h-72 bg-gray-200 dark:bg-gray-800 relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.6)] to-transparent" />

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Icon and category tags - HIDDEN ON MOBILE */}
                <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2">
                  <span className="inline-block bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg">
                    <span className="text-3xl">{service.icon}</span>
                  </span>
                  <span className="text-xs font-medium px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-[#3825e2] dark:text-blue-300 rounded-full shadow-sm">
                    {service.category}
                  </span>
                </div>

                {/* Title and description - HIDDEN ON MOBILE */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 hidden sm:block">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-white/80 sm:text-lg line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Mobile Tab Navigation */}
              {isMobile && (
                <div className="flex flex-col px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  {/* Tab Title */}
                  <h3 className="text-lg font-medium text-center mb-3">
                    {activeTab === "benefits" && "Key Benefits"}
                    {activeTab === "technologies" && "Technologies"}
                    {activeTab === "faqs" && "FAQs"}
                  </h3>
                  
                  {/* Tab Navigation Controls */}
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="p-1"
                      disabled={activeTab === "benefits"}
                      onClick={() => navigateTab('prev')}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex gap-2">
                      <div 
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors cursor-pointer", 
                          activeTab === "benefits" ? "bg-[#3825e2]" : "bg-gray-300 dark:bg-gray-600"
                        )}
                        onClick={() => setActiveTab("benefits")}
                      />
                      <div 
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors cursor-pointer", 
                          activeTab === "technologies" ? "bg-[#3825e2]" : "bg-gray-300 dark:bg-gray-600"
                        )}
                        onClick={() => setActiveTab("technologies")}
                      />
                      <div 
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors cursor-pointer", 
                          activeTab === "faqs" ? "bg-[#3825e2]" : "bg-gray-300 dark:bg-gray-600"
                        )}
                        onClick={() => setActiveTab("faqs")}
                      />
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="p-1"
                      disabled={activeTab === "faqs"}
                      onClick={() => navigateTab('next')}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: isMobile ? 'calc(70vh - 14rem)' : 'calc(90vh - 18rem)' }}>
                <Tabs 
                  defaultValue="benefits" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  {/* Desktop Tab Navigation */}
                  {!isMobile && (
                    <TabsList className="mb-6 w-full grid grid-cols-3">
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                      <TabsTrigger value="technologies">Technologies</TabsTrigger>
                      <TabsTrigger value="faqs">FAQs</TabsTrigger>
                    </TabsList>
                  )}

                  <TabsContent value="benefits" className="space-y-6 mt-2">
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg"
                        >
                          <div className="mr-4 mt-1 bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 dark:text-gray-200">{benefit}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="technologies" className="space-y-6 mt-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {service.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-lg text-center shadow-sm border border-blue-100 dark:border-blue-900/30"
                        >
                          <span className="font-medium text-blue-800 dark:text-blue-300">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="faqs" className="space-y-6 mt-2">
                    <div className="space-y-4">
                      {service.faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "border border-gray-200 dark:border-gray-700 rounded-lg p-5",
                            "hover:border-[#3825e2] dark:hover:border-[#3825e2] transition-colors"
                          )}
                        >
                          <h4 className="text-lg font-semibold mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Contact Button */}
              <div className="sticky bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 pt-8">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#3825e2] to-[#5d46ff] hover:opacity-90 text-white font-medium py-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    router.push('/contact');
                  }}
                >
                  Contact Us About This Service
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}