'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface PricingProps {
  label?: string;
  price?: string;
  note?: string;
  desc?: string;
}

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

type LayoutType = "default" | "balanced";

interface SectionProps {
  title?: string;
  titleColor?: string;
  items?: (string | React.ReactNode)[];
  pricing?: PricingProps;
  image?: string | React.ReactNode;
  reverse?: boolean;
  children?: React.ReactNode;
  listChildren?: React.ReactNode;
  background?: string;
  button?: ButtonProps;
  layout?: LayoutType;
  imageHeight?: string;
}

const InfoSection: React.FC<SectionProps> = ({
  title,
  titleColor = "#0E5F7D",
  items,
  pricing,
  image,
  reverse = false,
  children,
  listChildren,
  background,
  button,
  layout = "default",
  imageHeight,
}) => {
  const textWidth = layout === "balanced" ? "md:w-1/2" : "md:w-3/5";
  const imageWidth = layout === "balanced" ? "md:w-1/2" : "md:w-2/5";
  const router = useRouter()
  return (
    <section
      className={`w-full py-10 px-4 md:px-8 lg:pl-28 lg:pr-10 md:py-18 ${background}`}
    >
      <div
        className={`flex flex-col items-center gap-8 md:flex-row ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } ${layout === "balanced" ? "md:gap-20 gap-10" : "md:gap-0"}`}
      >
        {/* Left Content */}
        <div className={`${textWidth} space-y-6`}>
          {title && (
            <h2
              className={`text-2xl md:text-4xl font-semibold text-[${titleColor}]`}
            >
              {title}
            </h2>
          )}

          {/* Items List */}
          {items && (
            <ul className="space-y-4 text-[#5E5B5B] list-none">
              {listChildren}
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>
                    <IoCheckmarkDoneCircleOutline className="w-5 h-5 mr-1 text-[#227C9D] flex-shrink-0" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {/* Extra Content */}
          {children}

          {/* Pricing */}
          {pricing && (
            <div className="pt-6">
              <h3 className="text-xl md:text-3xl py-2 text-[#171616] font-normal">
                Pricing
              </h3>
              <p className="text-3xl font-bold text-[#D63A3A] items-center md:flex">
                {pricing.price} <span className="text-xs text-[#5E5B5B] font-medium">{pricing.desc}</span>
              </p>
              {pricing.note && (
                <p className="text-xs text-[#5E5B5B] md:w-1/2">
                  {pricing.note}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className={`${imageWidth} flex justify-center`}>
          {typeof image === "string" ? (
            <Image
              src={image}
              alt="Section visual"
              width={600}
              height={400}
              className={`w-full rounded-lg object-cover ${
                imageHeight
                  ? imageHeight
                  : layout === "balanced"
                  ? "h-56 md:h-72"
                  : "h-auto"
              }`}
            />
          ) : (
            image
          )}
        </div>
      </div>

      {/* Button */}
      {button && (
        <div className="pt-6 justify-center flex my-4 md:my-8 mx-8 md:mx-0">
          <Button
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-base"
            size="lg"
            onClick={() => router.push("/auth/login")}
          >
            {button.label}
          </Button>
        </div>
      )}
    </section>
  );
};

export default InfoSection;
