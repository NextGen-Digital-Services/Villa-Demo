import * as React from "react";
import { customerService } from "@/services/customerService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CustomersTable } from "@/components/admin/CustomersTable";

export default async function AdminCustomersPage() {
  const customers = await customerService.getCustomers();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Guest Directory & VIP Clients"
        subtitle="Profiles, total lifetime stays, and hospitality preferences"
      />
      <CustomersTable customers={customers} />
    </div>
  );
}
