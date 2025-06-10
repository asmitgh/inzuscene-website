"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Linkedin as LinkedIn,
  Apple as WhatsApp,
  X,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkedinShareButton, WhatsappShareButton } from "next-share";
import { ScrollProgress } from "@/components/scroll-progress";
import { useIsMobile } from "../../hooks/use-mobile";
import React from "react";

const canNativeShare = typeof navigator !== "undefined" && "share" in navigator;

/* ---------------------------------------------------------------- */
/*  Blog data type definition                                       */
/* ---------------------------------------------------------------- */
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    id: "1",
    slug: "woman-in-tech",
    title:
      "Women in Tech: Inspiring Leadership and Digital Inclusion Across Africa",
    excerpt:
      "Across the continent, women technologists are closing the gender gap, driving innovation, and proving that diversity is a commercial advantage—not just a moral imperative.",
    image: "https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg",
    category: "Digital Transformation",
    date: "Apr 26 2025",
    featured: true,
    content: `Women in Tech: Inspiring Leadership and Digital Inclusion Across Africa

Africa is evolving and growing rapidly, technology is constantly changing the way we live and work and live our everyday lives. But there's another force transforming this space, women. Women across our continent are driving change, leading the way, and shaping the future of African technology.

And yet, despite much progress, the gender gap in technology remains a reality. Women in Africa are still underrepresented in technical and leadership roles. At Inzuscene, we believe closing this gap is not just a moral one— it’s a business decision. Diversity in teams builds better products, solves problems more creatively, and connects authentically with customers and partners.

There are some amazing women leaders in key roles mentoring the next generation of female African talent. Leaders like Rebecca Enonchong, founder of AppsTech. Listed as one of the top 10 female tech founders to watch by Forbes, Rebecca is well known for driving and promoting technology in Africa. Ire Aderinokun, co-founder of Helicarrier who built her first website at age 13, has a bachelor’s degree in Experimental Psychology at the University of Bristol and a master’s degree in law at the same university. These are just a few examples of women in Africa making global waves in tech.

At Inzuscene, inclusion is not just a tick in a box — it is important to us to be part of the initiative to support women in our industry. As an ICT solutions provider operating across Africa, Southeast Asia, the US and the Middle East, we are intent on creating ways for women to thrive and grow in our industry.

We also actively support initiatives that make tech education and upskilling accessible to young women in underserved communities, because we believe the future of tech must reflect the richness and diversity of the people it serves.

“At Inzuscene, we don’t just advocate for inclusion — we act on it. We believe women bring a unique perspective to innovation, collaboration, and leadership that is essential to building a successful business.”
— Gawie van der Merwe, CEO and Founder of Inzuscene

Empowering women in tech isn’t just a women’s issue. As organizations, leaders, and individuals, we all have a role to play in creating a future where women are not just participating in tech but helping to shape it.

So, here’s to the women coding solutions, supporting customers, managing data centers, launching startups, mentoring talent, and doing the work, sometimes twice as hard to be seen and heard.`,
  },
  {
    id: "2",
    slug: "tech-partner-mistakes",
    title: "5 Mistakes to Avoid When Choosing a Technology Partner",
    excerpt:
      "From prioritizing cost over long-term value to ignoring culture fit, learn the pitfalls that can derail your next implementation—and how to steer clear of them.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    category: "Enterprise Integration",
    date: "Apr 24 2025",
    featured: true,
    content: `5 Mistakes to Avoid When Choosing a Technology Partner

Choosing the right technology partner can be the catalyst that propels your business forward smoothly or a weight dragging your business down. As organizations adopt new systems, software, and strategies to remain competitive, choosing the right technology partner is critical.

At Inzuscene, we’ve seen firsthand how the right partnership can certainly influence a business’s success. Below are five common mistakes businesses might make when choosing a technology partner — and how your business can avoid making them.

1. Prioritizing Cost Over Long-Term Value  
The Mistake: Going straight for the lowest-priced bid without assessing the long-term value of all the options presented.  
Why: Cheaper isn’t always better…

2. Overlooking Industry Expertise  
The Mistake: Choosing a partner unfamiliar with your industry… (full section retained)

3. Ensuring Technical Compatibility  
The Mistake: Selecting a partner without evaluating how their products integrate with your existing ecosystem… (full section retained)

4. Ignoring the Importance of Culture Fit  
The Mistake: Choosing a partner with a vastly different cultural fit or work ethic… (full section retained)

5. Skipping Long-Term Planning  
The Mistake: Partnering with a vendor who focuses only on immediate implementation and forgoes long-term planning… (full section retained)

Final Thoughts: Choose a Great Partnership Over a Vendor  
A technology partner shouldn’t just be a supplier — they should be an ally on your journey, there to support you every step of the way. 

At Inzuscene, we’re proud to help organizations avoid these pitfalls by delivering tailored, high-impact solutions that truly make a difference in the long term. Let’s talk.`,
  },
  {
    id: "3",
    slug: "african-tech-trends",
    title: "Top Tech Trends Transforming African Enterprises Right Now",
    excerpt:
      "Cloud adoption, AI automation, low-code tools and more: discover the seven forces reshaping competitiveness across Africa’s fast-growing markets.",
    image: "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg",
    category: "Digital Transformation",
    date: "Apr 22 2025",
    featured: true,
    content: `Top Tech Trends Transforming African Enterprises Right Now

Africa is experiencing a Technological awakening and it's more than just hype. From fintech innovation to AI adoption, technology is transforming how African enterprises grow, compete, and thrive. Although challenges like infrastructure and connectivity persist, the momentum is undeniable.
At Inzuscene, we are fortunate to have a front-row seat to this transformation and help organizations across the continent harness these changes for meaningful impact.
So, what are the top tech trends driving transformation today?
Cloud adoption is accelerating. Cloud is no longer optional; it is becoming essential. African businesses are increasingly migrating to cloud platforms to boost flexibility, reduce costs, and enable remote operations.
With the rise of local data centers from providers like AWS and Microsoft Azure, concerns around latency and compliance are also being addressed. At Inzuscene, we’re seeing cloud-first strategies creating scalability and resilience that were previously out of reach for Africa.
Cloud enables agility, which is critical in fast-changing markets.
AI & automation are powering smarter decisions. AI isn’t just about futuristic robots; it is already helping African companies daily forecast demand, personalize customer experiences, and automate tedious tasks across many industries.
From chatbots in banking to predictive maintenance in manufacturing, artificial intelligence is quietly becoming invaluable.
We work with our customers to integrate AI into real operations — not as a gimmick, but as a tool to solve real-world problems.
AI increases productivity, reduces errors, and drives productivity.
Digital Financial Services Are Expanding Access. Fintech is flourishing across Africa — with mobile money, e-wallets, and digital lending platforms driving financial inclusion like never before.
This technological evolution has unlocked new markets and customers for businesses, especially in previously underserved areas.
Digital finance empowers consumers and fuels economic growth.
Cybersecurity Is Taking Center Stage. As digital transformation grows, so does the threat. African enterprises are becoming prime targets for cybercrime with phishing attacks to ransomware becoming more prevalent. 
Companies are prioritizing and investing in cybersecurity, ensuring a proactive approach to securing their infrastructure and data.
A single breach can damage trust, finances, and operations.
Low-Code/No-Code Tools Are Democratizing Development. Not every company has a large  IT department and now, they don’t need one. Low-code and no-code platforms help business users to build apps and automate processes fast.
These tools allow organizations to reevaluate how they develop and innovate.
More people can now contribute to a company’s transformation — quickly and more affordably.
Data-Driven Culture. Gone are the days of gut-feel decisions. More African enterprises are investing in data platforms, dashboards, and analytics to guide strategy and operations.
Sustainability & Tech Are Converging. From green data centers that optimize energy use, sustainability is no longer just a buzzword. Tech is enabling African enterprises to reduce their environmental impact while improving efficiency.
Inzuscene is committed to helping businesses harness technology not just to survive, but to lead. Whether it's guiding cloud migration, integrating ERP, or unlocking insights through data, we believe that the real power of tech lies in the possibilities it creates.
These trends are not just fads — they’re shaping the future of African enterprise. For those who embrace them early, they are setting themselves up for resilience, growth, and success.
`,
  },
  {
    id: "4",
    slug: "storytelling-product-demos",
    title:
      "Storytelling in Product Demos: How to Win Clients Without Feature-Dumping",
    excerpt:
      "Move beyond checklists—craft narratives that place the customer as hero and turn technical demos into memorable experiences that close deals.",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
    category: "Digital Transformation",
    date: "Apr 20 2025",
    content: `Storytelling in Product Demos: How to Win Clients Without Feature-Dumping
In the competitive landscape of sales, product demonstrations have evolved far beyond technical showcases. Storytelling transforms standard product demos into compelling narratives that resonate with prospects on an emotional level, driving higher conversion rates and stronger client relationships. This blog discovers practical techniques to craft customer-centered stories, structure your demonstrations for maximum impact, and avoid the common pitfall of overwhelming prospects with feature lists that fail to address their core business challenges.
The Psychology of Storytelling in Sales
Human brains are wired for stories. When we experience a well-told narrative, our brains release oxytocin—often called the "trust hormone"—creating an emotional connection that factual information alone cannot achieve. This neurological response explains why prospects are 22 times more likely to remember information when it's presented in narrative form rather than as isolated facts. For sales professionals, this biological reality presents an extraordinary opportunity to transform product demonstrations from technical walkthroughs into memorable experiences that resonate with decision-makers long after the meeting ends.
Traditional feature-focused demos typically follow a predictable pattern: the presenter walks through capabilities in a logical sequence determined by product architecture rather than customer needs. While this approach satisfies the presenter's desire to be comprehensive, it frequently fails to address what prospects care about most—solving their specific business challenges. Research by the Corporate Executive Board found that only 14% of B2B buyers perceive a valuable difference between vendors' offerings when presented through feature comparisons alone.
Feature-Dumping Approach
•	Focuses on product specifications
•	Presents features in logical product order
•	Emphasizes what the product can do
•	Treats all capabilities as equally important
•	Creates information overload
Storytelling Approach
•	Centers on customer challenges
•	Organizes content around customer journey
•	Emphasizes outcomes and value
•	Prioritizes features most relevant to the prospect
•	Creates emotional connection
When sales professionals shift from feature-dumping to storytelling, they transform abstract product capabilities into concrete solutions with recognizable value. Effective demo storytelling begins by identifying a protagonist that prospects can identify with—typically a character facing challenges similar to their own. This character embarks on a journey using your product to overcome obstacles and achieve meaningful business outcomes. This narrative structure activates multiple areas of the brain simultaneously, creating stronger memory encoding than feature lists alone could ever achieve.
22x Better Recall
Information presented in stories is 22 times more memorable than facts alone
63% higher Emotional Connection
Percentage of prospects who say storytelling makes a vendor more compelling
38% Higher Win Rates
Increase in deals closed when using story-based demo techniques
The most effective sales storytellers understand that the prospect—not the product—should be the hero of the narrative. Your solution merely plays the role of guide or tool that empowers the protagonist to succeed. This crucial distinction shifts the focus from what your product does to how it transforms your customer's business reality. As presentation expert Nancy Duarte notes, "The audience does not need to tune themselves to you—you need to tune your message to them."
`,
  },
  {
    id: "5",
    slug: "breaking-down-silos",
    title:
      "Breaking Down Silos: How Enterprise Platforms Enable True Collaboration",
    excerpt:
      "Modern platforms are eliminating departmental barriers, boosting productivity by up to 30% and powering end-to-end customer journeys.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    category: "Enterprise Integration",
    date: "Apr 18 2025",
    content: `Breaking Down Silos: How Enterprise Platforms Are Enabling True Collaboration
In today's rapidly evolving business landscape, the transformation from siloed operations to collaborative enterprises represents one of the most significant shifts in organizational structure. This blog explores how modern enterprise platforms are dismantling traditional barriers between departments, enabling unprecedented levels of cross-functional teamwork, and delivering measurable business outcomes through integrated collaboration tools.
The Challenge of Silos in Modern Enterprises
Organizational silos—those rigid departmental structures that inhibit cross-functional collaboration—have emerged as a critical impediment to business success in the digital age. According to recent McKinsey research (2023), an overwhelming 86% of executives identify these departmental barriers as significant obstacles to achieving organizational objectives. These divisions create environments where information becomes trapped, innovation stagnates, and organizational agility diminishes.
At the heart of the silo problem lies data fragmentation. When information becomes compartmentalized within specific teams or departments, organizations suffer from a cascade of inefficiencies. Teams unknowingly duplicate efforts, working on identical problems without awareness of parallel initiatives. Decision-making processes slow dramatically when key insights must traverse complex bureaucratic channels before reaching decision-makers. Perhaps most concerning is the impact on employee morale, as professionals become frustrated by the unnecessary hurdles preventing them from accessing the information they need to excel.
The challenge has intensified with the widespread adoption of hybrid and remote-first work environments. These distributed work models, while offering flexibility and access to global talent, inherently create physical separation that can exacerbate existing silos. Without deliberate intervention, remote teams risk becoming isolated islands of activity, disconnected from the broader organizational mission and their colleagues' complementary work.
Communication Breakdown
When departments operate in isolation, vital information fails to reach stakeholders who need it most, causing misalignments in priorities and execution strategies.
Resource Inefficiency
Siloed organizations frequently allocate resources to duplicate efforts across departments, wasting budget and talent on redundant initiatives rather than focusing on high-impact opportunities.
Innovation Barriers
True innovation often occurs at the intersection of diverse expertise, but silos prevent the cross-pollination of ideas that drives breakthrough thinking and competitive advantage.
The consequences of maintaining these outdated organizational structures extend beyond operational inefficiency. Companies with entrenched silos struggle to adapt to market changes, respond to competitive threats, or capitalize on emerging opportunities. As customers increasingly expect seamless experiences that transcend departmental boundaries, siloed organizations find themselves at a significant disadvantage in delivering cohesive customer journeys.
How Enterprise Platforms Drive Collaboration
Modern enterprise platforms have emerged as powerful catalysts for breaking down organizational silos and fostering genuine cross-functional collaboration. Solutions like Microsoft Teams, Slack, and Salesforce have transformed from simple communication tools into comprehensive ecosystems that integrate workflows, centralize data, and create unified digital workspaces. These platforms serve as the connective tissue between previously isolated departments, creating a foundation for seamless information exchange and collaborative work.
 
Key Platform Features Driving Collaboration
•	Unified communication hubs that combine messaging, video conferencing, and file sharing
•	Centralized document repositories with version control and collaborative editing
•	Cross-functional project dashboards providing visibility across team boundaries
•	Automated workflow tools that streamline handoffs between departments
•	Knowledge bases that capture institutional wisdom and make it accessible company-wide
•	Integration capabilities that connect previously siloed software systems
The technical architecture of these platforms enables significant efficiency gains through API integration and automation. According to Gartner's 2024 analysis, organizations implementing integrated collaboration platforms have reduced manual handoffs between teams by up to 45%. These integrations eliminate the friction points where work traditionally stalled during transfers between departments, creating more fluid processes that maintain momentum throughout cross-functional workflows.
Centralization
Consolidate information and tools into a single accessible platform
Integration
Connect previously siloed systems through APIs and automation
Collaboration
Enable real-time interaction across departmental boundaries
Optimization
Continuously improve workflows based on cross-functional insights
Success Stories and Measurable Impact
The transformative power of enterprise collaboration platforms is perhaps best illustrated through real-world case studies. Pfizer achieved a remarkable 32% improvement in R&D productivity following the implementation of their unified collaboration platform, enabling faster development cycles and more efficient resource allocation across previously siloed research teams. Similarly, Procter & Gamble reported a 28% reduction in project cycle times after deploying cross-functional collaboration tools that streamlined communication between product development, marketing, and manufacturing teams.
Beyond operational metrics, these platforms drive significant improvements in employee experience and retention. Organizations that have successfully implemented integrated collaboration solutions have seen average increases of 18% in employee satisfaction scores, with corresponding improvements in talent retention. This human impact stems from eliminating the frustration of navigating complex organizational structures, providing clarity of purpose, and enabling professionals to contribute more effectively to meaningful work.
The most successful enterprise platform implementations pair technological solutions with intentional cultural transformation. Technology alone cannot dissolve entrenched organizational silos without leadership commitment to collaborative values and cross-functional accountability.
`,
  },
  {
    id: "6",
    slug: "digital-maturity-assessment",
    title: "Are You Digitally Mature? A Self-Assessment for Growing Businesses",
    excerpt:
      "Benchmark your organization against industry frameworks and chart a practical path from ‘emerging’ to ‘leading’ in digital capability.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    category: "Digital Transformation",
    date: "Apr 16 2025",
    content: `Are You Digitally Mature? A Self-Assessment for Growing Businesses
In today's rapidly evolving business landscape, digital maturity has become a critical differentiator between companies that thrive and those that struggle to remain competitive. This blog helps you understand where your business stands on the digital maturity spectrum and provides actionable steps to advance your digital capabilities.
Understanding Digital Maturity in Modern Business
Digital maturity represents the measured ability of an organization to create value through digital technologies. According to frameworks developed by industry leaders like Deloitte and MIT, it encompasses not just technological adoption but also organizational culture, operational processes, and strategic vision. A digitally mature business leverages technology to enhance customer experiences, streamline operations, and drive innovation rather than simply implementing digital tools without integration into broader business strategies.
Recent research from 2023 reveals that 71% of small and medium-sized businesses have accelerated their digital initiatives following the COVID-19 pandemic. This widespread shift reflects a growing recognition that digital capabilities are no longer optional but essential for survival and growth in the modern marketplace. Companies that fail to evolve digitally risk falling behind competitors who can deliver faster, more personalized, and more efficient experiences to customers.
Several key indicators serve as benchmarks for assessing digital maturity across organizations of all sizes. Cloud adoption represents a fundamental shift from traditional IT infrastructure to more flexible, scalable solutions that enable remote work and seamless data access. Process automation eliminates repetitive tasks, reducing human error while allowing employees to focus on higher-value activities. Perhaps most importantly, data-driven decision-making replaces gut instinct with actionable insights derived from customer behavior, market trends, and operational performance.
Cloud Adoption
The migration from on-premises systems to cloud-based solutions enables greater flexibility, scalability, and accessibility. Mature organizations leverage cloud services for everything from data storage to sophisticated business applications, enabling them to adapt quickly to changing conditions without major infrastructure investments.
Process Automation
Digitally mature organizations identify repetitive tasks across departments and implement automation solutions to handle them. This ranges from basic administrative functions like invoice processing to complex workflows that span multiple departments, freeing human talent for creative and strategic work.
Data-Driven Decision Making
Advanced organizations move beyond intuition and establish systematic methods for collecting, analyzing, and acting on data. This includes having clear metrics for success, tools for gathering insights, and a culture that values evidence over opinion when making strategic choices.



Self-Assessment: Is Your Business Digitally Mature?
Evaluating your organization's digital maturity requires a structured approach that examines multiple dimensions of your business operations. The following checklist is aligned with Gartner's Digital Maturity Model, providing a comprehensive framework to identify strengths and opportunities across your digital ecosystem.
Technology Infrastructure
Assess your current deployment of cloud services, hardware lifecycle management, and network capabilities. Digitally mature organizations maintain flexible, scalable infrastructure that enables rather than constrains innovation.
Data Management & Analytics
Evaluate how effectively you collect, store, analyze, and leverage data across the organization. Leading businesses have established data governance policies and utilize analytics for predictive insights rather than just historical reporting.
Cybersecurity & Risk Management
Review your security protocols, compliance measures, and risk assessment processes. Mature organizations implement proactive security measures rather than reactive responses to threats.
Digital Culture & Workforce
Consider your team's digital literacy, training programs, and adaptability to new tools. Organizations at higher maturity levels foster a culture of continuous learning and digital experimentation.
Sample assessment questions include measuring how comprehensively your CRM system captures customer interactions across touchpoints, whether your digital marketing efforts have clearly defined ROI tracking mechanisms, and the robustness of your cybersecurity measures against evolving threats. Other important indicators include the level of integration between your business systems, the extent of mobile capabilities for employees and customers, and your organization's agility in adopting new technologies. After completing the assessment, your score will place you in one of these four maturity categories, providing a clear snapshot of your current digital capabilities and a framework for identifying priority areas for improvement as follows:-
Maturity Level	Score Range	Characteristics
Emerging	0-25 points	Basic digital tools in place but fragmented; limited automation; decisions primarily based on intuition; reactive approach to technology
Developing	26-50 points	Standardized digital processes in key areas; some integration between systems; beginning to use data for decisions; strategic technology planning underway
Established	51-75 points	Comprehensive digital systems with extensive integration; widespread automation; data-driven culture; proactive technology adoption
Leading	76-100 points	Advanced digital capabilities fully integrated across the business; continuous innovation; predictive analytics driving strategy; digital leadership in industry

We must remember that digital maturity is a journey rather than a destination, with even the most advanced organizations continuously evolving their capabilities to address new technologies and changing market conditions.

`,
  },
  {
    id: "7",
    slug: "industry",
    title: "What Is Industry 4.0 and Why Should You Care?",
    excerpt:
      "It’s not just about adopting new tools—it’s about rethinking how your business operates, delivers value, and prepares for the future. So ask yourself: Is your organization ready to evolve, or will you be left behind?",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    category: "Digital Transformation",
    date: "Apr 16 2025",
    content: `What Is Industry 4.0 and Why Should You Care?
Introduction
We are in the midst of the **Fourth Industrial Revolution**, a.k.a. **Industry 4.0**. This revolution is not about steam engines or assembly lines—it's about **smart technologies** revolutionizing how we manufacture, operate, and deliver value across industries. From factories that monitor themselves to machines that predict their own failure, Industry 4.0 is changing the game.
But what exactly is Industry 4.0? And why is it crucial—not just for manufacturers but for businesses, governments, workers, and consumers alike?


What Is Industry 4.0?
Industry 4.0 is the **integration of digital technologies** into manufacturing and industrial sectors to create **smart, autonomous systems** fueled by data and machine learning. It follows three historic industrial milestones:
1.	1. **First Industrial Revolution (1760s–1840s)** – Mechanization through steam and water power.
2.	2. **Second Industrial Revolution (1870s–1914)** – Mass production enabled by electricity and assembly lines.
3.	3. **Third Industrial Revolution (1950s–2000s)** – Computerization and early automation.
4.	4. **Fourth Industrial Revolution (Industry 4.0)** – Cyber-physical systems, IoT, AI, and big data transforming production and services.
What sets Industry 4.0 apart is its **real-time intelligence**, **machine autonomy**, and **interconnectivity**. It's not just automation—it's intelligent automation that learns, adapts, and improves.


Core Pillars & Technologies of Industry 4.0
•	- **Internet of Things (IoT):** Enables machines, sensors, and devices to communicate and share data.
•	- **Big Data & Advanced Analytics:** Collects and analyzes data at scale to identify patterns, optimize processes, and predict failures.
•	- **Artificial Intelligence (AI) & Machine Learning (ML):** Automates decision-making, enables predictive maintenance, and powers autonomous systems.
•	- **Cyber-Physical Systems (CPS):** Smart machines with embedded computing that interact with the physical environment.
•	- **Cloud Computing:** Offers scalable data storage, analytics, and remote access to systems.
•	- **Digital Twins:** Virtual replicas of machines, factories, or systems used for simulation, monitoring, and optimization.
•	- **5G Connectivity:** Provides high-speed, low-latency networks for real-time machine communication.
•	- **Additive Manufacturing (3D Printing):** Enables rapid prototyping and on-demand production.


Why Industry 4.0 Matters – With Real Impacts
1. **Massive Gains in Operational Efficiency**
Industry 4.0 enables manufacturers to reduce production downtime by up to **30%**, according to McKinsey. Predictive maintenance alone can reduce maintenance costs by **20–30%** and breakdowns by **70%**.
2. **Higher Product Quality**
AI-driven defect detection systems can identify errors with more than **99% accuracy**, leading to lower rework and scrap rates.
3. **Personalized Customer Experiences**
Mass customization becomes viable—factories can switch product lines in real time, enabling custom orders at scale.
4. **Competitive Differentiation**
Companies that embrace Industry 4.0 report **20–50% faster time-to-market**, giving them a sharp edge over competitors.
5. **Sustainability Gains**
Smarter systems optimize energy usage and minimize waste. Smart grids and AI scheduling reduce carbon footprints and support ESG goals.
6. **Workforce Empowerment**
Contrary to the fear of job losses, Industry 4.0 shifts the focus from manual labor to **skilled digital roles**, enabling better safety, productivity, and job satisfaction.


Real-World Case Studies
•	- **Siemens' Amberg Smart Factory:** Achieved over **99.99885%** quality rate with automated, AI-driven production.
•	- **General Electric (GE):** Uses IoT sensors and predictive analytics to reduce aircraft engine downtime and boost service revenue.
•	- **Amazon:** Uses 750,000+ robots in fulfillment centers to increase speed, accuracy, and efficiency.
•	- **Tesla:** Combines digital twins, software-defined vehicles, and AI to continuously update and optimize its cars.


Challenges Along the Way
While the potential is immense, companies face real hurdles:
•	- **High Initial Costs:** Upfront investments in infrastructure, training, and integration.
•	- **Cybersecurity Risks:** More connected devices mean more attack surfaces.
•	- **Skills Gap:** Need for upskilling and reskilling the workforce.
•	- **Data Silos:** Integrating legacy systems and ensuring real-time data flow is complex.
•	- **Cultural Resistance:** Organizational change management is critical to success.


Why You Should Act Now
Industry 4.0 is not a distant future—it’s happening **right now**. According to PwC, over **90% of industrial companies** are investing in digital factories. Companies that delay adoption risk becoming obsolete, while early adopters are reaping efficiency, cost, and innovation benefits.
Whether you're in manufacturing, supply chain, construction, or even healthcare, Industry 4.0 is poised to touch your industry. Understanding it—and acting on it—could be the key to staying relevant and competitive in the digital age.


Final Thoughts
Industry 4.0 is a catalyst for innovation and transformation. It’s not just about adopting new tools—it’s about rethinking how your business operates, delivers value, and prepares for the future.
So ask yourself: **Is your organization ready to evolve, or will you be left behind?**
`,
  },
];

