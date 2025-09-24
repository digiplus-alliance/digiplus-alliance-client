import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface FeatureCardProps {
  title: string;
  description: string | string[];
  image: string;
  reverse?: boolean;
  button?: ButtonProps;
}

export default function Value({
  title,
  description,
  image,
  reverse = false,
  button,
}: FeatureCardProps) {
  return (
    <div className="my-20 md:my-28">
      <div
        className={`mx-auto grid md:grid-cols-2 gap-y-8 items-center bg-[#5C0000]   overflow-hidden `}
      >
        {/* Text Content */}
        <div
          className={`space-y-4 max-w-lg px-4 md:pl-18 py-4 ${
            reverse ? "md:order-last" : ""
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-normal my-4 text-white">
            {title}
          </h2>
          {Array.isArray(description) ? (
            <ul className="space-y-3 text-[#D6D4D4]">
              {description.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-[#D63A3A] mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#D6D4D4]">{description}</p>
          )}
        </div>

        {/* Image */}
        <div
          className={`relative w-full h-64 md:h-96 overflow-hidden ${
            reverse ? "md:order-first" : ""
          }`}
        >
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Button */}
      </div>
      {button && (
        <div className="pt-6 justify-center flex my-4 md:my-8 mx-8 md:mx-0">
          <Button
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-base"
            size="lg"
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        </div>
      )}
    </div>
  );
}
