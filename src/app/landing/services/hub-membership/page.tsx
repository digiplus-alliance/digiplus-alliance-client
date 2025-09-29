import InfoSection from "../widgets/info-section";
import MoreOption, { OptionItem } from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";

const defaultItems: OptionItem[] = [
  {
    image: "/services/transformation-advisory/more-card-one.png",
    title: "Market Access Support",
    body: "Struggling to expand your reach? The Market Access Support service connects MSMEs to larger markets using the right blend of digital tools, strategic partnerships, and curated networking opportunities.",
    footer: "NGN 100 000",
    link: "/landing/services/market-access-support",
  },
  {
    image: "/services/transformation-advisory/more-card-two.png",
    title: "Digital Transformation Advisory",
    body: "Tap into a vibrant support network that helps MSMEs connect, collaborate, and thrive because no business should grow alone.",
    footer: "NGN 100 000",
    link: "/landing/services/digital-transformation-advisory",
  },
  {
    image: "/services/transformation-advisory/more-card-three.png",
    title: "Research Commercialisation",
    body: "We go beyond the numbers. Our deep-dive assessments and on-the-ground research help shape smarter policies and programs because impactful solutions start with real-world insight.",
    footer: "Equity-based",
    link: "/landing/services/research-commercialisation",
  },  
];

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

      <MoreOption items={defaultItems} />
    </main>
  );
}
