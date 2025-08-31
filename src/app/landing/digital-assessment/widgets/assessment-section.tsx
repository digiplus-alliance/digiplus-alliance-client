import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function AssessmentSection() {
  return (
  <section className="w-full py-12 md:py-24 px-4 md:px-0">
      <div className="mx-auto max-w-6xl px-4">
  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
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
            <div className="mt-6 md:mt-0 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
              <p className="text-[#5E5B5B]">
                You can't grow what you don't measure. Let's help you move from
                hustle to structure — the digital way.
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
            </div>
            <div className="mt-8 justify-left gap-4">
              <Button className="px-6" size="lg">
                Take the Digital Maturity Assessment Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}