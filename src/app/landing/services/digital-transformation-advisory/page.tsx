import InfoSection from "../widgets/info-section";
import MoreOption, { OptionItem } from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";

const items: OptionItem[] = [
  {
    image: "/services/transformation-advisory/more-card-one.png",
    title: "Capacity Building & Training",
    body: "Tap into a vibrant support network that helps MSMEs connect, collaborate, and thrive because no business should grow alone.",
    footer: "NGN 200 000",
    link: "/landing/services/capacity-building-and-training",
  },
  {
    image: "/services/transformation-advisory/more-card-two.png",
    title: "Digital Infrastructure Support",
    body: "From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market.",
    footer: "NGN 350 000",
    link: "/landing/services/digital-infrastructure-support",
  },
  {
    image: "/services/transformation-advisory/more-card-three.png",
    title: "Taster Sessions: Digital Tools & Platforms",
    body: "From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market.",
    footer: "FREE",
    link: "/landing/services/digital-tools-and-platforms",
  },
];

export default function DigitalTransformationAdvisory() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Digital Transformation Advisory"
        description={[
          "This service delivers tailored digital transformation strategies for MSMEs looking to modernise operations, improve efficiency, and grow in today’s digital economy.",
          "Through one-on-one advisory sessions, we co-create a custom digital adoption roadmap ensuring your business is equipped with the right tools to compete and scale sustainably.",
        ]}
        buttonText="Request Service"
        buttonLink="/contact"
        mainImage="/services/transformation-advisory/digital_hero_one.png"
        sideImages={[
          "/services/transformation-advisory/digital_hero_three.png",
          "/services/transformation-advisory/digital_hero_two.png",
        ]}
      />

        <InfoSection
          title="What You'll Gain"
          items={[
            "A clear digital strategy aligned with your business goals.",
            "Improved operational efficiency through the right tools",
            "Practical steps to boost visibility, reach, and revenue",
            "Expert insights tailored to your sector and current business stage",
          ]}
          pricing={{
            price: "100,000 NGN",
            note: "Final number of hours is determined based on scope and business needs",
          }}
          image="/services/transformation-advisory/info.png"
          reverse={false}
          background="bg-white"
        />


      <InfoSection
        title="How It Works"
        titleColor="#171616"
        items={[
          "Intro consultation to understand your current state",
          "Custom strategy development",
          "Advisory sessions + execution plan handover",
          "Optional follow-up or implementation support",
        ]}
        image="/services/transformation-advisory/how.png"
        reverse
        button={{ label: "Request Service", href: "/contact" }}
        layout="balanced"
        imageHeight="h-48 md:h-64" 
      />

      <MoreOption items={items} />
    </main>
  );
}
