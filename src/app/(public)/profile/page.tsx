"use client";

import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { CustomerProfileForm } from "@/components/customer/CustomerProfileForm";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-24 text-center font-serif italic text-stone-soft">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="font-serif text-xl">Please sign in to view your profile.</p>
        <a href="/login" className="text-xs uppercase tracking-wider font-bold text-cypress underline">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Account Dossier</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">Guest Profile & Preferences</h1>
      </div>

      <CustomerProfileForm user={user} />
    </div>
  );
}
