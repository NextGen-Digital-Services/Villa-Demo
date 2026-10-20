"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error for observation
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
          Notice of Interruption
        </span>
        <h2 className="font-serif text-3xl font-semibold text-charcoal">
          Something Went Unexpectedly
        </h2>
        <p className="text-xs text-stone-soft leading-relaxed">
          Our concierge engineering team has been notified. You may retry or return to our villa sanctuaries.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="md" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="primary" size="md">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
