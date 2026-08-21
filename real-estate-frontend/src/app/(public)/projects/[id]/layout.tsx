import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
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
