import { CheckCircle2 } from "lucide-react";

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
          <span className="text-navy-800 dark:text-white/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}
