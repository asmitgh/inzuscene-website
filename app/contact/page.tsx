"use client";

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Send,
  CheckCircle,
  Mail,
  Linkedin,
  Facebook,
  Youtube,
  XSquareIcon,
  ChevronDown,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
const SplineComponent = dynamic(
  () => import("@/components/Home/SplineComponent").then(mod => mod.SplineComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FAQComponent from "@/components/Home/FAQ";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load Spline component for better performance
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function ContactPage() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
    // Add intersection observer for map loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMap();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadMap = () => {
    if (typeof window !== "undefined" && window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: isMobile ? 1 : 2,
        center: { lat: 20.5937, lng: 78.9629 },
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        gestureHandling: "cooperative", // Better touch handling
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: isMobile ? false : true,
      });

      const locations = [
        {
          name: "India Office",
          lat: 22.5675,
          lng: 88.3575,
          address: `9th Floor, Kankaria Estate, 6 Little Russel Street, Kolkata – 700071, India<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
        {
          name: "USA Office",
          lat: 30.2672,
          lng: -97.7431,
          address: `815 Brazos St., Suite 500, Austin, TX 78701, USA<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
        {
          name: "UAE Office",
          lat: 24.4827,
          lng: 54.3705,
          address: `1405, Addax Tower, Reem Island, Abu Dhabi, United Arab Emirates<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
        {
          name: "South Africa Office",
          lat: -25.81,
          lng: 28.1667,
          address: `8B, Kilimanjaro St., Bronkhorstspruit, Centurion, South Africa<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
        {
          name: "Singapore Office",
          lat: 1.3521,
          lng: 103.8198,
          address: `60, Paya Lebar Road, #07-54, Paya Lebar Square, Singapore 409051<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
        {
          name: "Oman Office",
          lat: 23.5859,
          lng: 58.4059,
          address: `Bosher, Muscat Governorate, Muscat, Oman<br/><a href=\"mailto:info@inzuscene.com\">info@inzuscene.com</a>`,
        },
      ];

      // Icon for markers
      const greenIcon = {
        url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new window.google.maps.Size(
          isMobile ? 24 : 32,
          isMobile ? 24 : 32
        ),
      };

      // Add markers and info windows
      locations.forEach(({ name, lat, lng, address }) => {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: name,
          icon: greenIcon,
          optimized: true,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style=\"max-width:200px; font-size:${
            isMobile ? "12px" : "14px"
          };\"><strong>${name}</strong><br/>${address}</div>`,
          pixelOffset: new window.google.maps.Size(0, -5),
        });

        // Show on click for mobile (better for touch) and hover for desktop
        if (isMobile) {
          marker.addListener("click", () =>
            infoWindow.open({ map, anchor: marker })
          );
        } else {
          marker.addListener("mouseover", () =>
            infoWindow.open({ map, anchor: marker })
          );
          marker.addListener("mouseout", () => infoWindow.close());
        }
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setFormStep((prev) => prev + 1);
  const handlePrevious = () => setFormStep((prev) => prev - 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you as soon as possible.",
      });
    }, 1500);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/inzuscene-pty-ltd/?originalSubdomain=in",
    },
    {
      name: "Twitter",
      icon: XSquareIcon,
      url: "https://x.com/inzuscene",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/inzuscene/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/channel/UCsOu6Q3h7QHOCykv6U4rhmw",
    },
  ];

  const splineLoadingPlaceholder = (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md">
      <p className="text-sm">Loading 3D scene...</p>
    </div>
  );

  return (
    <>
      <div className="pt-16 md:pt-20">
        {/* Hero Section - Mobile Optimized */}
        <section className="relative py-16 md:py-28 bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Let's start building the future
                </h1>
                <p className="text-xl mb-8 text-white/80">
                  Connect with our experts to discuss how we can help transform
                  your business
                </p>
              </motion.div>
            </div>
            <main className="relative z-10 mt-8 h-[370px] md:h-[500px]">
              <div className="absolute inset-0">
                {isMounted ? (
                  <Spline
                    scene="https://prod.spline.design/O0zIHtHRpHPpui0Z/scene.splinecode"
                    className="w-full h-full"
                  />
                ) : (
                  splineLoadingPlaceholder
                )}
              </div>
            </main>
          </div>
          {/* SVG Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 ">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white dark:fill-gray-950"
              style={{ width: "100%", height: 40 }}
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </section>

        {/* Contact Form and Info Section - Mobile Optimized */}
        <section className="py-8 md:py-16 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
              {/* Contact Form */}
              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border dark:border-gray-700">
                <div className="p-4 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
                    Get in Touch
                  </h2>

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 md:space-y-6"
                      >
                        {formStep === 0 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-3 md:space-y-4"
                          >
                            <div>
                              <Label
                                htmlFor="name"
                                className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                              >
                                Your Name
                              </Label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="mt-1 md:mt-2 text-sm h-9 md:h-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                required
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="email"
                                className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                              >
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                className="mt-1 md:mt-2 text-sm h-9 md:h-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                required
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="company"
                                className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                              >
                                Company
                              </Label>
                              <Input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Your Company"
                                className="mt-1 md:mt-2 text-sm h-9 md:h-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                required
                              />
                            </div>

                            <div className="pt-2 md:pt-4">
                              <Button
                                type="button"
                                onClick={handleNext}
                                className="w-full btn-gradient text-sm h-9 md:h-10"
                                disabled={
                                  !formData.name ||
                                  !formData.email ||
                                  !formData.company
                                }
                              >
                                Continue
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        {formStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-3 md:space-y-4"
                          >
                            <div>
                              <Label
                                htmlFor="service"
                                className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                              >
                                Service Interest
                              </Label>
                              <Select
                                value={formData.service}
                                onValueChange={(value) =>
                                  handleSelectChange("service", value)
                                }
                                required
                              >
                                <SelectTrigger className="mt-1 md:mt-2 text-sm h-9 md:h-10 w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent className="text-sm bg-white dark:bg-gray-800">
                                  <SelectItem value="erp">
                                    ERP Implementation
                                  </SelectItem>
                                  <SelectItem value="cloud">
                                    Cloud & Infrastructure
                                  </SelectItem>
                                  <SelectItem value="low-code">
                                    Low-Code Solutions
                                  </SelectItem>
                                  <SelectItem value="data">
                                    Data Analytics & BI
                                  </SelectItem>
                                  <SelectItem value="integration">
                                    System Integration
                                  </SelectItem>
                                  <SelectItem value="consulting">
                                    IT Consulting
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label
                                htmlFor="message"
                                className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                              >
                                Your Message
                              </Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us about your project or requirements..."
                                className="mt-1 md:mt-2 text-sm min-h-[120px] md:min-h-[150px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                required
                              />
                            </div>

                            <div className="flex space-x-3 md:space-x-4 pt-2 md:pt-4">
                              <Button
                                type="button"
                                onClick={handlePrevious}
                                variant="outline"
                                className="flex-1 text-sm h-9 md:h-10 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                              >
                                Back
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 btn-gradient text-sm h-9 md:h-10"
                                disabled={
                                  !formData.service ||
                                  !formData.message ||
                                  isSubmitting
                                }
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center justify-center">
                                    <span className="text-xs md:text-sm">
                                      Sending...
                                    </span>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: "linear",
                                      }}
                                      className="ml-2 h-3 w-3 md:h-4 md:w-4 border-2 border-white border-t-transparent rounded-full"
                                    ></motion.div>
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center">
                                    <span className="text-xs md:text-sm">
                                      Send Message
                                    </span>
                                    <Send className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                                  </span>
                                )}
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        {/* Step Progress Bar */}
                        <div className="pt-1 md:pt-2">
                          <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            <span>Step {formStep + 1} of 2</span>
                            <span>
                              {formStep === 0
                                ? "Basic Info"
                                : "Project Details"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-1 md:mt-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={false}
                              animate={{
                                width: formStep === 0 ? "50%" : "100%",
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="h-full bg-gradient-to-r from-[#3825e2] to-[#38ba99]"
                            ></motion.div>
                          </div>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 md:py-8"
                      >
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 dark:bg-green-900 mb-3 md:mb-4">
                          <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-300" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                          Message Sent!
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                          Thank you for reaching out. One of our experts will
                          contact you shortly.
                        </p>
                        <Button
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormStep(0);
                            setFormData({
                              name: "",
                              email: "",
                              company: "",
                              service: "",
                              message: "",
                            });
                          }}
                          variant="outline"
                          size="sm"
                          className="text-xs md:text-sm h-8 md:h-10 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contact Information - Simplified for Mobile */}
              <div className="w-full lg:w-5/12 text-gray-900 dark:text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  Contact Information
                </h2>
                <div className="mb-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 md:p-3 rounded-full mr-3 md:mr-4 flex-shrink-0">
                      <Mail className="h-4 w-4 md:h-6 md:w-6 text-[#3825e2] dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-semibold mb-1">
                        Email Us
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 break-words">
                        info@inzuscene.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 border dark:border-gray-700 mb-6">
                  <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">
                    Follow Us
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 md:mb-4">
                    Stay updated with our latest news and insights
                  </p>
                  <div className="flex space-x-3 md:space-x-4">
                    <motion.a
                      href="https://www.facebook.com/inzuscene/"
                      whileHover={{ scale: 1.05 }}
                      className="p-1.5 md:p-2 rounded-full bg-[#1877F2] hover:bg-[#166FE5] transition-colors"
                      aria-label="Facebook"
                    >
                      <Image
                        src="/facebook.svg"
                        alt="Facebook"
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </motion.a>
                    <motion.a
                      href="https://x.com/inzuscene"
                      whileHover={{ scale: 1.05 }}
                      className="p-1.5 md:p-2 rounded-full bg-black hover:bg-gray-900 transition-colors"
                      aria-label="Twitter"
                    >
                      <Image
                        src="/twitter.svg"
                        alt="Twitter"
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/company/inzuscene-pty-ltd/"
                      whileHover={{ scale: 1.05 }}
                      className="p-1.5 md:p-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Image
                        src="/linkedin.svg"
                        alt="LinkedIn"
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </motion.a>
                    <motion.a
                      href="https://www.instagram.com/inzuscene/"
                      whileHover={{ scale: 1.05 }}
                      className="p-1.5 md:p-2 rounded-full bg-gradient-to-r from-[#FEDA75] via-[#FA7E1E] to-[#D62976] hover:opacity-90 transition-opacity"
                      aria-label="Instagram"
                    >
                      <Image
                        src="/instagram.svg"
                        alt="Instagram"
                        width={isMobile ? 20 : 24}
                        height={isMobile ? 20 : 24}
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </motion.a>
                  </div>
                </div>

                {/* Accordion for Mobile Offices */}
                {isMobile && (
                  <div className="mb-6">
                    <details className="group bg-gray-100 dark:bg-gray-800 rounded-lg p-3 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer">
                        <h3 className="text-sm font-medium">
                          View Our Office Locations
                        </h3>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-3 text-xs space-y-2 text-gray-600 dark:text-gray-300">
                        <p>
                          <strong>India:</strong> Kolkata
                        </p>
                        <p>
                          <strong>USA:</strong> Austin, TX
                        </p>
                        <p>
                          <strong>UAE:</strong> Abu Dhabi
                        </p>
                        <p>
                          <strong>South Africa:</strong> Centurion
                        </p>
                        <p>
                          <strong>Singapore:</strong> Paya Lebar
                        </p>
                        <p>
                          <strong>Oman:</strong> Muscat
                        </p>
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Global Offices Map Section - Mobile Optimized */}
        <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-center text-gray-900 dark:text-white">
              Our Global Offices
            </h2>
            <div className="relative w-full h-64 md:h-[500px] lg:h-[600px] rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden border dark:border-gray-700">
              <div ref={mapRef} className="w-full h-full" />
              {!isMounted && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                  <p className="text-sm">Loading map...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <FAQComponent />
      </div>

      {/* Load Google Maps Script - with loading optimization */}
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXMJRMNXCt6qeCx1dirNM7x5KOaljKKF8&callback=Function.prototype"
        strategy="lazyOnload"
      />
    </>
  );
}
