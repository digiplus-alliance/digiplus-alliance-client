import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { link } from "fs";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor?: string;
  reverse?: boolean;
  showSubtitle?: boolean;
  subtitleBg?: string;
  learnMoreText?: string;
  learnMoreColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  linkPath?: string;
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  image,
  bgColor = "bg-gray-50",
  reverse = false,
  showSubtitle = true,
  subtitleBg = "#D63A3A",
  learnMoreText = "Learn more",
  learnMoreColor = "#AD1F1F",
  titleColor = "#171616",
  descriptionColor = "#3D3A3A",
  linkPath = "#",
}: FeatureCardProps) {
  const wrapperStyle = { backgroundColor: bgColor } as React.CSSProperties;

  return (
    <div style={wrapperStyle}>
      <div
        className={`mx-auto grid md:grid-cols-2 gap-y-8 items-center`}
      >
        {/* Text Content */}
        <div
          className={`space-y-4 max-w-sm px-4 md:pl-18 py-4 ${
            reverse ? "md:order-last" : ""
          }`}
        >
          {showSubtitle && (
            <span
              className="text-white px-4 py-1 rounded-full text-xs md:text-sm font-normal"
              style={{ backgroundColor: subtitleBg }}
            >
              {subtitle}
            </span>
          )}
          <h2
            className="text-2xl font-normal my-4"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          <p style={{ color: descriptionColor }}>{description}</p>
          <a
            href={linkPath || "#"}
            className="inline-flex items-center font-normal hover:underline"
            style={{ color: learnMoreColor }}
          >
            {learnMoreText}{" "}
            <ArrowRight className="w-4 h-4 ml-1" stroke="currentColor" />
          </a>
        </div>

        {/* Image */}
        <div
          className={`relative w-full h-64 md:h-96 md:mb-12 overflow-hidden ${
            reverse ? "md:order-first" : ""
          }`}
        >
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
