import { Navbar } from "@/components/layout/navbar";
import dynamic from "next/dynamic";
import { WhatsAppFloater } from "@/components/ui/whatsapp-floater";

// Lazy load Footer — it's below-the-fold, not LCP-critical, and was causing CLS 1.000
const Footer = dynamic(() => import("@/components/layout/footer").then(m => ({ default: m.Footer })), {
  ssr: false,
  loading: () => <div style={{ height: "480px", background: "#172033" }} aria-hidden="true" />,
});

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
