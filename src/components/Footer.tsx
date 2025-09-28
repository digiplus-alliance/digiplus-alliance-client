import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#24262D] px-4 md:px-10 text-muted-foreground">
      <div className="container grid grid-cols-1 gap-12 py-12 lg:grid-cols-6">
        {/* Logo & description */}
        <div className="md:col-span-2">
          <div className="md:flex hidden items-center space-x-2">
            <Image
              src="/plain-logo.png"
              alt="DigiPlus Logo"
              width={100}
              height={40}
            />
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            <Image
              src="/mobile-logo.png"
              alt="DigiPlus Logo"
              width={100}
              height={40}
            />
          </div>
          <p className="mt-4 max-w-md text-sm md:text-base text-white leading-relaxed">
            Digiplus Alliance DIH is a consortium led and operated by 8thGear
            Partners Ltd.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-white mb-4">About</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/landing/about" className="hover:underline">
                About Us
              </Link>
            </li>
            {/* <li><Link href="/mission" className="hover:underline">Our Mission</Link></li>
            <li><Link href="/team" className="hover:underline">Our Team</Link></li> */}
            <li>
              <Link href="/landing/blog" className="hover:underline">
                Our Blog
              </Link>
            </li>
            <li>
              <Link
                href="https://www.8thgearpartners.com/terms-and-conditions"
                className="hover:underline"
                target="_blank"
              >
                Our Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="https://www.8thgearpartners.com/privacy-policy"
                target="_blank"
                className="hover:underline"
              >
                Privacy Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                href="/landing/services/hub-membership"
                className="hover:underline"
              >
                Ecosystem Building
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/landing/services/capacity-building-and-training"
                className="hover:underline"
              >
                Skill & Development
              </Link>
            </li>
            <li>
              <Link
                href="/landing/services/access-to-finance"
                className="hover:underline"
              >
                Access to Finance
              </Link>
            </li>
            <li>
              <Link
                href="/landing/services/market-and-policy-insight"
                className="hover:underline"
              >
                Market and Policy Insight
              </Link>
            </li>
            <li>
              <Link
                href="/landing/services/research-commercialisation"
                className="hover:underline"
              >
                Research Commercialisation
              </Link>
            </li>
            <li>
              <Link
                href="/landing/services/market-access-support"
                className="hover:underline"
              >
                Test Before Invest
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials & Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4">Socials</h3>
          <ul className="space-y-4 text-sm">
            {/* <li>
              <Link href="https://twitter.com" target="_blank" className="hover:underline">
                Twitter
              </Link>
            </li> */}
            <li>
              <Link
                href="https://www.instagram.com/digiplus.africa/"
                className="hover:underline"
                target="_blank"
              >
                Instagram
              </Link>
            </li>
            {/* <li>
              <Link href="https://facebook.com" className="hover:underline">
                Facebook
              </Link>
            </li> */}
            <li>
              <Link
                href="https://www.linkedin.com/company/digiplus-africa/"
                target="_blank"
                className="hover:underline"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li>41, CMD Road, Ikeja, Lagos</li>
            <li>
              <a href="tel:+2349132462410" className="hover:underline">
                +234 913 246 2410
              </a>
            </li>
            <li>
              <a href="mailto:info@digiplus.africa" className="hover:underline">
                info@digiplus.africa
              </a>
            </li>
            <li>
              <a
                href="https://www.digiplus.africa/"
                className="hover:underline"
              >
                www.digiplus.africa
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-6 lg:text-left text-center text-xs text-[#B8B8B8]">
        © DigiPlus. Providing digital solutions across the Globe. All rights
        reserved.
      </div>
    </footer>
  );
}
