import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-full max-h-[40rem] lg:h-[76vh] flex items-center">
      {/* Background image */}
      <Image
        src="/about/about-hero.png"
        alt="DigiPlus About Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
            About Digiplus Alliance
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-[#FFEBEB]">
            Your One-Stop Shop for Digital Transformation
          </p>

          <p className="mt-6 text-[#EBEBEB] text-base sm:text-lg md:text-xl leading-relaxed">
            Digiplus Alliance is a bold digital innovation hub created to enable
            <strong> MSMEs </strong> across <strong> Southwest Nigeria </strong> with the tools, training, and support
            they need to grow, digitally and sustainably. Led by <a href="https://www.8thgearpartners.com/" target="_blank" rel="noopener noreferrer"><strong>8thGear Hub & Venture Studio</strong></a>,
            Digiplus brings together mission-aligned partners to provide real,
            practical solutions that help businesses not just survive, but scale,
            leveraging digital technology.
          </p>
        </div>
      </div>
    </section>
  );
}
