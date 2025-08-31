import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React from "react";

export const metadata = {
  title: "Home - DigiPlus Alliance",
  description: "Landing pages for DigiPlus Alliance",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
