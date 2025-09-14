import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";

export default function HubMembership() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Hub Membership"
        description={[
          "Running a business is hard but you don’t have to do it alone. The Hub Membership offers structured mentorship and business development support, designed to help MSMEs strengthen their strategy, improve financial discipline, and access expert guidance regularly.",
          "This membership gives you more than just advice, it gives you a business backbone.",
        ]}
        buttonText="Subscribe Now"
        buttonLink="/contact"
        mainImage="/services/hub/hero-one.png"
        sideImages={[
          "/services/hub/hero-two.png",
          "/services/hub/hero-three.png",
        ]}
      />

      <InfoSection
        title=" What You Get"
        items={[
          "Cashflow projection and tracking support",
          "Business Model Canvas and strategy advisory",
          "2-hour advisory session per month with industry experts",
          "Access to premium ecosystem events and partner opportunities",
          "Sustainability planning, legal and operational guidance",
          "Peer accountability and founder resilience building",
        ]}
        pricing={{
          price: "150,000 NGN",
          note: "Covers all sessions, materials, and access to post-program funding opportunities",
          desc: "/per quarter",
        }}
        image="/services/hub/what.png"
        reverse
        background="bg-white"
        imageHeight="md:h-40 md:h-90 md:w-2/3 w-ful h-full"
      />

      <Value
        title="Promised Value"
        description="Enjoy improved business clarity, increased resilience, and access to a trusted community of growth-minded entrepreneurs and experts, all tailored to your journey."
        image="/services/hub/value.png"
        button={{ label: "Subscribe Now", href: "/contact" }}
      />

      <MoreOption />
    </main>
  );
}
