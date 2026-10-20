import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  subLabel?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, subLabel, id, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-4 h-4 rounded border border-stone-soft/40 bg-white transition-all peer-checked:bg-cypress peer-checked:border-cypress peer-focus:ring-2 peer-focus:ring-gold/50 group-hover:border-cypress/70",
              className
            )}
          />
          <Check className="w-3 h-3 text-ivory absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {(label || subLabel) && (
          <div className="text-xs">
            {label && <p className="font-medium text-charcoal">{label}</p>}
            {subLabel && <p className="text-stone-soft mt-0.5">{subLabel}</p>}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
