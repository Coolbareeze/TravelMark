import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: "How Travel Mark Ltd uses cookies and similar technologies on this website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="6 August 2026">
      <p>
        This Cookie Policy explains how Travel Mark Ltd uses cookies and similar technologies to
        recognise you when you visit our website.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small data files placed on your device when you visit a website. They are
        widely used to make websites work, or work more efficiently, as well as to provide
        reporting information.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <h3>Essential Cookies</h3>
      <p>
        Required for the website to function, such as remembering your cookie consent choice and
        keeping your session secure. These cannot be switched off.
      </p>
      <h3>Analytics Cookies</h3>
      <p>
        Help us understand how visitors interact with our website (e.g. Google Analytics,
        Microsoft Clarity) so we can improve the experience.
      </p>
      <h3>Marketing Cookies</h3>
      <p>
        Used to deliver relevant advertising and measure the effectiveness of our marketing
        campaigns (e.g. Meta Pixel, Google Tag Manager).
      </p>

      <h2>3. Managing Your Preferences</h2>
      <p>
        You can accept or decline non-essential cookies using the cookie banner shown on your
        first visit. You can also control cookies through your browser settings at any time.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Some cookies are set by third-party services that appear on our pages, such as embedded
        maps or analytics providers. We do not control these cookies directly.
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in the cookies we
        use or for operational, legal or regulatory reasons.
      </p>
    </LegalLayout>
  );
}
