import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium uppercase tracking-wider text-charcoal/80"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-stone-soft">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-lg border bg-white/80 px-4 py-2.5 text-sm text-charcoal transition-all placeholder:text-stone-soft/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold",
              leftIcon ? "pl-10" : "",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-stone-soft/30 hover:border-stone-soft/60",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-stone-soft mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
