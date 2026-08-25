import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redevelopment Projects in Mulund West – Advisory & Expertise",
  description: "Learn about Bricksage and our expertise in redevelopment projects in Mulund West, as well as upcoming residential developments and real estate opportunities.",
  alternates: {
    canonical: "https://bricksage.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
