import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Bricksage Properties Advisory",
  description: "Learn about Bricksage Properties Advisory — one of India's fastest-growing real estate advisory firms based in Mulund, Mumbai.",
  alternates: {
    canonical: "https://bricksage.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
