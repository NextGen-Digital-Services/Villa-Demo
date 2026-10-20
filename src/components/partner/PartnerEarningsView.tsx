import * as React from "react";
import { Building2, CheckCircle2 } from "lucide-react";
import { OwnerPartner } from "@/types";
import { formatCurrency } from "@/lib/formatters";

interface PartnerEarningsViewProps {
  owner: OwnerPartner;
}

export function PartnerEarningsView({ owner }: PartnerEarningsViewProps) {
  const payouts = [
    { date: "Oct 01, 2026", ref: "SETTL_VO_98214", amount: 480000, status: "Transferred" },
    { date: "Sep 01, 2026", ref: "SETTL_VO_91044", amount: 620000, status: "Transferred" },
    { date: "Aug 01, 2026", ref: "SETTL_VO_87220", amount: 540000, status: "Transferred" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-2xl border border-stone-soft/20 p-6 shadow-xs space-y-4">
        <h3 className="font-serif text-lg font-bold text-charcoal">Historical Owner Settlements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand/40 border-b text-stone-soft font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Payout Reference</th>
                <th className="py-2.5 px-3">Net Disbursed</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-soft/15">
              {payouts.map((p, idx) => (
                <tr key={idx} className="hover:bg-sand/20">
                  <td className="py-2.5 px-3 text-stone-soft">{p.date}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-charcoal">{p.ref}</td>
                  <td className="py-2.5 px-3 font-serif font-bold text-cypress">{formatCurrency(p.amount)}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-soft/20 p-6 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 text-cypress">
          <Building2 className="w-5 h-5 text-gold-dark" />
          <h4 className="font-serif font-bold text-base text-charcoal">Registered Bank Account</h4>
        </div>
        <div className="p-3.5 rounded-xl bg-sand/30 border space-y-1.5 text-stone-soft">
          <p>Bank: <strong className="text-charcoal">{owner.bankAccount.bankName}</strong></p>
          <p>Beneficiary: <strong className="text-charcoal">{owner.bankAccount.accountHolder}</strong></p>
          <p>Account: <strong className="text-charcoal font-mono">{owner.bankAccount.accountNumber}</strong></p>
          <p>IFSC: <strong className="text-charcoal font-mono">{owner.bankAccount.ifscCode}</strong></p>
        </div>
        <p className="text-[11px] text-stone-soft leading-relaxed">
          Settlements are automatically dispatched on the 1st of each calendar month after guest checkout completion.
        </p>
      </div>
    </div>
  );
}
