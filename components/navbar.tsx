"use client";
import Link from "next/link";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import Logo from "@/public/images/Logo.webp";
import { useRouter } from "next/navigation";
import { useIsMobile } from "../hooks/use-mobile"; // Import the hook

// Arrow icon for links
const ArrowIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// Hamburger menu icon
const MenuIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

// Close icon for mobile menu
const CloseIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar: FC = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu when navigating or resizing
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isMenuOpen]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Industries", path: "/industries" },
    { label: "Partners", path: "/partners" },
    { label: "Careers", path: "/careers" },
    { label: "Blogs", path: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full pt-4 md:pt-8 px-4 md:px-8 z-50">
      <div className="max-w-auto mx-auto bg-white rounded-[10px] py-1 px-4 md:px-6 flex items-center justify-between shadow-sm border border-gray-100">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="My Logo"
              width={isMobile ? 120 : 150}
              height={isMobile ? 40 : 50}
              priority
              className={isMobile ? "ml-2" : "ml-7"}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-6 text-black">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className="group flex items-center text-[16px] leading-[22px] text-black hover:cursor-pointer"
              >
                <span>{item.label}</span>
                <ArrowIcon className="ml-1 h-3 w-3 transform rotate-90 transition-transform duration-300 group-hover:rotate-0" />
              </button>
            ))}
          </nav>
        )}

        {/* Action Button or Hamburger Menu */}
        <div className="flex items-center space-x-3">
          {!isMobile ? (
            <Link
              href="/contact"
              className="bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Contact Us
            </Link>
          ) : (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "70px" }}
        >
          <div className="flex flex-col h-full p-6 pt-8 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="group flex items-center text-[15px] text-black hover:cursor-pointer py-2 border-b border-gray-100"
                >
                  <span>{item.label}</span>
                  <ArrowIcon className="ml-2 h-4 w-4 transform rotate-90 transition-transform duration-300 group-hover:rotate-0" />
                </button>
              ))}
            </nav>
            <div className="mt-8">
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white rounded-full px-8 py-3 text-center font-medium hover:bg-gray-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
