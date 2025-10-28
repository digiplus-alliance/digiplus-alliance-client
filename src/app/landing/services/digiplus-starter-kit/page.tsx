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
    title: "Taster Sessions: Digital Tools & Platforms",
    body: "From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market.",
    footer: "FREE",
    link: "/landing/services/digital-tools-and-platforms",
  },  
];

export default function DigitalInfrastructureSupport() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Digiplus Starter Kit"
        description={[
          " Your business deserves to be seen. The Digiplus Starter Kit helps MSMEs go from offline to online, fast and professionally. We set up everything you need to establish a strong digital presence, attract customers, and build credibility in just 4 weeks. Perfect for MSMEs starting from scratch or trying to upgrade how they show up online.",
        ]}
        buttonText="Apply Now"
        buttonLink="/contact"
        mainImage="/services/digital-support/hero-one.png"
        sideImages={[
          "/services/digital-support/hero-two.png",
          "/services/digital-support/hero-three.png",
        ]}
      />

      <InfoSection
        title="What’s Included"
        items={[
          "1-page landing website with custom domain and hosting",
          "Two professional business emails",
          "Social media setup (3 platforms)",
          "Online marketplace/storefront setup (1 platform)",
          "2 digital talents FREE for 1 month",
        ]}
        pricing={{
          price: "350,000 NGN",
          note: "Pricing can be negotiated depending on scope or specific needs",
          desc: "for the complete package",
        }}
        image="/services/digital-support/what.png"
        background="bg-white"
      >
        <p className="text-[#5E5B5B] text-sm md:text-base">
          Note: Monthly compensation after the free month is not included)
        </p>
      </InfoSection>

      <Value
        title="Promised Value"
        description="Gain immediate online visibility, boost customer trust, and expand reach with zero tech stress. We’ll handle the setup, so you can focus on growth."
        image="/services/digital-support/value.png"
        button={{ label: "Apply Now", href: "/contact" }}
      />

      <MoreOption items={defaultItems} />
    </main>
  );
}
