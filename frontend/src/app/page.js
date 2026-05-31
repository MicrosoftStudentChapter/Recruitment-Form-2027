// Main entry point for the application. Combines layout configuration (fonts, metadata) and renders the recruitment form.
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import RecruitmentForm from "@/components/RecruitmentForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MLSC Recruitment 2026–27",
  description: "Official recruitment portal for the Microsoft Learn Student Chapter at Thapar Institute of Engineering and Technology.",
  icons: {
    icon: "/MLSCLogo-transparent.png",
  }
};

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
      <main className="min-h-screen relative flex flex-col items-center p-4 sm:p-8 md:py-16 md:px-8 bg-[#020617]">

        <div className="z-10 w-full max-w-5xl flex flex-col items-center">
          {/* Logo Header */}
          <div className="mt-4 mb-4 text-center flex flex-col items-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out">
              <Image
                src="/MLSCLogo-transparent.png"
                alt="MLSC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Recruitment
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-blue to-cyan-400 bg-clip-text text-transparent mt-1">
              2026 – 27
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full mt-6">
            <RecruitmentForm />
          </div>
        </div>
      </main>
    </div>
  );
}