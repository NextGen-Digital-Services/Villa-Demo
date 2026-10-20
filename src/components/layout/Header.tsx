"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, MessageSquare, User, Shield, LogOut } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-soft/20 bg-ivory/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-cypress transition-colors group-hover:text-cypress-light">
              VillaOne
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold mb-1" />
          </Link>
          <NavLinks className="hidden lg:flex" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20VillaOne%20Concierge,%20I%20am%20inquiring%20about%20a%20luxury%20villa`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-stone-soft/30 hover:border-cypress/40 bg-white/70 transition-colors text-xs font-medium text-charcoal"
              >
                <div className="w-6 h-6 rounded-full bg-cypress text-ivory flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-ivory border border-stone-soft/30 shadow-xl py-2 z-50 text-xs"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-stone-soft/20 text-stone-soft">
                    Signed in as <span className="font-semibold text-charcoal">{user.name}</span>
                  </div>
                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-sand text-charcoal font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-gold-dark" />
                    My Bookings
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-sand text-charcoal font-medium"
                  >
                    <User className="w-3.5 h-3.5 text-stone-soft" />
                    Guest Profile
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-sand text-cypress font-medium"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Admin Portal
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-2 px-4 py-2.5 hover:bg-sand text-red-600 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold tracking-wider uppercase text-cypress hover:text-terracotta px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-sand transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />
    </header>
  );
}
