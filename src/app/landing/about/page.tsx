import OurPartners from "../widgets/our-partners";
import AboutHero from "./widgets/about-hero";
import OurApproach from "./widgets/our-approach";
import OurMission from "./widgets/our-mission";
import OurTeam from "./widgets/our-team";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <OurMission />
      <OurApproach />
      <OurTeam />
      <OurPartners />
    </div>
  );
}
