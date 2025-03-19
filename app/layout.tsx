import type { Metadata } from "next";
import "./../styles/globals.css";
import { Inter } from "next/font/google";
import SessionProviderClient from "../app/providers/SessionProviderClient";
import Navbar from "@/app/components/navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor AI | Your AI Healthcare Assistant",
  description: "An AI-powered mental health and medical support system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-green-50 text-gray-900`}>
        <SessionProviderClient>
          {/* ✅ Dynamic Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="container mx-auto px-4 pt-24 min-h-screen">{children}</main>
        </SessionProviderClient>
      </body>
    </html>
  );
}
