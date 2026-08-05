"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function EditProjectPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState<{
    coverImage: File | null;
    images: FileList | null;
    flatImages: FileList | null;
    amenityImages: FileList | null;
    brochure: FileList | null;
    reraQrCode: File | null;
    floorPlans: Record<string, File> | null;
  }>({
    coverImage: null,
    images: null,
    flatImages: null,
    amenityImages: null,
    brochure: null,
    reraQrCode: null,
    floorPlans: null,
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/admin/projects/${id}`);
      setProject(res.data.data);
    } catch (e) {
      toast({ title: "Error", description: "Failed to load project", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasFiles = 
      files.coverImage || 
      (files.images && files.images.length > 0) || 
      (files.flatImages && files.flatImages.length > 0) || 
      (files.amenityImages && files.amenityImages.length > 0) || 
      (files.brochure && files.brochure.length > 0) || 
      files.reraQrCode ||
      (files.floorPlans && Object.keys(files.floorPlans).length > 0);

    if (!hasFiles) return;

    const formData = new FormData();
    if (files.coverImage) {
      formData.append("coverImage", files.coverImage);
    }
    if (files.images) {
      for (let i = 0; i < files.images.length; i++) {
        formData.append("images", files.images[i]);
      }
    }
    if (files.flatImages) {
      for (let i = 0; i < files.flatImages.length; i++) {
        formData.append("flatImages", files.flatImages[i]);
      }
    }
    if (files.amenityImages) {
      for (let i = 0; i < files.amenityImages.length; i++) {
        formData.append("amenityImages", files.amenityImages[i]);
      }
    }
    if (files.brochure && files.brochure.length > 0) {
      formData.append("brochure", files.brochure[0]);
    }
    if (files.reraQrCode) {
      formData.append("reraQrCode", files.reraQrCode);
    }
    if (files.floorPlans) {
      const configIds: string[] = [];
      Object.entries(files.floorPlans).forEach(([configId, file]) => {
        formData.append("floorPlans", file);
        configIds.push(configId);
      });
      formData.append("floorPlanConfigIds", JSON.stringify(configIds));
    }

    try {
      await api.post(`/admin/projects/${id}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast({ title: "Success", description: "Media uploaded successfully" });
      setFiles({ 
        coverImage: null,
        images: null, 
        flatImages: null,
        amenityImages: null,
        brochure: null,
        reraQrCode: null,
        floorPlans: null
      });
      fetchProject();
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload media", variant: "destructive" });
    }
  };

  const handleFloorPlanChange = (configId: string, file: File | null) => {
    if (!file) {
      if (files.floorPlans) {
        const newPlans = { ...files.floorPlans };
        delete newPlans[configId];
        setFiles({ ...files, floorPlans: Object.keys(newPlans).length > 0 ? newPlans : null });
      }
    } else {
      setFiles({
        ...files,
        floorPlans: {
          ...(files.floorPlans || {}),
          [configId]: file
        }
      });
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Delete this media?")) return;
    try {
      await api.delete(`/admin/projects/${id}/media/${mediaId}`);
      toast({ title: "Success", description: "Media deleted successfully" });
      fetchProject();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete media", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  }

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-[#172033]">Edit Project</h2>
      <ProjectForm initialData={project} isEdit={true} />

      {/* Media Management */}
      <div className="bg-white p-6 rounded-lg border border-[#172033]/15 space-y-4">
        <h3 className="text-lg font-bold text-[#172033]">Media Management</h3>
        
        <form onSubmit={handleMediaUpload} className="space-y-6 p-4 border border-[#172033]/15 rounded bg-gray-50/50">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">Cover Image (Shown first to users)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFiles({ ...files, coverImage: e.target.files?.[0] || null })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">Gallery Images (General photos)</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setFiles({ ...files, images: e.target.files })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">Flat Images (Rooms / Interiors)</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setFiles({ ...files, flatImages: e.target.files })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">Amenity Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setFiles({ ...files, amenityImages: e.target.files })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">Brochure (PDF)</label>
              <input 
                type="file" 
                accept="application/pdf"
                onChange={(e) => setFiles({ ...files, brochure: e.target.files })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#172033] block">RERA QR Code (Image)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFiles({ ...files, reraQrCode: e.target.files?.[0] || null })}
                className="w-full text-sm text-[#172033] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37]/10 file:text-[#D4AF37] hover:file:bg-[#D4AF37]/25"
              />
            </div>

            {/* Flat-specific Floor Plans */}
            {project.configurations && project.configurations.length > 0 && (
              <div className="col-span-2 border-t border-gray-200 pt-4 space-y-4">
                <h4 className="text-sm font-bold text-[#172033]">Flat Floor Plans (Upload per configuration)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.configurations.map((config: any) => (
                    <div key={config.id} className="space-y-2 p-3 border border-gray-200 rounded-lg bg-white">
                      <label className="text-xs font-bold text-[#172033] block">
                        {config.bhk} BHK - {config.label || `${config.carpetArea} sq.ft`}
                      </label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFloorPlanChange(config.id, e.target.files?.[0] || null)}
                        className="w-full text-xs text-[#172033] file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-[#172033]/5 file:text-[#172033] hover:file:bg-[#172033]/15"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button type="submit">Upload Media</Button>
        </form>

        <div className="mt-6">
          <h4 className="text-md font-bold text-[#172033] mb-2">Existing Media</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.reraQrCode && (
              <div className="relative border border-[#172033]/10 rounded p-2 bg-[#F4F6F9] flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center min-h-[96px]">
                  <img src={project.reraQrCode} alt="RERA QR Code" className="max-h-24 max-w-full object-contain rounded" />
                </div>
                <div className="text-[10px] text-center mt-2 text-[#172033]/50 font-bold uppercase tracking-wider">RERA QR CODE</div>
              </div>
            )}
            
            {project.media?.map((m: any) => {
              // Custom label if media is linked to configuration
              let label = m.type;
              if (m.type === "FLOOR_PLAN" && m.configurationId) {
                const config = project.configurations?.find((c: any) => c.id === m.configurationId);
                if (config) {
                  label = `Floor Plan (${config.bhk} BHK)`;
                }
              }
              if (m.type === "IMAGE" && m.isCover) {
                label = "COVER IMAGE";
              }

              return (
                <div key={m.id} className="relative border border-gray-200 rounded p-2 bg-gray-50 flex flex-col justify-between">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleDeleteMedia(m.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  
                  <div className="flex-1 flex items-center justify-center min-h-[96px]">
                    {m.type === "BROCHURE" ? (
                      <div className="h-24 w-full bg-red-100 flex items-center justify-center text-red-600 font-bold rounded">
                        PDF Brochure
                      </div>
                    ) : (
                      <img src={m.url} alt="Media" className="max-h-24 max-w-full object-contain rounded" />
                    )}
                  </div>
                  <div className="text-[10px] text-center mt-2 text-gray-500 font-bold uppercase tracking-wider">{label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
