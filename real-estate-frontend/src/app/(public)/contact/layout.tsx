import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Real Estate Office in Mulund West | Bricksage",
  description:
    "Contact Bricksage Properties Advisory in Mulund West, Mumbai. Call +91 99875 10672 for premium under-construction and new project site visits.",
  alternates: {
    canonical: "https://bricksage.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
