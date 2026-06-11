import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens F2 (voir marketing/assets/design-tokens.json)
        primary: {
          50: "#f5f7ff",
          100: "#e5eaff",
          500: "#3b4fd8",
          600: "#2f3fb5",
          700: "#242f88",
          900: "#0e1233",
        },
        neutral: {
          0: "#ffffff",
          50: "#fafafa",
          100: "#f4f4f5",
          400: "#a1a1aa",
          600: "#52525b",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        accent: {
          green: "#22c55e",
          red: "#ef4444",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
