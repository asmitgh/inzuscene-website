"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import { ServiceGrid } from "@/components/service-grid";
import { ScrollProgress, ScrollSections } from "@/components/scroll-progress";
import { TypewriterText, AnimatedText } from "@/components/animated-text";
import { BrochureDownload } from "@/components/brochure-download";
import { staggerContainer, textVariant } from "@/lib/animations";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";
const SplineComponent = dynamic(
  () => import("@/components/Home/SplineComponent").then(mod => mod.SplineComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
export default function ServicesPage() {
  /* ──────────────── hooks ──────────────── */
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  /* ─────────────── page sections ─────────────── */
  const sections = [
    "hero",
    "enterprise-solutions",
    "cloud-infrastructure",
    "low-code-solutions",
    "other-services",
  ];

  return (
    <div className="pt-16 md:pt-20 overflow-hidden">
      <ScrollProgress />
      {!isMobile && <ScrollSections sections={sections} />}
      <BrochureDownload variant="banner"/>

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-start min-h-[70vh] md:min-h-[85vh] pt-16 md:pt-24 text-center overflow-hidden"
      >
        {/* background gradient */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#3825e2] via-[#4d53f5] to-[#38ba99]" />
        
        {/* radial highlight */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_60%)]" />

        {/* full screen background video - hidden on mobile to improve performance */}
        
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        {/* hero copy */}
        <motion.div
          variants={staggerContainer(0.1, 0.25)}
          initial="hidden"
          animate="show"
          className="relative z-20 max-w-4xl px-4 md:px-6"
        >
          <motion.h1
            variants={textVariant(0.35)}
            className="mb-6 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.25] px-2 md:px-6 bg-gradient-to-r from-white to-[#b5ffe0] bg-clip-text text-transparent"
            style={{ overflow: 'visible', paddingBottom: '0.25em' }}
          >
            <TypewriterText
              text="Engineering Intelligent Services"
              className="bg-gradient-to-r from-[#ffffff] via-[#b5ffe0] to-[#acfadb] bg-clip-text text-transparent"
              speed={isMobile ? 40 : 40}
              delay={400}
            />
          </motion.h1>
        </motion.div>
      </section>

      {/* ───────────────── SERVICES INTRO ───────────────── */}
      <section className="py-10 md:py-16 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <motion.div
            ref={ref}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
            initial="hidden"
            animate={controls}
            className="mb-12 md:mb-16 text-center"
          >
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              <span className="gradient-text">Our Services</span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="mx-auto max-w-4xl text-base md:text-xl text-black dark:text-black px-2"
            >
              Integrated ERP, Cloud, Cybersecurity, Low‑Code & Managed Services engineered for sustainable growth
            </motion.p>
          </motion.div>

          <div id="others"><ServiceGrid /></div>
        </div>
      </section>

      {/* ──────────────────  ENTERPRISE SOLUTIONS  ────────────────── */}
      <section id="enterprise-solutions" className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold">
                  <span className="gradient-text">Enterprise Business Solutions</span>
                </h3>

                <p className="mb-4 md:mb-6 text-base md:text-xl text-black dark:text-black">
                  Streamline operations, enhance productivity, and drive growth with our comprehensive enterprise solutions.
                </p>

                <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3 text-sm md:text-base">
                  {[
                    "ERP Implementation & Customization (IFS, Odoo & Oracle)",
                    "Field Service & Enterprise Service Management (FSM & ESM)",
                    "E‑Invoicing & Compliance (Pagero & Wafeq integrations)",
                    "Business Intelligence & Analytics (Power BI)",
                    "Business Process Re‑engineering & Landscape Design",
                    "Upgrades, Application Maintenance & Support",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="mr-2 font-bold text-[#38ba99] text-lg shrink-0">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-xl"
            >
              <img
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Enterprise Solutions"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <SplineComponent />
      {/* ───────────────── CLOUD & INFRASTRUCTURE ───────────────── */}
      <section id="cloud-infrastructure" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl shadow-xl lg:order-1 order-1"
            >
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Cloud & Infrastructure"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div className="order-2 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold">
                  <span className="gradient-text">Cloud & Infrastructure</span>
                </h3>

                <p className="mb-4 md:mb-6 text-base md:text-xl text-black dark:text-black">
                  Leverage the power of cloud computing for enhanced scalability, security, and business agility.
                </p>

                <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3 text-sm md:text-base">
                  {[
                    "Cloud Migrations & Hybrid Deployments (AWS, Azure, Oracle Cloud)",
                    "Infrastructure & Server Management",
                    "Disaster Recovery & Business Continuity",
                    "Identity & Access Management & Cloud Security",
                    "Managed Cloud Hosting & Monitoring",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="mr-2 font-bold text-[#38ba99] text-lg shrink-0">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/*──────────── LOW-CODE SOLUTIONS ───────────*/}
      <section id="low-code-solutions" className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                  <span className="gradient-text">
                    Low-Code / No-Code Solutions
                  </span>
                </h3>

                <p className="text-base md:text-xl text-black dark:text-black mb-4 md:mb-6">
                  Accelerate application development while reducing technical
                  debt and maintenance costs.
                </p>

                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
                  {[
                    "Novacura Flow Low-Code Platform",
                    "Oracle APEX Rapid App Delivery",
                    "Workflow Automation & Process Apps",
                    "Mobile & Web Applications",
                    "Integration Accelerators",
                  ].map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="text-[#38ba99] font-bold mr-2 text-lg shrink-0">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/0*oBD1jDejiHNDjyHx.png"
                alt="Low-Code Development"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/*──────────── INTEGRATIONS & OTHER ───────────*/}
      <section id="other-services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              <span className="gradient-text">
                Integrations & Other Services
              </span>
            </h3>
            <p className="text-base md:text-xl text-black dark:text-black max-w-3xl mx-auto">
              Connect systems, optimise processes, and enhance your digital
              ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                title: "Boomi & API Integrations",
                description:
                  "Seamless connectivity between ERP and cloud platforms",
                icon: "🔗",
              },
              {
                title: "Custom Workflow Automation",
                description: "Streamlined e-invoicing, HR & finance flows",
                icon: "⚙️",
              },
              {
                title: "Scalable IT & DevOps Support",
                description: "24×7 monitoring, maintenance & optimisation",
                icon: "🛠️",
              },
              {
                title: "Cybersecurity & Risk Mitigation",
                description: "End-to-end security solutions & compliance",
                icon: "🔒",
              },
              {
                title: "Managed Services",
                description: "Continuous support ensuring high availability",
                icon: "🕒",
              },
              {
                title: "IT & Business Consulting",
                description: "Strategic guidance aligned to your objectives",
                icon: "📊",
              },
            ].map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="service-card p-5 md:p-8 rounded-lg shadow-md bg-white dark:bg-gray-800"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{svc.icon}</div>
                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{svc.title}</h4>
                <p className="text-sm md:text-base text-black dark:text-black">{svc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*───────────────── CTA ─────────────────*/}
      <section className="py-16 md:py-24 morphing-bg text-white text-center">
        <div className="container px-4 md:px-6 flex items-center text-center justify-center min-h-[10vh]">
          <div className="max-w-3xl text-center">
            <AnimatedText
              text="Ready to transform your business with intelligent solutions?"
              className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-xl mb-6 md:mb-8"
            >
              Let's discuss how our expertise can help you achieve your goals
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <a
                href="/contact"
                className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-[#38ba99] rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile-specific styles */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .service-card {
            transition: transform 0.3s, box-shadow 0.3s;
            height: 100%;
            max-width: 100%;
            overflow: hidden;
          }
          
          .service-card:active {
            transform: scale(0.98);
          }
        }
        
        /* Global hover styles */
        li:hover {
          color: #38ba99;
          transition: color 0.2s ease;
        }
        
        /* Make text not overflow on mobile */
        @media (max-width: 767px) {
          p, li, h3, h4 {
            overflow-wrap: break-word;
            word-wrap: break-word;
            -ms-word-break: break-all;
            word-break: break-word;
            hyphens: auto;
          }
        }
        
        /* Improve mobile scrolling performance */
        @media (max-width: 767px) {
          .morphing-bg {
            background: linear-gradient(135deg, #3825e2, #38ba99);
          }
        }
      `}</style>
    </div>
  );
}
