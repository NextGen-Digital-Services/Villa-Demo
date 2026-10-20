"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/hooks/useToast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("pooja.s@example.com");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    const user = await login(email);
    setIsLoading(false);
    showToast("Welcome Back", `Signed in as ${user.name}`, "success");
    if (user.role === "admin") router.push("/admin");
    else if (user.role === "partner") router.push("/partner");
    else router.push("/my-bookings");
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setIsLoading(true);
    const user = await login(demoEmail);
    setIsLoading(false);
    showToast("Welcome Back", `Signed in as ${user.name}`, "success");
    if (user.role === "admin") router.push("/admin");
    else if (user.role === "partner") router.push("/partner");
    else router.push("/my-bookings");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Client & Staff Access</span>
        <h1 className="font-serif text-3xl font-bold text-charcoal">Sign In to VillaOne</h1>
        <p className="text-xs text-stone-soft">Access your reservations, curated wishlists, or portal dashboards</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/30 shadow-xl space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. yourname@example.com"
            required
          />
          <Input
            label="Password (Mock - Any Key)"
            type="password"
            defaultValue="••••••••"
            required
          />
          <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-md" isLoading={isLoading}>
            Sign In &rarr;
          </Button>
        </form>

        <div className="pt-4 border-t border-stone-soft/20 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-soft block text-center">
            One-Click Demo Portals
          </span>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin("pooja.s@example.com")}
              className="p-2.5 rounded-lg border border-stone-soft/25 hover:bg-sand text-left flex items-center justify-between"
            >
              <span>Guest: <strong>Pooja Singhania</strong></span>
              <span className="text-[10px] text-cypress uppercase font-bold">Client</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@villaone.luxury")}
              className="p-2.5 rounded-lg border border-gold/40 hover:bg-gold/10 text-left flex items-center justify-between"
            >
              <span>Admin: <strong>Concierge Director</strong></span>
              <span className="text-[10px] text-gold-dark uppercase font-bold">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("partner@villaone.luxury")}
              className="p-2.5 rounded-lg border border-cypress/30 hover:bg-cypress/10 text-left flex items-center justify-between"
            >
              <span>Owner: <strong>Conte Rossi</strong></span>
              <span className="text-[10px] text-cypress uppercase font-bold">Owner</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-stone-soft">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="text-cypress font-semibold hover:underline">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
}
