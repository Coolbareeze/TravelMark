import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Consistent label + error wrapper for every form field in the site. */
export function FieldWrapper({ label, htmlFor, error, required, className, children }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy-900 dark:text-white">
        {label} {required && <span className="text-royal-600">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const fieldBase =
  "h-12 w-full rounded-xl2 border border-navy-900/12 bg-white px-4 text-[0.95rem] text-navy-900 placeholder:text-navy-900/35 transition focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:bg-white/5 dark:text-white dark:border-white/15";

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn(fieldBase, className)} {...props} />
);

export const Textarea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(fieldBase, "h-auto min-h-[120px] resize-y py-3 leading-relaxed", className)}
    {...props}
  />
);

export const Select = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn(fieldBase, "appearance-none bg-no-repeat pr-10", className)} {...props}>
    {children}
  </select>
);

/** Invisible honeypot field — real users never see or fill it. */
export function Honeypot({ register }: { register: any }) {
  return (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      {...register("website")}
    />
  );
}
