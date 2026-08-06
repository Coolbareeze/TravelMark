import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="section bg-gradient-to-br from-navy-900 to-royal-800">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-xl3 border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm md:p-14">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
            <Mail className="h-6 w-6" />
          </span>
          <h2 className="mt-6 text-display-sm text-white">Never Miss a Fare Drop</h2>
          <p className="mt-3 max-w-md text-white/70">
            Join 30,000+ subscribers getting first access to Travel Mark's exclusive fares,
            flash sales and new destination launches.
          </p>
          <div className="mt-8">
            <NewsletterForm variant="dark" />
          </div>
          <p className="mt-4 text-xs text-white/40">
            No spam, ever. Unsubscribe anytime. Read our{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
