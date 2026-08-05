import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Insights & Guides — Mumbai & Thane | Bricksage Blog",
  description:
    "Buying guides, locality insights, and real estate project trends for Mumbai & Thane homebuyers — from the Bricksage advisory team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
