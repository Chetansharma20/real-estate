"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImagePlus, Loader2, X, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BlogEditor from "@/components/admin/BlogEditor";
import DOMPurify from "isomorphic-dompurify";

interface BlogPageFormProps {
  initialData?: any;
}

export default function BlogPageForm({ initialData }: BlogPageFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    excerpt: initialData?.excerpt || "",
    locality: initialData?.locality || "",
    tags: initialData?.tags?.join(", ") || "",
    content: initialData?.content || "",
    published: initialData?.published || false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.coverImage || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => {
      const updated = { ...prev, [id]: value };
      if (id === "title" && !isEdit) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleEditorChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("slug", formData.slug);
      fd.append("metaTitle", formData.metaTitle);
      fd.append("metaDescription", formData.metaDescription);
      fd.append("excerpt", formData.excerpt);
      fd.append("locality", formData.locality);
      fd.append("tags", formData.tags);
      
      const sanitizedContent = DOMPurify.sanitize(formData.content, {
        ALLOWED_TAGS: ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
      fd.append("content", sanitizedContent);
      
      fd.append("published", String(formData.published));
      
      if (imageFile) {
        fd.append("coverImage", imageFile);
      } else if (!imagePreview && isEdit) {
        // If image was removed during edit
        fd.append("coverImage", "");
      }

      let res;
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      
      if (isEdit) {
        res = await api.patch(`/admin/blog/${initialData.id}`, fd, config);
      } else {
        res = await api.post("/admin/blog", fd, config);
      }

      if (res.data.success) {
        toast({ title: "Success", description: `Blog post ${isEdit ? "updated" : "created"} successfully.` });
        router.push("/admin/blogs");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Failed to save blog post:", error);
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to save blog post", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/admin/blogs")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold tracking-tight text-[#172033]">
          {isEdit ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg border border-[#172033]/10 shadow-sm">
        
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title <span className="text-red-500">*</span></Label>
            <Input id="title" required value={formData.title} onChange={handleInputChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL <span className="text-red-500">*</span></Label>
            <Input id="slug" required value={formData.slug} onChange={handleInputChange} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Cover Image</Label>
            <div className="flex gap-4 items-start mt-1">
              {imagePreview ? (
                <div className="relative w-48 h-32 rounded-md overflow-hidden border border-[#172033]/20">
                  <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-black/75 rounded-full p-1 text-white hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-48 h-32 border-2 border-dashed border-[#172033]/20 hover:border-[#172033]/40 hover:bg-[#F4F6F9] rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors"
                >
                  <ImagePlus className="w-6 h-6 text-[#172033]/40 mb-2" />
                  <span className="text-xs text-[#172033]/50 font-medium">Upload Cover</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="space-y-2">
          <Label>Blog Content <span className="text-red-500">*</span></Label>
          <BlogEditor content={formData.content} onChange={handleEditorChange} />
        </div>

        {/* SEO & Meta */}
        <div className="space-y-6 pt-6 border-t border-[#172033]/10">
          <h3 className="font-semibold text-lg text-[#172033]">SEO & Metadata</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
              <Input id="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="Optimal length 50-60 characters" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locality">Locality / Area</Label>
              <Input id="locality" value={formData.locality} onChange={handleInputChange} placeholder="e.g. Bandra West, Mumbai" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
              <textarea
                id="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                className="flex min-h-[80px] w-full rounded-md border border-[#172033]/20 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                placeholder="Optimal length 150-160 characters"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt">Short Excerpt (Shown on blog list page)</Label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="flex min-h-[80px] w-full rounded-md border border-[#172033]/20 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags (Comma-separated)</Label>
              <Input id="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. Real Estate, Investment, Mumbai" />
            </div>
          </div>
        </div>

        {/* Publishing */}
        <div className="pt-6 border-t border-[#172033]/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="published"
              className="border-[#172033]/30 data-[state=checked]:bg-[#172033]"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked as boolean }))}
            />
            <Label htmlFor="published" className="cursor-pointer font-medium text-[#172033]/80">
              Publish immediately
            </Label>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blogs")}
              className="bg-white text-[#172033] border-[#172033]/20 hover:bg-[#F4F6F9]"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#172033] text-white hover:bg-primary">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isEdit ? "Update Post" : "Save Post"}
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}
