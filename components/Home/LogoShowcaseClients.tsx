// components/LogoShowcaseClients.tsx
"use client";
import Image from "next/image";
import { IconType, logoIconsClients } from "../../constants";

interface LogoIconProps {
  icon: IconType;
}

const LogoIcon: React.FC<LogoIconProps> = ({ icon }) => (
  <div className="flex-shrink-0 w-40 h-16 flex justify-center items-center logo-item mr-12">
    <Image
      src={icon.imgPath}
      alt={icon.name}
      width={180}
      height={60}
      className="object-contain opacity-90 hover:opacity-100 transition duration-300"
    />
  </div>
);

const LogoShowcaseClients: React.FC = () => (
  <div className="overflow-hidden relative pb-[6rem]">
    
    <div
      className="flex animate-scroll-marquee"
      style={{ animationDirection: "reverse" }}
    >
      {[...logoIconsClients, ...logoIconsClients].map((icon, i) => (
        <LogoIcon key={i} icon={icon} />
      ))}
    </div>
  </div>
);

export default LogoShowcaseClients;
