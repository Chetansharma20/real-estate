"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { usePaginationFetch } from "@/hooks/use-pagination-fetch";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BlogList from "@/components/admin/blogs/blog-list";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBlogsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    data: posts,
    isLoading,
    currentPage,
    totalPages,
    fetchData: fetchPosts,
  } = usePaginationFetch<any>({ endpoint: "/admin/blog", limit: 8, dataKey: "posts" });

  const openEditPage = (post: any) => {
    router.push(`/admin/blogs/${post.id}`);
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await api.delete(`/admin/blog/${postId}`);
        if (res.data.success) {
          toast({ title: "Success", description: "Blog post deleted successfully." });
          fetchPosts(currentPage);
        }
      } catch (error: any) {
        console.error("Failed to delete blog post:", error);
        toast({ 
          title: "Error", 
          description: error.response?.data?.message || "Failed to delete blog post", 
          variant: "destructive" 
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#172033]">Blog Posts</h2>
          <p className="text-[#172033]/60 text-sm mt-1">
            Write, edit, and publish blogs for the public site
          </p>
        </div>

        <Link href="/admin/blogs/new">
          <Button className="bg-[#172033] hover:bg-primary text-white hover:text-[#172033]">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <BlogList posts={posts} isLoading={isLoading} onEdit={openEditPage} onDelete={handleDelete} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchPosts}
      />
    </div>
  );
}
