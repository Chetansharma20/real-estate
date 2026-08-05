import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bricksage — Real Estate Project Advisory Team, Mumbai & Thane",
  description:
    "Meet the Bricksage team — experienced real estate project advisors helping buyers across Mumbai & Thane find the right residential or commercial development.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
