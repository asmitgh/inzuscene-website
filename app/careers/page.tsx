"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Mail, Building, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { SplineComponent } from "@/components/Home/SplineComponent"
const jobs = [
  {
    id: "ifs-finance",
    title: "IFS Finance Consultant",
    department: "Consulting",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "2-10 years",
    description: "Configure and maintain IFS Finance modules, integrate with third-party financial systems and support reporting.",
    requirements: [
      "2-10+ years of experience in IFS Finance modules",
      "Strong knowledge of IFS configuration and implementation",
      "Bachelor's degree in Accounting, Finance, or related field",
      "Experience in system integration and data migration"
    ]
  },
  {
    id: "ifs-hcm",
    title: "IFS HCM Consultant",
    department: "Consulting",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "3-8 years",
    description: "Implement and configure IFS HCM for payroll, recruitment, and talent management.",
    requirements: [
      "3-8+ years of experience in IFS HCM modules",
      "Strong understanding of HR processes and best practices",
      "Bachelor's degree in HR, Business Administration, or related field",
      "Experience in payroll systems and compliance"
    ]
  },
  {
    id: "ifs-maintenance",
    title: "IFS Maintenance Consultant",
    department: "Consulting",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "4-10 years",
    description: "Configure IFS Maintenance for asset management and preventive maintenance, troubleshoot issues and optimize asset performance.",
    requirements: [
      "4-10+ years of experience in IFS Maintenance modules",
      "Strong background in asset management and maintenance planning",
      "Bachelor's degree in Engineering or related field",
      "Experience in preventive maintenance strategies"
    ]
  },
  {
    id: "ifs-project-manager",
    title: "IFS Project Manager",
    department: "Project Management",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "5-12 years",
    description: "Lead end-to-end IFS ERP projects, managing scope, resources, and timelines while ensuring project deliverables meet business objectives and budgets.",
    requirements: [
      "5-12+ years of experience in IFS project management",
      "PMP or equivalent certification",
      "Bachelor's degree in Business, IT, or related field",
      "Strong stakeholder management skills"
    ]
  },
  {
    id: "ifs-scm",
    title: "IFS SCM Consultant",
    department: "Consulting",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "3-8 years",
    description: "Implement and optimize IFS SCM for procurement, inventory, and logistics, provide supply chain insights and system troubleshooting.",
    requirements: [
      "3-8+ years of experience in IFS SCM modules",
      "Strong knowledge of supply chain processes",
      "Bachelor's degree in Supply Chain, Business, or related field",
      "Experience in inventory management systems"
    ]
  },
  {
    id: "ifs-developer",
    title: "IFS Developer",
    department: "Development",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "2-8 years",
    description: "Customize and develop IFS solutions, integrate with third-party systems, and create custom reports and analytics tools.",
    requirements: [
      "2-8+ years of experience in IFS development",
      "Proficiency in SQL, Java, and IFS Apps",
      "Bachelor's degree in Computer Science or related field",
      "Experience in API development and integration"
    ]
  },
  {
    id: "ifs-technical",
    title: "IFS Technical Consultant",
    department: "Technical",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "4-10 years",
    description: "Provide expertise in IFS architecture, integrations, and data migration, support system upgrades and customizations.",
    requirements: [
      "4-10+ years of experience in IFS technical consulting",
      "Strong background in system architecture and integration",
      "Bachelor's degree in IT, Engineering, or related field",
      "Experience in database management and optimization"
    ]
  }
];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === "all" || 
      job.department.toLowerCase() === selectedDepartment;
    
    const matchesExperience = selectedExperience === "all" || (() => {
      const years = parseInt(job.experience.split("-")[0]);
      switch(selectedExperience) {
        case "0-2": return years <= 2;
        case "3-5": return years >= 3 && years <= 5;
        case "5+": return years > 5;
        default: return true;
      }
    })();
    
    const matchesLocation = 
      selectedLocation === "all" || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesDepartment && matchesExperience && matchesLocation;
  });

  return (
    <div className="pt-16 md:pt-20">
      <ScrollProgress />
      <SplineComponent />
      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-12 md:py-[8rem] bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
                Join Our Team
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/80">
                Build the future of enterprise technology with us
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Search and Filters - Mobile Optimized */}
      <section className="py-6 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          {/* Search bar - always visible */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm h-10"
            />
          </div>
          
          {/* Filter toggle for mobile */}
          {isMobile && (
            <Button 
              variant="outline" 
              className="w-full mb-4 flex justify-between items-center text-sm h-10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          )}
          
          {/* Filters - responsive */}
          <div className={`grid grid-cols-1 gap-3 ${isMobile ? (showFilters ? 'block' : 'hidden') : 'md:grid-cols-3 flex'}`}>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="text-sm h-10">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="project management">Project Management</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="text-sm h-10">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience Levels</SelectItem>
                <SelectItem value="0-2">0-2 Years</SelectItem>
                <SelectItem value="3-5">3-5 Years</SelectItem>
                <SelectItem value="5+">5+ Years</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="text-sm h-10">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      
      {/* Job Listings - Mobile Optimized */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                          <Building className="h-3 w-3 md:h-4 md:w-4 mr-1" /> {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" /> {job.location}
                        </span>
                        <span>
                          {job.experience} Experience
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      size={isMobile ? "sm" : "default"}
                      className="mt-3 md:mt-0 btn-gradient text-xs md:text-sm px-3 py-1 h-8 md:h-10"
                      onClick={() => {
                        const subject = `Application for ${job.title}`;
                        const body = `I am interested in the ${job.title} position.`;
                        window.location.href = `mailto:hr@inzuscene.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      }}
                    >
                      <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> Apply Now
                    </Button>
                  </div>
                  
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                    {job.description}
                  </p>
                  
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold mb-1 md:mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-0.5 md:space-y-1 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-base md:text-xl text-gray-700 dark:text-gray-300">
                  No positions found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Benefits Section - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">Why Join Us?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation & Growth",
                description: "Work on cutting-edge projects and continuously develop your skills."
              },
              {
                icon: "🌍",
                title: "Global Impact",
                description: "Transform businesses worldwide through innovative technology solutions."
              },
              {
                icon: "💪",
                title: "Work-Life Balance",
                description: "Flexible work arrangements and comprehensive benefits."
              },
              {
                icon: "📈",
                title: "Career Development",
                description: "Clear growth paths and mentorship opportunities."
              },
              {
                icon: "🤝",
                title: "Collaborative Culture",
                description: "Work in an inclusive and supportive environment."
              },
              {
                icon: "🎯",
                title: "Meaningful Work",
                description: "Solve complex challenges for enterprise customers."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg md:rounded-xl shadow-md md:shadow-lg"
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">{benefit.icon}</div>
                <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-24 morphing-bg text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-sm md:text-xl mb-6 md:mb-8">
              Join our team of innovators and help shape the future of enterprise technology
            </p>
            <Button 
              size={isMobile ? "sm" : "lg"}
              className="bg-white text-[#3825e2] hover:bg-gray-100 text-xs md:text-sm px-4 py-2 h-9 md:h-auto"
              onClick={() => {
                window.location.href = "mailto:hr@inzuscene.com?subject=General Application Inquiry";
              }}
            >
              <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> Send Your Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
