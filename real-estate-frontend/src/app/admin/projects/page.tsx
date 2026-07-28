"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  propertyType: string;
  status: string;
  township?: { name: string };
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/projects");
      setProjects(res.data.data.projects || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch projects", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      toast({ title: "Success", description: "Project deleted successfully" });
      fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <Button>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F4F6F9]">
              <TableHead className="font-bold text-[#172033] text-sm">Title</TableHead>
              <TableHead className="font-bold text-[#172033] text-sm">Township</TableHead>
              <TableHead className="font-bold text-[#172033] text-sm">Type</TableHead>
              <TableHead className="font-bold text-[#172033] text-sm">Status</TableHead>
              <TableHead className="w-[100px] font-bold text-[#172033] text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="border-b border-[#172033]/5">
                  <TableCell className="font-semibold text-[#172033]">{project.title}</TableCell>
                  <TableCell className="text-[#172033]">{project.township?.name || "-"}</TableCell>
                  <TableCell className="text-[#172033]">{project.propertyType}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/projects/${project.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#172033]/60 hover:text-[#172033] hover:bg-[#172033]/5">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(project.id)}>
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
    </div>
  );
}
