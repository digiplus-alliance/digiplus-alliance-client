import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {[
        // { icon: <X className="w-5 h-5" />, href: "#" },
        // { icon: <Facebook className="w-5 h-5" />, href: "#" },
        { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/digiplus.africa/" },
        { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/digiplus-africa/" },
      ].map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          target="_blank"
          className="p-2 rounded-md border bg-[#D6D4D4] hover:bg-gray-100 transition"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
