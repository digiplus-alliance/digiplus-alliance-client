"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FocusCardProps {
  number: string;
  title: string;
  description: string;
}

const FocusCard = ({ number, title, description }: FocusCardProps) => (
  <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-[#FF5C5C] font-extrabold text-4xl mb-3">{number}</div>
    <h3 className="text-[#0E5F7D] font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-[#5E5B5B]">{description}</p>
  </div>
);

export default function NeedsAssessmentLanding() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative w-full min-h-[20rem] md:min-h-[20rem] flex items-center justify-center 
                          bg-gradient-to-br from-[#0a4a5e] to-sky-700 shadow-xl"
      >
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-12 text-center flex flex-col items-center justify-center">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#EBFBFF] font-extrabold leading-tight tracking-tight drop-shadow-md">
              DIGITAL TRANSFORMATION NEEDS ASSESSMENT
            </h2>

            <p className="mt-4 text-xl sm:text-2xl text-[#EBFBFF] font-medium leading-relaxed drop-shadow-sm">
              for MSMEs in Southwest Nigeria's Trade, Transport & Logistics
              Sectors
            </p>

            <p className="mt-6 text-base sm:text-lg text-white/90 italic drop-shadow-sm">
              Understanding the digital transformation landscape
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#EBFBFF]">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl text-[#171616] font-semibold mb-6">
              About This Assessment
            </h2>
            <p className="text-base md:text-lg text-[#5E5B5B] leading-relaxed">
              This comprehensive needs assessment examines the current state of
              digital adoption among Micro, Small, and Medium Enterprises
              (MSMEs) in Southwest Nigeria. Our findings provide valuable
              insights into the challenges, opportunities, and pathways for
              digital transformation in the region.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-[#171616] font-bold text-center mb-8">
              Available Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-[#0E5F7D] rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#EBFBFF] rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#0E5F7D]" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl text-[#171616] font-bold text-center mb-4">
                  Full Needs Analysis Report
                </h3>

                <p className="text-[#5E5B5B] text-center mb-6 leading-relaxed">
                  Access the complete assessment report with detailed findings,
                  analysis, and recommendations for MSME digital transformation.
                </p>

                <div className="flex justify-center">
                  <a
                    href="https://docsend.com/view/3yem9dcmv8dzbw2j"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 bg-[#FF5C5C] text-black px-6 py-3 text-sm rounded-lg font-medium hover:bg-[#e54c4c] transition-colors duration-200 shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    View Report
                  </a>
                </div>
              </div>

              <div className="bg-white border-2 border-[#0E5F7D] rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#EBFBFF] rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-[#0E5F7D]" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl text-[#171616] font-bold text-center mb-4">
                  Needs Analysis Factsheet
                </h3>

                <p className="text-[#5E5B5B] text-center mb-6 leading-relaxed">
                  A concise overview of key statistics, insights, and highlights
                  from the needs assessment
                </p>

                <div className="flex justify-center">
                  <a
                    href="https://docsend.com/view/mmjjm462nznqfimu"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 bg-[#FF5C5C] text-black px-6 py-3 text-sm rounded-lg font-medium hover:bg-[#e54c4c] transition-colors duration-200 shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    View Factsheet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#EBFBFF]">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-[#171616] font-bold text-center mb-8">
              Key Focus Areas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <FocusCard
                number="01"
                title="Digital Tool Usage"
                description="Current state of technology adoption & digital infrastructure."
              />
              <FocusCard
                number="02"
                title="Obstacles & Barriers"
                description="Primary challenges hindering MSMEs' digital transformation."
              />
              <FocusCard
                number="03"
                title="Support Needs"
                description="Specific requirements for skills, finance, and infrastructure."
              />
              <FocusCard
                number="04"
                title="Digital Readiness"
                description="Assessment of current readiness and actionable recommendations."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#ffffff">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl text-black font-semibold mb-4">
              Have Questions About the Assessment?
            </h2>
            <p className="text-[#000000] mb-8 text-base md:text-lg">
              Get in touch with us to learn more about our findings and how we
              can support your digital transformation journey.
            </p>
            <Button
              //   variant="outline"
              className="inline-flex items-center justify-center gap-2 bg-[#FF5C5C] text-black px-8 py-6 text-sm rounded-lg font-medium hover:bg-[#e54c4c] transition-colors duration-200 shadow-lg"
              onClick={() => router.push("/landing/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
