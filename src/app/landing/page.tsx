"use client";

import LandingHero from "./widgets/landing-hero";
import DigiplusCanDoCards from "./widgets/digiplus-can-do-section";
import WhyJoinDigiplus from "./widgets/why-join-digiplus";
import Testimonials from "./widgets/testimonials";

//landing page
export default function Home() {
  return (
    <div>
      <LandingHero />
      <DigiplusCanDoCards />
      <WhyJoinDigiplus />
      <Testimonials />
    </div>
  );
}
