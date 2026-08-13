import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo — real artwork from the TravelMark brand guidelines.
 * "default" is the dark-text lockup for light surfaces; "white" recolors
 * the wordmark for dark surfaces (footer, dark mode) while keeping the
 * gold icon gradient untouched.
 */
export function Logo({ variant = "default", className }: { variant?: "default" | "white"; className?: string }) {
  return (
    <Link href="/" aria-label="Travel Mark — home" className={className}>
      <Image
        src={variant === "white" ? "/images/logo-brand-horizontal-white.png" : "/images/logo-brand-horizontal.png"}
        alt="Travel Mark"
        width={208}
        height={40}
        priority
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
