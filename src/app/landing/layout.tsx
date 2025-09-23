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
    <>
      <Navbar />
      <div className="w-full max-w-[1500px] flex items-center justify-center flex-col mx-auto">
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
}
