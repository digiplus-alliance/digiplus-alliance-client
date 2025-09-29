import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import InfoSection from "../widgets/info-section";
import ServiceHero from "../widgets/service-hero";
import Value from "../widgets/value-section";
import MoreOption, { OptionItem } from "../widgets/more-option";

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
    title: "Digital Infrastructure Support",
    body: "From DSE (Digital Skills for Entrepreneurs) to MIRE (Market & Investment Readiness), we offer hands-on programs that teach what really works in today’s market.",
    footer: "NGN 350 000",
    link: "/landing/services/digital-infrastructure-support",
  },  
];

export default function DigitalToolsAndPlatforms() {
  const items = [
    "Inventory management",
    "Customer Relationship Management (CRM)",
    "Payment and invoicing solutions",
    "Workflow automation",
  ];
  return (
    <main>
      <ServiceHero
        bannerText="Take the digital maturity assessment by signing up."
        title="Taster Sessions: Digital Tools & Platforms"
        description={[
          "Not sure which digital tools your business actually needs? Our Taster Sessions give you hands-on access to affordable, MSME-friendly digital tools, from inventory management to CRM and e-payment platforms. No hard sell, no fluff, just practical demos that show you what works, how it works, and whether it’s the right fit for your business.",
        ]}
        buttonText="Join the Next Free Session"
        buttonLink="/contact"
        mainImage="/services/services-hero.png"
        sideImages={[
          "/services/digital-tools/hero-three.png",
          "/services/digital-tools/hero-two.png",
        ]}
      />

      <InfoSection
        title="What’s Included"
        items={[
          "Q&A with experts on how each tool supports your business needs",
          "Guidance on next steps for adoption",
        ]}
        listChildren={
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span>
                <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-[#227C9D] flex-shrink-0" />
              </span>
              <span>Live demonstrations of tools for:</span>
            </div>
            <ul className="list-disc pl-6 space-y-1 text-[#5E5B5B] text-sm">
              {items.map((item, idx) => (
                <li key={idx} className="py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
        pricing={{
          price: "Free",
          note: "Just register to secure your spot in the next taster session",
        }}
        image="/services/digital-tools/what.png"
        background="bg-white"
      />

      <Value
        title="Promised Value"
        description="Walk away with a clearer understanding of what digital tools you need, how to use them, and how they’ll help you work faster, smarter, and better."
        image="/services/digital-tools/value.png"
        button={{ label: "Join the next free session", href: "/contact" }}
      />

      <MoreOption items={defaultItems}/>
    </main>
  );
}
