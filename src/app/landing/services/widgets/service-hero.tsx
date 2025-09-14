import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ServiceHeroProps {
  bannerText: string;
  title: string;
  description: string[];
  buttonText: string;
  buttonLink?: string;
  mainImage: string;
  sideImages?: string[];
  subtitle?: string;
}

export default function ServiceHero({
  bannerText,
  title,
  description,
  buttonText,
  mainImage,
  sideImages = [],
  subtitle = "",
}: ServiceHeroProps) {
  return (
    <section className="py-6 px-4 relative overflow-hidden">
      <div>
        <div className="absolute left-0 right-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-56 sm:w-80 md:w-96 lg:w-[900px] opacity-90">
            <Image
              src="/services/wormhole_tunnel.png"
              alt="Services background"
              width={1500}
              height={860}
              className="w-full h-auto object-cover rounded-lg mx-auto"
              priority
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Banner */}
          <div className="mb-6">
            <span className="inline-block bg-[#0E5F7D] text-white px-6 py-2 rounded-full text-xs md:text-sm font-medium">
              {bannerText}
            </span>
          </div>

          {/* Title */}
          <div className="py-2 mb-4">
            <h1 className="text-2xl md:text-3xl  lg:text-4xl font-normal text-[#171616]">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#5E5B5B]">{subtitle}</p>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6 md:text-[#5E5B5B] text-[#373737] text-base md:text-xl max-w-3xl mx-auto">
            {description.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>

          {/* CTA Button */}
          <Button className="px-8 py-2 mt-6">{buttonText}</Button>
        </div>
      </div>

      {/* Images Section */}
      <div className="mt-24 relative flex justify-center max-w-7xl mx-auto">
        {/* Main Image */}
        <div className="relative w-full max-w-3xl h-64 md:h-96 rounded-xl overflow-hidden z-0">
          <Image src={mainImage} alt={title} fill className="object-cover" />
        </div>

        {/* Optional Side Images */}
        {sideImages.length > 0 && (
          <>
            {/* Left Image */}
            {sideImages[0] && (
              <div className="absolute left-2 sm:left-4 md:left-40 top-1/2 md:top-2/3 transform -translate-y-1/2 w-24 sm:w-40 md:w-52 h-20 sm:h-28 md:h-32 rounded-lg overflow-hidden shadow-lg z-10">
                <Image
                  src={sideImages[0]}
                  alt="Side Image 1"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {/* Right Image */}
            {sideImages[1] && (
              <div className="absolute right-[-20px] sm:right-40 md:right-40 top-1/2 transform -translate-y-1/2 w-24 sm:w-36 md:w-40 h-24 sm:h-40 md:h-48 rounded-lg overflow-hidden shadow-lg z-10">
                <Image
                  src={sideImages[1]}
                  alt="Side Image 2"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
