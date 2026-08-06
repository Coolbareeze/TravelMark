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

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen />
      <Header />
      <main id="main-content" className="min-h-screen pb-16 pt-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <MobileBottomBar />
      <CookieBanner />
    </>
  );
}
