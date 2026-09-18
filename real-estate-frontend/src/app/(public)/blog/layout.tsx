import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Insights & Property Buying Guides Mumbai | Bricksage",
  description:
    "Read the latest real estate insights, property buying guides, and market trends in Mumbai and Thane. Make informed property investment decisions.",
  alternates: {
    canonical: "https://bricksage.in/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
