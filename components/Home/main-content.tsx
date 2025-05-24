"use client";

import Link from "next/link";
import { useState, useRef, MouseEvent, ReactNode } from "react";
import { TiLocationArrow } from "react-icons/ti";
import styles from "./MainContent.module.css";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relX = (e.clientX - left) / width;
    const relY = (e.clientY - top) / height;
    const tiltX = (relY - 0.5) * 5;
    const tiltY = (relX - 0.5) * -5;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`
    );
  };

  return (
    <div
      ref={itemRef}
      className={`${styles.bentoTilt} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
  isComingSoon?: boolean;
  learnMoreUrl?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  src,
  title,
  description,
  isComingSoon,
  learnMoreUrl,
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div className={styles.bentoCard}>
      <img
        src={src}
        alt={typeof title === "string" ? title : ""}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <div>
          <h2 className={styles.cardTitle}>{title}</h2>
          {description && <p className={styles.cardDesc}>{description}</p>}
        </div>
        {isComingSoon && learnMoreUrl && (
          <Link
            href={learnMoreUrl}
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-white border-2 border-black-100 px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity,
                background: `radial-gradient(100px circle at ${pos.x}px ${pos.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className={styles.arrowIcon} />
            <span className={styles.learnText}>Learn More</span>
          </Link>
        )}
      </div>
    </div>
  );
};

const MainContent: React.FC = () => (
  <section className={styles.root}>
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-[40px] leading-[60px] font-[500]">
          Shaping Enterprise Future Through Intelligent Transformation
        </span>
        <p className="text-[18px] leading-[29px] pt-5">
          Unlock competitive advantage with intelligence-led infrastructure,
          seamless integrations, and agile enterprise architecture.
        </p>
      </div>

      <BentoTilt className={styles.mainTilt}>
        <BentoCard
          src="videos/feature-1.webp"
          title="ERP, FSM & ESM"
          description="E2E Implementation Services - IFS, Oracle, Odoo, Specialized HR Tech/Talent Management, CRIM Development, Support & Maintenance"
          isComingSoon
          learnMoreUrl="/services#enterprise-solutions"
        />
      </BentoTilt>

      <div className={styles.grid}>
        <BentoTilt className={styles.tilt1}>
          <BentoCard
            src="videos/feature-2.webp"
            title="Cloud Services"
            description="Cloud migrations build future applications with cloud features and alignment with emerging trends. Migrate to AWS for managed search, data, and analytics."
            isComingSoon
            learnMoreUrl="/services#cloud-infrastructure"
          />
        </BentoTilt>

        <BentoTilt className={styles.tilt1}>
          <BentoCard
            src="videos/feature-3.webp"
            title="Cyber Security"
            description="Compliance – PCI-DSS, HIPAA, EU Data Protection and Audit Capabilities. Data Protection with Identity & Access Management, Security Assessments and Managed Services."
            isComingSoon
            learnMoreUrl="/services#others"
          />
        </BentoTilt>

        <BentoTilt className={styles.tilt1}>
          <BentoCard
            src="videos/img.png"
            title="Business Consulting Services"
            description="Business Process Re-engineering & Landscape Design. Process Consulting Aligning business processes with best practices."
            isComingSoon
            learnMoreUrl="/services#others"
          />
        </BentoTilt>

        {/* <BentoTilt className={styles.tilt2} >
          <div className={styles.textCard}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600   text-[30px] leading-[45px]">
              Other Services
            </span>
            <p className={styles.textCardDesc}>
              Technology Services Business Landscape Server maintenance
              (Oracle/SQL) Health Checks & Performance tuning Linux & Windows
              maintenance Training
            </p>
            <Link href="/services#others">
              <TiLocationArrow className={styles.textCardArrow} />
            </Link>
          </div>
        </BentoTilt> */}

        <BentoTilt className={styles.tilt2}>
          <BentoCard
            src="videos/feature-7.jpg"
            title="Other Services"
            description="Technology Services Business Landscape Server maintenance
              (Oracle/SQL) Health Checks & Performance tuning Linux & Windows
              maintenance Training"
            isComingSoon
            learnMoreUrl="/services#others"
          />
        </BentoTilt>
        <BentoTilt className={styles.tilt2}>
          <BentoCard
            src="videos/feature-5.webp"
            title="Managed Services"
            description="Upgrades & Data Migration Mods/Integrations Support including customer helpdesk Cloud Hosting & Maintenance System Administration"
            isComingSoon
            learnMoreUrl="/services#low-code-solutions"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default MainContent;