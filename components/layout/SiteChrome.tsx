"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

/**
 * The public site's chrome (header, footer, floating buttons...) — omitted
 * entirely on /admin routes, which render their own dashboard shell instead.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  // /home1 is a temporary, unlinked route used to preview an alternate
  // color scheme — see app/home1/page.tsx and the `.theme-preview` tokens
  // in globals.css. Wrapping the whole chrome (not just the page content)
  // in that class here means the header/footer/floating buttons preview
  // consistently too, without affecting any other route.
  const isColorPreview = pathname?.startsWith("/home1");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className={isColorPreview ? "theme-preview" : undefined}>
      <LoadingScreen />
      <Header />
      <main id="main-content" className="min-h-screen pb-16 pt-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <MobileBottomBar />
      <CookieBanner />
    </div>
  );
}
