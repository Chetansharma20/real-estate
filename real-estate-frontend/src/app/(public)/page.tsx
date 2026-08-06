import { HomeSections } from "@/components/layout/home-sections";
import { api } from "@/lib/api";

export const metadata = {
  title: "Residential & Commercial Project Advisory in Mumbai & Thane | Bricksage",
  description:
    "Bricksage Properties Advisory offers end-to-end real estate project advisory across Mumbai & Thane — residential & commercial developments. Trusted, RERA-compliant advisory.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I choose a real estate advisor in Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Look for an advisor with a valid MahaRERA agent registration, a transparent fee structure, and a track record across the specific locality you're considering. A good advisor should compare multiple projects honestly rather than pushing a single developer's inventory."
      }
    },
    {
      "@type": "Question",
      "name": "Is Mulund a good area to invest in real estate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mulund is a well-established, well-connected suburb in Mumbai with strong social infrastructure, growing residential demand, and steady appreciation. It's particularly attractive for buyers wanting proximity to both Mumbai and Thane."
      }
    },
    {
      "@type": "Question",
      "name": "How do I verify RERA registration of a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can verify any project's RERA registration on the official MahaRERA website (maharera.maharashtra.gov.in) by searching the project's registration number. Bricksage also lists the RERA number for every project we advise on, on our RERA Disclosure page."
      }
    }
  ]
};

export default async function HomePage() {
  // Fetch initial data on the server for fast SSR and SEO
  let initialProjects = [];
  let statsCount = 17;

  try {
    const [projectsRes, statsRes] = await Promise.all([
      api.get("/projects?limit=20&featured=true"),
      api.get("/projects?limit=1")
    ]);

    if (projectsRes.data?.success) {
      initialProjects = (projectsRes.data.data.projects || []).slice(0, 4);
    }
    
    if (statsRes.data?.success) {
      const responseData = statsRes.data.data.data || statsRes.data.data;
      statsCount = responseData.pagination?.totalItems || responseData.length || 17;
    }
  } catch (error) {
    console.error("Failed to fetch initial data for homepage:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="sr-only">Real Estate Project Advisory in Mumbai & Thane</h1>
      <HomeSections initialProjects={initialProjects} initialStatsCount={statsCount} />
    </>
  );
}
