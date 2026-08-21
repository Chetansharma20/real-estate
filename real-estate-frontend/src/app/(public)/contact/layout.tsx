import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Bricksage Properties Advisory",
  description: "Get in touch with Bricksage Properties Advisory. Visit our office in Mulund West, Mumbai or call +91-99875-10672 for property consultations.",
  alternates: {
    canonical: "https://bricksage.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
