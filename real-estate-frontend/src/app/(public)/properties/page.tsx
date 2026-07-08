"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ArrowRight, Loader2, Search, SlidersHorizontal, Grid, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PropertyImageSlider } from "@/components/ui/property-image-slider";

import { Checkbox } from "@/components/ui/checkbox";

const PROPERTY_TYPES = [
  { label: "Flat / Apartment", value: "FLAT" },
  { label: "Villa", value: "VILLA" },
  { label: "Bungalow", value: "BUNGALOW" },
  { label: "Row House", value: "ROW_HOUSE" },
  { label: "Commercial", value: "COMMERCIAL" },
  { label: "Plot", value: "PLOT" },
];

const BHK_CONFIGS = [
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "5+ BHK", value: "5" },
];

export default function PublicPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBhks, setSelectedBhks] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100000000); // 10 Cr default max price limit
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number>(100000000);

  // Debounce maxPrice changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice);
    }, 400); // 400ms delay
    return () => clearTimeout(handler);
  }, [maxPrice]);

  // Debounce search input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay
    return () => clearTimeout(handler);
  }, [search]);

  const fetchProperties = async (page: number = currentPage) => {
    try {
      setIsLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", "9"); // 9 items per page fits 3 columns perfectly
      
      if (selectedTypes.length > 0) {
        params.append("type", selectedTypes.join(","));
      }
      if (selectedBhks.length > 0) {
        params.append("bhk", selectedBhks.join(","));
      }
      if (debouncedMaxPrice < 100000000) {
        params.append("maxPrice", String(debouncedMaxPrice));
      }
      if (debouncedSearch) {
        params.append("city", debouncedSearch); // Passes text keywords to the backend contains/like lookup
      }
      
      const res = await api.get(`/properties?${params.toString()}`);
      if (res.data.success) {
        const responseData = res.data.data.data || res.data.data;
        if (responseData && responseData.properties) {
          setProperties(responseData.properties);
          setTotalPages(responseData.pagination.totalPages);
          setCurrentPage(responseData.pagination.currentPage);
        } else {
          setProperties([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(1);
  }, [selectedTypes, selectedBhks, debouncedMaxPrice, debouncedSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties(1);
  };

  const handleTypeCheckboxChange = (val: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, val]);
    } else {
      setSelectedTypes((prev) => prev.filter((t) => t !== val));
    }
  };

  const handleBhkCheckboxChange = (val: string, checked: boolean) => {
    if (checked) {
      setSelectedBhks((prev) => [...prev, val]);
    } else {
      setSelectedBhks((prev) => prev.filter((b) => b !== val));
    }
  };

  const getStatusLabel = (tag: string, status: string) => {
    if (tag === "READY_TO_MOVE") return "Ready to Move";
    if (tag === "UNDER_CONSTRUCTION") return "Under Construction";
    return status === "ACTIVE" ? "Available" : status;
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">— Explore Listings</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0B132B] font-bold">Featured Properties</h1>
          <p className="text-[#0B132B]/50 font-light text-sm sm:text-base">
            Find your dream residential apartments, villas, row houses, or premium commercial spaces across major cities.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
          
          {/* Left Column: Filter Panel (sticky) */}
          <Card className="border border-[#0B132B]/10 rounded-xl bg-white shadow-sm p-8 lg:sticky lg:top-28 space-y-6">
            <div>
              <h3 className="font-semibold text-base text-[#0B132B]">Filters</h3>
              <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest mt-0.5 font-bold">Refine your search</p>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              {/* Type Filter */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#0B132B]/60 font-bold">Property Type</label>
                <div className="space-y-1">
                  {PROPERTY_TYPES.map((pt) => (
                    <label key={pt.value} className="flex items-center gap-3.5 cursor-pointer group select-none p-2.5 hover:bg-[#F8F9FA] rounded-lg transition-all border border-transparent hover:border-[#0B132B]/5">
                      <Checkbox
                        className="size-6 shrink-0 data-checked:bg-[#D4AF37] data-checked:border-[#D4AF37]"
                        checked={selectedTypes.includes(pt.value)}
                        onCheckedChange={(checked) => handleTypeCheckboxChange(pt.value, !!checked)}
                      />
                      <span className="text-base font-semibold text-[#0B132B]/80 group-hover:text-[#0B132B] transition-colors">
                        {pt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK Filter */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#0B132B]/60 font-bold">BHK Configuration</label>
                <div className="space-y-1">
                  {BHK_CONFIGS.map((bc) => (
                    <label key={bc.value} className="flex items-center gap-3.5 cursor-pointer group select-none p-2.5 hover:bg-[#F8F9FA] rounded-lg transition-all border border-transparent hover:border-[#0B132B]/5">
                      <Checkbox
                        className="size-6 shrink-0 data-checked:bg-[#D4AF37] data-checked:border-[#D4AF37]"
                        checked={selectedBhks.includes(bc.value)}
                        onCheckedChange={(checked) => handleBhkCheckboxChange(bc.value, !!checked)}
                      />
                      <span className="text-base font-semibold text-[#0B132B]/80 group-hover:text-[#0B132B] transition-colors">
                        {bc.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3 pt-2 border-t border-[#0B132B]/5">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider text-[#0B132B]/60 font-bold">Max Budget</label>
                  <span className="text-xs text-[#D4AF37] font-bold">
                    {(maxPrice / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                
                {/* HTML5 Range Slider */}
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={1000000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#0B132B]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />

                {/* Amount Input Box */}
                <div className="relative flex items-center mt-1">
                  <span className="absolute left-3 text-xs text-[#0B132B]/40 font-medium">₹</span>
                  <Input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="pl-7 border-[#0B132B]/10 focus-visible:ring-[#D4AF37] h-9 text-xs rounded-lg bg-[#F8F9FA]"
                    placeholder="Enter max price"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <Button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedTypes([]);
                  setSelectedBhks([]);
                  setMaxPrice(100000000);
                }}
                variant="outline"
                className="w-full bg-transparent border-[#0B132B]/10 hover:bg-[#F8F9FA] text-[#0B132B] h-10 mt-2 text-xs uppercase tracking-wider rounded-lg font-semibold"
              >
                Reset Filters
              </Button>
            </form>
          </Card>

          {/* Right Column: Listings Grid & Pagination */}
          <div className="space-y-8">
            {/* Search Input (Moved from Sidebar) */}
            <form onSubmit={handleSearchSubmit} className="bg-white p-2 border border-[#0B132B]/10 rounded-xl flex items-center shadow-sm">
              <Search className="w-5 h-5 text-[#0B132B]/40 ml-3 mr-2 shrink-0" />
              <Input
                placeholder="Search properties by location, title, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 bg-transparent text-base px-2 h-auto flex-1"
              />
              <Button type="submit" className="ml-2 bg-[#D4AF37] hover:bg-[#C5A030] text-white rounded-lg px-6">
                Search
              </Button>
            </form>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-[#0B132B]/10 rounded-xl overflow-hidden animate-pulse">
                    <div className="h-64 bg-[#0B132B]/8" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[#0B132B]/8 rounded w-1/4" />
                      <div className="h-5 bg-[#0B132B]/10 rounded w-3/4" />
                      <div className="h-4 bg-[#0B132B]/6 rounded w-1/2" />
                      <div className="h-px bg-[#0B132B]/5 my-2" />
                      <div className="h-6 bg-[#0B132B]/8 rounded w-2/5" />
                      <div className="h-9 bg-[#0B132B]/8 rounded w-full mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#0B132B]/10 rounded-xl text-[#0B132B]/40">
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Link href={`/properties/${property.id}`} key={property.id} className="block h-full">
                      <Card className="overflow-hidden flex flex-col bg-white border border-[#0B132B]/10 shadow-sm hover:shadow-md transition-all rounded-xl group h-full cursor-pointer">
                        {/* Image Showcase */}
                      <div className="relative h-64 overflow-hidden">
                        <PropertyImageSlider images={property.images || []} title={property.title} />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                            {property.type.replace("_", " ")}
                          </Badge>
                          {property.tag && property.tag !== "NONE" && (
                            <Badge className="bg-[#172033]/90 hover:bg-[#172033] text-white border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold w-fit">
                              {property.tag.replace("_", " ")}
                            </Badge>
                          )}
                        </div>
                        {property.constructionStatus && property.constructionStatus !== "NONE" && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/90 backdrop-blur-xs text-[#0B132B] hover:bg-white/90 border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                              {property.constructionStatus === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content Panel */}
                      <CardContent className="p-6 flex-grow bg-white space-y-4">
                        <div className="space-y-1.5">
                          <h3 className="font-semibold text-xl text-[#0B132B] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-[#0B132B]/60 text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-[#D4AF37]" />
                            <span className="truncate">{property.locality}, {property.city}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 text-sm border-t border-[#0B132B]/5 pt-4">
                          <div>
                            <p className="text-[#0B132B]/40 uppercase tracking-wider text-[11px]">BHK</p>
                            <p className="font-semibold text-[#0B132B] mt-0.5">{property.bhk} BHK</p>
                          </div>
                          <div>
                            <p className="text-[#0B132B]/40 uppercase tracking-wider text-[11px]">Carpet Area</p>
                            <p className="font-semibold text-[#0B132B] mt-0.5">{property.carpetArea} sqft</p>
                          </div>
                        </div>
                      </CardContent>

                      {/* Card Footer */}
                      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center border-t border-[#0B132B]/5 bg-[#F8F9FA]/50 mt-auto">
                        <div>
                          <p className="text-[#0B132B]/40 text-[10px] uppercase tracking-wider font-bold">Base Price</p>
                          <p className="font-bold text-lg text-[#D4AF37]">₹{Number(property.basePrice).toLocaleString("en-IN")}</p>
                        </div>
                        <div>
                          <div className="inline-flex items-center justify-center bg-transparent border border-[#0B132B]/10 hover:border-[#0B132B] text-[#0B132B] hover:bg-[#0B132B] hover:text-white rounded-lg h-10 px-5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer">
                            <span className="flex items-center">
                              View
                              <ArrowRight className="w-4 h-4 ml-1.5" />
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchProperties(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9] rounded-lg"
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
                              ? "bg-[#0B132B] text-white hover:bg-[#0B132B] rounded-lg"
                              : "bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9] rounded-lg"
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
                      className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9] rounded-lg"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
