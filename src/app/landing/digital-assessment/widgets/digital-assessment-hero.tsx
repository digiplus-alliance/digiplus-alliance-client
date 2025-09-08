// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function DigitalAssessmentHero() {
//   return (
//     <section className="relative w-full min-h-[60vh] lg:h-[76vh] max-h-[40rem] flex items-center">
//       {/* Background image */}
//       <Image
//         src="/digital-assessment/digital-assessment-hero.png"
//         alt="DigiPlus Digital Assessment Hero"
//         fill
//         className="object-cover max-h-[40rem]"
//         priority
//       />

//       {/* Content */}
//       <div className="relative z-10 w-full px-2 sm:px-4 md:px-6 lg:px-10 py-8 md:py-12 flex items-center justify-center max-h-[40rem]">
//         <div className="w-full max-w-3xl text-center mx-auto">
//           <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight px-1">
//             How Digitally Ready Is Your Business?
//           </h1>

//           <p className="mt-4 text-xs xs:text-sm sm:text-base md:text-lg font-medium text-[#FFEBEB] px-1">
//             Take the Digiplus Digital Maturity Assessment Tool (DMAT)
//           </p>

//           <div className="mt-8 flex justify-center">
//             <Button className="w-full sm:w-auto px-6 py-3 text-xs sm:text-base" size="lg">
//               Take the Digital Maturity Assessment Test
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DigitalAssessmentHero() {
  return (
    <section className="relative w-full h-full max-h-[40rem] lg:h-[76vh] flex items-center">
      {/* Background image */}
      <Image
        src="/digital-assessment/digital-assessment-hero.png"
        alt="DigiPlus Digital Assessment Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
            How Digitally Ready Is Your Business?
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-[#FFEBEB]">
            Take the Digiplus Digital Maturity Assessment Tool (DMAT)
          </p>

          <Button
            className="w-full sm:w-auto px-6 py-3 my-4 text-xs sm:text-base"
            size="lg"
          >
            Take the Digital Maturity Assessment Test
          </Button>
        </div>
      </div>
    </section>
  );
}
