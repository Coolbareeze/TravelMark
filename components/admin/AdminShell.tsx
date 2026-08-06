"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="flex bg-surface dark:bg-navy-950">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        <main className="min-h-screen p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
