import * as React from "react";
import { villaService } from "@/services/villaService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";

export default async function AdminAvailabilityPage() {
  const villas = await villaService.getAllVillas();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Availability & Blocked Dates"
        subtitle="Manage calendar slots, private holds, and maintenance periods"
      />
      <AvailabilityManager villas={villas} />
    </div>
  );
}
