// DevinCardsExample.tsx
"use client";
import React from "react";
import HeaderText from "../Home/SubHeader";
import AnimatedCards, { CardData } from "../Home/AnimatedCard";

// Sample data for cards
const cardsData: CardData[] = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    subtitle: "Discrete & Process",
    bulletPoints: [
      "ERP & supply-chain for automotive, project-based and many more.",
      "BOM management & quality control",
      "Real-time shop-floor visibility & analytics",
    ],
    startColor: "#4a9ded",
    endColor: "#38b2ac",
    imageUrl: "/use-cases/Logo1.png",
  },
  {
    id: "energy-utilities",
    title: "Energy & Utilities",
    subtitle: "Asset & Field Service",
    bulletPoints: [
      "IoT-enabled monitoring of turbines, transformers & pipelines",
      "Outage management, regulatory compliance & safety",
      "Plant maintenance systems with predictive insights",
    ],
    startColor: "#38b2ac",
    endColor: "#4299e1",
    imageUrl: "/use-cases/Logo2.png",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    subtitle: "Upstream → Downstream",
    bulletPoints: [
      "Project-driven ERP for exploration, transport & refining",
      "HSE-focused risk management & compliance (OSHA, API)",
      "Logistics & procurement for remote operations",
    ],
    startColor: "#4299e1",
    endColor: "#36b3a8",
    imageUrl: "/use-cases/Logo3.png",
  },
];
const cardsData2: CardData[] = [
    {
      id: "engineering-construction",
      title: "Engineering & Construction",
      subtitle: "",
      bulletPoints: [
        "Project-centric ERP for large-scale builds",
        "Real-time resource & budget tracking",
        "On-site mobility & compliance tools",
      ],
      startColor: "#4a9ded",
      endColor: "#38b2ac",
      imageUrl: "/use-cases/Logo4.jpg",
    },
    {
      id: "logistics-transportation",
      title: "Logistics & Transportation",
      subtitle: "",
      bulletPoints: [
        "Warehouse & inventory optimization",
        "Fleet management & route planning",
        "End-to-end supply chain visibility",
      ],
      startColor: "#38b2ac",
      endColor: "#4299e1",
      imageUrl: "/use-cases/Logo5.jpg",
    },
    {
      id: "cross-industry",
      title: "Cross-Industry Capabilities",
      subtitle: "",
      bulletPoints: [
        "Telecom CRM & billing systems",
        "Public portals & e-governance",
        "Prebuilt workflows & domain packs",
      ],
      startColor: "#4299e1",
      endColor: "#36b3a8",
      imageUrl: "/use-cases/Logo6.jpg",
    },
  ];
  
const DevinCardsExample: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <HeaderText 
        title=""
        highlightedText="Focused Industries"
        description="Inzuscene delivers tailored technology solutions designed to drive operational efficiency, mitigate risk, and accelerate growth across any industry landscape, end to end."
      />
      
      <AnimatedCards 
        cards={cardsData} 
        defaultExpandedIndex={0} // You can comment this line to use the default value
      />
      <AnimatedCards 
        cards={cardsData2} 
        defaultExpandedIndex={2} // You can comment this line to use the default value
      />
    </div>
  );
};

export default DevinCardsExample;