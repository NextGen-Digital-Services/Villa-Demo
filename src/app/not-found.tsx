import * as React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-sand/60 text-gold-dark flex items-center justify-center border border-stone-soft/20">
        <Compass className="w-10 h-10 stroke-1" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
          404 &bull; Estate Not Located
        </span>
        <h2 className="font-serif text-4xl font-semibold text-charcoal">
          This Sanctuary Does Not Exist
        </h2>
        <p className="text-sm text-stone-soft leading-relaxed font-light">
          The villa URL or page you requested may have been relocated or updated in our catalog.
        </p>
      </div>

      <div className="flex gap-4 pt-2">
        <Link href="/villas">
          <Button variant="primary" size="md">
            Browse All Villas
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
