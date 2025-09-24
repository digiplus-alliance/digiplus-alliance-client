import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";

export default function ResearchCommercialisation() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Research Commercialisation"
        description={[
          "Have a brilliant idea but need the right environment to bring it to life? Our Research Commercialisation Labs offer dynamic collaboration spaces where academia meets the tech ecosystem. Here, researchers, entrepreneurs, and tech experts come together to prototype, test, and scale solutions that solve real-world problems.Whether you're working on a thesis, developing new IP, or seeking a path to market, we help bridge the gap between academic research and commercial impact.",
        ]}
        buttonText="Pitch Your Innovation"
        buttonLink="/contact"
        mainImage="/services/research/hero-one.png"
        sideImages={[
          "/services/research/hero-two.png",
          "/services/research/hero-three.png",
        ]}
      />

      <InfoSection
        title="What You’ll Gain"
        items={[
          "Accelerated product development and faster time-to-market",
          "Expert support in prototyping, innovation, and co-creation",
          "Access to the DigiPlus R2C (Research-to-Commercialisation) Toolkit",
          "Strategic connections to industry, tech partners, and funders",
        ]}

        pricing={{
          price: "Equity-based compensation model",
          note: "We share the risk and the reward - no upfront payment required.",
        }}
        image="/services/hub/what.png"
        background="bg-white"
      />

      <InfoSection
        title="How It Works"
        titleColor="#171616"
        items={[
          "Submit your concept or project brief",
          "Join our co-creation lab for facilitated prototyping",
          "Collaborate with cross-disciplinary experts",
          "Access resources to commercialise or scale"
        ]}
        reverse
        image="/services/research/work.png"
        button={{ label: "Pitch Your Innovation", href: "/contact" }}
        layout="balanced"
        imageHeight="h-48 md:h-58"
      />

      <MoreOption />
    </main>
  );
}
