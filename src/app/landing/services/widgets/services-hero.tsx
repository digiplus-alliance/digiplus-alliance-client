import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative w-full h-full max-h-[40rem] lg:h-[76vh] flex items-center">
      {/* Background image */}
      <Image
        src="/digital-assessment/digital-assessment-hero.png"
        alt="DigiPlus Services Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
            Explore What Digiplus Can Do for You
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-[#FFEBEB]">
            We’re your one-stop-shop for digital transformation built to help you grow smarter, faster, and stronger.
          </p>
        </div>
      </div>
    </section>
  );
}
