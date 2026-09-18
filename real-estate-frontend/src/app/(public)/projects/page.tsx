import { Suspense } from "react";
import PropertiesPageContent from "@/components/property/properties-page-content";

// Server Component shell — fetches initial project data for SSR so Google crawler
// can read project names instead of seeing "Loading properties..."
export default async function PublicPropertiesPage() {
  let initialProjects: any[] = [];

  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
    if (apiUrl.includes("localhost")) {
      apiUrl = apiUrl.replace("localhost", "127.0.0.1");
    }
    const res = await fetch(`${apiUrl}/projects?limit=9`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success) {
        initialProjects = data.data?.projects || [];
      }
    }
  } catch (err) {
    // Silently fall back to empty — client-side fetch will handle it
    console.error("SSR projects fetch failed:", err);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bricksage.in" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://bricksage.in/projects" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense
        fallback={
          <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 flex items-center justify-center text-[#172033]/60 font-semibold text-lg">
            Loading properties...
          </div>
        }
      >
        <PropertiesPageContent initialProjects={initialProjects} />
      </Suspense>
    </>
  );
}
