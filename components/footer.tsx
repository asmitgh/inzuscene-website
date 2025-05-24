"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();
  const [expandedOffice, setExpandedOffice] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  const toggleOffice = (index: number) => {
    setExpandedOffice(expandedOffice === index ? null : index);
  };

  const offices = [
    { country: "Singapore", address: "60, Paya Lebar Road, #07-54, Paya Lebar Square, Singapore 409051", email: "info@inzuscene.com" },
    { country: "USA", address: "815 Brazos St., Suite 500, Austin, TX 78701, USA", email: "info@inzuscene.com" },
    { country: "UAE", address: "1405, Addax Tower, Reem Island, Abu Dhabi, United Arab Emirates", email: "info@inzuscene.com" },
    { country: "South Africa", address: "8B, Kilimanjaro St., Bronkhorstspruit, Centurion, South Africa", email: "info@inzuscene.com" },
    { country: "India", address: "9th Floor, Kankaria Estate, 6 Little Russel Street, Kolkata – 700071, India", email: "info@inzuscene.com" },
    { country: "Oman", address: "Oman - Bosher, Muscat Governorate, Muscat. Oman", email: "info@inzuscene.com" },
  ];

  const renderOffices = () => {
    if (!isMobile) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offices.map((office, index) => (
            <div key={index} className="space-y-2">
              <h5 className="font-semibold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
                  {office.country} Office
                </span>
              </h5>
              <p className="text-sm text-white">{office.address}</p>
              <div>
                <a href={`mailto:${office.email}`} className="text-sm text-white hover:text-white flex items-center">
                  <Mail size={14} className="mr-2" />
                  {office.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {offices.map((office, index) => (
          <div key={index} className="border-b border-gray-800 pb-2">
            <button
              className="flex justify-between items-center w-full text-left py-2"
              onClick={() => toggleOffice(index)}
              aria-expanded={expandedOffice === index}
            >
              <h5 className="font-semibold text-sm">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
                  {office.country} Office
                </span>
              </h5>
              {expandedOffice === index ? (
                <ChevronUp size={16} className="text-white" />
              ) : (
                <ChevronDown size={16} className="text-white" />
              )}
            </button>

            {expandedOffice === index && (
              <div className="pt-1 pb-2 pl-2">
                <p className="text-xs text-white mb-2">{office.address}</p>
                <a href={`mailto:${office.email}`} className="text-xs text-white hover:text-white flex items-center">
                  <Mail size={12} className="mr-1" />
                  {office.email}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-white pt-10 md:pt-20 pb-6 md:pb-10 px-4 md:px-0">
      <div className="container mx-auto max-w-6xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-16">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              <Image src="/logo.svg" alt="Inzuscene Logo" width={isMobile ? 120 : 280} height={isMobile ? 30 : 120} />
            </h3>
            <p className={`text-white max-w-xs ${isMobile ? 'text-sm' : ''}`}>
              Transforming complexity into clarity, one intelligent solution at
              a time.
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

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold ${isMobile ? 'text-base mb-3' : 'text-lg mb-6'}`}>
              Quick Links
            </h4>
            <ul className={`${isMobile ? 'space-y-2 text-sm' : 'space-y-4'}`}>{[
              { title: "Home", href: "/" },
              { title: "About Us", href: "/about" },
              { title: "Services", href: "/services" },
              { title: "Industries", href: "/industries" },
              { title: "Partners", href: "/partners" },
              { title: "Careers", href: "/careers" },
              { title: "Contact", href: "/contact" },
            ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-white flex items-center group"
                  >
                    <ChevronRight
                      size={isMobile ? 14 : 16}
                      className={`mr-1 md:mr-2 opacity-0 ${isMobile ? '-ml-4' : '-ml-5'} group-hover:opacity-100 group-hover:ml-0 transition-all`} />
                    {link.title}
                  </Link>
                </li>
              ))}</ul>
          </div>

          {/* Global Offices */}
          <div className="lg:col-span-2">
            <h4 className={`font-semibold ${isMobile ? 'text-base mb-3' : 'text-lg mb-6'}`}>
              Global Offices
            </h4>
            {renderOffices()}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-white text-xs md:text-sm">
          <div className="flex flex-col md:flex-row justify-between text-center md:text-left items-center">
            <p>© {new Date().getFullYear()} Inzuscene. All rights reserved.</p>
            <div className="flex space-x-4 md:space-x-6 mt-3 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        <div className={`flex flex-col pt-4 md:pt-8 text-left items-left ${isMobile ? 'text-xs' : 'text-sm'}`}>All content is owned by Inzuscene. Reproduction or distribution without written consent is prohibited. Website content is for general use. We make no guarantees on accuracy, completeness, or timeliness. Inzuscene is not liable for any direct, indirect, or consequential damages from use of this site. Information you submit is handled in line with our Privacy Policy and used only for communication or service-related purposes. For further details, please contact <a href="mailto:info@inzuscene.com" className="text-blue-400 hover:text-blue-300 ml-1">info@inzuscene.com</a><span className="block text-white text-xs mt-4">ISO 9001, 27001 and 20001 Certified | NASSCOM</span></div>
        </div>
      </div>
    </footer>
  );
}