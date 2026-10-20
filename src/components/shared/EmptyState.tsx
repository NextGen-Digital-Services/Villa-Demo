import * as React from "react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <Compass className="w-10 h-10 text-gold-dark stroke-1" />,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-16 px-6 text-center max-w-md mx-auto flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-sand/60 flex items-center justify-center mb-4 border border-stone-soft/20">
        {icon}
      </div>
      <h3 className="font-serif text-2xl font-semibold text-charcoal mb-2">
        {title}
      </h3>
      <p className="text-sm text-stone-soft mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
