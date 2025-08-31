import Image from "next/image";
import DigitalAssessmentHero from "./widgets/digital-assessment-hero";
import AssessmentSection from "./widgets/assessment-section";

export default function DigitalAssessmentPage() {
  return (
    <div>
      <DigitalAssessmentHero />
      {/* Know where you stand  */}
      <section className="w-full py-20 px-8 md:px-0">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 space-x-8 md:gap-12">
            {/* Text column */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl text-[#171616] font-medium text-center md:text-left">
                Know where you stand
              </h2>

              <div className="mt-6 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
                <p>
                  Grow where it matters. Whether you're running a physical shop,
                  growing a delivery business, or managing your team on
                  WhatsApp, every business today needs digital structure to
                  thrive.
                </p>
              </div>
            </div>

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
          </div>
        </div>
      </section>

      {/* Our Approach  */}
      <section className="w-full py-20 px-8 md:px-0 bg-[#FFFFFF]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 space-x-8 md:gap-12">
            {/* Text column */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-4xl text-[#171616] font-medium text-center md:text-left">
                Our Approach
              </h2>

              <div className="mt-6 prose prose-sm md:prose-base max-w-none text-[#5E5B5B]">
                <p>
                  Our Digital Maturity Assessment Tool helps you figure out
                  where your business is on the digital journey and gives you a
                  clear, personalised roadmap to grow smarter, faster, and
                  stronger. This is not a test you can fail. It's a practical
                  self-check to help you plan smarter not guess.
                </p>
                <p>
                  Note: We don’t collect personal or sensitive data. Your
                  responses are used only to guide you, and in anonymized format
                  to improve our support to MSMEs like yours. Your business,
                  your data, your pace.
                </p>
              </div>
            </div>

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
          </div>
        </div>
      </section>

      {/* Digital assessment  */}
      <AssessmentSection />
    </div>
  );
}