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
  // /home1, /home2 and /home2-umrah are temporary, unlinked routes used to
  // preview alternate color schemes — see app/home1, app/home2,
  // app/home2-umrah and the .theme-* tokens in globals.css. Wrapping the
  // whole chrome (not just the page content) in the matching class means
  // the header/footer/floating buttons preview consistently too, without
  // affecting any other route. Order matters: /home2-umrah must be
  // checked before /home2 since it also starts with "/home2".
  const themeScopeClass = pathname?.startsWith("/home2-umrah")
    ? "theme-islamic"
    : pathname?.startsWith("/home2")
      ? "theme-preview-v2"
      : pathname?.startsWith("/home1")
        ? "theme-preview"
        : undefined;

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
