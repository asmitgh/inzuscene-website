"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { ServicesData } from "@/lib/services-data";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Enterprise Business Solutions",
  "Cloud & Infrastructure",
  "Low-Code Solutions",
  "Integrations"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ServiceGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredServices, setFilteredServices] = useState(ServicesData);
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  useEffect(() => {
    // Filter services based on search term and category
    const filtered = ServicesData.filter((service) => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
      const matchesCategory = 
        selectedCategory === "All" || 
        service.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
    
    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsFiltering(false);
  };
  
  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search and Filter - Mobile First Design */}
      <div className="w-full space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services, technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm focus-visible:ring-2 focus-visible:ring-[#3825e2]"
          />
          {(searchTerm || selectedCategory !== "All") && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Desktop Dropdown */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <Filter className="h-4 w-4" /> 
                {selectedCategory}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategory === category}
                  onCheckedChange={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800"
            onClick={() => setIsFiltering(!isFiltering)}
          >
            <Filter className="h-4 w-4" /> 
            {selectedCategory === "All" ? "Filter by Category" : selectedCategory}
            <ChevronDown className="h-4 w-4 ml-auto" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFiltering && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="p-3 space-y-2">
              <h3 className="font-medium text-sm text-gray-500 mb-2">Categories</h3>
              {categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md transition-colors",
                    selectedCategory === category 
                      ? "bg-blue-50 dark:bg-blue-900/30 text-[#3825e2] dark:text-blue-300 font-medium" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== "All") && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">Active filters:</span>
          {searchTerm && (
            <div className="bg-blue-50 dark:bg-blue-900/30 text-[#3825e2] dark:text-blue-300 px-3 py-1 rounded-full flex items-center">
              Search: {searchTerm}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-5 w-5 p-0" 
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          {selectedCategory !== "All" && (
            <div className="bg-blue-50 dark:bg-blue-900/30 text-[#3825e2] dark:text-blue-300 px-3 py-1 rounded-full flex items-center">
              Category: {selectedCategory}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-1 h-5 w-5 p-0" 
                onClick={() => setSelectedCategory("All")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Services Grid with Animation */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="wait">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}