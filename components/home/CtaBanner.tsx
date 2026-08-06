import { PhoneCall, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="bg-gold-500">
      <div className="container flex flex-col items-center gap-6 py-14 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="font-heading text-2xl font-bold text-navy-900 md:text-3xl">
            Ready to book your next adventure?
          </h2>
          <p className="mt-1 text-navy-900/70">
            Speak to a consultant today — no call centres, no scripts, just real advice.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={COMPANY.phoneHref} variant="primary" size="lg">
            <PhoneCall className="h-4 w-4" /> Call an Expert
          </Button>
          <Button
            href={`${COMPANY.whatsappHref}`}
            variant="outline"
            size="lg"
            className="!border-navy-900/20 !bg-white"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
