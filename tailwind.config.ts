import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F1F5F9", // Soft slate-100 background
        surface: "#E2E8F0",    // Slate-200
        card: "#FFFFFF",       // Pure White
        primary: "#6366F1",    // Indigo
        secondary: "#06B6D4",  // Teal-Cyan
        success: "#0D9488",    // Safe Teal
        warning: "#D97706",    // Suspicious Amber
        danger: "#E11D48",     // Malicious Coral-Rose
        muted: "#475569",      // Slate-600
        border: "#CBD5E1",     // Slate-300
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #FAFAFB 0%, #F1F5F9 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.12)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.2)',
        'glow-purple': '0 0 20px rgba(6, 182, 212, 0.12)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;