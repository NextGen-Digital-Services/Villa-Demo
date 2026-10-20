"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/hooks/useToast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsLoading(true);
    await authService.register(name, email, phone);
    setIsLoading(false);
    showToast("Account Created", `Welcome to VillaOne, ${name}.`, "success");
    router.push("/my-bookings");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Privilege Membership</span>
        <h1 className="font-serif text-3xl font-bold text-charcoal">Create Client Profile</h1>
        <p className="text-xs text-stone-soft">Enjoy priority booking, concierge services, and bespoke rates</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/30 shadow-xl space-y-6">
        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Full Name" placeholder="e.g. Gayatri Singhania" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email Address" type="email" placeholder="e.g. gayatri@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Mobile / WhatsApp Number" type="tel" placeholder="e.g. 98201 11223" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input label="Password" type="password" defaultValue="••••••••" required />

          <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-md" isLoading={isLoading}>
            Create Membership Account &rarr;
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-soft">
          Already have a profile?{" "}
          <Link href="/login" className="text-cypress font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
