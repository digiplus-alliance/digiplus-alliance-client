import Image from "next/image";

export default function OurMission() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center space-x-4">
          {/* Left column: heading + mission text */}
          <div className="w-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl text-[#171616] font-medium text-left md:text-left">
              Our Mission
            </h2>

            <div className="mt-6 md:pr-18 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
              <p>
                To drive inclusive digital adoption across Nigeria by empowering
                MSMEs with the tools, skills, and support they need to grow,
                compete, and thrive in today’s economy.
              </p>
            </div>
          </div>

          {/* Right column: Side A (single full image) on top of grid with B and C D E */}
          <div className="w-full flex flex-row space-x-4">
            <div className="w-1/2">
              <Image
                src="/about/about-misson-one.png"
                alt="Our mission image"
                width={1000}
                height={700}
                className="w-full h-72 md:h-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="grid gap-4 w-1/2">
              <div>
                <Image
                  src="/about/about-mission-two.png"
                  alt="Feature image"
                  width={600}
                  height={3000}
                  className="w-full h-48 md:h-56 rounded-lg shadow-lg object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Image
                  src="/about/about-mission-three.png"
                  alt="Thumb 1"
                  width={600}
                  height={360}
                  className="w-full h-28 md:h-36 rounded-lg shadow-md object-cover"
                />
                <Image
                  src="/about/about-mission-four.png"
                  alt="Thumb 2"
                  width={600}
                  height={360}
                  className="w-full h-28 md:h-36 rounded-lg shadow-md object-cover"
                />
                <Image
                  src="/about/about-mission-five.png"
                  alt="Thumb 3"
                  width={600}
                  height={360}
                  className="w-full h-28 md:h-36 rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
