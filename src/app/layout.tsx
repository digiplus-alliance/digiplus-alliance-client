import type { Metadata } from "next";
import { Geist, Rubik, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/lib/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digiplus",
  description: "Digiplus Alliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${geistSans.variable} ${inter.variable} antialiased`}>
        <AppProviders>
          {children}
          <Toaster position="bottom-right" theme="light" richColors />
        </AppProviders>
      </body>
    </html>
  );
}
