import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
  name: "Aisha Bello",
  role: "Founder, KokoCrafts (SME)",
  text: "The digital assessment showed exactly where we were lagging. With Digiplus’ advisory and tools, we streamlined our sales and started reaching customers online within weeks.",
  image: "/about/team-placeholder-one.png",
  },
  {
  name: "Chinedu Okafor",
  role: "Operations Lead, AgriLink",
  text: "Capacity-building workshops were practical and relevant. Our team now uses simple digital tools to track inventory and fulfil orders more reliably.",
  image: "/about/team-placeholder-two.png",
  },
  {
  name: "Fatima Sule",
  role: "Program Manager, Community Hub",
  text: "Digiplus connected our entrepreneurs to market access opportunities and mentorship. The one-on-one support made all the difference for early-stage founders.",
  image: "/about/team-placeholder-three.png",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full pt-12 pb-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-semibold mb-10">Testimonials</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center p-6 rounded-lg border-2 border-[#FF9494] bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">
                <Avatar className="w-12 h-12 group-hover:w-14 group-hover:h-14 transition-transform">
                  <AvatarImage src={t.image} alt={t.name} />
                  <AvatarFallback>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-base font-semibold text-[#706C6C]">
                {t.name}
              </h3>
              <p className="text-sm text-[#A3A3A3] mb-4">{t.role}</p>
              <p className="text-sm text-[#5E5B5B]">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
