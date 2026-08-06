import type { Config } from "tailwindcss";

// Travel Mark Ltd — brand design system
// Aviation-inspired luxury palette: deep navy + royal blue + gold on a
// near-white canvas, with a single sky-blue accent reserved for interactive
// states. No bright gradients — premium soft shadows and generous radii only.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#071B33",
          50: "#EAF0F7",
          100: "#CBDAEA",
          200: "#9DB9D6",
          300: "#6E97C1",
          400: "#3F76AC",
          500: "#1E5688",
          600: "#123E68",
          700: "#0C2C4C",
          800: "#081F38",
          900: "#071B33",
          950: "#040F1D",
        },
        royal: {
          DEFAULT: "#0A4D8C",
          50: "#EAF3FB",
          100: "#CBE1F4",
          200: "#9CC5E9",
          300: "#6DA9DD",
          400: "#3E8DD1",
          500: "#1D71B8",
          600: "#0A4D8C",
          700: "#083D70",
          800: "#062E54",
          900: "#041E38",
        },
        gold: {
          DEFAULT: "#C89A2B",
          50: "#FBF6E8",
          100: "#F4E7C0",
          200: "#EAD48D",
          300: "#DFC15A",
          400: "#D5AE39",
          500: "#C89A2B",
          600: "#A67D20",
          700: "#7D5F18",
          800: "#544011",
          900: "#2B2109",
        },
        sky: {
          DEFAULT: "#3AA8FF",
          50: "#EAF6FF",
          100: "#CDE9FF",
          400: "#63BDFF",
          500: "#3AA8FF",
          600: "#0E8CF0",
        },
        success: {
          DEFAULT: "#00A86B",
          50: "#E5F9F1",
          500: "#00A86B",
          600: "#00875A",
        },
        surface: "#F7F8FA",
        ink: "#1B1F23",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-sm": ["2.125rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(7,27,51,0.06), 0 8px 24px -8px rgba(7,27,51,0.08)",
        elevated: "0 8px 30px -8px rgba(7,27,51,0.16), 0 24px 60px -24px rgba(7,27,51,0.18)",
        gold: "0 8px 24px -6px rgba(200,154,43,0.35)",
        "inner-line": "inset 0 0 0 1px rgba(7,27,51,0.06)",
      },
      backgroundImage: {
        "navy-fade": "linear-gradient(180deg, rgba(7,27,51,0) 0%, rgba(7,27,51,0.92) 100%)",
        "hero-scrim": "linear-gradient(180deg, rgba(4,15,29,0.55) 0%, rgba(4,15,29,0.35) 40%, rgba(4,15,29,0.85) 100%)",
        "gold-line": "linear-gradient(90deg, transparent 0%, #C89A2B 50%, transparent 100%)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(0,168,107,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(0,168,107,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0,168,107,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
        "slide-up": "slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
