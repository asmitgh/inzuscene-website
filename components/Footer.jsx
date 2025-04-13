// Footer.jsx
"use client";
// Footer.jsx
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

// Modular components for better organization
const SubscriptionSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <div className="px-4 py-8 text-center max-w-4xl mx-auto">
      <div className="mb-1">
        <span className="inline-flex items-center text-xs font-medium text-gray-500">
          <Mail className="w-3 h-3 mr-1" />
          Subscription
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-1">
        <span className="text-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Unlock Business insights.</span>
      </h2>
      <h3 className="text-xl md:text-2xl font-semibold mb-6">
        Subscribe now and make smarter decisions!
      </h3>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-grow py-2 px-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="bg-white text-gray-800 border border-gray-200 py-2 px-4 rounded-lg text-sm font-medium flex items-center shadow-sm hover:shadow transition-all hover:bg-gray-50"
          >
            Subscribe <ArrowRight className="ml-1 w-3 h-3" />
          </button>
        </div>
      </form>
      
      <div className="flex justify-center items-center mb-4">
        {[1, 2, 3, 4, 4.5].map((rating, index) => (
          <span key={index} className="text-yellow-400 mx-px">
            {rating === 5 ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" clipPath="inset(0 50% 0 0)" />
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" fillOpacity="0.3" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

// Footer navigation links grouped by category
const FooterNavSection = ({ title, links }) => (
  <div>
    <h4 className="font-medium text-sm mb-3 text-gray-700">{title}</h4>
    <ul className="space-y-1.5">
      {links.map((link, index) => (
        <li key={index}>
          <Link 
            href={link.href} 
            className="text-gray-500 hover:text-blue-500 text-sm transition-colors duration-200"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Company info component
const CompanyInfo = () => (
  <div>
    <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    </div>
    <p className="text-sm text-gray-500 mb-1 font-medium">inazuma@gmail.com</p>
    <p className="text-sm text-gray-500 font-medium">+91 XXXXXXXXXX</p>
  </div>
);

// Main Footer Component
const Footer = () => {
  // Navigation links data
  const navSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Customers", href: "#" },
        { label: "Resources", href: "#" },
        { label: "Pricing", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of service", href: "#" },
        { label: "Trust and security", href: "#" },
        { label: "Support", href: "#" },
        { label: "Contact us", href: "#" }
      ]
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Youtube", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-white text-gray-800 w-full font-sans bg-gradient-to-b from-white to-gray-50">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '100px 100px'
           }}>
      </div>
      
      {/* Subscription Section */}
      <SubscriptionSection />
      
      {/* Main Footer Content */}
      <div className="border-t border-gray-100 bg-white bg-opacity-80">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CompanyInfo />
            </div>
            
            <div className="md:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {navSections.map((section, index) => (
                  <FooterNavSection 
                    key={index} 
                    title={section.title} 
                    links={section.links} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-100 py-4 px-4 bg-white">
        <div className="container mx-auto">
          <p className="text-xs text-gray-500">© 2025 Inzuscene</p>
          
          {/* Space for additional 2-3 lines of text as requested */}
          <div className="mt-3 text-xs text-gray-400 space-y-1">
            {/* Placeholder for client's custom text */}
            <p>All content is owned by Inzuscene. Reproduction or distribution without written consent is prohibited. Website content is for general use. We make no guarantees on accuracy, completeness, or timeliness. Inzuscene is not liable for any direct, indirect, or consequential damages from use of this site. Information you submit is handled in line with our Privacy Policy and used only for communication or service-related purposes. We are not responsible for content or practices of any third-party sites linked here. We may update these terms at any time. Continued use implies acceptance of revisions. For further details, please contact info@inzuscene.com.</p>
            <br/>
            <p>Created by Asmit Ghosh & Team.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;