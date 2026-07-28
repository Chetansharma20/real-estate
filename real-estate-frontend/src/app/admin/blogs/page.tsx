"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { usePaginationFetch } from "@/hooks/use-pagination-fetch";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import BlogForm from "@/components/admin/blogs/blog-form";
import BlogList from "@/components/admin/blogs/blog-list";

export default function AdminBlogsPage() {
  const {
    data: posts,
    isLoading,
    currentPage,
    totalPages,
    fetchData: fetchPosts,
  } = usePaginationFetch<any>({ endpoint: "/admin/blog", limit: 8, dataKey: "posts" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    published: false,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      published: false,
    });
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
    setEditId(null);
  };

  const openEditModal = (post: any) => {
    setEditId(post.id);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      content: post.content || "",
      published: post.published || false,
    });
    setImagePreview(post.coverImage || null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("slug", formData.slug);
      fd.append("content", formData.content);
      fd.append("published", String(formData.published));
      if (imageFile) {
        fd.append("coverImage", imageFile);
      }

      let res;
      if (editId) {
        res = await api.patch(`/admin/blog/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/admin/blog", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        setIsModalOpen(false);
        resetForm();
        fetchPosts(currentPage);
      }
    } catch (error) {
      console.error("Failed to save blog post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await api.delete(`/admin/blog/${postId}`);
        if (res.data.success) {
          fetchPosts(currentPage);
        }
      } catch (error) {
        console.error("Failed to delete blog post:", error);
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

        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            if (!open) resetForm();
            setIsModalOpen(open);
          }}
        >
          <DialogTrigger
            render={
              <Button className="bg-[#172033] hover:bg-primary text-white hover:text-[#172033]">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            }
          />

          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-[#172033] border-[#172033]/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#172033]">
                {editId ? "Edit Blog Post" : "Create Blog Post"}
              </DialogTitle>
              <DialogDescription>Write compelling content to publish on your website.</DialogDescription>
            </DialogHeader>

            <BlogForm
              formData={formData}
              setFormData={setFormData}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              imageFile={imageFile}
              setImageFile={setImageFile}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={() => {
                resetForm();
                setIsModalOpen(false);
              }}
              isEdit={!!editId}
            />
          </DialogContent>
        </Dialog>
      </div>

      <BlogList posts={posts} isLoading={isLoading} onEdit={openEditModal} onDelete={handleDelete} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchPosts}
      />
    </div>
  );
}
