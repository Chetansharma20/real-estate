"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

interface Township {
  id: string;
  name: string;
  locality: string;
  city: string;
  address: string;
  createdAt: string;
}

export default function TownshipsPage() {
  const [townships, setTownships] = useState<Township[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locality: "",
    city: "Mumbai",
    address: "",
    googleMapUrl: "",
    latitude: "",
    longitude: "",
  });

  const fetchTownships = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/townships");
      setTownships(res.data.data.townships || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch townships", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTownships();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/admin/townships/${editingId}`, formData);
        toast({ title: "Success", description: "Township updated successfully" });
      } else {
        await api.post("/admin/townships", formData);
        toast({ title: "Success", description: "Township created successfully" });
      }
      setIsDialogOpen(false);
      fetchTownships();
      setFormData({ name: "", description: "", locality: "", city: "Mumbai", address: "", googleMapUrl: "", latitude: "", longitude: "" });
      setEditingId(null);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save township", variant: "destructive" });
    }
  };

  const handleEdit = (t: Township) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      description: (t as any).description || "",
      locality: t.locality,
      city: t.city || "Mumbai",
      address: t.address || "",
      googleMapUrl: (t as any).googleMapUrl || "",
      latitude: (t as any).latitude ? String((t as any).latitude) : "",
      longitude: (t as any).longitude ? String((t as any).longitude) : "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this township?")) return;
    try {
      await api.delete(`/admin/townships/${id}`);
      toast({ title: "Success", description: "Township deleted successfully" });
      fetchTownships();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete township", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Townships</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button onClick={() => {
                setEditingId(null);
                setFormData({ name: "", description: "", locality: "", city: "Mumbai", address: "", googleMapUrl: "", latitude: "", longitude: "" });
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Township
              </Button>
            }
          />
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Township</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Dosti West County" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Locality</label>
                  <Input name="locality" value={formData.locality} onChange={handleInputChange} required placeholder="Balkum" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Latitude</label>
                  <Input name="latitude" type="number" step="any" value={formData.latitude} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Longitude</label>
                  <Input name="longitude" type="number" step="any" value={formData.longitude} onChange={handleInputChange} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Google Maps URL</label>
                  <Input name="googleMapUrl" value={formData.googleMapUrl} onChange={handleInputChange} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F4F6F9]">
              <TableHead className="font-bold text-[#172033] text-sm">Name</TableHead>
              <TableHead className="font-bold text-[#172033] text-sm">Locality</TableHead>
              <TableHead className="font-bold text-[#172033] text-sm">City</TableHead>
              <TableHead className="w-[100px] font-bold text-[#172033] text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : townships.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No townships found.
                </TableCell>
              </TableRow>
            ) : (
              townships.map((township) => (
                <TableRow key={township.id} className="border-b border-[#172033]/5">
                  <TableCell className="font-semibold text-[#172033]">{township.name}</TableCell>
                  <TableCell className="text-[#172033]">{township.locality}</TableCell>
                  <TableCell className="text-[#172033]">{township.city}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#172033]/60 hover:text-[#172033] hover:bg-[#172033]/5" onClick={() => handleEdit(township)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(township.id)}>
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
