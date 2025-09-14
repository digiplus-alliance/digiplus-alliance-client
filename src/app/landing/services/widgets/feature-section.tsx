import FeatureCard from "../../../../components/FeatureCard";


export default function FeaturesSection() {
  return (
    <section>
      <FeatureCard
        subtitle="Ecosystem Building"
        title="Digital Transformation Advisory"
        description="Tap into a vibrant support network that helps MSMEs connect, collaborate, and thrive because no business should grow alone."
        image="/services/services_image_one.png"
        bgColor="#EBEBEB"
        linkPath="/landing/services/digital-transformation-advisory"
      />

      <FeatureCard
        subtitle="Ecosystem Building"
        title="Market Access Support"
        description="Tap into a vibrant support network that helps MSMEs connect, collaborate, and thrive because no business should grow alone."
        image="/services/services_image_one.png"
        bgColor="#EBFBFF"
        reverse
        showSubtitle={false}
        linkPath="/landing/services/market-access-support"
      />

      <FeatureCard
        subtitle="Ecosystem Building"
        title="Capacity Building & Training"
        description="Tap into a vibrant support network that helps MSMEs connect, collaborate, and thrive because no business should grow alone."
        image="/services/services_image_one.png"
        bgColor="#CCF1FF"
         showSubtitle={false}
        linkPath="/landing/services/capacity-building-and-training"
      />

      <FeatureCard
        subtitle="Digital Skills & Training"
        title="Access to Finance"
        description="From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market."
        image="/services/services_image_two.png"
        bgColor="#FFB0B0"
        linkPath="/landing/services/access-to-finance"
        reverse
      />

       <FeatureCard
        subtitle="Digital Infrastructure / Tools"
        title="Digital Infrastructure Support"
        description="From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market."
        image="/services/services_image_two.png"
        linkPath="/landing/services/digital-infrastructure-support"
        bgColor="#97D2E7"
      />

       <FeatureCard
        subtitle="Digital Infrastructure / Tools"
        title="Taster Sessions: Digital Tools & Platforms"
        description="From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market."
        image="/services/services_image_two.png"
        bgColor="#CCF1FF"
        linkPath="/landing/services/digital-tools-and-platforms"
        reverse
      />

      <FeatureCard
        subtitle="Business Advisory & Ecosystem Support"
        title="Hub Membership"
        description="We show you how to structure your business for funding and connect you to real, accessible financial opportunities."
        image="/services/services_image_three.png"
        bgColor="#AD1F1F"
        subtitleBg="#0229B2"
        learnMoreColor="#FFFFFF"
        learnMoreText="Apply here"
        titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        linkPath="/landing/services/hub-membership"
      />

      <FeatureCard
        subtitle="Research & Insights"
        title="Market & Policy Insight"
        description="Launch your website. Set up your socials. Get custom emails. Go digital with ease and get the support to stay ahead."
        image="/services/services_image_four.png"
        bgColor="#171616"
        titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        learnMoreColor="#FFFFFF"
        linkPath="/landing/services/market-and-policy-insight"
        reverse
      />

      <FeatureCard
        subtitle="Innovation & Co-creation Labs"
        title="Research Commercialisation"
        description="We go beyond the numbers. Our deep-dive assessments and on-the-ground research help shape smarter policies and programs because impactful solutions start with real-world insight."
        image="/services/services_image_five.png"
        bgColor="#3D3A3A"
         titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        learnMoreColor="#FFFFFF"
        linkPath="/landing/services/research-commercialisation"
      />
    </section>
  );
}
