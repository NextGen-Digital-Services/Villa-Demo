import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { AiConciergeDrawer } from "@/components/layout/AiConciergeDrawer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-ivory">
      <Header />
      <main className="flex-1">{children}</main>
      <FloatingWhatsApp />
      <AiConciergeDrawer />
      <Footer />
    </div>
  );
}
