import { Navbar } from "@/components/layout/navbar";
import dynamic from "next/dynamic";
import { WhatsAppFloater } from "@/components/ui/whatsapp-floater";

// Lazy load Footer JS — SSR on (HTML mein rahega for SEO), sirf JS code-split hoga
const Footer = dynamic(() => import("@/components/layout/footer").then(m => ({ default: m.Footer })), {
  ssr: true,
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
