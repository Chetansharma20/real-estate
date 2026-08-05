import { HomeSections } from "@/components/layout/home-sections";

export const metadata = {
  title: "Residential & Commercial Project Advisory in Mumbai & Thane | Bricksage",
  description:
    "Bricksage Properties Advisory offers end-to-end real estate project advisory across Mumbai & Thane — residential & commercial developments. Trusted, RERA-compliant advisory.",
};

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">Real Estate Project Advisory in Mumbai & Thane</h1>
      <HomeSections />
    </>
  );
}
