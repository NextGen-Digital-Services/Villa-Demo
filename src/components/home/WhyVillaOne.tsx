import * as React from "react";
import { ShieldCheck, Utensils, Sparkles, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function WhyVillaOne() {
  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "Handpicked Architectural Audits",
      description: "Each property is vetted through a rigorous 120-point quality audit covering architectural authenticity, linen thread counts, and acoustics.",
    },
    {
      icon: <Utensils className="w-6 h-6 text-gold" />,
      title: "Private Chef & Butler Care",
      description: "Trained in regional Italian pasta making and regional Indian delicacies, our private chefs provide bespoke table dining for your private party.",
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      title: "24/7 Dedicated Concierge",
      description: "From luxury airport speedboats to private vineyard sommeliers and helicopter charters, our personal concierge coordinates every detail.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      title: "Transparent Best Rates",
      description: "Direct owner partnerships guarantee the best rates, flexible advance payment structures, and verified secure transactions.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="The VillaOne Standard"
        title="Why Discerning Guests Choose VillaOne"
        description="We believe true luxury is quiet, effortless, and deeply personal."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-stone-soft/20 shadow-xs hover:border-gold/50 transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-sand flex items-center justify-center">
              {pillar.icon}
            </div>
            <h4 className="font-serif text-lg font-semibold text-charcoal">
              {pillar.title}
            </h4>
            <p className="text-xs text-stone-soft leading-relaxed font-light">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
