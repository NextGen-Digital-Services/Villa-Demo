import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Eye } from "lucide-react";
import { ownerService } from "@/services/ownerService";
import { villaService } from "@/services/villaService";
import { PartnerStats } from "@/components/partner/PartnerStats";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function PartnerDashboardPage() {
  const owners = await ownerService.getOwners();
  const currentOwner = owners[0]; // Conte Alessandro Rossi

  const allVillas = await villaService.getAllVillas();
  const myVillas = allVillas.filter((v) => v.ownerId === currentOwner.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-stone-soft/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Partner Atelier</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">{currentOwner.name}</h1>
          <p className="text-xs text-stone-soft mt-1">Hospitality portfolio overview & guest stays</p>
        </div>

        <Link href="/partner/list-villa">
          <Button variant="primary" size="md" className="gap-2 font-bold shadow-md">
            <PlusCircle className="w-4 h-4" />
            <span>List a New Estate</span>
          </Button>
        </Link>
      </div>

      <PartnerStats
        villaCount={myVillas.length}
        totalEarnings={currentOwner.totalEarnings}
        pendingPayout={currentOwner.pendingPayout}
      />

      <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-charcoal">My Enrolled Properties</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand/40 border-b text-stone-soft uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Estate</th>
                <th className="py-2.5 px-3">Destination</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Nightly Rate</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-soft/15">
              {myVillas.map((v) => (
                <tr key={v.id} className="hover:bg-sand/20">
                  <td className="py-2.5 px-3 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-sand shrink-0">
                      <Image src={v.images[0] || "/images/hero/hero_main.jpg"} alt={v.name} fill className="object-cover" />
                    </div>
                    <span className="font-semibold text-charcoal">{v.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-charcoal">{v.destination}</td>
                  <td className="py-2.5 px-3"><Badge variant="sand" size="sm">{v.category}</Badge></td>
                  <td className="py-2.5 px-3 font-serif font-bold text-charcoal">{formatCurrency(v.pricePerNight)}</td>
                  <td className="py-2.5 px-3 font-semibold">{v.rating} ★</td>
                  <td className="py-2.5 px-3 text-right">
                    <Link href={`/villas/${v.slug}`} target="_blank" className="p-1.5 text-stone-soft hover:text-cypress inline-block">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
