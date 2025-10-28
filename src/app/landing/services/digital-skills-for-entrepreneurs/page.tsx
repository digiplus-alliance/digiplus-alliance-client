import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";

export default function CapacityBuildingAndTraining() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Digital Skills for Entrepreneurs - DSE"
        description={[
          "In today’s digital world, knowing how to use the tools is just as important as having them. Our Digital Skills for Entrepreneurs equips MSME owners, employees, and aspiring entrepreneurs with practical digital skills they can immediately apply to drive business growth.",
          "From e-commerce to digital marketing, participants learn the “how-to” of thriving online, not just theory.",
        ]}
        buttonText="Request Service"
        buttonLink="/contact"
        mainImage="/services/capacity-building/hero-one.png"
        sideImages={[
          "/services/capacity-building/hero-two.png",
          "/services/capacity-building/hero-three.png",
        ]}
      />

      <InfoSection
        title="What You'll Gain"
        items={[
          "How to set up and manage an online store",
          "Basics of digital marketing and content creation.",
          "Using social media for business",
          "Tools for digital operations (CRM, productivity apps, etc.)",
        ]}
        pricing={{
          price: "200,000 NGN",
          note: "Final number of hours is determined based on scope and business needs",
          desc: "/per business rep",
        }}
        image="/services/capacity-building/gain.png"
        background="bg-white"
        imageHeight="md:h-40 md:h-90 md:w-2/3 w-ful h-full"
      />

      <InfoSection
        title="How It Works"
        titleColor="#171616"
        items={[
          "Register as an individual or business team",
          "Attend interactive training (virtual or in-person)",
          "Participate in live demonstrations and exercises",
          "Receive a completion certificate and access optional post-training support",
        ]}
        image="/services/capacity-building/how.png"
        button={{ label: "Request Service", href: "/contact" }}
        layout="balanced"
        reverse
        imageHeight="h-48 md:h-58"
      />

      <div>
        <Value
          title="Promised Value"
          description="Participants leave with real-world digital literacy, capable of managing and growing their businesses through the tools and platforms that matter."
          image="/services/capacity-building/value.png"
        />
      </div>

      <MoreOption />
    </main>
  );
}
