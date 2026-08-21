import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Insights & News | Bricksage Blog",
  description: "Stay updated with the latest trends, investment insights, and market news about Mumbai and Thane real estate from Bricksage experts.",
  alternates: {
    canonical: "https://bricksage.in/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
