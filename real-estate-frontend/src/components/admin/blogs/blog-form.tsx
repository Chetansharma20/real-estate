"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImagePlus, Loader2, X } from "lucide-react";

interface BlogFormProps {
  formData: {
    title: string;
    slug: string;
    content: string;
    published: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export default function BlogForm({
  formData,
  setFormData,
  imagePreview,
  setImagePreview,
  imageFile,
  setImageFile,
  isSubmitting,
  onSubmit,
  onCancel,
  isEdit,
}: BlogFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1">
          <Label htmlFor="title">Post Title</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="border-[#172033]/20"
          />
        </div>

        <div className="col-span-2 space-y-1">
          <Label htmlFor="slug">Slug URL</Label>
          <Input
            id="slug"
            required
            value={formData.slug}
            onChange={handleInputChange}
            className="border-[#172033]/20"
          />
        </div>

        <div className="col-span-2 space-y-1">
          <Label>Cover Image</Label>
          <div className="flex gap-4 items-start mt-1">
            {imagePreview ? (
              <div className="relative w-40 h-24 rounded-md overflow-hidden border border-[#172033]/20">
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
                className="w-40 h-24 border-2 border-dashed border-[#172033]/20 hover:border-[#172033]/40 hover:bg-[#F4F6F9] rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors"
              >
                <ImagePlus className="w-5 h-5 text-[#172033]/40 mb-1" />
                <span className="text-[10px] text-[#172033]/50 font-medium">Upload Cover</span>
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
            className="flex min-h-[250px] w-full rounded-md border border-[#172033]/20 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50"
            placeholder="Start writing in markdown or plain text..."
          />
        </div>

        <div className="col-span-2 flex items-center space-x-2 pt-2">
          <Checkbox
            id="published"
            className="border-[#172033]/30 data-[state=checked]:bg-[#172033]"
            checked={formData.published}
            onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, published: checked as boolean }))}
          />
          <Label htmlFor="published" className="cursor-pointer font-medium text-[#172033]/80 text-sm">
            Publish immediately (make visible to public site)
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[#172033]/10">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-white text-[#172033] border-[#172033]/20 hover:bg-[#F4F6F9] hover:text-[#172033]"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-[#172033] text-white">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {isEdit ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
