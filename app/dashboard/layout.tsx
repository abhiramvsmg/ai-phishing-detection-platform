import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Scanner Dashboard | PhishGuard AI",
  description:
    "Production URL scanner dashboard for real-time phishing detection, risk scoring, and threat response.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
