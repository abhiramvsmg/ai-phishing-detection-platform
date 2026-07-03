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
        background: "#FAFAFF", // Barely-tinted violet-white
        surface: "#F3F0FF",    // Soft violet surface
        card: "#FFFFFF",       // Pure White
        primary: "#7C3AED",    // Vivid Violet
        secondary: "#10B981",  // Emerald Mint
        success: "#10B981",    // Emerald Mint (matches secondary)
        warning: "#D97706",    // Amber
        danger: "#E11D48",     // Rose
        muted: "#6B5B95",      // Muted violet-grey
        border: "#EDE9FE",     // Soft violet border
      },
     backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)',
        'gradient-dark': 'linear-gradient(135deg, #FEFEFF 0%, #FAFAFF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(124, 58, 237, 0.04) 0%, rgba(16, 185, 129, 0.04) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.14)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.22)',
        'glow-purple': '0 0 20px rgba(16, 185, 129, 0.14)',
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