"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PublicBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page: number = currentPage) => {
    try {
      setIsLoading(true);
      // Fetch only published blog posts
      const res = await api.get(`/blog?page=${page}&limit=6&published=true`);
      if (res.data.success) {
        const responseData = res.data.data.data || res.data.data;
        if (responseData && responseData.posts) {
          setPosts(responseData.posts);
          setTotalPages(responseData.pagination.totalPages);
          setCurrentPage(responseData.pagination.currentPage);
        } else {
          setPosts(responseData || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bricksage.in" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://bricksage.in/blog" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">— Read Our News</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">Real Estate Insights & Buying Guides</h1>
          <p className="text-[#172033]/50 font-light text-sm sm:text-base">
            Stay updated with latest real estate trends, luxury home decor advisory, investment guides, and market analysis.
          </p>
        </div>

        {/* Blog Post Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-[#172033]/10 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-[#172033]/8" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-[#172033]/8 rounded w-1/3" />
                  <div className="h-5 bg-[#172033]/10 rounded w-4/5" />
                  <div className="h-4 bg-[#172033]/6 rounded w-full" />
                  <div className="h-4 bg-[#172033]/6 rounded w-3/4" />
                  <div className="h-8 bg-[#172033]/8 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#172033]/10 rounded-xl text-[#172033]/40">
            No articles published yet. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col bg-white border border-[#172033]/10 shadow-sm hover:shadow-md transition-all rounded-xl group h-full">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden bg-[#172033]/5">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#172033]/20 bg-[#172033]/5 text-xs font-semibold">
                      Bricksage Properties
                    </div>
                  )}
                </div>

                {/* Content Panel */}
                <CardHeader className="p-5 pb-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#172033]/40 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {calculateReadTime(post.content)}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#172033] font-bold line-clamp-2 mt-2 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="px-5 py-2 flex-grow">
                  <p className="text-[#172033]/60 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                    {post.content.replace(/[#*`_\[\]-]/g, "")}
                  </p>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="px-5 pb-5 pt-4 flex justify-between items-center border-t border-[#172033]/5 bg-[#F8F9FA]/50 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-[#172033]/60">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                      {post.author?.name?.slice(0, 2).toUpperCase() || "AD"}
                    </div>
                    <span className="truncate max-w-[120px] font-medium">{post.author?.name || "Advisor"}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="text-[#172033] hover:text-[#D4AF37] hover:bg-transparent p-0 text-xs font-semibold uppercase tracking-wider group transition-colors gap-1.5">
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchPosts(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white text-[#172033] border-[#172033]/10 hover:bg-[#F4F6F9] rounded-lg"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => fetchPosts(page)}
                  className={
                    currentPage === page
                      ? "bg-[#172033] text-white hover:bg-[#172033] rounded-lg"
                      : "bg-white text-[#172033] border-[#172033]/10 hover:bg-[#F4F6F9] rounded-lg"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchPosts(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white text-[#172033] border-[#172033]/10 hover:bg-[#F4F6F9] rounded-lg"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
