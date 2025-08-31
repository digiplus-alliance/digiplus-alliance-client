import Image from "next/image";

export default function OurApproach() {
  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image column */}
          <div className="w-full md:w-1/2">
            <Image
              src="/placeholder-one.png"
              alt="Placeholder"
              width={900}
              height={560}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text column */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl text-[#171616] font-medium text-center md:text-left">
              Our Approach
            </h2>

            <div className="mt-6 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
              <p>
                We operate through a collaborative consortium model, bringing
                together ecosystem builders, training providers, technical
                experts, and funders. Together, we deliver hands-on, high-impact
                programs that solve real business challenges and unlock
                sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
