import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential & Commercial Projects in Mumbai & Thane | Bricksage",
  description:
    "Explore residential and commercial projects across Mumbai & Thane with Bricksage. RERA-approved developments with expert project advisory support.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
