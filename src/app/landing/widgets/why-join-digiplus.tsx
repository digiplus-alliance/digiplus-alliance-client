import Image from "next/image";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function WhyJoinDigiplus() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image column */}
          <div className="w-full md:w-1/2">
            <Image
              src="/why-join-digiplus.png"
              alt="Why Join Digiplus"
              width={900}
              height={560}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text column */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-4xl text-[#3D3A3A] font-normal text-left">
              Why Join <span className="text-[#D63A3A]">Digiplus</span>?
            </h2>

            <div className="mt-6 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
              <p className="text-[#D63A3A]">No Matter What You Do, Digiplus is Built for You.</p>
              <p>
                Whether you&apos;re a trader in need of structure, a transporter
                trying to go digital, a startup chasing growth, or a growing
                MSME looking for stability, we&apos;re here for you.
              </p>

              <ul className="mt-4 space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#D63A3A] flex-shrink-0" />
                  <span>
                    <strong>Hands-on Digital Skills Training</strong> – Learn what
                    really moves the needle.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#D63A3A] flex-shrink-0" />
                  <span>
                    <strong>Affordable Digital Tools & Infrastructure</strong> –
                    Website, emails, and more.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#D63A3A] flex-shrink-0" />
                  <span>
                    <strong>Access to Finance</strong> – Know your funding options
                    and how to get them.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#D63A3A] flex-shrink-0" />
                  <span>
                    <strong>Business Growth & Advisory</strong> – Strategies,
                    support, and real-world guidance.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
