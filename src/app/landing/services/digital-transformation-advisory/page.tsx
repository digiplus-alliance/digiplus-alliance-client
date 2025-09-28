import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";

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
        imageHeight="h-48 md:h-64" // ✅ override height
      />

      <MoreOption />
    </main>
  );
}
