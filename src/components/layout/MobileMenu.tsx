"use client";

import * as React from "react";
import Link from "next/link";
import { X, Phone, MessageSquare, User, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NavLinks } from "./NavLinks";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string; role: string } | null;
}

export function MobileMenu({ isOpen, onClose, user }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-ivory border-l border-stone-soft/30 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-stone-soft/20">
            <span className="font-serif text-2xl font-bold tracking-tight text-cypress">
              VillaOne
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-soft hover:text-charcoal hover:bg-sand"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6">
            <NavLinks
              className="flex-col items-start gap-4"
              itemClassName="text-sm py-2 text-charcoal hover:text-cypress"
              onItemClick={onClose}
            />
          </div>

          <div className="pt-4 border-t border-stone-soft/20 space-y-3">
            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-sm font-medium text-charcoal hover:text-cypress p-2 rounded-lg hover:bg-sand"
                >
                  <User className="w-4 h-4 text-gold-dark" />
                  My Bookings & Stays
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center gap-2.5 text-sm font-medium text-cypress hover:text-cypress-dark p-2 rounded-lg bg-cypress/10"
                  >
                    <Shield className="w-4 h-4 text-cypress" />
                    Admin Portal
                  </Link>
                )}
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={onClose}>
                  <Button variant="outline" size="sm" className="w-full">
                    Client Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={onClose}>
                  <Button variant="primary" size="sm" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-stone-soft/20 space-y-3">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20VillaOne%20Concierge,%20I%20am%20inquiring%20about%20a%20luxury%20villa`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#25D366]/10 text-[#128C7E] font-medium text-xs tracking-wider uppercase border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Concierge
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center justify-center gap-2 text-xs text-stone-soft hover:text-charcoal"
          >
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
