import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bricksage — Real Estate Project Advisory, Mumbai & Thane",
  description:
    "Get in touch with Bricksage Properties Advisory for residential & commercial project advisory across Mumbai & Thane. Book a consultation with our team.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
