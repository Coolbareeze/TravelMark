import type { Config } from "tailwindcss";

// Travel Mark Ltd — brand design system
//
// Colors are wired through CSS custom properties (--tm-*, defined in
// globals.css) rather than raw hex, so a scoped wrapper class can swap the
// entire palette for a subtree without touching this file or any component.
// Default (:root) values are the LIVE navy/gold aviation palette; the
// `.theme-preview` class (used only by the temporary /home1 preview route)
// swaps them for an Opodo-style black + orange palette. Every component
// still just uses bg-navy-900 / text-gold-400 / etc. as before.
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
          DEFAULT: "rgb(var(--tm-navy-900) / <alpha-value>)",
          50: "rgb(var(--tm-navy-50) / <alpha-value>)",
          100: "rgb(var(--tm-navy-100) / <alpha-value>)",
          200: "rgb(var(--tm-navy-200) / <alpha-value>)",
          300: "rgb(var(--tm-navy-300) / <alpha-value>)",
          400: "rgb(var(--tm-navy-400) / <alpha-value>)",
          500: "rgb(var(--tm-navy-500) / <alpha-value>)",
          600: "rgb(var(--tm-navy-600) / <alpha-value>)",
          700: "rgb(var(--tm-navy-700) / <alpha-value>)",
          800: "rgb(var(--tm-navy-800) / <alpha-value>)",
          900: "rgb(var(--tm-navy-900) / <alpha-value>)",
          950: "rgb(var(--tm-navy-950) / <alpha-value>)",
        },
        royal: {
          DEFAULT: "rgb(var(--tm-royal-600) / <alpha-value>)",
          50: "rgb(var(--tm-royal-50) / <alpha-value>)",
          100: "rgb(var(--tm-royal-100) / <alpha-value>)",
          200: "rgb(var(--tm-royal-200) / <alpha-value>)",
          300: "rgb(var(--tm-royal-300) / <alpha-value>)",
          400: "rgb(var(--tm-royal-400) / <alpha-value>)",
          500: "rgb(var(--tm-royal-500) / <alpha-value>)",
          600: "rgb(var(--tm-royal-600) / <alpha-value>)",
          700: "rgb(var(--tm-royal-700) / <alpha-value>)",
          800: "rgb(var(--tm-royal-800) / <alpha-value>)",
          900: "rgb(var(--tm-royal-900) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--tm-gold-500) / <alpha-value>)",
          50: "rgb(var(--tm-gold-50) / <alpha-value>)",
          100: "rgb(var(--tm-gold-100) / <alpha-value>)",
          200: "rgb(var(--tm-gold-200) / <alpha-value>)",
          300: "rgb(var(--tm-gold-300) / <alpha-value>)",
          400: "rgb(var(--tm-gold-400) / <alpha-value>)",
          500: "rgb(var(--tm-gold-500) / <alpha-value>)",
          600: "rgb(var(--tm-gold-600) / <alpha-value>)",
          700: "rgb(var(--tm-gold-700) / <alpha-value>)",
          800: "rgb(var(--tm-gold-800) / <alpha-value>)",
          900: "rgb(var(--tm-gold-900) / <alpha-value>)",
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
          DEFAULT: "rgb(var(--tm-success-500) / <alpha-value>)",
          50: "rgb(var(--tm-success-50) / <alpha-value>)",
          500: "rgb(var(--tm-success-500) / <alpha-value>)",
          600: "rgb(var(--tm-success-600) / <alpha-value>)",
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
        soft: "0 2px 8px -2px rgb(var(--tm-navy-900) / 0.06), 0 8px 24px -8px rgb(var(--tm-navy-900) / 0.08)",
        elevated: "0 8px 30px -8px rgb(var(--tm-navy-900) / 0.16), 0 24px 60px -24px rgb(var(--tm-navy-900) / 0.18)",
        gold: "0 8px 24px -6px rgb(var(--tm-gold-500) / 0.35)",
        "inner-line": "inset 0 0 0 1px rgb(var(--tm-navy-900) / 0.06)",
      },
      backgroundImage: {
        "navy-fade": "linear-gradient(180deg, rgb(var(--tm-navy-950) / 0) 0%, rgb(var(--tm-navy-950) / 0.92) 100%)",
        "hero-scrim": "linear-gradient(180deg, rgb(var(--tm-navy-950) / 0.55) 0%, rgb(var(--tm-navy-950) / 0.35) 40%, rgb(var(--tm-navy-950) / 0.85) 100%)",
        "gold-line": "linear-gradient(90deg, transparent 0%, rgb(var(--tm-gold-500)) 50%, transparent 100%)",
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
          "0%": { boxShadow: "0 0 0 0 rgb(var(--tm-success-500) / 0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgb(var(--tm-success-500) / 0)" },
          "100%": { boxShadow: "0 0 0 0 rgb(var(--tm-success-500) / 0)" },
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