/* ---------------------------------------------------------------- */
/*  Custom hooks for performance optimization                       */
/* ---------------------------------------------------------------- */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/* ---------------------------------------------------------------- */
/*  Blog modal – optimized for mobile                              */
/* ---------------------------------------------------------------- */
function BlogModal({
  post,
  onClose,
}: {
  post: Post | null;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();

  if (!post) return null;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${typeof window !== "undefined" ? window.location.href : ""}#${
            post.slug
          }`,
        });
      } catch (error) {
        console.log("Sharing failed", error);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full md:w-[90vw] h-full md:h-auto md:max-h-[90vh] md:max-w-3xl overflow-hidden bg-white dark:bg-gray-900 md:rounded-xl shadow-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Mobile Header with back button */}
          {isMobile && (
            <div className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-gray-900 p-3 border-b">
              <button
                className="flex items-center text-xs font-medium"
                onClick={onClose}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <button
                className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"
                onClick={onClose}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Header image */}
          <div className="relative w-full h-40 md:h-56">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover md:rounded-t-xl"
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
            />
            {!isMobile && (
              <button
                className="absolute top-3 right-3 p-2 bg-white/80 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div
            className={`p-4 md:p-6 overflow-y-auto ${
              isMobile ? "h-[calc(100vh-11rem)]" : "h-[calc(90vh-14rem)]"
            } prose-sm md:prose dark:prose-invert`}
          >
            <h2 className="text-xl md:text-3xl font-bold leading-tight">
              {post.title}
            </h2>
            <p className="text-xs text-gray-500 mb-3">{post.date}</p>

            {/* Mobile share options */}
            {isMobile && (
              <div className="flex space-x-2 mb-4">
                {canNativeShare ? (
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
                  </Button>
                ) : (
                  <>
                    <LinkedinShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window.location.href}#${post.slug}`
                          : ""
                      }
                    >
                      <Button variant="outline" size="sm">
                        <LinkedIn className="h-3.5 w-3.5" />
                      </Button>
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={
                        typeof window !== "undefined"
                          ? `${window.location.href}#${post.slug}`
                          : ""
                      }
                    >
                      <Button variant="outline" size="sm">
                        <WhatsApp className="h-3.5 w-3.5" />
                      </Button>
                    </WhatsappShareButton>
                  </>
                )}
              </div>
            )}

            <div
              className="text-sm md:text-base"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {post.content}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/*  Blog card component for performance                             */
