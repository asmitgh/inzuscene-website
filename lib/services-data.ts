import { ServiceCardProps } from "@/components/service-card";

/**
 *  In-depth ServicesData
 *  • Content is pulled strictly from the official Inzuscene project files (company profile, services-competency deck and website DOC).
 *  • Every card now includes ≥ 4 FAQs plus richer benefits and case-study context.
 */

export const ServicesData: ServiceCardProps[] = [
  /*────────────────────────────────────────
   | ENTERPRISE BUSINESS SOLUTIONS
   ────────────────────────────────────────*/
  {
    id: "erp-customization",
    title: "ERP Implementation & Customization",
    description:
      "Green-field deployments, upgrades and continuous improvement across IFS, Odoo and Oracle ERP—covering evaluation, gap–fit analysis, configuration, training and hyper-care support.",
    icon: "🗂️",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Enterprise Business Solutions",
    technologies: ["IFS", "Odoo", "Oracle", "Source Pro"],
    benefits: [
      "Unified, real-time operational visibility",
      "Streamlined finance, supply-chain & production workflows",
      "Faster statutory and management reporting",
      "Pre-configured industry best-practice templates",
      "Reduced total cost of ownership via phased CRIM reduction",
    ],
    caseStudies: [
      {
        company: "Industrial Machinery Group",
        industry: "Manufacturing",
        challenge:
          "Legacy silos created production bottlenecks and limited management insight.",
        solution:
          "IFS Cloud roll-out with IoT integration and Novacura Flow mobile extensions.",
        results: [
          "50 % drop in unplanned downtime",
          "30 % reduction in excess inventory",
          "360° shop-floor-to-boardroom visibility",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an average IFS Cloud implementation take?",
        answer:
          "Typical mid-market projects run 6 – 12 months; complex multi-site programmes may extend to 18 months, including data migration and user training.",
      },
      {
        question: "Can we migrate in phases to avoid disruption?",
        answer:
          "Yes. Inzuscene’s phased methodology (Initiate → Establish → Implement → Go-Live) minimises downtime and allows critical modules to go live first.",
      },
      {
        question: "Do you support integrations with Pagero or Wafeq e-invoicing?",
        answer:
          "Absolutely—our ERP practice bundles ready-made connectors for Pagero & Wafeq to ensure regional e-invoicing compliance.",
      },
      {
        question: "What post-implementation services are offered?",
        answer:
          "Hyper-care, 24×7 AMS, periodic health-checks, performance tuning and regulatory/patch updates are all part of our managed support catalogue.",
      },
    ],
  },
  {
    id: "fsm-esm",
    title: "Field & Enterprise Service Management",
    description:
      "IFS FSM and IFS assyst solutions that connect assets, field engineers and back-office teams, delivering real-time service orchestration across industries.",
    icon: "🛠️",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Enterprise Business Solutions",
    technologies: ["IFS FSM", "IFS assyst"],
    benefits: [
      "Scheduling & optimisation",
      "Connected inventory and warranty visibility",
      "Mobile offline capability for field staff",
      "Over 100 predefined workflows shorten time-to-value",
    ],
    caseStudies: [
      {
        company: "Regional Utilities Provider",
        industry: "Energy & Utilities",
        challenge:
          "Slow work-order assignment and paper-based field reporting.",
        solution:
          "IFS FSM with dynamic scheduling and mobile apps for technicians.",
        results: ["20 % boost in first-time-fix rate", "NPS +18 within 6 months"],
      },
    ],
    faqs: [
      {
        question: "Can IFS FSM integrate with our existing ERP?",
        answer:
          "Yes—standard REST APIs and Boomi connectors enable bi-directional integration with ERP, CRM and IoT platforms.",
      },
      {
        question: "Does the mobile app work offline?",
        answer:
          "IFS mobile clients cache data locally, allowing technicians to capture data offline and sync automatically once connectivity returns.",
      },
      {
        question: "How is preventive maintenance handled?",
        answer:
          "Asset telemetry or manual thresholds can trigger automated PM work-orders, leveraging IoT data and rules in IFS FSM.",
      },
      {
        question: "Is multi-language support available?",
        answer:
          "IFS assyst and FSM support 20+ languages out-of-the-box; Inzuscene can add regional translations during rollout.",
      },
    ],
  },
  {
    id: "e-invoicing",
    title: "E-Invoicing & Compliance",
    description:
      "Accelerate statutory compliance with Pagero & Wafeq—rapid implementations that automate invoice validation, archiving and tax authority submission.",
    icon: "🧾",
    image:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Enterprise Business Solutions",
    technologies: ["Pagero", "Wafeq"],
    benefits: [
      "Real-time clearance with regional tax platforms",
      "Reduced manual data entry and errors",
      "Short, cost-effective implementation cycle",
      "Future-proof updates for evolving mandates",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Which countries’ e-invoice mandates do you cover?",
        answer:
          "Current accelerators support GCC, India, EU and multiple Latin-American schemas; additional regions can be configured.",
      },
      {
        question: "How quickly can we go live?",
        answer:
          "Most projects finish in 4 – 8 weeks including testing and training, thanks to pre-built adapters for ERP platforms.",
      },
      {
        question: "Is archiving legally compliant?",
        answer:
          "Yes, invoices are timestamped, digitally signed and stored per local retention rules, ensuring full audit-trail integrity.",
      },
      {
        question: "Can we continue to print PDF invoices as backups?",
        answer:
          "The solution can generate compliant e-invoices and optional human-readable PDF/A versions for your customers’ convenience.",
      },
    ],
  },
  {
    id: "bi-analytics",
    title: "Business Intelligence & Analytics",
    description:
      "Power BI-driven dashboards, data warehouses and predictive models that convert raw data into insight and competitive advantage.",
    icon: "📊",
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Enterprise Business Solutions",
    technologies: ["Power BI"],
    benefits: [
      "Self-service analytics for business users",
      "Pre-built IFS Finance dashboards",
      "ETL pipelines using Power Query",
      "Predictive models for demand & maintenance",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Do you provide ready-made BI packs for IFS?",
        answer:
          "Yes—finance, supply-chain and manufacturing dashboard packs shorten deployment and can be customised.",
      },
      {
        question: "What data governance practices are applied?",
        answer:
          "Role-based security, data lineage, automated quality rules and a business glossary are established during the project.",
      },
      {
        question: "Can Power BI reports be embedded in ERP screens?",
        answer:
          "Embedded analytics within IFS lobby pages or Odoo dashboards is supported via Power BI iframe tokens.",
      },
      {
        question: "Is real-time data possible?",
        answer:
          "DirectQuery or incremental refresh enables near-real-time visuals when latency under five minutes is required.",
      },
    ],
  },

  /*────────────────────────────────────────
   | CLOUD & INFRASTRUCTURE
   ────────────────────────────────────────*/
  {
    id: "cloud-migration",
    title: "Cloud Migrations & Hybrid Deployments",
    description:
      "Strategic roadmap, landing-zone design and secure migration to AWS, Azure or Oracle Cloud—leveraging the 6R framework (Rehost, Replatform, Refactor…)",
    icon: "☁️",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Cloud & Infrastructure",
    technologies: ["AWS", "Azure", "Oracle Cloud"],
    benefits: [
      "Elastic scaling with 35 % average TCO savings",
      "Multi-region DR & business continuity",
      "Zero-trust security baselines and IAM",
      "Automated IaC pipelines (Terraform)",
    ],
    caseStudies: [
      {
        company: "Fin-Serve Africa",
        industry: "Financial Services",
        challenge: "Capacity limits on-prem + compliance obligations.",
        solution:
          "Hybrid Azure–AWS environment, encrypted storage and 24×7 SOC monitoring.",
        results: [
          "99.99 % uptime",
          "Cost-base down by 35 %",
          "Full POPIA & GDPR alignment",
        ],
      },
    ],
    faqs: [
      {
        question: "Can legacy Oracle databases be lifted-and-shifted?",
        answer:
          "Yes—Oracle Cloud lift-and-shift or AWS RDS for Oracle options are assessed during discovery.",
      },
      {
        question: "How is downtime minimised during migration?",
        answer:
          "Cut-over windows use replication tools (DMS / Azure Migrate) and blue-green patterns to avoid service breaks.",
      },
      {
        question: "What cloud security standards do you follow?",
        answer:
          "CIS Benchmarks, NIST CSF and cloud-native best-practice baselines are embedded in our landing-zone templates.",
      },
      {
        question: "Do you provide cost-optimisation after go-live?",
        answer:
          "Yes—FinOps reviews identify idle resources, right-size instances and apply savings-plans or reserved instances.",
      },
    ],
  },
  {
    id: "infrastructure-ops",
    title: "Infrastructure & Server Management",
    description:
      "24×7 monitoring, patching and optimisation of on-prem, cloud and hybrid estates—including database, OS and middleware support.",
    icon: "🖥️",
    image:
      "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Cloud & Infrastructure",
    technologies: ["Linux", "Oracle DB"],
    benefits: [
      "Guaranteed SLAs & rapid incident resolution",
      "Capacity forecasting & performance tuning",
      "Automated patching and compliance reporting",
      "Expert DBAs for Oracle & SQL workloads",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Do you take over existing MSP contracts?",
        answer:
          "Yes—we execute a structured transition (knowledge transfer, tooling alignment, shadow support) to ensure continuity.",
      },
      {
        question: "What monitoring tools do you use?",
        answer:
          "Prometheus/Grafana, Azure Monitor, AWS CloudWatch and custom scripts—depending on stack and client preference.",
      },
      {
        question: "Is on-demand support available outside 24×7 plans?",
        answer:
          "Ad-hoc tickets can be purchased; however, SLA-backed results require a managed-services agreement.",
      },
      {
        question: "How do you handle OS security hardening?",
        answer:
          "Baseline CIS templates, automated compliance scans and remedial patching are part of the monthly operations cycle.",
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Risk Mitigation",
    description:
      "Zero-trust architecture, SIEM/XDR, IAM and compliance consulting (PCI-DSS, HIPAA, GDPR) to secure cloud and on-prem workloads.",
    icon: "🔒",
    image:
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Cloud & Infrastructure",
    technologies: ["IAM", "SIEM", "XDR", "Cloud Security", "EDB"],
    benefits: [
      "Proactive threat detection & automated response",
      "Reduced breach likelihood and financial exposure",
      "Continuous compliance posture management",
      "Secure enablement of digital transformation",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "What frameworks guide your security assessments?",
        answer:
          "We align with NIST 800-53, ISO 27001 and CIS Controls, tailoring controls to each client’s risk profile.",
      },
      {
        question: "Do you offer managed SOC services?",
        answer:
          "Yes—24×7 SOC monitoring with real-time SIEM correlation and playbook-driven incident response.",
      },
      {
        question: "How do you secure multi-cloud environments?",
        answer:
          "We deploy cloud-native posture-management (CSPM) plus unified XDR to correlate threats across AWS, Azure & OCI.",
      },
      {
        question: "What is the average time to remediate critical vulnerabilities?",
        answer:
          "P1 vulnerabilities are triaged within 4 hours and patched or mitigated in < 24 hours per our standard SLA.",
      },
    ],
  },

  /*────────────────────────────────────────
   | LOW-CODE SOLUTIONS
   ────────────────────────────────────────*/
  {
    id: "novacura-flow",
    title: "Low Code No Code Development",
    description:
      "Drag-and-drop platform that enables rapid ERP extensions, offline mobile workflows and CRIM reduction—all delivered by Inzuscene’s certified Flow team.",
    icon: "⚡",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/63c6f23446892e4c35e9af4b/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    category: "Low-Code Solutions",
    technologies: ["Novacura Flow", "K2 Nintex"],
    benefits: [
      "75 % faster rollout vs. traditional coding",
      "Works offline—ideal for field staff",
      "Reduces custom-mod footprint in ERP",
      "Easily modifiable via Flow Studio",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Can Flow apps run on iOS and Android?",
        answer: "Yes—Flow Mobile Client supports both platforms natively.",
      },
      {
        question: "Is there version control for Flow processes?",
        answer:
          "Flow Studio maintains revisions and allows rollback to any previous version for audit compliance.",
      },
      {
        question: "How does Flow connect to IFS Cloud?",
        answer:
          "Through secure REST APIs or direct database calls managed by the Flow Server connector suite.",
      },
      {
        question: "Do Flow dashboards replace BI tools?",
        answer:
          "Flow Portal provides operational KPIs; for advanced analytics we integrate with Power BI.",
      },
    ],
  },
  {
    id: "oracle-apex",
    title: "Oracle APEX Rapid Delivery",
    description:
      "Low-code development framework for Oracle Database—build secure, enterprise-grade web apps without heavy Java/.NET stacks.",
    icon: "🔧",
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Low-Code Solutions",
    technologies: ["Oracle APEX"],
    benefits: [
      "Declarative UI for forms, charts & reports",
      "Native authentication and RBAC",
      "Fully responsive out-of-the-box",
      "Lower licensing & infra overhead",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Does APEX require Oracle Cloud?",
        answer:
          "No—APEX runs anywhere Oracle Database does (on-prem, OCI, AWS RDS for Oracle).",
      },
      {
        question: "How are CI/CD pipelines set up for APEX?",
        answer:
          "Scripts export apps as SQL and integrate with GitHub Actions or Jenkins for automated deployments.",
      },
      {
        question: "Can we embed ML models?",
        answer:
          "Yes—PL/SQL or REST APIs allow calling Oracle Machine Learning models or external AI services.",
      },
      {
        question: "Is APEX secure for external users?",
        answer:
          "Built-in session state protection, ACLs and native OAuth/OIDC integrations ensure enterprise-grade security.",
      },
    ],
  },

  /*────────────────────────────────────────
   | INTEGRATIONS & OTHER SERVICES
   ────────────────────────────────────────*/
  {
    id: "boomi-integration",
    title: "Boomi & API-Led Integrations",
    description:
      "Reusable Boomi processes and RESTful APIs that synchronise ERP, CRM and cloud applications to create a single source of truth.",
    icon: "🔗",
    image:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Integrations & Other Services",
    technologies: ["Boomi", "HTTPS", "SoapUI"],
    benefits: [
      "40 % faster project delivery via pre-built connectors",
      "End-to-end data lineage and error handling",
      "Event-driven & batch patterns supported",
      "Scalable to thousands of transactions per second",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Do you support EDI or B2B integrations?",
        answer:
          "Yes—Boomi’s B2B/EDI Management handles X12, EDIFACT and custom flat-file exchanges.",
      },
      {
        question: "How are errors monitored?",
        answer:
          "Boomi Atom queues and dashboards provide real-time error alerts plus retry and replay options.",
      },
      {
        question: "Can Boomi handle on-prem to cloud traffic securely?",
        answer:
          "Local runtime Atoms or Molecules keep data on-prem while brokered securely to cloud services.",
      },
      {
        question: "Is API versioning supported?",
        answer:
          "Boomi API Management offers lifecycle governance—versions, deprecation notices and consumer analytics.",
      },
    ],
  },
  {
    id: "workflow-automation",
    title: "Custom Workflow Automation",
    description:
      "Automate HR, finance and e-invoicing processes with Power Automate or Novacura Flow, eliminating manual hand-offs and accelerating approvals.",
    icon: "⚙️",
    image:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Integrations & Other Services",
    technologies: ["K2 Nintex", "Novacura Flow"],
    benefits: [
      "Significant reduction in processing time",
      "Error rate drops through rule-based validation",
      "Audit trails for compliance and KPIs",
      "Citizen-developer friendly tools",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "How do you ensure workflows remain compliant?",
        answer:
          "Role-based approvals, version control and automatic SLA tracking are embedded in every flow.",
      },
      {
        question: "Can flows call external APIs?",
        answer:
          "Yes—both Power Automate and Flow support REST/SOAP connectors and custom webhooks.",
      },
      {
        question: "Is training provided to create new flows in-house?",
        answer:
          "We run enablement workshops and provide template libraries so business users can extend automation safely.",
      },
      {
        question: "How are exceptions handled?",
        answer:
          "Escalation paths, notifications and manual override screens allow controlled resolution of failed transactions.",
      },
    ],
  },
  {
    id: "devops-support",
    title: "Scalable IT & DevOps Support",
    description:
      "CI/CD pipelines, container orchestration and 24×7 L1-L3 support that keep mission-critical applications secure, up-to-date and high-performing.",
    icon: "🕒",
    image:
      "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Integrations & Other Services",
    technologies: ["Docker", "Kubernetes", "PeopleStrong", "GitHub Actions"],
    benefits: [
      "Shorter release cycles through automated testing",
      "Infrastructure as Code for repeatable environments",
      "24×7 incident response with defined SLAs",
      "Cost-optimised, scalable support tiers",
    ],
    caseStudies: [],
    faqs: [
      {
        question: "Which CI/CD tools do you support?",
        answer:
          "Jenkins, GitHub Actions, Azure DevOps and AWS CodePipeline are all part of our standard toolchain catalogue.",
      },
      {
        question: "Can you manage Kubernetes clusters?",
        answer:
          "Yes—we operate managed clusters on AKS, EKS, GKE or on-prem, including backup, patching and autoscaling.",
      },
      {
        question: "What alerting system is used for incidents?",
        answer:
          "Prometheus alerts feed PagerDuty/ServiceNow; our NOC triages alerts and follows run-books for resolution.",
      },
      {
        question: "How is knowledge captured for recurring issues?",
        answer:
          "Root-cause analysis is logged in a shared knowledge base that feeds continual-service-improvement sprints.",
      },
    ],
  },
];

export type { ServiceCardProps };
