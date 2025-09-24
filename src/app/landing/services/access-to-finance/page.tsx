import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";

export default function AccessToFinance() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Access to Finance - MIRE"
        subtitle="(Market & Investment Readiness for Entrepreneurs)"
        description={[
          "Getting funding isn’t just about having a great idea, it’s about being ready. The MIRE program helps entrepreneurs and MSMEs become investment-ready, with practical training on how to plan, structure, and pitch their businesses for real capital.",
          "Through expert-led sessions, participants gain the clarity, confidence, and tools needed to attract funding and grow with intention.",
        ]}
        buttonText="Apply Now"
        buttonLink="/contact"
        mainImage="/services/access-to-finance/hero-one.png"
        sideImages={[
          "/services/access-to-finance/hero-three.png",
          "/services/access-to-finance/hero-two.png",
        ]}
      />

      <InfoSection
        title="What You’ll Learn"
        items={[
          "How to structure your business for growth and funding",
          "Crafting a clear business plan and pitch deck",
          "Financial management and projections",
          "Investor expectations and deal readiness",
          "Market positioning and expansion planning",
        ]}
        pricing={{
          price: "250,000 NGN",
          note: "Covers all sessions, materials, and access to post-program funding opportunities",
          desc: "/per business rep",
        }}
        image="/services/access-to-finance/learn.png"
        reverse
        background="bg-white"
        imageHeight="md:h-40 md:h-90 md:w-2/3 w-ful h-full"
      />

      <InfoSection
        title="Schedule & Format"
        titleColor="#171616"
        items={[
          "10 hours of expert-led sessions",
          "Delivered over 4 weeks (hybrid: virtual + in-person)",
          "Includes live workshops, pitch practice, and feedback",
        ]}
        image="/services/access-to-finance/schedule.png"
        button={{ label: "Apply Now", href: "/contact" }}
        layout="balanced"
        imageHeight="h-48 md:h-58"
      />

      <Value
        title="Promised Value"
        description={[
          "A compelling investment-ready business profile",
          "Improved confidence to engage investors and partners",
          "Exposure to potential funders and business growth platforms",
        ]}
        image="/services/access-to-finance/value.png"
      />

      <MoreOption />
    </main>
  );
}
