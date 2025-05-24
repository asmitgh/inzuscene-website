"use client";
import Image from "next/image";
import { IconType, logoIconsPartners } from "../../constants"; // Make sure paths match

interface LogoIconProps {
  icon: IconType;
}

const LogoIcon: React.FC<LogoIconProps> = ({ icon }) => {
  return (
    <div className="flex-shrink-0 w-40 h-16 flex justify-center items-center logo-item mr-12">
      <Image
        src={icon.imgPath}
        alt={icon.name}
        width={120}
        height={40}
        className="object-contain opacity-90 hover:opacity-100 transition duration-300"
      />
    </div>
  );
};

const LogoShowcasePartners: React.FC = () => (
  <div className="overflow-hidden relative pb-[3rem]">
    <h2 className="text-3xl md:text-5xl font-bold text-center my-15  pt-2 pb-10">
      <span className="bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600    text-[40px] leading-[40px] font-[500]">
        Our Partners & Customers
      </span>
    </h2>
    <div className="flex animate-scroll-marquee ">
      {[...logoIconsPartners, ...logoIconsPartners].map((icon, index) => (
        <LogoIcon key={`logo-${index}`} icon={icon} />
      ))}
    </div>
  </div>
);

export default LogoShowcasePartners;

// "use client";
// import Image from "next/image";
// import { IconType, logoIconsPartners } from "../constants"; // Make sure paths match

// interface LogoIconProps {
//   icon: IconType;
// }

// const LogoIcon: React.FC<LogoIconProps> = ({ icon }) => {
//   return (
//     <div className="flex-shrink-0 w-40 h-16 flex justify-center items-center logo-item mr-12">
//       <Image
//         src={icon.imgPath}
//         alt={icon.name}
//         width={120}
//         height={40}
//         className="object-contain opacity-90 hover:opacity-100 transition duration-300"
//       />
//     </div>
//   );
// };

// const LogoShowcasePartners: React.FC = () => (
//   <div className="overflow-hidden relative pb-[6rem] ">
//     <h2 className="text-3xl md:text-5xl font-bold text-center my-15 bg-clip-text text-transparent bg-gradient-to-r   from-teal-400 via-blue-500 to-indigo-600    py-2">
//       Trusted by Leading Brands
//     </h2>
//     <div className="flex animate-scroll-marquee">
//       {[...logoIconsPartners, ...logoIconsPartners].map((icon, index) => (
//         <LogoIcon key={`logo-${index}`} icon={icon} />
//       ))}
//     </div>
//   </div>
// );

// export default LogoShowcasePartners;
