"use client";

import React from "react";
import { ExternalLink, Loader2, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface BlogListProps {
  posts: any[];
  isLoading: boolean;
  onEdit: (post: any) => void;
  onDelete: (postId: string) => void;
}

export default function BlogList({
  posts,
  isLoading,
  onEdit,
  onDelete,
}: BlogListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#172033]/10 overflow-hidden w-full">
      <Table>
        <TableHeader className="bg-[#F4F6F9]">
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="font-semibold text-[#172033]">Title</TableHead>
            <TableHead className="font-semibold text-[#172033]">Slug</TableHead>
            <TableHead className="font-semibold text-[#172033]">Status</TableHead>
            <TableHead className="font-semibold text-[#172033]">Author</TableHead>
            <TableHead className="w-[100px] text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-[#172033]/50">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                Loading blog posts...
              </TableCell>
            </TableRow>
          ) : posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-[#172033]/50">
                No blog posts found. Click &quot;New Post&quot; to write one.
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  {post.coverImage ? (
                    <div className="w-16 h-10 rounded-md overflow-hidden bg-gray-100 border border-[#172033]/10">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-10 rounded-md bg-gray-100 border border-[#172033]/10 flex items-center justify-center text-gray-400 text-[10px]">
                      No Cover
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-[#172033]">
                  {post.title}
                  <div className="text-[10px] text-[#172033]/40 font-normal mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-[#172033]/60 text-sm">{post.slug}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      post.published
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {post.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </TableCell>
                <TableCell className="text-[#172033]/70 text-sm">
                  {post.author?.name || "System"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <a
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center h-8 w-8 text-[#172033]/50 hover:text-[#172033]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(post)}
                      className="h-8 w-8 text-[#172033]/50 hover:text-[#172033]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(post.id)}
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
  );
}
