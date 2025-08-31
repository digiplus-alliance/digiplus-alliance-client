import Image from "next/image";

const team = [
  {
    name: "Adaeze Okafor",
    role: "Program Lead",
    img: "/about/team-placeholder-one.png",
  },
  {
    name: "Chinedu Iweka Iweka Iweka",
    role: "Technical Lead",
    img: "/about/team-placeholder-two.png",
  },
  {
    name: "Funmi Adebayo",
    role: "Partnerships",
    img: "/about/team-placeholder-three.png",
  },
  {
    name: "Seyi Martins",
    role: "Operations",
    img: "/about/team-placeholder-four.png",
  },
];

export default function OurTeam() {
  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[#171616] font-medium text-2xl md:text-4xl">
              Our Team
            </h3>
            <p className="text-[#5E5B5B] mt-2">
              The core team driving Digiplus Alliance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-1 items-center">
          {team.map((member, idx) => (
            <div
              key={member.name + idx}
              className="relative flex items-center justify-center"
            >
              {/* focusable group so keyboard users can reveal the card with focus */}
              <div
                className="group relative flex items-center justify-center"
                tabIndex={0}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={260}
                  height={320}
                  className="rounded-lg object-cover w-44 h-60 sm:w-44 sm:h-60 md:w-44 md:h-44 lg:w-52 lg:h-60"
                />

                {/* Hover / focus overlay (centered on image) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-150 z-10">
                  <div className="bg-black/60 text-white rounded-md px-3 py-2 w-40 text-center pointer-events-none">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs opacity-90 mt-1">{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
