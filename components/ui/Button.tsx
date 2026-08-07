"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-semibold transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:shadow-elevated active:bg-navy-900",
  secondary:
    "bg-royal-600 text-white shadow-soft hover:bg-royal-700 hover:shadow-elevated",
  gold: "bg-accent-500 text-accent-fg shadow-accent hover:bg-accent-400",
  outline:
    "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/30 hover:bg-navy-50 dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/5",
  ghost: "text-navy-900 hover:bg-navy-900/5 dark:text-white dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[0.95rem]",
  lg: "h-14 px-9 text-base",
};

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps>;

/**
 * Premium pill button with a ripple-on-click micro-interaction.
 * Renders a Next.js <Link> automatically when `href` is provided.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, className, children, onClick, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    function handleRipple(e: React.MouseEvent<HTMLElement>) {
      const target = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const rect = target.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
      circle.className =
        "pointer-events-none absolute rounded-full bg-white/40 animate-[ripple_600ms_ease-out]";
      target.appendChild(circle);
      window.setTimeout(() => circle.remove(), 650);
    }

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          onClick={(e) => {
            handleRipple(e);
          }}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        onClick={(e) => {
          handleRipple(e);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
