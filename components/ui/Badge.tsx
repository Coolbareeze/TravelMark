import { cn } from "@/lib/utils";

type Tone = "gold" | "navy" | "success" | "sky" | "white";

const tones: Record<Tone, string> = {
  gold: "bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-500/30",
  navy: "bg-navy-900/5 text-navy-900 ring-1 ring-inset ring-navy-900/10 dark:bg-white/10 dark:text-white dark:ring-white/15",
  success: "bg-success-50 text-success-600 ring-1 ring-inset ring-success-500/25",
  sky: "bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-500/25",
  white: "bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur",
};

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
