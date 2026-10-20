"use client";

import * as React from "react";
import { User as UserType } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/hooks/useToast";

interface CustomerProfileFormProps {
  user: UserType;
}

export function CustomerProfileForm({ user }: CustomerProfileFormProps) {
  const [name, setName] = React.useState(user.name);
  const [phone, setPhone] = React.useState(user.phone || "+91 98201 11223");
  const [preferredDest, setPreferredDest] = React.useState("Goa");
  const [dietary, setDietary] = React.useState("Pescatarian");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 600));
    showToast("Profile Updated", "Your preferences have been saved.", "success");
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/30 shadow-xs space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b border-stone-soft/20">
        <div className="w-16 h-16 rounded-full bg-cypress text-ivory flex items-center justify-center font-serif text-2xl font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold text-charcoal">{name}</h3>
          <p className="text-xs text-stone-soft">{user.email} &bull; Verified Client</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email Address" value={user.email} disabled />
        <Input label="Contact Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80">Preferred Destination</label>
          <select value={preferredDest} onChange={(e) => setPreferredDest(e.target.value)} className="w-full rounded-lg border border-stone-soft/30 bg-white/80 px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
            <option value="Goa">Goa</option>
            <option value="Alibaug">Alibaug</option>
            <option value="Lonavala">Lonavala</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Manali">Manali</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80">Bespoke Dietary & Hospitality Notes</label>
        <textarea rows={2} value={dietary} onChange={(e) => setDietary(e.target.value)} className="w-full rounded-lg border border-stone-soft/30 bg-white/80 p-3 text-sm text-charcoal focus:outline-none focus:border-gold" />
      </div>

      <div className="flex justify-end pt-4 border-t border-stone-soft/20">
        <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
          Save Preferences
        </Button>
      </div>
    </form>
  );
}
