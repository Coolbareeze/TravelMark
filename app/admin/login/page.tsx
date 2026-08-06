"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Input, FieldWrapper } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Login failed");
      }
      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm rounded-xl3 bg-white p-8 shadow-elevated dark:bg-navy-800">
        <div className="flex flex-col items-center">
          <Logo />
          <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-4 font-heading text-xl font-bold text-navy-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-navy-500 dark:text-white/50">Sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <FieldWrapper label="Username" htmlFor="username">
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </FieldWrapper>
          <FieldWrapper label="Password" htmlFor="password">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </FieldWrapper>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-navy-400 dark:text-white/40">
          Default credentials are set via ADMIN_USERNAME / ADMIN_PASSWORD in .env.local
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
