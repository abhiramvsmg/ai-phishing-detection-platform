import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Deepest Black/Blue
        surface: "#0F172A",    // Sidebar/Card surface
        card: "#111827",       // Widget background
        primary: "#06B6D4",    // Cyan (CrowdStrike style)
        secondary: "#3B82F6",  // Security Blue
        success: "#10B981",    // Safe
        warning: "#F59E0B",    // Suspicious
        danger: "#EF4444",     // Malicious
        muted: "#94A3B8",      // Secondary text
        border: "#1E293B",     // Subtle lines
      },
    },
  },
  plugins: [],
};
export default config;