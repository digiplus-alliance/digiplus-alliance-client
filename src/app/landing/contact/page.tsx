import ContactForm from "./widgets/contact-form";
import ContactInfo from "./widgets/contact-info";
import SocialLinks from "./widgets/social-links";

export default function ContactPage() {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center py-12 px-4">
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full">
        <ContactInfo />
        <div>
          <ContactForm />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
