"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Digital Maturity Assessment",
    href: "/landing/digital-assessment",
  },
  { label: "Services", href: "/landing/services" },
  { label: "About", href: "/landing/about" },
  { label: "Blog", href: "/landing/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <header className="border-b   bg-background px-4 md:px-10 pt-4 pb-2 w-full max-w-[1500px] mx-auto">
      <div className="w-full flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          <Image
            src="/colored-logo.png"
            alt="DigiPlus"
            width={100}
            height={50}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-xs lg:text-base font-normal transition-colors ${
                isActive(item.href)
                  ? "underline underline-offset-4 text-[#227C9D]"
                  : "text-[#5E5B5B] hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button className="font-normal" onClick={() => router.push("/auth/login")}>
            Sign In
          </Button>
          <Button variant="outline" className="text-[#3D3A3A] font-normal">
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8 " />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-lg">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`text-sm font-normal transition-colors flex justify-center ${
                      isActive(item.href)
                        ? "underline underline-offset-4 text-[#227C9D]"
                        : "text-[#5E5B5B] hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 px-10 flex flex-col space-y-3">
                <Button className="font-normal" onClick={() => router.push("/auth/login")}>Sign In</Button>
                <Button
                  variant="outline"
                  className="text-[#3D3A3A] font-normal"
                  onClick={() => router.push("/landing/contact")}
                >
                  Contact Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
