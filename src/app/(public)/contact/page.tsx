"use client";

import * as React from "react";
import { Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/hooks/useToast";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsLoading(false);
    setIsSubmitted(true);
    showToast("Inquiry Received", "Our senior concierge will reach out within 2 hours.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Private Concierge Desk</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-charcoal">Get in Touch</h1>
        <p className="text-sm text-stone-soft leading-relaxed font-light">
          Whether planning an intimate retreat or seeking a private estate consultation, our dedicated team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-soft/25 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal">Direct Concierge Channels</h3>
            <div className="space-y-3 text-xs text-charcoal">
              <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-sand/40 hover:bg-sand transition-colors">
                <Phone className="w-4 h-4 text-cypress shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-medium border border-[#25D366]/30">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Concierge (24/7 Priority)</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-sand/40 hover:bg-sand transition-colors">
                <Mail className="w-4 h-4 text-cypress shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-sand/30 border border-stone-soft/25 space-y-3 text-xs text-stone-soft">
            <h4 className="font-serif font-bold text-base text-charcoal">Private Ateliers</h4>
            <p><strong className="text-charcoal">Mumbai Flagship:</strong> {siteConfig.contact.addressMumbai}</p>
            <p><strong className="text-charcoal">Goa Coastal Office:</strong> {siteConfig.contact.addressGoa}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="p-10 rounded-3xl bg-white border border-stone-soft/25 text-center space-y-4 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-charcoal">Thank You, {name}</h3>
              <p className="text-xs text-stone-soft max-w-sm mx-auto leading-relaxed">
                Your dossier has been routed to our senior concierge. You will receive a direct WhatsApp and email consultation.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-stone-soft/25 shadow-xs space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Your Name" placeholder="e.g. Vikramaditya Roy" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Email Address" type="email" placeholder="e.g. vikram@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Input label="Phone Number" type="tel" placeholder="e.g. +91 98110 33445" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80">Message / Stay Inquiry</label>
                <textarea rows={4} placeholder="Tell us your desired destination, approximate dates, party size, or specific requirements..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg border border-stone-soft/30 p-3 bg-white text-xs text-charcoal focus:outline-none focus:border-gold" required />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-md" isLoading={isLoading}>
                Submit Inquiry to Concierge &rarr;
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
