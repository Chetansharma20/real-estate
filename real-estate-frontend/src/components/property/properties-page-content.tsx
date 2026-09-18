"use client";

import { useEffect, useState } from "react";
import { usePaginationFetch } from "@/hooks/use-pagination-fetch";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyFilters from "@/components/property/property-filters";
import PropertyCard from "@/components/property/property-card";

export default function PropertiesPageContent({ initialProjects = [] }: { initialProjects?: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filters State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBhks, setSelectedBhks] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100000000); // 10 Cr default max price limit
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<number>(100000000);
  const [endpoint, setEndpoint] = useState("/projects");
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load initial and dynamic filters from URL
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam !== null) {
      setSearch(searchParam);
      setDebouncedSearch(searchParam);
      setHasInteracted(true);
    }
    
    const typeParam = searchParams.get("type") || searchParams.get("propertyType");
    if (typeParam) {
      setSelectedTypes(typeParam.split(","));
      setHasInteracted(true);
    }
    
    const bhkParam = searchParams.get("bhk");
    if (bhkParam) {
      setSelectedBhks(bhkParam.split(","));
      setHasInteracted(true);
    }
    
    const maxPriceParam = searchParams.get("maxPrice");
    if (maxPriceParam) {
      const val = parseFloat(maxPriceParam);
      if (!isNaN(val)) {
        setMaxPrice(val);
        setDebouncedMaxPrice(val);
        setHasInteracted(true);
      }
    }
  }, [searchParams]);

  // Debounce maxPrice changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice);
    }, 400);
    return () => clearTimeout(handler);
  }, [maxPrice]);

  // Debounce search input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Update endpoint dynamically based on filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTypes.length > 0) params.append("type", selectedTypes.join(","));
    if (selectedBhks.length > 0) params.append("bhk", selectedBhks.join(","));
    if (debouncedMaxPrice < 100000000) params.append("maxPrice", String(debouncedMaxPrice));
    if (debouncedSearch) params.append("search", debouncedSearch);
    
    // Preserve constructionStatus from URL if present
    const constructionStatus = searchParams.get("constructionStatus");
    if (constructionStatus) params.append("constructionStatus", constructionStatus);
    
    const queryStr = params.toString();
    const newEndpoint = `/projects${queryStr ? `?${queryStr}` : ""}`;
    if (newEndpoint !== "/projects") {
      setHasInteracted(true);
    }
    setEndpoint(newEndpoint);
  }, [selectedTypes, selectedBhks, debouncedMaxPrice, debouncedSearch, searchParams]);

  const {
    data: properties,
    isLoading,
    currentPage,
    totalPages,
    fetchData: fetchProperties,
  } = usePaginationFetch<any>({ endpoint, limit: 9, dataKey: "projects" });

  // Use client-fetched properties once available; fall back to SSR initialProjects while loading
  const groupedProperties = (properties && properties.length > 0)
    ? properties
    : (hasInteracted ? [] : initialProjects);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(search); // Force immediate update
    setHasInteracted(true);
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
            — Explore Listings
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">
            Ongoing Residential &amp; Commercial Projects
          </h1>
          <p className="text-[#172033]/60 max-w-2xl text-lg font-light">
            Find your dream residential apartments, plots, or premium commercial spaces across major cities.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Left Column: Filter Panel (sticky) */}
          <PropertyFilters
            selectedTypes={selectedTypes}
            selectedBhks={selectedBhks}
            maxPrice={maxPrice}
            setSelectedTypes={(v) => { setSelectedTypes(v); setHasInteracted(true); }}
            setSelectedBhks={(v) => { setSelectedBhks(v); setHasInteracted(true); }}
            setMaxPrice={(v) => { setMaxPrice(v); setHasInteracted(true); }}
            onReset={() => {
              setSearch("");
              setSelectedTypes([]);
              setSelectedBhks([]);
              setMaxPrice(100000000);
              setHasInteracted(false);
            }}
          />

          {/* Right Column: Listings Grid & Pagination */}
          <div className="space-y-8">
            {/* Search Input */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 border border-[#172033]/10 rounded-xl flex items-center shadow-sm"
            >
              <Search className="w-5 h-5 text-[#172033]/40 ml-3 mr-2 shrink-0" />
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
                  <div
                    key={i}
                    className="bg-white border border-[#172033]/10 rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="h-64 bg-[#172033]/8" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[#172033]/8 rounded w-1/4" />
                      <div className="h-5 bg-[#172033]/10 rounded w-3/4" />
                      <div className="h-4 bg-[#172033]/6 rounded w-1/2" />
                      <div className="h-px bg-[#172033]/5 my-2" />
                      <div className="h-6 bg-[#172033]/8 rounded w-2/5" />
                      <div className="h-9 bg-[#172033]/8 rounded w-full mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : groupedProperties.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#172033]/10 rounded-xl text-[#172033]/40">
                No properties found matching your criteria. Try adjusting your filters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {groupedProperties.map((item: any, index: number) => (
                    <PropertyCard
                      key={item.id}
                      priority={index < 4}
                      property={{
                        ...item,
                        _isProject: true,
                        _variants: item.configurations
                      }}
                      onClick={() => {
                        router.push(`/projects/${item.slug}`);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination Controls — shown when there are multiple pages */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={fetchProperties}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
