"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Loader2 } from "lucide-react";

interface Amenity {
  id: string;
  name: string;
  category: string;
}

const CATEGORIES = ["General", "Sports", "Leisure", "Security", "Eco-friendly", "Other"];

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "General",
  });

  const fetchAmenities = async () => {
    try {
      const res = await api.get("/amenities");
      if (res.data.success) {
        setAmenities(res.data.data);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch amenities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("/amenities", formData);
      if (res.data.success) {
        // alert("Amenity created successfully");
        setAmenities([...amenities, res.data.data]);
        setIsDialogOpen(false);
        setFormData({ name: "", category: "General" });
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create amenity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this amenity?")) return;

    try {
      const res = await api.delete(`/amenities/${id}`);
      if (res.data.success) {
        // alert("Amenity deleted successfully");
        setAmenities(amenities.filter((a) => a.id !== id));
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete amenity");
    }
  };

  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const cat = amenity.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#172033]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#172033]">Amenities</h1>
          <p className="text-sm text-[#172033]/70 mt-1">
            Manage the list of available amenities for properties and projects.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button className="bg-[#172033] text-white hover:bg-[#172033]/90">
                <Plus className="mr-2 h-4 w-4 text-white" /> Add Amenity
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Amenity</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-[#172033]">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Swimming Pool"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="text-[#172033] bg-white border-[#172033]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-[#172033]">Category</Label>
                <Select
                  value={formData.category || "General"}
                  onValueChange={(val) => setFormData({ ...formData, category: val || "General" })}
                >
                  <SelectTrigger className="text-[#172033] bg-white border-[#172033]/20">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-[#172033]">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#172033] text-white hover:bg-[#172033]/90 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />}
                Create Amenity
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(groupedAmenities).sort().map((category) => (
          <div key={category} className="bg-white p-6 rounded-lg border border-[#172033]/10 shadow-sm">
            <h3 className="text-lg font-semibold text-[#172033] mb-4 pb-2 border-b border-[#172033]/10">
              {category}
            </h3>
            <ul className="space-y-3">
              {groupedAmenities[category].map((amenity) => (
                <li key={amenity.id} className="flex justify-between items-center py-1">
                  <span className="text-sm font-medium text-[#172033]">{amenity.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-600 h-8 w-8 p-0 hover:bg-red-50"
                    onClick={() => handleDelete(amenity.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
            {groupedAmenities[category].length === 0 && (
              <p className="text-sm text-gray-500 italic">No amenities in this category.</p>
            )}
          </div>
        ))}
        {Object.keys(groupedAmenities).length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-lg border border-[#172033]/10 text-center">
            <p className="text-[#172033]/70">No amenities found. Click "Add Amenity" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
