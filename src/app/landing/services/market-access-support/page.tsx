import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";

export default function MarketAccessSupport() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Market Access Support"
        description={[
          " Struggling to expand your reach? The Market Access Support service connects MSMEs to larger markets using the right blend of digital tools, strategic partnerships, and curated networking opportunities.",
          "Whether you're trying to grow beyond your street, city, or platform, we’ll help you build the market presence your product or service deserves.",
        ]}
        buttonText="Apply Now"
        buttonLink="/contact"
        mainImage="/services/market-access/hero-one.png"
        sideImages={[
          "/services/market-access/hero-two.png",
          "/services/market-access/hero-three.png",
        ]}
      />
      <InfoSection
        title="What You'll Gain"
        items={[
          "A strategic roadmap for increasing product visibility",
          "Targeted advice on digital platforms and channels that match your market",
          "Introductions to relevant networks, aggregators, and marketplaces",
          "Guidance on pricing, packaging, and positioning for scale",
        ]}
        pricing={{
          price: "100,000 NGN",
          note: "Final number of hours is determined based on scope and business needs",
          desc: "/Per hour",
        }}
        image="/services/market-access/gain-section.png"
        reverse
        background="bg-white"
        imageHeight="md:h-40 md:h-90 md:w-2/3 w-ful h-full" 
      />

      <InfoSection
        title="How It Works"
        titleColor="#171616"
        items={[
          "Business assessment and opportunity mapping",
          "Strategy session with our advisory team",
          "Market entry plan and execution support",
          "Optional follow-up or partnership facilitation",
        ]}
        image="/services/market-access/how-it-works.png"
        button={{ label: "Apply Now", href: "/contact" }}
        layout="balanced"
        imageHeight="h-48 md:h-58"
      />

       <MoreOption />
    </main>
  );
}
