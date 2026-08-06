import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions governing bookings made with Travel Mark Ltd.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="6 August 2026">
      <p>
        These terms and conditions govern all bookings made with {COMPANY.legalName}, registered
        office at {COMPANY.address.full}. By booking with us, you agree to be bound by these
        terms.
      </p>

      <h2>1. Booking & Payment</h2>
      <p>
        A booking is confirmed once we have received your deposit or full payment and issued a
        confirmation invoice. Prices are subject to change until a booking is confirmed. Balance
        payments are due by the date specified on your confirmation invoice.
      </p>

      <h2>2. ATOL Protection</h2>
      <p>
        Most flight-inclusive holidays we sell are ATOL protected under {COMPANY.trust.atolNumber}.
        When you pay for such a holiday, you will receive an ATOL Certificate confirming what is
        protected and where to find more information.
      </p>

      <h2>3. Cancellations by You</h2>
      <p>
        Cancellation charges apply on a sliding scale depending on how close to departure you
        cancel, as set out in your booking confirmation. We strongly recommend adequate travel
        insurance to cover cancellation costs.
      </p>

      <h2>4. Changes & Cancellations by Us</h2>
      <p>
        Occasionally we may need to make changes to your booking due to circumstances outside our
        control (including supplier failure, industrial action, or force majeure events). Where
        possible, we will offer an alternative or a refund in line with applicable regulations.
      </p>

      <h2>5. Your Responsibilities</h2>
      <p>
        You are responsible for ensuring you hold a valid passport, any required visas, and
        appropriate travel insurance for your trip. We can advise on requirements but cannot
        guarantee entry to any country.
      </p>

      <h2>6. Complaints</h2>
      <p>
        If something goes wrong during your trip, please notify our team or your supplier as soon
        as possible so we can try to resolve the issue. Written complaints should be sent within
        28 days of your return.
      </p>

      <h2>7. Liability</h2>
      <p>
        Our liability for holidays sold under the Package Travel Regulations is as set out in
        those regulations. For flight-only or accommodation-only bookings acting as agent, our
        liability is limited to our role in arranging the booking.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and any disputes will be
        subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>
    </LegalLayout>
  );
}
