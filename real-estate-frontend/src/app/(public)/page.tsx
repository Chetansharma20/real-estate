import { Metadata } from "next";
import { HomeSections } from "@/components/layout/home-sections";

export const revalidate = 3600; // Cache the homepage for 1 hour to stabilize Lighthouse scores

export const metadata: Metadata = {
  title: "Upcoming Residential Projects in Mulund West | Bricksage",
  description:
    "Discover upcoming residential projects in Mulund West & Thane with Bricksage Properties. Trusted real estate advisory in Mumbai with 0% brokerage.",
  alternates: {
    canonical: "https://bricksage.in/",
  },
  openGraph: {
    type: "website",
    url: "https://bricksage.in/",
    siteName: "Bricksage Properties Advisory",
    title: "Upcoming Residential Projects in Mulund West | Bricksage",
    description:
      "Discover upcoming residential projects in Mulund West & Thane with Bricksage Properties. Trusted real estate advisory in Mumbai with 0% brokerage.",
    images: [
      {
        url: "https://res.cloudinary.com/duvw71tdz/image/upload/real-estate/frontend/hero/hero-slide-1.webp",
        width: 1200,
        height: 630,
        alt: "Bricksage Properties Advisory — Upcoming Residential Projects in Mulund West & Thane",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bricksage",
    title: "Upcoming Residential Projects in Mulund West | Bricksage",
    description:
      "Discover upcoming residential projects in Mulund West & Thane with Bricksage Properties. Trusted real estate advisory in Mumbai with 0% brokerage.",
    images: [
      "https://res.cloudinary.com/duvw71tdz/image/upload/real-estate/frontend/hero/hero-slide-1.webp",
    ],
  },
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
    // Use 127.0.0.1 instead of localhost — Node.js 18+ resolves localhost to IPv6 (::1)
    // but the backend listens on IPv4 (127.0.0.1), causing ECONNREFUSED
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
    if (apiUrl.includes("localhost")) {
      apiUrl = apiUrl.replace("localhost", "127.0.0.1");
    }

    const [projectsRes, statsRes] = await Promise.all([
      fetch(`${apiUrl}/projects?limit=20&featured=true`, { next: { revalidate: 3600 } }),
      fetch(`${apiUrl}/projects?limit=1`, { next: { revalidate: 3600 } }),
    ]);

    if (projectsRes.ok) {
      const projectsData = await projectsRes.json();
      if (projectsData?.success) {
        initialProjects = (projectsData.data.projects || []).slice(0, 4);
      }
    }

    if (statsRes.ok) {
      const statsData = await statsRes.json();
      if (statsData?.success) {
        const responseData = statsData.data.data || statsData.data;
        statsCount = responseData.pagination?.totalItems || responseData.length || 17;
      }
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
      <h1 className="sr-only">Upcoming Residential Projects in Mulund West & Thane</h1>
      <HomeSections initialProjects={initialProjects} initialStatsCount={statsCount} />
    </>
  );
}
