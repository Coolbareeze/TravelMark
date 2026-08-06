"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, MapPin, Newspaper, MessageSquareQuote, LogOut, ExternalLink } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages & Offers", icon: Package },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-navy-900/8 bg-white dark:border-white/10 dark:bg-navy-900">
      <div className="flex h-20 items-center border-b border-navy-900/8 px-6 dark:border-white/10">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl2 px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-navy-900 text-white"
                  : "text-navy-700 hover:bg-navy-900/5 dark:text-white/70 dark:hover:bg-white/10"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-navy-900/8 p-4 dark:border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl2 px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-900/5 dark:text-white/70 dark:hover:bg-white/10"
        >
          <ExternalLink className="h-4 w-4" />
          View Website
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
