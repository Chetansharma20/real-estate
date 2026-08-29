import { notFound } from "next/navigation";
import { Calendar, Clock, ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post = null;

  try {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";
    if (apiUrl.includes("localhost")) {
      apiUrl = apiUrl.replace("localhost", "127.0.0.1");
    }
    const res = await fetch(`${apiUrl}/blog/${slug}`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      if (res.status === 404) return notFound();
    }
    
    const data = await res.json();
    if (data.success && data.data) {
      post = data.data;
    } else {
      return notFound();
    }
  } catch (error) {
    console.error("Failed to fetch blog post details:", error);
    return notFound();
  }

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.content?.substring(0, 160) || post.title,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: { "@type": "Organization", name: "Bricksage Properties Advisory" },
    publisher: {
      "@type": "Organization",
      name: "Bricksage Properties Advisory",
      logo: { "@type": "ImageObject", url: "https://bricksage.in/logo.webp" },
    },
    datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : (post.createdAt ? new Date(post.createdAt).toISOString() : undefined),
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://bricksage.in/blog/${slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bricksage.in" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://bricksage.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://bricksage.in/blog/${slug}` },
    ],
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/blog" className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-[#172033]/50 hover:text-[#D4AF37] transition-colors gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Journal
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Heading & Paragraph */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] sm:text-xs text-[#172033]/50 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {calculateReadTime(post.content)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#D4AF37]" />
                By {post.author?.name || "Bricksage Advisor"}
              </span>
            </div>

            {/* Title / Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-[1.15]">
              {post.title}
            </h1>

            <Separator className="bg-[#D4AF37]/20 w-24 h-1 my-4" />

            {/* Paragraph / Content */}
            <article 
              className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#172033] prose-p:text-[#172033]/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline pt-2"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(post.content, {
                  ALLOWED_TAGS: ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'],
                  ALLOWED_ATTR: ['href', 'target', 'rel'],
                }) 
              }}
            />

          </div>

          {/* RIGHT SIDE: Image (Sticky) */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white group">
              {post.coverImage ? (
                <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172033]/40 to-transparent" />
                </div>
              ) : (
                <div className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4] flex items-center justify-center bg-[#172033]/5 text-[#172033]/20 font-serif text-xl">
                  Bricksage Properties
                </div>
              )}
            </div>

            {/* Optional Small Promo under image */}
            <Card className="border border-[#172033]/10 rounded-2xl bg-white shadow-sm overflow-hidden p-6 mt-8 flex flex-col items-center text-center gap-3">
              <h3 className="font-serif text-lg font-bold text-[#172033]">Find Your Dream Home</h3>
              <p className="text-xs text-[#172033]/50 font-light leading-relaxed">
                Explore our premium listings and exclusive real estate projects today.
              </p>
              <Link href="/projects" className="w-full mt-2">
                <Button className="w-full bg-[#172033] hover:bg-primary hover:text-[#172033] text-white transition-all text-xs uppercase tracking-wider font-semibold">
                  Browse Projects
                </Button>
              </Link>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
