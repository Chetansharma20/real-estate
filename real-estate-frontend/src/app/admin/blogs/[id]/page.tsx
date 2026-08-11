"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import BlogPageForm from "@/components/admin/blogs/BlogPageForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Find the post from the paginated admin list or fetch directly if there's a backend endpoint
        // The backend doesn't have a GET /admin/blog/:id endpoint explicitly in admin.routes.ts
        // Wait, let's fetch all and find it, or if it has a public /blog/:id endpoint, we can use that (but it's by slug).
        // Let's use the public list or the admin list to find the post.
        const res = await api.get(`/admin/blog?limit=100`);
        if (res.data.success) {
          const found = res.data.data.posts.find((p: any) => p.id === id);
          if (found) {
            setPost(found);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#172033]/50" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
        <h3 className="text-xl font-medium text-[#172033]">Post not found</h3>
      </div>
    );
  }

  return <BlogPageForm initialData={post} />;
}
