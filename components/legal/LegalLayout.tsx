import { COMPANY } from "@/lib/constants";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section bg-white dark:bg-navy-950">
      <div className="container max-w-3xl pt-16">
        <h1 className="text-display-sm text-navy-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-navy-500 dark:text-white/50">Last updated: {lastUpdated}</p>
        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-royal-600 dark:prose-invert">
          {children}
        </div>
        <p className="mt-10 text-sm text-navy-500 dark:text-white/50">
          Questions about this policy? Contact us at{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-royal-600 dark:text-sky-400">
            {COMPANY.email}
          </a>{" "}
          or write to us at {COMPANY.address.full}.
        </p>
      </div>
    </section>
  );
}
