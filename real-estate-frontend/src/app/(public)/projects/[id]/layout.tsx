import type { Metadata } from "next";

// SEO overrides for known project slugs — exact meta provided by the audit spec.
// These take priority over the generic database-driven description.
const PROJECT_SEO_OVERRIDES: Record<string, { title: string; description: string; contentIntro: string }> = {
  "dosti-mezzo-22": {
    title: "Dosti Mezzo 22 Sion Thane | Price, Layout & Offers",
    description:
      "Check pricing and layouts for Dosti Mezzo 22 in Sion/Thane. Find premium 2 & 3 BHK flats for sale with exclusive spot booking discounts through Bricksage.",
    contentIntro:
      "Dosti Mezzo 22 Sion Mumbai – Premium Residential Project & Investment Deals. Welcome to Dosti Mezzo 22, an iconic under-construction residential landmark located in the strategic, highly connected hub of Sion, Mumbai.",
  },
  "dosti-willow": {
    title: "Dosti Willow Balkum Thane | Price, Floor Plans & Booking",
    description:
      "Explore Dosti Willow in Balkum, Thane West. Get verified floor plans, 2 & 3 BHK configuration price sheets, lifestyle amenities, and site visit bookings.",
    contentIntro:
      "Dosti Willow Balkum Thane – Elegant Homes at Prime Real Estate Hubs. Introducing Dosti Willow, a pristine cluster of luxury residential towers tucked inside the highly sought-after neighborhood of Balkum, Thane West.",
  },
  "dosti-tulip": {
    title: "Dosti Tulip Thane West | Floor Plan, Pricing & Location",
    description:
      "View Dosti Tulip at Balkum, Thane West. Access real-time price lists, smart 2 BHK floor layouts, construction updates, and zero-brokerage deals.",
    contentIntro:
      "Dosti Tulip Thane West – Smartly Designed Residential Apartments. Welcome to Dosti Tulip, a master-planned community structure delivering premium yet highly practical residential options in Balkum, Thane West.",
  },
  "dosti-planet-north": {
    title: "Dosti Planet North Shilphata | 1 & 2 BHK Flat Bookings",
    description:
      "Explore Dosti Planet North in Shilphata. Get continuous updates on 1 & 2 BHK flat prices, sample flat tours, carpet area layouts, and project location.",
    contentIntro:
      "Dosti Planet North Shilphata – Affordable Luxury 1 & 2 BHK Flats for Sale. Discover Dosti Planet North, a massive premium township project strategically situated along the rapidly growing corridor of Shilphata, Thane.",
  },
  "dosti-pine": {
    title: "Dosti Pine Shilphata Thane | Price List & Floor Layouts",
    description:
      "Check Dosti Pine at Shilphata, Thane. View affordable 1 & 2 BHK residential apartment options, layout plans, pricing charts, and site visit schedules.",
    contentIntro:
      "Dosti Pine Shilphata – Modern Budget-Friendly Living Spaces. Welcome to Dosti Pine, an exclusive residential phase situated within the grand township landscape of Shilphata, Thane.",
  },
  "dosti-olive": {
    title: "Dosti Olive Shilphata | Apartment Prices & Floor Plans",
    description:
      "View Dosti Olive at Shilphata, Thane. Access detailed cost sheets, 1 & 2 BHK configurations, contemporary lifestyle features, and booking updates.",
    contentIntro:
      "Dosti Olive Shilphata – Contemporary Living in an Integrated Township. Discover Dosti Olive, a premium residential phase located inside the thriving master-township at Shilphata, Thane.",
  },
  "dosti-nest": {
    title: "Dosti Nest Balkum Thane | Floor Plans, Price & Bookings",
    description:
      "Explore Dosti Nest at Balkum, Thane West. Find verified pricing, smart 1 BHK space configurations, modern amenities, and zero-brokerage booking deals.",
    contentIntro:
      "Dosti Nest Balkum Thane – Premium Smart Apartments for Modern Buyers. Welcome to Dosti Nest, an outstanding residential haven offering beautifully designed smart living options in the premium zone of Balkum, Thane West.",
  },
  "dosti-greater-thane": {
    title: "Dosti Greater Thane Kalwa | Price List, Floor Plan & Booking",
    description:
      "Discover Dosti Greater Thane in Kalwa. Access 1 & 2 BHK flat pricing charts, mega township layouts, modern amenities, and site tour bookings.",
    contentIntro:
      "Dosti Greater Thane Kalwa – The Ultimate Mega Township Experience. Step into Dosti Greater Thane, a revolutionary mega township development located along the highly profitable and rapidly growing belt of Kalwa, Thane.",
  },
  "dosti-eden": {
    title: "Dosti Eden Thane | Price List, Floor Plans & Bookings",
    description:
      "Explore Dosti Eden in Thane. Get verified details on flat price lists, floor plans, configurations, luxury amenities, and current construction status.",
    contentIntro:
      "Dosti Eden Thane West – Premium New Launch Residential Projects. Welcome to Dosti Eden, an ultra-premium upcoming residential development strategically positioned in the heart of Thane West.",
  },
  "dosti-604": {
    title: "Dosti 604 Thane West | Prices, Floor Layouts & Bookings",
    description:
      "View Dosti 604 in Thane West. Access real-time price sheets, premium apartment layouts, modern lifestyle specifications, and site tour details.",
    contentIntro:
      "Dosti 604 Thane West – Elite Residential Spaces for Modern City Living. Welcome to Dosti 604, a specialized premium residential development designed to offer extreme privacy and modern standard living frameworks in Thane West.",
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  // Check if we have a hardcoded SEO override for this slug
  const override = PROJECT_SEO_OVERRIDES[id];
  if (override) {
    return {
      title: override.title,
      description: override.description,
      alternates: {
        canonical: `https://bricksage.in/projects/${id}`,
      },
      openGraph: {
        title: override.title,
        description: override.description,
        url: `https://bricksage.in/projects/${id}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: override.title,
        description: override.description,
      },
    };
  }

  // Generic database-driven metadata for all other projects
  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
    if (apiUrl.includes("localhost")) {
      apiUrl = apiUrl.replace("localhost", "127.0.0.1");
    }
    const res = await fetch(`${apiUrl}/projects/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const project = data.data;
      if (project) {
        const title = `${project.title || "Property"} | ${project.location || "Mumbai & Thane"} | Bricksage`;
        const description =
          project.metaDescription ||
          (project.description ? project.description.replace(/<[^>]*>?/gm, "").slice(0, 160) : "") ||
          `Explore ${project.title} with verified MahaRERA advisory, floor plans, and pricing in ${project.location || "Mumbai & Thane"}.`;
        
        const imageUrl =
          project.bannerImage ||
          (project.images && project.images.length > 0
            ? typeof project.images[0] === "string"
              ? project.images[0]
              : project.images[0].url
            : undefined);

        return {
          title,
          description,
          alternates: {
            canonical: `https://bricksage.in/projects/${project.slug || id}`,
          },
          openGraph: {
            title,
            description,
            url: `https://bricksage.in/projects/${project.slug || id}`,
            images: imageUrl ? [{ url: imageUrl, alt: project.title }] : [],
            type: "website",
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
          },
        };
      }
    }
  } catch (error) {
    // Silent fallback
  }

  return {
    title: "Luxury Real Estate Project | Bricksage Advisory",
    description: "Explore verified residential and commercial developments across Mumbai and Thane.",
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
