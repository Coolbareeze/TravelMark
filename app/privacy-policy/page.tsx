import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Travel Mark Ltd collects, uses and protects your personal data.",
  path: "/privacy-policy",
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="6 August 2026">
      <p>
        Travel Mark Ltd ("we", "us", "our") is committed to protecting your privacy. This policy
        explains what personal data we collect, how we use it, and the rights you have over your
        information under UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly, including when you:</p>
      <ul>
        <li>Submit a contact, quote, holiday, visa or corporate travel enquiry form</li>
        <li>Subscribe to our newsletter</li>
        <li>Book a flight, holiday package or ancillary service</li>
        <li>Contact us by phone, email or WhatsApp</li>
      </ul>
      <p>
        This may include your name, email address, phone number, travel preferences, passport
        details (where required for a booking), and payment information (processed securely by
        our payment providers — we do not store full card details).
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process bookings, quotes and enquiries</li>
        <li>Communicate with you about your trip, including essential travel updates</li>
        <li>Send marketing communications where you have opted in (you can unsubscribe anytime)</li>
        <li>Comply with legal and regulatory obligations, including ATOL requirements</li>
        <li>Improve our website and services</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We share necessary booking information with airlines, hotels, insurers and other travel
        suppliers required to fulfil your trip. We do not sell your personal data to third
        parties.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain personal data for as long as necessary to fulfil the purposes described in this
        policy, including any legal, accounting or reporting requirements.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Under UK GDPR, you have the right to access, correct, delete, or restrict processing of
        your personal data, and the right to data portability and to object to processing. To
        exercise these rights, contact us using the details below.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website uses cookies to improve functionality and analyse traffic. See our{" "}
        <a href="/cookie-policy">Cookie Policy</a> for full details.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard security measures, including SSL encryption and secure payment
        processing, to protect your personal data.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The "last updated" date at the top of this
        page reflects the most recent revision.
      </p>
    </LegalLayout>
  );
}
