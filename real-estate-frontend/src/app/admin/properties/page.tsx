"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImagePlus, Loader2, Plus, X, LayoutGrid, List, MapPin, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Image preview type
interface ImagePreview {
  file: File;
  url: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "FLAT",
    priceType: "SALE",
    bhk: "",
    locality: "",
    address: "",
    carpetArea: "",
    basePrice: "",
    mapUrl: "",
    tag: "NONE",
    constructionStatus: "NONE",
    amenities: [] as string[],
  });

  const fetchProperties = async (page: number = currentPage) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/properties?page=${page}&limit=8`);
      if (res.data.success) {
        const responseData = res.data.data.data || res.data.data;
        if (responseData && responseData.properties) {
          setProperties(responseData.properties);
          setTotalPages(responseData.pagination.totalPages);
          setCurrentPage(responseData.pagination.currentPage);
        } else {
          setProperties(responseData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAmenities = async () => {
    try {
      const res = await api.get("/amenities");
      if (res.data.success) {
        setAvailableAmenities(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch amenities:", error);
    }
  };

  useEffect(() => {
    fetchProperties(1);
    fetchAmenities();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value || "" });
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenityId] });
    } else {
      setFormData({ ...formData, amenities: formData.amenities.filter(id => id !== amenityId) });
    }
  };

  // ---- Image Handling ----
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newPreviews: ImagePreview[] = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .map(file => ({ file, url: URL.createObjectURL(file) }));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  }, []);

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index].url); // Free memory
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // ---- Form Submission via FormData ----
  const resetForm = () => {
    setFormData({
      title: "", description: "", type: "FLAT", priceType: "SALE",
      bhk: "", locality: "", address: "", carpetArea: "", basePrice: "",
      mapUrl: "",
      tag: "NONE",
      constructionStatus: "NONE",
      amenities: [],
    });
    imagePreviews.forEach(p => p.url.startsWith('blob:') && URL.revokeObjectURL(p.url));
    setImagePreviews([]);
    setEditId(null);
  };

  const openEditModal = (property: any) => {
    setEditId(property.id);
    setFormData({
      title: property.title || "",
      description: property.description || "",
      type: property.type || "FLAT",
      priceType: property.priceType || "SALE",
      bhk: String(property.bhk || ""),
      locality: property.locality || "",
      address: property.address || "",
      carpetArea: String(property.carpetArea || ""),
      basePrice: String(property.basePrice || ""),
      mapUrl: property.mapUrl || "",
      tag: property.tag || "NONE",
      constructionStatus: property.constructionStatus || "NONE",
      amenities: property.amenities?.map((a: any) => a.amenityId || a.id) || [],
    });
    // Optional: Populate existing images as previews (they won't be sent back unless changed, but good for UX)
    if (property.images && property.images.length > 0) {
      setImagePreviews(property.images.map((img: any) => ({
        file: new File([], "existing-image"), // Dummy file, backend won't process it correctly if appended, so we actually shouldn't append it if it's existing. 
        url: img.url
      })));
    } else {
      setImagePreviews([]);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("type", formData.type);
      fd.append("priceType", formData.priceType);
      fd.append("bhk", String(parseInt(formData.bhk)));
      fd.append("locality", formData.locality);
      fd.append("address", formData.address);
      fd.append("carpetArea", String(parseFloat(formData.carpetArea)));
      fd.append("basePrice", String(parseFloat(formData.basePrice)));
      fd.append("mapUrl", formData.mapUrl);
      fd.append("tag", formData.tag);
      fd.append("constructionStatus", formData.constructionStatus);
      fd.append("amenities", JSON.stringify(formData.amenities));
      
      // Only append new files (blob URLs) to avoid sending dummy files
      imagePreviews.forEach(p => {
        if (p.url.startsWith('blob:')) {
          fd.append("images", p.file);
        }
      });

      let res;
      if (editId) {
        res = await api.patch(`/properties/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/properties", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        setIsModalOpen(false);
        resetForm();
        fetchProperties(currentPage);
      }
    } catch (error) {
      console.error("Failed to save property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        const res = await api.delete(`/properties/${id}`);
        if (res.data.success) {
          fetchProperties(currentPage);
        }
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#0B132B]">Properties</h2>
          <p className="text-[#0B132B]/60 text-sm mt-1">Manage your real estate listings</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) resetForm(); setIsModalOpen(open); }}>
          <DialogTrigger
            render={<Button className="bg-[#0B132B] hover:bg-primary text-white hover:text-[#0B132B]" />}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </DialogTrigger>

          <DialogContent className="max-w-4xl sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-[#0B132B] border-[#0B132B]/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-[#0B132B]">
                {editId ? "Edit Property" : "Add New Property"}
              </DialogTitle>
              <DialogDescription>
                {editId ? "Update the details of this property listing." : "Fill in the details to create a new property listing."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-4 gap-x-4 gap-y-3">

                {/* Title */}
                <div className="col-span-4 space-y-1">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" required value={formData.title} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <Label>Property Type</Label>
                  <Select value={formData.type} onValueChange={(v) => handleSelectChange("type", v)}>
                    <SelectTrigger className="border-[#0B132B]/20 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-white text-[#0B132B] border-[#0B132B]/20">
                      <SelectItem value="FLAT">Flat</SelectItem>
                      <SelectItem value="BUNGALOW">Bungalow</SelectItem>
                      <SelectItem value="VILLA">Villa</SelectItem>
                      <SelectItem value="PLOT">Plot</SelectItem>
                      <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* BHK */}
                <div className="space-y-1">
                  <Label htmlFor="bhk">BHK / Rooms</Label>
                  <Input id="bhk" type="number" required value={formData.bhk} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Base Price */}
                <div className="space-y-1">
                  <Label htmlFor="basePrice">Base Price (₹)</Label>
                  <Input id="basePrice" type="number" required value={formData.basePrice} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Carpet Area */}
                <div className="space-y-1">
                  <Label htmlFor="carpetArea">Carpet Area (sq ft)</Label>
                  <Input id="carpetArea" type="number" required value={formData.carpetArea} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Property Tag */}
                <div className="space-y-1 col-span-2">
                  <Label>Property View / Feature Tag</Label>
                  <Select value={formData.tag} onValueChange={(v) => handleSelectChange("tag", v)}>
                    <SelectTrigger className="border-[#0B132B]/20 h-9"><SelectValue placeholder="Select Tag" /></SelectTrigger>
                    <SelectContent className="bg-white text-[#0B132B] border-[#0B132B]/20">
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="SEA_VIEW">Sea View</SelectItem>
                      <SelectItem value="CITY_VIEW">City View</SelectItem>
                      <SelectItem value="GREEN_VIEW">Green View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Construction Status */}
                <div className="space-y-1 col-span-2">
                  <Label>Possession / Construction Status</Label>
                  <Select value={formData.constructionStatus} onValueChange={(v) => handleSelectChange("constructionStatus", v)}>
                    <SelectTrigger className="border-[#0B132B]/20 h-9"><SelectValue placeholder="Select Status" /></SelectTrigger>
                    <SelectContent className="bg-white text-[#0B132B] border-[#0B132B]/20">
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="READY_TO_MOVE">Ready to Move</SelectItem>
                      <SelectItem value="UNDER_CONSTRUCTION">Under Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Locality */}
                <div className="space-y-1 col-span-1">
                  <Label htmlFor="locality">Locality</Label>
                  <Input id="locality" required value={formData.locality} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Address */}
                <div className="space-y-1 col-span-3">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" required value={formData.address} onChange={handleInputChange} className="border-[#0B132B]/20 h-9" />
                </div>

                {/* Google Map Link */}
                <div className="space-y-1 col-span-4">
                  <Label htmlFor="mapUrl">Google Maps Embed Link (Optional)</Label>
                  <Input 
                    id="mapUrl" 
                    placeholder="e.g., https://www.google.com/maps/embed?pb=..." 
                    value={formData.mapUrl} 
                    onChange={handleInputChange} 
                    className="border-[#0B132B]/20 h-9" 
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-[#0B132B]/20 bg-transparent px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Image Uploader */}
                <div className="col-span-2 space-y-1">
                  <Label>Property Images</Label>
                  {/* Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors h-[80px] ${
                      isDragging ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-[#0B132B]/20 hover:border-[#0B132B]/40 hover:bg-[#F4F6F9]"
                    }`}
                  >
                    <ImagePlus className="w-5 h-5 text-[#0B132B]/40 mb-1" />
                    <p className="text-xs text-[#0B132B]/50">Drop images or <span className="text-[#D4AF37] font-medium">browse</span></p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={e => addFiles(e.target.files)}
                    />
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group w-14 h-14 rounded-md overflow-hidden border border-[#0B132B]/20">
                          <img src={preview.url} alt={`preview-${index}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Amenities */}
                <div className="space-y-1.5 col-span-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {availableAmenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-1.5">
                        <Checkbox
                          id={`amenity-${amenity.id}`}
                          className="border-[#0B132B]/30 data-[state=checked]:bg-[#0B132B] h-4 w-4"
                          checked={formData.amenities.includes(amenity.id)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                        />
                        <label htmlFor={`amenity-${amenity.id}`} className="text-xs font-medium text-[#0B132B]/80 cursor-pointer">
                          {amenity.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-[#0B132B]/10">
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
                  {editId ? "Update Property" : "Save Property"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-[#0B132B]/10 rounded-lg p-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 h-8 ${viewMode === "grid" ? "bg-[#0B132B] text-white hover:bg-[#0B132B] hover:text-white" : "text-[#0B132B]/60 hover:text-[#0B132B]"}`}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 h-8 ${viewMode === "table" ? "bg-[#0B132B] text-white hover:bg-[#0B132B] hover:text-white" : "text-[#0B132B]/60 hover:text-[#0B132B]"}`}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-[#0B132B]/50">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-full py-20 text-center text-[#0B132B]/50 border-2 border-dashed border-[#0B132B]/10 rounded-xl">
              No properties found. Click "Add Property" to create one.
            </div>
          ) : (
            properties.map((property) => (
              <Card key={property.id} className="overflow-hidden flex flex-col bg-white border-[#0B132B]/10 shadow-sm hover:shadow-md transition-all">
                <div className="relative h-48 group">
                  {property.images && property.images.length > 0 ? (
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {property.images.map((img: any, idx: number) => (
                          <CarouselItem key={idx} className="relative h-48">
                            <img src={img.url} alt={`${property.title} - ${idx}`} className="absolute inset-0 w-full h-full object-cover" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <CarouselPrevious className="left-2 bg-white/70 hover:bg-white text-black border-0 shadow-sm h-8 w-8" />
                        <CarouselNext className="right-2 bg-white/70 hover:bg-white text-black border-0 shadow-sm h-8 w-8" />
                      </div>
                    </Carousel>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No Images
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className="px-2 py-1 bg-[#D4AF37] text-white text-[10px] uppercase tracking-wider font-bold rounded shadow-sm">
                      {property.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4 flex-grow bg-white">
                  <h3 className="font-semibold text-lg text-[#0B132B] line-clamp-1 mb-1">{property.title}</h3>
                  <div className="flex items-center text-[#0B132B]/60 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    <span className="truncate">{property.locality}, {property.city}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm mt-auto border-t border-[#0B132B]/10 pt-3">
                    <div>
                      <p className="text-[#0B132B]/50 text-xs uppercase tracking-wider">BHK</p>
                      <p className="font-medium text-[#0B132B] mt-0.5">{property.bhk}</p>
                    </div>
                    <div>
                      <p className="text-[#0B132B]/50 text-xs uppercase tracking-wider">Carpet Area</p>
                      <p className="font-medium text-[#0B132B] mt-0.5">{property.carpetArea} sqft</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between items-end border-t border-[#0B132B]/5 mt-auto bg-[#F4F6F9]">
                  <div className="pt-3">
                    <p className="text-[#0B132B]/50 text-[10px] font-bold uppercase tracking-widest mb-0.5">Base Price</p>
                    <p className="font-bold text-lg text-[#D4AF37]">₹{Number(property.basePrice).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-1.5 mb-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditModal(property)}
                      className="h-8 w-8 p-0 text-[#0B132B]/50 hover:text-[#0B132B] hover:bg-white bg-white/50 rounded-full shadow-sm"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(property.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-white bg-white/50 rounded-full shadow-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Data Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xl shadow-sm border border-[#0B132B]/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F4F6F9]">
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Title</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Type</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Locality</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">BHK</TableHead>
              <TableHead className="font-semibold text-[#0B132B] text-right">Price</TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-[#0B132B]/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-[#0B132B]/50">
                  No properties found. Click &quot;Add Property&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    {property.images && property.images.length > 0 ? (
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                        <img 
                          src={property.images[0].url} 
                          alt={property.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-[#0B132B]">{property.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold rounded-md">
                      {property.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#0B132B]/70">{property.locality}</TableCell>
                  <TableCell className="text-[#0B132B]/70">{property.bhk}</TableCell>
                  <TableCell className="text-right font-medium text-[#0B132B]">
                    ₹{Number(property.basePrice).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openEditModal(property)}
                        className="h-8 w-8 text-[#0B132B]/50 hover:text-[#0B132B]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(property.id)}
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchProperties(currentPage - 1)}
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
                onClick={() => fetchProperties(page)}
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
            onClick={() => fetchProperties(currentPage + 1)}
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
