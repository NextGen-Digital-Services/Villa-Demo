"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-gold-dark shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 bg-emerald-50/95",
    error: "border-red-200 bg-red-50/95",
    warning: "border-amber-200 bg-amber-50/95",
    info: "border-gold/30 bg-ivory",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur transition-all duration-300 animate-in slide-in-from-bottom-5",
            borders[toast.type]
          )}
        >
          {icons[toast.type]}
          <div className="flex-1 text-sm">
            <h4 className="font-semibold text-charcoal">{toast.title}</h4>
            {toast.description && (
              <p className="text-stone-soft text-xs mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-stone-soft hover:text-charcoal p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
