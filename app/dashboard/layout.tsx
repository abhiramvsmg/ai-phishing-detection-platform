import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "URL Scanner Dashboard | PhishGuard AI",
  description:
    "Production URL scanner dashboard for real-time phishing detection, risk scoring, and threat response.",
};
import { Shell } from "@/components/layout/Shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Shell>{children}</Shell>;
}