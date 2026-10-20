"use client";

import * as React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { showToast } from "@/hooks/useToast";

export default function AdminSettingsPage() {
  const [phone, setPhone] = React.useState(siteConfig.contact.phone);
  const [email, setEmail] = React.useState(siteConfig.contact.email);
  const [whatsapp, setWhatsapp] = React.useState(siteConfig.contact.whatsapp);
  const [gstRate, setGstRate] = React.useState("18");
  const [commission, setCommission] = React.useState("15");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings Saved", "System configuration parameters updated.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <AdminHeader
        title="Platform & Concierge Settings"
        subtitle="Configure tax parameters, brand contacts, and operational rules"
      />

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/20 shadow-xs space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-charcoal">Global Contact Coordinates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Concierge Hotline" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Official Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="WhatsApp Direct (without +)" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-soft/20">
          <h3 className="font-serif text-lg font-bold text-charcoal">Tax & Commission Policies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Standard Hospitality GST (%)" type="number" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
            <Input label="Owner Platform Commission (%)" type="number" value={commission} onChange={(e) => setCommission(e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-stone-soft/20">
          <Button type="submit" variant="primary" size="md">Save Global Settings</Button>
        </div>
      </form>
    </div>
  );
}
