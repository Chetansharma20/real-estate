import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
    if (apiUrl.includes("localhost")) {
      apiUrl = apiUrl.replace("localhost", "127.0.0.1");
    }
    const res = await fetch(`${apiUrl}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const post = data.data;
      if (post) {
        const title = `${post.title || "Real Estate Guide"} | Bricksage Blog`;
        const description =
          post.metaDescription ||
          (post.excerpt ? post.excerpt.slice(0, 160) : "") ||
          (post.content ? post.content.replace(/<[^>]*>?/gm, "").slice(0, 160) : "") ||
          "Read the latest real estate insights, property guides, and market trends across Mumbai & Thane.";
        
        const imageUrl = post.coverImage || post.image;

        return {
          title,
          description,
          openGraph: {
            title,
            description,
            url: `https://bricksage.in/blog/${post.slug || slug}`,
            images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
            type: "article",
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
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
    title: "Real Estate Article & Insights | Bricksage Blog",
    description: "Read the latest market trends, homebuyer guides, and real estate news across Mumbai and Thane.",
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
