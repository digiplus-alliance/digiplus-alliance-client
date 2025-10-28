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
        image="/services/services_image_two.png"
        bgColor="#EBFBFF"
        reverse
        showSubtitle={true}
        linkPath="/landing/services/market-access-support"
      />

      <FeatureCard
        subtitle="Skills and Development"
        title="Digital Skills for Entrepreneurs - DSE"
        description="Offers workshops and training sessions on digital skills, including e-commerce, digital marketing, and the use of digital tools for business operations."
        image="/services/services_image_seven.png"
        bgColor="#CCF1FF"
        linkPath="/landing/services/digital-skills-for-entrepreneurs"
      />

      <FeatureCard
        subtitle="Access to Finance"
        title="Market & Investment Readiness for Entrepreneurs - MIRE"
        description="Equips entrepreneurs with the necessary skills and knowledge to become market and investment-ready, including business planning, financial management, and investor engagement strategies."
        image="/services/services_image_three.png"
        bgColor="#FFB0B0"
        linkPath="/landing/services/access-to-finance"
        reverse
      />

       <FeatureCard
        subtitle="Test Before Invest"
        title="Digiplus Starter Kit"
        description="Assists in setting up digital infrastructure, including website development, domain registration, and hosting services, to establish an online presence."
        image="/services/services_image_four.png"
        linkPath="/landing/services/digiplus-starter-kit"
        bgColor="#97D2E7"
      />

       <FeatureCard
        subtitle="Ecosystem Building"
        title="Hub Membership"
        description="Offers mentorship programs and business development services, including financial planning, legal advice, and operational support, to strengthen MSME capacities."
        image="/services/services_image_five.png"
        bgColor="#CCF1FF"
        linkPath="/landing/services/hub-membership"
        reverse
      />

      <FeatureCard
        subtitle="Test Before Invest"
        title="Taster sessions for Digital Tools & Platforms"
        description="Facilitates access to demos of affordable digital tools and platforms, such as inventory management systems, CRM software, and e-payment solutions, tailored to MSME needs."
        image="/services/services_hub_membership.png"
        bgColor="#AD1F1F"
        subtitleBg="#0229B2"
        learnMoreColor="#FFFFFF"
        learnMoreText="Apply here"
        titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        linkPath="/landing/services/digital-tools-and-platforms"
      />

      <FeatureCard
        subtitle="Market and Policy Insight"
        title="Research & Insights"
        description="Conducts needs assessments and market research to inform policy and program development, ensuring interventions are data-driven and impactful."
        image="/services/services_policy.png"
        bgColor="#171616"
        titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        learnMoreColor="#FFFFFF"
        linkPath="/landing/services/market-and-policy-insight"
        reverse
      />

      <FeatureCard
        subtitle="Research Commercialisation"
        title="Innovation & Co-Creation Labs"
        description="Provides collaborative spaces for Academia to innovate, prototype, and co-create solutions with tech experts, fostering innovation and problem-solving."
        image="/services/services_image_six.png"
        bgColor="#3D3A3A"
         titleColor="#FFFFFF"
        descriptionColor="#D6D4D4"
        learnMoreColor="#FFFFFF"
        linkPath="/landing/services/research-commercialisation"
      />
    </section>
  );
}
