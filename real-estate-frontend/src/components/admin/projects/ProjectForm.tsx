"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProjectFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [townships, setTownships] = useState<any[]>([]);
  const [allAmenities, setAllAmenities] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    propertyType: initialData?.propertyType || "APARTMENT",
    constructionStatus: initialData?.constructionStatus || "UNDER_CONSTRUCTION",
    propertyView: initialData?.propertyView || "NONE",
    description: initialData?.description || "",
    videoUrl: initialData?.videoUrl || "",
    featured: initialData?.featured || false,
    status: initialData?.status || "ACTIVE",
    townshipId: initialData?.townshipId || "null",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
    address: initialData?.address || "",
    googleMapUrl: initialData?.googleMapUrl || "",
    reraId: initialData?.reraId || "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.amenities ? initialData.amenities.map((a: any) => a.amenityId) : []
  );

  const [configurations, setConfigurations] = useState<any[]>(
    initialData?.configurations || []
  );

  useEffect(() => {
    fetchTownships();
    fetchAmenities();
  }, []);

  const fetchTownships = async () => {
    try {
      const res = await api.get("/admin/townships?limit=100");
      setTownships(res.data.data.townships || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAmenities = async () => {
    try {
      const res = await api.get("/amenities");
      setAllAmenities(res.data.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const extractCoordsFromGoogleMapsUrl = (url: string): { lat: string; lng: string } | null => {
    // Match /@lat,lng or ?q=lat,lng or &ll=lat,lng patterns
    const patterns = [
      /@(-?\d+\.\d+),(-?\d+\.\d+)/,        // /@19.2183,72.9781
      /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,   // ?q=19.2183,72.9781
      /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/,  // &ll=19.2183,72.9781
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,    // !3d19.2183!4d72.9781 (Google Maps embed)
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return { lat: match[1], lng: match[2] };
    }
    return null;
  };

  const handleGoogleMapsUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const coords = extractCoordsFromGoogleMapsUrl(url);
    setFormData((prev) => ({
      ...prev,
      googleMapUrl: url,
      ...(coords ? { latitude: coords.lat, longitude: coords.lng } : {}),
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddConfiguration = () => {
    setConfigurations([...configurations, {
      bhk: "1",
      carpetArea: "",
      builtUpArea: "",
      superBuiltUpArea: "",
      pricePerSqft: "",
      totalPrice: "",
      label: "",
      availableUnits: "",
      isAvailable: true,
    }]);
  };

  const handleConfigChange = (index: number, field: string, value: any) => {
    const newConfigs = [...configurations];
    newConfigs[index][field] = value;
    setConfigurations(newConfigs);
  };

  const removeConfiguration = (index: number) => {
    const newConfigs = [...configurations];
    newConfigs.splice(index, 1);
    setConfigurations(newConfigs);
  };

  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        amenities: selectedAmenities,
        configurations,
      };

      if (isEdit) {
        await api.patch(`/admin/projects/${initialData.id}`, payload);
        toast({ title: "Success", description: "Project updated successfully" });
      } else {
        const res = await api.post("/admin/projects", payload);
        toast({ title: "Success", description: "Project created successfully. You can now upload media." });
        router.push(`/admin/projects/${res.data.data.id}`);
        return;
      }
      router.push("/admin/projects");
    } catch (error: any) {
      toast({ title: "Error", description: error.response?.data?.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const groupedAmenities = allAmenities.reduce((acc, amenity) => {
    const cat = amenity.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(amenity);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Details */}
      <div className="bg-white p-6 rounded-lg border border-[#172033]/15 space-y-4">
        <h3 className="text-lg font-bold text-[#172033]">Basic Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Title</label>
            <Input name="title" value={formData.title} onChange={handleInputChange} required className="text-[#172033] bg-white border-[#172033]/20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Township</label>
            <Select value={formData.townshipId} onValueChange={(val) => handleSelectChange("townshipId", val)}>
              <SelectTrigger className="text-[#172033] bg-white border-[#172033]/20">
                <SelectValue placeholder="Select Township (Optional)">
                  {townships.find((t) => t.id === formData.townshipId)?.name ||
                    (formData.townshipId === "null" || !formData.townshipId
                      ? "None (Standalone Project)"
                      : formData.townshipId)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white text-[#172033]">
                <SelectItem value="null">None (Standalone Project)</SelectItem>
                {townships.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Property Type</label>
            <Select value={formData.propertyType} onValueChange={(val) => handleSelectChange("propertyType", val)}>
              <SelectTrigger className="text-[#172033] bg-white border-[#172033]/20"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-[#172033]">
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="VILLA">Villa</SelectItem>
                <SelectItem value="PLOT">Plot</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Status</label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="text-[#172033] bg-white border-[#172033]/20"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-[#172033]">
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SOLD_OUT">Sold Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Construction Status</label>
            <Select value={formData.constructionStatus} onValueChange={(val) => handleSelectChange("constructionStatus", val)}>
              <SelectTrigger className="text-[#172033] bg-white border-[#172033]/20"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-[#172033]">
                <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                <SelectItem value="READY_TO_MOVE">Ready to Move</SelectItem>
                <SelectItem value="NEW_LAUNCH">New Launch</SelectItem>
                <SelectItem value="NONE">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">RERA Registration ID (Optional)</label>
            <Input name="reraId" value={formData.reraId} onChange={handleInputChange} placeholder="e.g. P51800000000" className="text-[#172033] bg-white border-[#172033]/20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Video URL (Optional)</label>
            <Input name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} className="text-[#172033] bg-white border-[#172033]/20" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Project Address <span className="text-[#172033]/40 font-normal">(Optional - falls back to Township address if blank)</span></label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter exact project location / address..."
              className="text-[#172033] bg-white border-[#172033]/20"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Google Maps URL <span className="text-[#172033]/40 font-normal">(paste to auto-fill coordinates & save location link)</span></label>
            <Input
              name="googleMapUrl"
              value={formData.googleMapUrl}
              onChange={handleGoogleMapsUrl}
              placeholder="Paste Google Maps link here..."
              className="text-[#172033] bg-white border-[#172033]/20"
            />
            {formData.latitude && formData.longitude && (
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span>✓</span> Coordinates extracted: {formData.latitude}, {formData.longitude}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Latitude <span className="text-[#172033]/40 font-normal">(auto-filled or enter manually)</span></label>
            <Input name="latitude" type="number" step="any" value={formData.latitude} onChange={handleInputChange} placeholder="19.2183" className="text-[#172033] bg-white border-[#172033]/20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Longitude <span className="text-[#172033]/40 font-normal">(auto-filled or enter manually)</span></label>
            <Input name="longitude" type="number" step="any" value={formData.longitude} onChange={handleInputChange} placeholder="72.9781" className="text-[#172033] bg-white border-[#172033]/20" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-semibold text-[#172033]">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              className="w-full flex min-h-[80px] rounded-md border border-[#172033]/20 bg-white px-3 py-2 text-sm text-[#172033] placeholder:text-[#172033]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            />
          </div>
          <div className="col-span-2 flex items-center space-x-2">
            <Checkbox 
              checked={formData.featured} 
              onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})} 
              id="featured"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-[#172033]">Featured Project</label>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white p-6 rounded-lg border border-[#172033]/15 space-y-4">
        <h3 className="text-lg font-bold text-[#172033]">Amenities</h3>
        <div className="space-y-6">
          {Object.keys(groupedAmenities).map(category => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-bold text-[#172033] border-b border-[#172033]/10 pb-1">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {groupedAmenities[category].map((amenity: any) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity.id}`} 
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={() => toggleAmenity(amenity.id)}
                    />
                    <label htmlFor={`amenity-${amenity.id}`} className="text-sm font-medium text-[#172033] cursor-pointer">{amenity.name}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurations */}
      <div className="bg-white p-6 rounded-lg border border-[#172033]/15 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#172033]">Configurations</h3>
          <Button type="button" variant="outline" onClick={handleAddConfiguration} className="text-[#172033] border-[#172033]/20">
            <Plus className="mr-2 h-4 w-4" /> Add Config
          </Button>
        </div>
        {configurations.map((config, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 p-4 border border-[#172033]/15 rounded-md relative bg-gray-50/50">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeConfiguration(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#172033]">BHK</label>
              <Input type="number" value={config.bhk} onChange={(e) => handleConfigChange(index, "bhk", e.target.value)} required className="text-[#172033] bg-white border-[#172033]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#172033]">Carpet Area (sqft)</label>
              <Input type="number" value={config.carpetArea} onChange={(e) => handleConfigChange(index, "carpetArea", e.target.value)} required className="text-[#172033] bg-white border-[#172033]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#172033]">Price Per Sqft (₹)</label>
              <Input type="number" value={config.pricePerSqft} onChange={(e) => handleConfigChange(index, "pricePerSqft", e.target.value)} required className="text-[#172033] bg-white border-[#172033]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#172033]">Total Price (₹)</label>
              <Input type="number" value={config.totalPrice} onChange={(e) => handleConfigChange(index, "totalPrice", e.target.value)} required className="text-[#172033] bg-white border-[#172033]/20" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#172033]">Label (e.g. Premium)</label>
              <Input value={config.label} onChange={(e) => handleConfigChange(index, "label", e.target.value)} className="text-[#172033] bg-white border-[#172033]/20" />
            </div>
            <div className="space-y-1 flex items-center pt-5">
              <Checkbox 
                checked={config.isAvailable} 
                onCheckedChange={(c) => handleConfigChange(index, "isAvailable", c)}
              />
              <span className="ml-2 text-xs font-semibold text-[#172033]">Available</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
