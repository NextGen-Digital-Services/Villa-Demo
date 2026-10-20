"use client";

import * as React from "react";
import { User, Mail, Phone } from "lucide-react";
import { GuestDetails } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface GuestDetailsStepProps {
  initialDetails: GuestDetails;
  onSubmit: (details: GuestDetails) => void;
  onBack?: () => void;
}

export function GuestDetailsStep({ initialDetails, onSubmit, onBack }: GuestDetailsStepProps) {
  const [details, setDetails] = React.useState<GuestDetails>(initialDetails);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!details.firstName.trim()) newErrors.firstName = "First name is required";
    if (!details.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!details.email.trim() || !details.email.includes("@")) {
      newErrors.email = "Valid email address is required for confirmation receipt";
    }
    if (!details.phone.trim() || details.phone.length < 10) {
      newErrors.phone = "Valid 10-digit mobile number required for concierge access";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(details);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/30 shadow-xs">
      <div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal">
          Guest Information & Stays
        </h3>
        <p className="text-xs text-stone-soft mt-1">
          Provide primary guest contact information for security and check-in access.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="e.g. Pooja"
          value={details.firstName}
          onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
          error={errors.firstName}
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Singhania"
          value={details.lastName}
          onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
          error={errors.lastName}
          leftIcon={<User className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. pooja@example.com"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
          helperText="Booking voucher will be sent here"
        />
        <Input
          label="Phone / WhatsApp Number"
          type="tel"
          placeholder="e.g. 98201 11223"
          value={details.phone}
          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          error={errors.phone}
          leftIcon={<Phone className="w-4 h-4" />}
          helperText="For concierge arrival coordination"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80">
          Dietary Preferences & Allergies
        </label>
        <input
          type="text"
          placeholder="e.g. Vegetarian, Gluten-free pasta, Nut allergy, Jain options"
          value={details.dietaryPreferences || ""}
          onChange={(e) => setDetails({ ...details, dietaryPreferences: e.target.value })}
          className="w-full rounded-lg border border-stone-soft/30 bg-white/80 px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium uppercase tracking-wider text-charcoal/80">
          Special Requests for Concierge
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Anniversary candlelight table setup, airport speedboat transfer, baby cot required"
          value={details.specialRequests || ""}
          onChange={(e) => setDetails({ ...details, specialRequests: e.target.value })}
          className="w-full rounded-lg border border-stone-soft/30 bg-white/80 p-3 text-sm text-charcoal focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-stone-soft/20">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : <div />}
        <Button type="submit" variant="primary" size="lg" className="font-bold px-8">
          Continue to Payment &rarr;
        </Button>
      </div>
    </form>
  );
}
