"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, Pencil, Trash2, ImagePlus, X, ExternalLink } from "lucide-react";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    published: false,
  });

  const fetchPosts = async (page: number = currentPage) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/blog?page=${page}&limit=8`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [id]: value };
      if (id === "title" && !editId) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
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
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          <h2 className="text-2xl font-semibold text-[#0B132B]">Blog Posts</h2>
          <p className="text-[#0B132B]/60 text-sm mt-1">Write, edit, and publish blogs for the public site</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsModalOpen(open); }}>
          <DialogTrigger
            render={<Button className="bg-[#0B132B] hover:bg-primary text-white hover:text-[#0B132B]" />}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </DialogTrigger>

          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-[#0B132B] border-[#0B132B]/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#0B132B]">
                {editId ? "Edit Blog Post" : "Create Blog Post"}
              </DialogTitle>
              <DialogDescription>Write compelling content to publish on your website.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <Label htmlFor="title">Post Title</Label>
                  <Input id="title" required value={formData.title} onChange={handleInputChange} className="border-[#0B132B]/20" />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input id="slug" required value={formData.slug} onChange={handleInputChange} className="border-[#0B132B]/20" />
                </div>

                <div className="col-span-2 space-y-1">
                  <Label>Cover Image</Label>
                  <div className="flex gap-4 items-start mt-1">
                    {imagePreview ? (
                      <div className="relative w-40 h-24 rounded-md overflow-hidden border border-[#0B132B]/20">
                        <img src={imagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-1 right-1 bg-black/75 rounded-full p-1 text-white hover:bg-black transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-40 h-24 border-2 border-dashed border-[#0B132B]/20 hover:border-[#0B132B]/40 hover:bg-[#F4F6F9] rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors"
                      >
                        <ImagePlus className="w-5 h-5 text-[#0B132B]/40 mb-1" />
                        <span className="text-[10px] text-[#0B132B]/50 font-medium">Upload Cover</span>
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

                <div className="col-span-2 space-y-1">
                  <Label htmlFor="content">Blog Content</Label>
                  <textarea
                    id="content"
                    required
                    value={formData.content}
                    onChange={handleInputChange}
                    className="flex min-h-[250px] w-full rounded-md border border-[#0B132B]/20 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50"
                    placeholder="Start writing in markdown or plain text..."
                  />
                </div>

                <div className="col-span-2 flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="published"
                    className="border-[#0B132B]/30 data-[state=checked]:bg-[#0B132B]"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
                  />
                  <Label htmlFor="published" className="cursor-pointer font-medium text-[#0B132B]/80 text-sm">
                    Publish immediately (make visible to public site)
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#0B132B]/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { resetForm(); setIsModalOpen(false); }}
                  className="bg-white text-[#0B132B] border-[#0B132B]/20 hover:bg-[#F4F6F9] hover:text-[#0B132B]"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#0B132B] text-white">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editId ? "Update Post" : "Publish Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#0B132B]/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F4F6F9]">
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Title</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Slug</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Status</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Author</TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-[#0B132B]/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading blog posts...
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-[#0B132B]/50">
                  No blog posts found. Click &quot;New Post&quot; to write one.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.coverImage ? (
                      <div className="w-16 h-10 rounded-md overflow-hidden bg-gray-100 border border-[#0B132B]/10">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded-md bg-gray-100 border border-[#0B132B]/10 flex items-center justify-center text-gray-400 text-[10px]">
                        No Cover
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-[#0B132B]">
                    {post.title}
                    <div className="text-[10px] text-[#0B132B]/40 font-normal mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#0B132B]/60 text-sm">{post.slug}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      post.published 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {post.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#0B132B]/70 text-sm">
                    {post.author?.name || "System"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <a
                        href={`/blogs/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center h-8 w-8 text-[#0B132B]/50 hover:text-[#0B132B]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openEditModal(post)}
                        className="h-8 w-8 text-[#0B132B]/50 hover:text-[#0B132B]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(post.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPosts(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
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
                    ? "bg-[#0B132B] text-white hover:bg-[#0B132B]"
                    : "bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
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
            className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
