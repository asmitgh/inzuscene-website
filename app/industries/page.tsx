"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Factory,
  Boxes,
  BarChart2,
  PenTool,
  DollarSign,
  Building2,
  Headphones,
  FileText,
  Cloud,
  Zap,
  BarChart,
  CloudLightning,
  Wifi,
  Activity,
  Shield,
  X,
  ChevronDown,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const SplineComponent = dynamic(
  () => import("@/components/Home/SplineComponent").then(mod => mod.SplineComponent),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);
// Assuming industries data is defined elsewhere
/* ---------- helpers ---------- */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

type IndustryKey =
  | "manufacturing"
  | "energy"
  | "construction"
  | "services"
  | "telecommunications";

interface Solution {
  icon: string;
  title: string;
  pain: string[];
  value: string;
}

interface CaseStudy {
  id: string;
  client: string;
  country: string;
  year: string;
  business: string;
  challenges: string;
  solution: string;
}

interface Industry {
  title: string;
  desc: string;
  accent: string;
  heroImg: string;
  solutions: Solution[];
  caseStudies: CaseStudy[];
}

/* ---------- INDUSTRY DATA ---------- */
const industries: Record<IndustryKey, Industry> = {
  manufacturing: {
    title: "Manufacturing",
    desc: "ERP-driven factories with IoT visibility",
    accent: "#f97316",
    heroImg: "https://media.istockphoto.com/id/1184804468/photo/industrial-technology-concept-factory-automation-smart-factory-industry-4-0.jpg?s=612x612&w=0&k=20&c=1MaCUFJnqZmuugNhMyL5kt4q0BMwiNpzmnJbSggBE6I=",
    solutions: [
      {
        icon: "Factory",
        title: "Production Optimization",
        pain: [
          "Equipment downtime causing missed deadlines",
          "Inefficient resource allocation",
          "No real-time operational visibility",
        ],
        value:
          "Predictive-maintenance IoT and live dashboards keep lines running and costs contained.",
      },
      {
        icon: "Boxes",
        title: "Inventory Management",
        pain: [
          "Excess stock tying up capital",
          "Stock-outs causing production delays",
          "Manual tracking errors",
        ],
        value:
          "AI-driven JIT analytics optimise stock and trigger smart replenishment.",
      },
      {
        icon: "BarChart2",
        title: "Quality Assurance",
        pain: [
          "Inconsistent product quality",
          "Time-consuming inspection cycles",
          "Difficulty tracing defects",
        ],
        value:
          "Digital QMS flags issues early and provides cradle-to-grave traceability.",
      },
    ],
    caseStudies: [
      {
        id: "duqm",
        client: "Port of Duqm",
        country: "Oman",
        year: "2022",
        business:
          "Major Middle-East seaport offering pilotage, tug, bunkering and ship-handling services.",
        challenges:
          "Map end-to-end vessel services (pilotage → invoicing) inside IFS with zero custom code.",
        solution:
          "Implemented Port Authority Management System on IFS Apps 10, covering vessel registration, voyage declaration and automated invoicing—achieved entirely with standard configurations.",
      },
      {
        id: "seypec",
        client: "SEYPEC",
        country: "Seychelles",
        year: "2022",
        business:
          "National petroleum firm supplying fuel, bunkering vessels and managing an aviation-refuel fleet.",
        challenges:
          "Manual table-53B/54B volume calculations caused costly errors in oil & gas distribution.",
        solution:
          "Built a fully automated quantity-calculation engine plus complete EAM configuration—eliminated manual loss and enabled reliable maintenance planning.",
      },
    ],
  },

  energy: {
    title: "Energy & Utilities",
    desc: "Smart assets & predictive maintenance",
    accent: "#10b981",
    heroImg: "https://incyt.net/images/Energymain.jpg",
    solutions: [
      {
        icon: "Zap",
        title: "Asset Management",
        pain: [
          "Ageing infrastructure surprises",
          "Reactive repairs = costly outages",
          "CAPEX prioritisation guesswork",
        ],
        value:
          "Sensor telemetry + IFS forecasting prevents failures and extends asset life.",
      },
      {
        icon: "BarChart",
        title: "Performance Analytics",
        pain: [
          "Blind spots in asset efficiency",
          "No maintenance forecasting",
          "Siloed data sources",
        ],
        value:
          "Dashboards surface ROI insights and optimise maintenance windows.",
      },
      {
        icon: "CloudLightning",
        title: "Grid Management",
        pain: [
          "Demand swings with renewables",
          "Manual balancing",
          "Peak-time instability",
        ],
        value:
          "Real-time optimisation balances load & storage for grid resilience.",
      },
    ],
    caseStudies: [
      {
        id: "reg",
        client: "Rwanda Energy Group",
        country: "Rwanda",
        year: "2016-17",
        business:
          "Holding company (EUCL • EDCL) expanding, maintaining and operating Rwanda’s power infrastructure.",
        challenges:
          "Legacy, siloed systems couldn’t scale with demand or meet gov’t digitisation mandate.",
        solution:
          "World-Bank-funded IBMS programme: rolled out Finance, HR/Payroll, SCM, Distribution, Projects & DM modules across all subsidiaries—IFS, CMS & IRMS fully integrated under a single programme office led by Inzuscene.",
      },
    ],
  },

  construction: {
    title: "Construction & Engineering",
    desc: "Cost control, scheduling & BIM dashboards",
    accent: "#eab308",
    heroImg: "https://media.istockphoto.com/id/1188875450/vector/smart-home-technology-conceptual-banner-building-consists-digits-and-connected-with-icons-of.jpg?s=612x612&w=0&k=20&c=p-8BEDSOYEG4F9yXFzPo2vIq6GCXIyC9_GZtmgCaQcU=",
    solutions: [
      {
        icon: "PenTool",
        title: "Project Management",
        pain: [
          "Schedule delays inflate budgets",
          "Fragmented contractor comms",
          "Limited real-time progress data",
        ],
        value:
          "Connected scheduling syncs contractors, milestones and onsite progress.",
      },
      {
        icon: "DollarSign",
        title: "Cost Control",
        pain: [
          "Budget creep caught too late",
          "Slow change-order approvals",
          "Disparate expense tracking",
        ],
        value: "Live variance alerts keep spending on a tight leash.",
      },
      {
        icon: "Building2",
        title: "BIM Integration",
        pain: [
          "Rework from outdated drawings",
          "Office-field gaps",
          "Lost hand-over data",
        ],
        value:
          "BIM dashboards keep models current and connect assets to maintenance.",
      },
    ],
    caseStudies: [
      {
        id: "saab",
        client: "SAAB Grintek Defence",
        country: "South Africa",
        year: "2017",
        business:
          "Manufacturer of electronic warfare self-protection systems, sensor tech and avionics.",
        challenges:
          "Standard IFS lacked import/export & contracting licence management critical to defence sector.",
        solution:
          "Developed CRIM add-on: import + contracting licence tracking, serial-level traceability—meets federal defence ministry requirements.",
      },
    ],
  },

  services: {
    title: "Other Industries",
    desc: "24×7 support, e-invoicing & cloud migrations",
    accent: "#6366f1",
    heroImg: "https://community.nasscom.in/sites/default/files/styles/960_x_600/public/media/images/AI%203_23.png?itok=vzZ_flSb",
    solutions: [
      {
        icon: "HeadphonesIcon",
        title: "Managed Support",
        pain: [
          "Inconsistent service quality",
          "Ticket backlogs",
          "No 24×7 coverage",
        ],
        value:
          "Follow-the-sun support with AI routing delivers 98 % CSAT worldwide.",
      },
      {
        icon: "FileText",
        title: "Digital Documentation",
        pain: [
          "Manual invoicing delays",
          "High error rates",
          "Compliance headaches",
        ],
        value:
          "Pagero e-invoicing automates validation, digital signature & archiving.",
      },
      {
        icon: "Cloud",
        title: "Cloud Solutions",
        pain: [
          "Legacy infra limits scale",
          "High maintenance cost",
          "Security concerns",
        ],
        value:
          "AWS/Azure migrations cut OpEx 30 % and unlock elastic growth.",
      },
    ],
    caseStudies: [
      {
        id: "nhpc",
        client: "NHPC",
        country: "India",
        year: "2007-2010",
        business:
          "Largest hydropower developer in India—full lifecycle hydro projects.",
        challenges:
          "Map every process across 30+ construction & O&M sites on IFS Apps 7.5; integrate ESS, eProc, SCADA; later upgrade to Apps 10.",
        solution:
          "Rolled out HR, Payroll, Maintenance, Projects, Distribution, Finance plus Energy Sales Accounting; achieved seamless upgrade and unified reporting.",
      },
    ],
  },

  telecommunications: {
    title: "Telecommunications",
    desc: "Modern networks & real-time analytics",
    accent: "#ef4444",
    heroImg: "https://tpatechnologies.com/wp-content/uploads/2024/11/iStock-2022571797-2.jpg",
    solutions: [
      {
        icon: "Wifi",
        title: "Network Optimisation",
        pain: [
          "Bandwidth spikes strain legacy gear",
          "Manual config overhead",
          "Unknown bottlenecks",
        ],
        value:
          "SD-WAN automation maximises capacity at lower cost.",
      },
      {
        icon: "Activity",
        title: "Performance Analytics",
        pain: [
          "No predictive capacity planning",
          "Reactive fault resolution",
          "Scattered KPIs",
        ],
        value:
          "Crunch live telemetry for predictive capacity modelling.",
      },
      {
        icon: "Shield",
        title: "Security Solutions",
        pain: [
          "Escalating network attacks",
          "Fraud detection difficulty",
          "Tougher compliance regimes",
        ],
        value:
          "AI threat-intel plus auto-response protect nodes in real time.",
      },
    ],
    caseStudies: [
      
    ],
  },
};

