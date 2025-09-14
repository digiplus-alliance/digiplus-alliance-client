import { MoreOptionCard } from "@/components/MoreOptionCard";

type OptionItem = {
  image: string;
  title: string;
  body: string;
  footer?: string;
};

interface MoreOptionProps {
  items?: OptionItem[];
}

const defaultItems: OptionItem[] = [
  {
    image: "/services/transformation-advisory/more-card-one.png",
    title: "Market Access Support",
    body: "Struggling to expand your reach? The Market Access Support service connects MSMEs to larger markets using the right blend of digital tools, strategic partnerships, and curated networking opportunities.",
    footer: "NGN 100 000",
  },
  {
    image: "/services/transformation-advisory/more-card-two.png",
    title: "Digital Plus Approach",
    body: "Struggling to expand your reach? The Market Access Support service connects MSMEs to larger markets using the right blend of digital tools, strategic partnerships, and curated networking opportunities.",
    footer: "NGN 100 000",
  },
  {
    image: "/services/transformation-advisory/more-card-three.png",
    title: "Digital Plus Approach",
    body: "Struggling to expand your reach? The Market Access Support service connects MSMEs to larger markets using the right blend of digital tools, strategic partnerships, and curated networking opportunities.",
    footer: "NGN 100 000",
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
            <div className="w-full max-w-sm">
              <MoreOptionCard
                image={it.image}
                title={it.title}
                body={it.body}
                footer={it.footer ?? ""}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
