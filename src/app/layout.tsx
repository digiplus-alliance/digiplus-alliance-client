'use client';
import type { Metadata } from "next";
import { Geist, Rubik, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/lib/provider";
import { Toaster } from "@/components/ui/sonner";

//DigiPlus Programs

import ProgramModal from "@/components/program-modal";
import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

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

// export const metadata: Metadata = {
//   title: "Digiplus",
//   description: "Digiplus Alliance",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenProgramModal');
    const bannerDismissed = sessionStorage.getItem('programBannerDismissed');
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (!bannerDismissed) {
      setShowBanner(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem('hasSeenProgramModal', 'true');
    
    const bannerDismissed = sessionStorage.getItem('programBannerDismissed');
    if (!bannerDismissed) {
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem('programBannerDismissed', 'true');
  };

  return (
    <html lang="en">
        <head>
        <title>DigiPlus</title>
        <meta name="description" content="Digiplus Alliance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${rubik.variable} ${geistSans.variable} ${inter.variable} antialiased`}>
        <AppProviders>
              {/* Banner with Apply Now button */}
          {showBanner && !showModal && (
            <div className="bg-[#ff5c5c] text-white py-3 px-4 shadow-lg sticky top-0 z-40 animate-in slide-in-from-top duration-300">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <Sparkles className="w-5 h-5 text-white flex-shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <p className="font-bold text-sm md:text-base">
                      Research to Market Program - Limited Spots Available! 🚀
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://forms.gle/csiQtdiiguFzsdVY9"
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex-shrink-0 px-5 py-2 bg-white text-[#ff5c5c] hover:bg-red-50 font-bold rounded-xl transition-all shadow-sm text-sm"
                  >
                    Apply Now
                  </a>
                  <button
                    onClick={handleCloseBanner}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close banner"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {children}
        
        <ProgramModal 
          isOpen={showModal} 
           onClose={handleCloseModal}
        />
          <Toaster position="bottom-right" theme="light" richColors />
        </AppProviders>
      </body>
    </html>
  );
}
