import type { Metadata } from "next";
import "./globals.css";
// Bypass alias system to fix "Module not found"
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export const metadata: Metadata = {
  title: "PhishGuard AI | Enterprise Threat Detection",
  description: "Advanced Phishing Defense Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-white flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 bg-[#030712]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}