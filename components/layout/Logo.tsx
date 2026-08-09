import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo. This is a placeholder wordmark — per the brief, the final
 * logo will be supplied separately. Swap /public/images/logo.svg (and
 * logo-white.svg for dark surfaces / favicon.svg) with the real artwork
 * and every usage across the site updates automatically.
 */
export function Logo({ variant = "default", className }: { variant?: "default" | "white"; className?: string }) {
  return (
    <Link href="/" aria-label="Travel Mark — home" className={className}>
      <Image
        src={variant === "white" ? "/images/logo-white.svg" : "/images/logo.svg"}
        alt="Travel Mark"
        width={168}
        height={38}
        priority
        className="h-9 w-auto [.theme-preview_&]:hidden"
      />
      {/* Real logo artwork (from the brand guidelines), scoped to the
          /home1 preview only via the .theme-preview wrapper — the light
          background placeholder above still renders everywhere else. */}
      {variant !== "white" && (
        <Image
          src="/images/logo-brand-horizontal.png"
          alt="Travel Mark"
          width={208}
          height={40}
          priority
          className="hidden h-10 w-auto [.theme-preview_&]:block"
        />
      )}
    </Link>
  );
}
