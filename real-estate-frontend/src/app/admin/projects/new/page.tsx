"use client";

import { ProjectForm } from "@/components/admin/projects/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Add New Project</h2>
      <ProjectForm />
    </div>
  );
}
