import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Construction in Thane Low Budget – Get Expert Guidance",
  description: "Connect with Bricksage for budget-friendly new construction options in Thane. Get advice on new projects and upcoming real estate developments in the area.",
  alternates: {
    canonical: "https://bricksage.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