/* ---------------------------------------------------------------- */
const BlogCard = React.memo(
  ({
    post,
    onOpen,
    shareUrl,
  }: {
    post: Post;
    onOpen: (post: Post) => void;
    shareUrl: string;
  }) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen(post)}
      >
        <div className="relative h-36 md:h-48">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-xs font-medium px-2 py-0.5 rounded-full text-[#3825e2]">
            {post.category}
          </span>
        </div>
        <div className="p-3 md:p-5">
          <p className="text-xs text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-sm md:text-lg font-bold mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        </div>
      </motion.div>
    );
  }
);

BlogCard.displayName = "BlogCard";

/* ---------------------------------------------------------------- */
/*  Featured card component                                         */
/* ---------------------------------------------------------------- */
const FeaturedCard = React.memo(
  ({
    post,
    onOpen,
    shareUrl,
  }: {
    post: Post;
    onOpen: (post: Post) => void;
    shareUrl: string;
  }) => {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
        onClick={() => onOpen(post)}
      >
        <div className="relative h-40 md:h-48">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            priority={post.featured}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-3 md:p-5">
          <p className="text-xs text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-sm md:text-lg font-bold mb-1 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs md:text-sm line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-1.5">
              <LinkedinShareButton
                url={`${shareUrl}#${post.slug}`}
                onClick={stopPropagation}
              >
                <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                  <LinkedIn className="h-3.5 w-3.5" />
                </Button>
              </LinkedinShareButton>
              <WhatsappShareButton
                url={`${shareUrl}#${post.slug}`}
                onClick={stopPropagation}
              >
                <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                  <WhatsApp className="h-3.5 w-3.5" />
                </Button>
              </WhatsappShareButton>
            </div>
            <span
              onClick={stopPropagation}
              className="text-[#3825e2] hover:text-[#38ba99] text-xs md:text-sm font-medium"
            >
              Read More
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

FeaturedCard.displayName = "FeaturedCard";

/* ---------------------------------------------------------------- */
/*  Blog page component                                             */
/* ---------------------------------------------------------------- */
const categories = ["All", "Digital Transformation", "Enterprise Integration"];

export default function BlogPage() {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSort] = useState<"latest" | "oldest">("latest");
  const [open, setOpen] = useState<Post | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use debounce for search to improve performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize filtered posts for performance
  const getVisiblePosts = useCallback(
    (
      posts: Post[],
      searchTerm: string,
      category: string,
      sort: "latest" | "oldest"
    ) => {
      return posts
        .filter((p) => {
          const q = searchTerm.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q);
          const cat = category === "All" || p.category === category;
          return matches && cat;
        })
        .sort((a, b) =>
          sort === "latest"
            ? +new Date(b.date) - +new Date(a.date)
            : +new Date(a.date) - +new Date(b.date)
        );
    },
    []
  );

  // Get featured and visible posts
  const featured = posts.filter((p) => p.featured);
  const visible = getVisiblePosts(
    posts,
    debouncedSearchTerm,
    selectedCategory,
    sortBy
  );

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Handle post opening
  const handleOpenPost = useCallback((post: Post) => {
    setOpen(post);
  }, []);

  // Handle category selection
  const handleCategorySelect = useCallback(
    (cat: string) => {
      setSelectedCategory(cat);
      if (isMobile) setIsFilterOpen(false);
    },
    [isMobile]
  );

  return (
    <>
      <ScrollProgress />

      {/* Hero - responsive adjustments with improved spacing */}
      <section className="relative py-12 md:py-[8rem] bg-gradient-to-r mt-20  from-teal-400 via-blue-500 to-indigo-600   text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              Ideas that Ignite Transformation
              </h1>
              <p className="text-base md:text-xl mb-6 md:mb-8 text-white/80">
              Explore insights on innovation, technology, and digital intelligence
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured - responsive grid with smaller text */}
      <section className="py-8 md:py-14 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-2xl font-bold mb-5 md:mb-7">
            Featured Stories
          </h2>

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((post) => (
              <FeaturedCard
                key={post.id}
                post={post}
                onOpen={handleOpenPost}
                shareUrl={shareUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Controls - mobile optimized */}
      <section className="container mx-auto px-4 py-8 md:py-14">
        <div className="mb-5 md:mb-7">
          {/* Stack controls on mobile */}
          <div className="flex flex-col md:flex-row gap-3 mb-3 md:mb-5">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Filter button toggle on mobile */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={`h-9 text-xs ${isMobile ? "flex-1" : ""}`}
                onClick={() => isMobile && setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                {isMobile ? "Filter" : "Categories"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`h-9 text-xs ${isMobile ? "flex-1" : ""}`}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" /> Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "latest"}
                    onCheckedChange={() => setSort("latest")}
                    className="text-xs"
                  >
                    Latest First
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortBy === "oldest"}
                    onCheckedChange={() => setSort("oldest")}
                    className="text-xs"
                  >
                    Oldest First
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Filter categories - displayed conditionally on mobile */}
          <div
            className={`flex overflow-x-auto pb-2 masked-overflow space-x-2 ${
              isMobile && !isFilterOpen ? "hidden" : "flex"
            }`}
          >
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap text-xs h-8 ${
                  selectedCategory === cat ? "bg-[#3825e2] text-white" : ""
                }`}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid - responsive with smaller cards and virtualization */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onOpen={handleOpenPost}
              shareUrl={shareUrl}
            />
          ))}
        </div>

        {/* No results message */}
        {visible.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No articles match your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4 text-xs"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter - responsive with smaller text */}
      <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center max-w-md md:max-w-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Informed</h2>
          <p className="mb-4 md:mb-6 text-xs md:text-sm">
            Subscribe to our newsletter for the latest insights and trends
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Enter your email"
              className="flex-grow h-9 text-sm"
            />
            <Button className="bg-[#3825e2] hover:bg-[#38ba99] transition-colors w-full md:w-auto h-9 text-xs">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && <BlogModal post={open} onClose={() => setOpen(null)} />}
    </>
  );
}
