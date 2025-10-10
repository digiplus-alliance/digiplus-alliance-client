import Image from "next/image";

export default function OurPartners() {
  return (
    <div className="py-8 px-6 md:px-4 text-center mx-auto max-w-4xl">
      <div>
        <h3 className="text-[#171616] font-medium text-2xl md:text-4xl">
          Our Partners
        </h3>
        <p className="text-[#5E5B5B] mt-2">
          We collaborate with industry leaders to drive innovation.
        </p>
      </div>

      <div className="mt-8 space-y-12 items-center md:items-start flex flex-col justify-center md:justify-start">
        {/* Consortium Lead */}
        <div className="flex flex-col sm:flex-row sm:items-center  gap-3 md:gap-6">
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            <p className="text-[#5E5B5B] text-base md:text-2xl font-medium">Consortium Lead</p>
          </div>

          <div className="flex items-center gap-3 sm:flex-nowrap mt-2 sm:mt-0">
            <div className="w-30 h-18">
              <Image
                src="/partners-logo/8thGear.png"
                alt="Consortium Lead logo"
                layout="responsive"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Consortium Partners */}
        <div className="flex flex-col sm:flex-row sm:items-center  gap-3 md:gap-6">
          <div className="flex items-center gap-2  sm:flex-shrink-0">
            <p className="text-[#5E5B5B] text-base text-center md:text-2xl font-medium">Consortium Partners</p>
          </div>

          <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
            <div className="w-20 h-20">
              <Image
                src="/partners-logo/futa.png"
                alt="FUTA logo"
                layout="responsive"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-20 h-20">
              <Image
                src="/partners-logo/sterlin.svg"
                alt="Sterlin logo"
                layout="responsive"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="w-20 h-20">
              <Image
                src="/partners-logo/sme.png"
                alt="SME logo"
                layout="responsive"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="w-28 h-28">
              <Image
                src="/partners-logo/inkeeper.svg"
                alt="Inkeeper logo"
                layout="responsive"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Technical Partners */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            <p className="text-[#5E5B5B] text-base md:text-2xl font-medium">Technical Partners</p>
          </div>

          <div className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
            <div className="w-15 h-15">
              <Image
                src="/partners-logo/mtn.svg"
                alt="MTN logo"
                layout="responsive"
                width={96}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="w-15 h-15">
              <Image
                src="/partners-logo/zoho.svg"
                alt="Zoho logo"
                layout="responsive"
                width={96}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="w-15 h-15">
              <Image
                src="/partners-logo/square.svg"
                alt="Square logo"
                layout="responsive"
                width={96}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Supporters */}
        <div className="flex flex-col sm:flex-row sm:items-center  gap-3 md:gap-6">
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            <p className="text-[#5E5B5B] text-base md:text-2xl font-medium">Supporters</p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:flex-nowrap mt-2 md:my-10 sm:mt-0">
            <div className="w-60 md:w-96 h-20">
              <Image
                src="/partners-logo/group.svg"
                alt="GIZ logo"
                layout="responsive"
                width={10500}
                height={480}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
