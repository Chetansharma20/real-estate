import { Navbar } from "@/components/layout/navbar";
import dynamic from "next/dynamic";
import { WhatsAppFloater } from "@/components/ui/whatsapp-floater";

import { Footer } from "@/components/layout/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppFloater />
      <Footer />
    </>
  );
}