/* ---------- Icons ---------- */
const L: Record<string, any> = {
  Factory,
  Boxes,
  BarChart2,
  PenTool,
  DollarSign,
  Building2,
  HeadphonesIcon: Headphones,
  FileText,
  Cloud,
  Zap,
  BarChart,
  CloudLightning,
  Wifi,
  Activity,
  Shield,
};

export default function IndustriesPage() {
  const [open, setOpen] = useState<IndustryKey>("manufacturing");
  const [csModal, setCsModal] = useState<CaseStudy | null>(null);
  const isMobile = useIsMobile();

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="pt-20">
      <section className="relative py-12 md:py-[8rem] bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              Industries We Empower
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/80">
              Next-gen solutions engineered for sector-specific success
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <SplineComponent />
        {/* ================= ACCORDION ================= */}
        <section className="container mx-auto px-4 py-24 space-y-14">
          {(Object.keys(industries) as IndustryKey[]).map((key) => {
            const ind = industries[key];
            const isOpen = key === open;
            return (
              <article key={key} className="rounded-3xl shadow-lg overflow-hidden">
                {/* HEADER */}
                <button
                  onClick={() => setOpen(isOpen ? ("none" as any) : key)}
                  className="relative w-full text-left group"
                >
                  <div
                    className="h-48 bg-cover bg-center transition-transform group-hover:scale-[1.02]"
                    style={{
                      backgroundImage: `linear-gradient(to top,${ind.accent}cc 0%,transparent 40%),url(${ind.heroImg})`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                        {ind.title}
                      </h2>
                      <p className="text-white/80 text-sm max-w-lg">
                        {ind.desc}
                      </p>
                    </div>
                    <ChevronDown
                      className={`text-white transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* PANEL */}
                {isOpen && (
                  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 space-y-8 sm:space-y-12 md:space-y-16">
                    {/* SOLUTIONS */}
                    <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {ind.solutions.map((s) => {
                        const Icon = L[s.icon] ?? Boxes;
                        return (
                          <div
                            key={s.title}
                            className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-4 sm:p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition"
                          >
                            <div className="flex items-center gap-2 mb-6">
                              <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3825e2] to-[#38ba99] flex items-center justify-center text-white">
                                <Icon className="w-4 h-4" />
                              </span>
                              <h3 className="font-semibold text-lg">
                                {s.title}
                              </h3>
                            </div>
                            <h4 className="text-xs font-bold tracking-widest text-[#38ba99] mb-2">
                              COMMON PAIN POINTS
                            </h4>
                            <ul className="list-disc list-inside text-base space-y-1 mb-4 text-gray-700 dark:text-gray-300">
                              {s.pain.map((p) => (
                                <li key={p}>{p}</li>
                              ))}
                            </ul>
                            <p className="text-base text-gray-600 dark:text-gray-400">
                              {s.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* CASE STUDIES */}
                    {/* {ind.caseStudies.length > 0 && (
                      <>
                        <h3 className="text-2xl font-bold">Case Studies</h3>
                        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {ind.caseStudies.map((cs) => (
                            <button
                              key={cs.id}
                              onClick={() => setCsModal(cs)}
                              className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-4 sm:p-6 text-left hover:shadow-xl hover:-translate-y-1 transition"
                            >
                              <p className="text-lg font-semibold mb-1">
                                {cs.client}
                              </p>
                              <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                                {cs.country} • {cs.year}
                              </p>
                              <p className="text-sm text-[#38ba99] font-medium">
                                View Details →
                              </p>
                            </button>
                          ))}
                        </div>
                      </>
                    )} */}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>

      {/* ================= MODAL ================= */}
      <Transition show={!!csModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClose={() => setCsModal(null)}
        >
          {/* Backdrop */}
          <Transition.Child
            as="div"
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <Transition.Child
            as="div"
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={() => setCsModal(null)}
              className="absolute top-3 right-3 bg-white/70 dark:bg-gray-700/50 backdrop-blur p-1.5 rounded-full hover:bg-white dark:hover:bg-gray-700 shadow"
            >
              <X className="w-5 h-5" />
            </button>

            {csModal && (
              <div className="p-4 sm:p-6 md:p-8 space-y-6">
                <h2
                  className={`font-bold ${
                    isMobile ? "text-xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {csModal.client}
                </h2>

                <dl className="text-base space-y-4">
                  <div className="flex gap-2">
                    <dt className="font-semibold w-32">Country</dt>
                    <dd>{csModal.country}</dd>
                  </div>

                  <div className="flex gap-2">
                    <dt className="font-semibold w-32">Year</dt>
                    <dd>{csModal.year}</dd>
                  </div>

                  <div>
                    <dt className="font-semibold mb-1">Business</dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      {csModal.business}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold mb-1">Challenges</dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      {csModal.challenges}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold mb-1">Solution</dt>
                    <dd className="text-gray-600 dark:text-gray-300">
                      {csModal.solution}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
