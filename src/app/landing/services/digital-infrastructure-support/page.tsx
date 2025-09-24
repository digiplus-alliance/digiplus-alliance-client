import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";

export default function DigitalInfrastructureSupport() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Digital Infrastructure Support"
        description={[
          " Your business deserves to be seen. The Digital Infrastructure Support service helps MSMEs go from offline to online, fast and professionally. We set up everything you need to establish a strong digital presence, attract customers, and build credibility in just 4 weeks. Perfect for MSMEs starting from scratch or trying to upgrade how they show up online.",
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

      <MoreOption />
    </main>
  );
}
