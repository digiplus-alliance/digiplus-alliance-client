import InfoSection from "../widgets/info-section";
import MoreOption from "../widgets/more-option";
import ServiceHero from "../widgets/service-hero";

export default function MarketAndPolicyInsight() {
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Market & Policy Insight"
        description={[
          "Trying to build a policy, product, or program that actually works? Start with deep, data-driven understanding. Our Market & Policy Insight service delivers strategic intelligence through tailored research, needs assessments, and stakeholder engagement, helping you design interventions that are relevant, timely, and effective.Ideal for government bodies, donor agencies, ecosystem builders, and private sector leaders committed to driving change that matters.",
        ]}
        buttonText="Request Service"
        buttonLink="/contact"
        mainImage="/services/market-policy/hero-one.png"
        sideImages={[
          "/services/market-policy/hero-three.png",
          "/services/market-policy/hero-two.png",
        ]}
      />

      <InfoSection
        title="What You’ll Gain"
        items={[
          "Rich, contextualised insights into MSME realities and market dynamics",
          "Evidence-backed strategies for policy and program design",
          "Stakeholder-informed recommendations and frameworks",
          "Impact-focused research tailored to your objectives",
        ]}
        pricing={{
          price: "10,000,000 NGN",
          note: "Final contract-based pricing subject to scope and negotiation.",
        }}
        image="/services/hub/what.png"
        reverse
        background="bg-white"
        imageHeight="md:h-40 md:h-90 md:w-2/3 w-ful h-full"
      />

      <InfoSection
        title="How It Works"
        titleColor="#171616"
        items={[
          "Initial consultation to define objectives and data needs",
          "Fieldwork, expert interviews, and market analysis",
          "Insight report, presentations, and policy/program briefs",
          "Ongoing advisory or implementation support (optional)"
        ]}
        image="/services/market-policy/work.png"
        button={{ label: "Request Service", href: "/contact" }}
        layout="balanced"
        imageHeight="h-48 md:h-58"
      />

      <MoreOption />
    </main>
  );
}
