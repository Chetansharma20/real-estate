import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Real Estate Consultants in Mumbai & Thane | Bricksage",
  description:
    "Learn about Bricksage Properties Advisory, the leading real estate consultants in Mumbai & Thane. 30+ years of trusted property advisory experience.",
  alternates: {
    canonical: "https://bricksage.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
