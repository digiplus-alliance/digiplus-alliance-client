'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingHero() {
  const router = useRouter();
  return (
    <section className="relative w-full h-full max-h-[40rem] lg:h-[76vh] flex items-center">
      {/* Background image */}
      <Image
        src="/landing-hero.svg"
        alt="DigiPlus Hero"
        fill
        className="object-cover"
        priority
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-10 md:py-2 text-center text-white lg:flex lg:flex-row">
        <div className="md:max-w-2xl w-full text-left">
          <h1 className="text-2xl text-[#5E5B5B] sm:text-4xl md:text-5xl font-normal leading-tight">
            The <span className="text-[#D63A3A]">support</span> you’ve been
            waiting for is finally HERE!
          </h1>
          <p className="mt-4  mx-auto text-base sm:text-lg text-[#5E5B5B]">
            Join the Digiplus Alliance, the{" "}
            <span className="text-[#D63A3A]">one-stop-shop</span> where Nigerian
            MSMEs get real tools, practical training, expert support, and
            funding access to grow faster and smarter. No fluff. Just the
            result-focused digital boost your business deserves.
          </p>
          <div className="mt-8 justify-left gap-4 ">
            <Button className="px-6" size="lg" onClick={() => router.push("/auth/create-account")}>
              Start Your Growth Journey Today
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col space-y-4 lg:w-1/2 p-4 ">
          <div className="bg-transparent p-2 rounded-lg border-y-gradient-to-r from-gray-300 to-black border-r-2 border-y-2 border-l-2 border-l-gray-300 border-r-black w-56 h-28 text-left lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:z-50">
            <h3 className="text-xl text-[#0E5F7D] font-normal">
              Digiplus
            </h3>
            <p className="mt-2 text-sm text-[#7A7A7A]">We can help you grow</p>
          </div>

          <div className="bg-transparent p-2 rounded-lg border-y-gradient-to-r from-gray-300 to-black border-r-2 border-y-2 border-l-2 border-l-gray-300 border-r-black w-56 h-28 text-left">
            <h3 className="text-xl text-[#0E5F7D] font-normal">
              Grow your business online?
            </h3>
            <p className="mt-2 text-sm text-[#7A7A7A]">We can guide and support you!</p>
          </div>
          {/* placeholder to preserve flow so first and last card keep a gap */}
          <div className="hidden lg:block w-56 h-28" aria-hidden="true" />

         <div className="bg-transparent p-2 rounded-lg border-y-gradient-to-r from-gray-300 to-black border-r-2 border-y-2 border-l-2 border-l-gray-300 border-r-black w-56 h-28 text-left">
            <h3 className="text-lg text-[#D63A3A] font-normal">
              I want to Assess my business
            </h3>
            <p className="mt-2 text-xs text-[#7A7A7A]">You can carry out an assessment today to know where you stand.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
