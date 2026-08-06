import { PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-surface dark:bg-navy-900">
      <div className="container flex flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-gold-400">
          <PlaneTakeoff className="h-8 w-8" />
        </span>
        <p className="mt-6 font-heading text-6xl font-extrabold text-navy-900 dark:text-white">404</p>
        <h1 className="mt-2 text-2xl font-heading font-bold text-navy-900 dark:text-white">
          Looks like this page took a different flight.
        </h1>
        <p className="mt-3 max-w-md text-navy-700/70 dark:text-white/60">
          The page you're looking for doesn't exist or may have moved. Let's get you back on
          course.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
