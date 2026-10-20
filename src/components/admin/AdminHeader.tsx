"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-stone-soft/20 gap-4">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">{title}</h1>
        {subtitle && <p className="text-xs text-stone-soft mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {action}
        <div className="flex items-center gap-3 pl-4 border-l border-stone-soft/20">
          <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="hidden sm:block text-right text-xs">
            <p className="font-semibold text-charcoal">{user?.name || "Admin Director"}</p>
            <p className="text-[10px] text-stone-soft">Portal Manager</p>
          </div>
          <button
            onClick={() => logout()}
            className="p-2 rounded-lg text-stone-soft hover:text-red-600 hover:bg-sand"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
