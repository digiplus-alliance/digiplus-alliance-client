import { MoreOptionCard } from "@/components/MoreOptionCard";
import Link from "next/link";

export type OptionItem = {
  image: string;
  title: string;
  body: string;
  link?: string;
  footer?: string;
};

export interface MoreOptionProps {
  items?: OptionItem[];
}

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
    title: "Hub Membership",
    body: "Join a community of like-minded entrepreneurs and gain access to exclusive resources, mentorship, and networking opportunities.",
    footer: "NGN 150 000",
    link: "/landing/services/hub-membership",
  },  
];

export default function MoreOption({ items = defaultItems }: MoreOptionProps) {
  return (
    <div className="w-full flex items-center flex-col px-4 md:px-8">
      <h3 className="text-2xl md:text-4xl font-semibold text-center">
        More Like this
      </h3>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4 m-2 lg:mx-12 md:my-12">
        {items.map((it, idx) => (
          <div key={idx} className="w-full flex justify-center">
            <Link className="w-full max-w-sm" href={it.link || "#"}>
              <MoreOptionCard
                image={it.image}
                title={it.title}
                body={it.body}
                footer={it.footer ?? ""}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
