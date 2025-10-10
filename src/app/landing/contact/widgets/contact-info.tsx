import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-normal text-[#171616]">Contact us</h2>
        <p className="mt-2 text-[#5E5B5B]">Got a Question? Let’s Talk.</p>
        <p className="mt-2 text-[#5E5B5B]">
          We’re here to support your digital journey — whether you need more
          info, want to collaborate, or just have a quick question.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="font-semibold text-[#171616]">Send us a message</p>
          <div className="flex items-center gap-2 text-[#5E5B5B] py-2">
            <Mail className="w-5 h-5" />
            <span>info@digplus.africa</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[#171616]">Call us</p>
          <div className="flex items-center gap-2 text-[#5E5B5B] py-2">
            <Phone className="w-5 h-5" />
            <span>+234 913 246 2410</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[#171616]">Visit us</p>
          <div className="flex items-center gap-2 text-[#5E5B5B] py-2">
            <MapPin className="w-5 h-5" />
            <span>41 CMD Road, Secretariat/Magodo, Lagos.</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.220496010431!2d3.382!3d6.615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93e1b69f7a53%3A0x5a6e10f3c0d6f3b8!2sCMD%20Road!5e0!3m2!1sen!2sng!4v1699999999999"
          width="100%"
          height="200"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
