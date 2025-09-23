import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function AssessmentSection() {
  return (
    <section className="w-full py-4 md:py-24">
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
            <div className="mt-6 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
              <p>
                You can&apos;t grow what you don&apos;t measure. Let&apos;s help you move from
                hustle to structure — the digital way.
              </p>
              <p>
                Let&apos;s help you move from hustle to structure — the digital way.
              </p>
              <p className="mt-4">This quick self-assessment will help you:</p>

              <ul className="mt-4 space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#227C9D] flex-shrink-0" />
                  <span>
                    <p>Understand your digital strengths and gaps</p>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#227C9D] flex-shrink-0" />
                  <span>
                    <p>Get personalized service recommendations</p>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <IoCheckmarkDoneCircleOutline className="w-5 h-5 mt-1 text-[#227C9D] flex-shrink-0" />
                  <span>
                    <p>Build a smarter plan for growth</p>
                  </span>
                </li>
              </ul>

              <Button
                className="w-full sm:w-auto px-6 py-3 my-4 text-xs sm:text-base"
                size="lg"
              >
                Take the Digital Maturity Assessment Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
