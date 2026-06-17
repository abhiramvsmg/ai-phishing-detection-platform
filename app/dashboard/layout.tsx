import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | PhishGuard AI",
  description:
    "Enterprise security operations dashboard for AI-powered phishing detection and threat analysis.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
