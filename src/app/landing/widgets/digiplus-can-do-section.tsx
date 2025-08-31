import { FC } from "react";
import { cn } from "@/lib/utils";
import { PiPersonArmsSpreadThin } from "react-icons/pi";

interface CardProps {
  title: string;
  description: string;
  color: "blue" | "green" | "red" | "gray";
}

const colorMap = {
  blue: "border-[#69B4CF] text-[#0E5F7D]",
  green: "border-[#2A9D8F] text-[#117D70]",
  red: "border-[#FF7878] text-[#D63A3A]",
  gray: "border-[#8F8F8F] text-[#3D3A3A]",
};

const Card: FC<CardProps> = ({ title, description, color }) => {
  return (
    <div
      className={cn(
        "group flex flex-col items-start p-6 rounded-xl border bg-white shadow-sm transition-transform duration-200 ease-out hover:shadow-2xl hover:-translate-x-1",
        colorMap[color]
      )}
    >
      {/* icon */}
      <div className="mb-4">
        <PiPersonArmsSpreadThin
          className={cn(
            "w-8 h-8 rounded-full p-2 transition-colors",
            color === "blue" && "text-[#0E5F7D] bg-[#EBFBFF] group-hover:bg-[#D1EEFC]",
            color === "green" && "text-[#117D70] bg-[#E6FCF5] group-hover:bg-[#B2E4E0]",
            color === "red" && "text-[#D63A3A] bg-[#FFE5E5] group-hover:bg-[#EBFBFF]",
            color === "gray" && "text-[#3D3A3A] bg-[#F5F5F5] group-hover:bg-[#EBEBEB]"
          )}
        />
      </div>
      {/* title */}
      <h3
        className={cn(
          "text-base md:text-lg font-medium mb-2",
          color === "blue" && "text-[#0E5F7D]",
          color === "green" && "text-[#117D70]",
          color === "red" && "text-[#D63A3A]",
          color === "gray" && "text-[#3D3A3A]"
        )}
      >
        {title}
      </h3>
      {/* description */}
      <p className="text-xs md:text-sm text-[#5E5B5B] font-normal">{description}</p>
    </div>
  );
};

export default function DigiplusCanDoCards() {
  const cards: CardProps[] = [
    {
      title: "Ecosystem Building",
      description:
        "Helping MSMEs connect, collaborate, and grow through a thriving support network.",
      color: "blue",
    },
    {
      title: "Skills & Investment Readiness Training",
      description:
        "Programs like DSE (Digital Skills for Entrepreneurs) and MIRE help you learn fast and grow smart.",
      color: "green",
    },
    {
      title: "Access to Finance",
      description:
        "Learn how to structure your business for funding and connect to real financial opportunities.",
      color: "red",
    },
    {
      title: "Digital Infrastructure / Tools",
      description:
        "Get the tools and support you need to bring your business online and compete digitally.",
      color: "gray",
    },
    {
      title: "Market and Policy Insight",
      description:
        "Conducts needs assessments and research to inform policy, ensuring interventions are data-driven.",
      color: "blue",
    },
    {
      title: "Research Commercialisation",
      description:
        "Provides spaces for academia to innovate, co-create with tech experts, and solve real problems.",
      color: "red",
    },
  ];

  return (
    <section className="w-full py-12">
      <h3 className="text-2xl md:text-4xl text-[#3D3A3A] font-normal text-center mb-8">
        Explore What <span className="text-[#D63A3A]">Digiplus</span> Can Do for You
      </h3>
      <div className="mx-auto max-w-6xl px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
