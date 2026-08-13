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
  // The Islamic (Deep Emerald / Islamic Gold / Warm Ivory) palette is now
  // live on the real Hajj & Umrah section — /umrah-hajj gets the full
  // header/footer/content treatment here. (Individual package detail
  // pages under /holiday-packages/[slug] apply the same theme-islamic
  // class themselves, content-only, when that package's category is
  // "umrah-hajj" — see that page — since this pathname check can't see
  // a dynamic route's data.) /home1 and /home2 were preview routes for
  // the general site palette; /home1's brand colors were approved and
  // promoted to the site-wide :root default, and /home2 (Navy/Teal/Gold)
  // was not chosen, so both preview routes have been retired.
  const themeScopeClass = pathname?.startsWith("/umrah-hajj") ? "theme-islamic" : undefined;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className={themeScopeClass}>
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
