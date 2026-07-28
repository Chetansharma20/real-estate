"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calendar, Clock, ChevronLeft, User, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/blog/${slug}`);
        if (res.data.success) {
          setPost(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog post details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#172033]/50 bg-[#F4F6F9]">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Loading article details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#172033]/50 bg-[#F4F6F9] px-4 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#172033]">Article Not Found</h2>
        <p className="text-sm max-w-sm">The blog article you are looking for does not exist or has been removed.</p>
        <Link href="/blog">
          <Button className="bg-[#172033] text-white">Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[#172033]/60 hover:text-[#172033] transition-colors gap-1">
          <ChevronLeft className="w-4 h-4" />
          Back to Insights
        </Link>

        {/* Article Cover & Header Card */}
        <Card className="border border-[#172033]/10 rounded-2xl bg-white shadow-sm overflow-hidden">
          {post.coverImage && (
            <div className="relative h-64 sm:h-96 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-4">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#172033]/40 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {calculateReadTime(post.content)}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-[#D4AF37]" />
                By {post.author?.name || "Bricksage Advisor"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#172033] font-bold leading-tight">
              {post.title}
            </h1>
            
            <Separator className="bg-[#172033]/5 pt-2" />

            {/* Content */}
            <div className="prose prose-slate max-w-none text-[#172033]/80 font-light leading-relaxed text-sm sm:text-base pt-4 whitespace-pre-line space-y-4">
              {post.content}
            </div>
          </div>
        </Card>

        {/* Promo CTA Banner */}
        <Card className="border-none rounded-2xl bg-[#172033] text-white shadow-lg overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <div className="space-y-1 relative z-10 text-center md:text-left">
            <h3 className="font-serif text-lg sm:text-xl font-bold">Looking to Buy, Sell or Invest?</h3>
            <p className="text-xs text-white/60 font-light max-w-lg">
              Explore our premium residential flats, plots, and bespoke commercial listings across major cities.
            </p>
          </div>
          <Link href="/projects" className="relative z-10 w-full md:w-auto">
            <Button className="w-full md:w-auto bg-[#D4AF37] hover:bg-white text-[#172033] font-semibold text-xs uppercase tracking-widest h-11 px-6 rounded-lg transition-all duration-300">
              Browse Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>

      </div>
    </div>
  );
}
