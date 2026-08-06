"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { usePaginationFetch } from "@/hooks/use-pagination-fetch";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/property/property-card";
import Link from "next/link";

interface ProjectItem {
  id: string;
  configurations?: unknown[];
  [key: string]: unknown;
}

interface ProjectsCategoryPageProps {
  heading: string;
  subheading: string;
  description: string;
  defaultTypeFilter?: string[];
  defaultConstructionStatusFilter?: string;
}

function CategoryPageContent({
  heading,
  subheading,
  description,
  defaultTypeFilter = [],
  defaultConstructionStatusFilter,
}: ProjectsCategoryPageProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Derive endpoint directly — no extra state or cascading render
  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (defaultTypeFilter.length > 0) {
      params.append("type", defaultTypeFilter.join(","));
    }
    if (defaultConstructionStatusFilter) {
      params.append("constructionStatus", defaultConstructionStatusFilter);
    }
    if (debouncedSearch) {
      params.append("search", debouncedSearch);
    }
    const queryStr = params.toString();
    return `/projects${queryStr ? `?${queryStr}` : ""}`;
  }, [debouncedSearch, defaultTypeFilter, defaultConstructionStatusFilter]);

  const {
    data: properties,
    isLoading,
    currentPage,
    totalPages,
    fetchData: fetchProperties,
  } = usePaginationFetch<ProjectItem>({ endpoint, limit: 9, dataKey: "projects" });

  const groupedProperties = properties || [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearch(search);
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6 xl:px-12">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#172033]/40 font-medium">
          <Link href="/" className="hover:text-[#172033] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#172033] transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#172033]/70">{heading}</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
            {subheading}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-bold">
            {heading}
          </h1>
          <p className="text-[#172033]/50 font-light text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-2 border border-[#172033]/10 rounded-xl flex items-center shadow-sm max-w-2xl"
        >
          <Search className="w-5 h-5 text-[#172033]/40 ml-3 mr-2 shrink-0" />
          <Input
            placeholder={`Search ${heading.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 bg-transparent text-base px-2 h-auto flex-1"
          />
          <Button type="submit" className="ml-2 bg-[#D4AF37] hover:bg-[#C5A030] text-white rounded-lg px-6">
            Search
          </Button>
        </form>

        {/* Listings */}
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
            No properties found matching your criteria. Try adjusting your search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {groupedProperties.map((item: ProjectItem, index: number) => (
                <PropertyCard
                  key={item.id}
                  priority={index < 4}
                  property={{
                    ...item,
                    _isProject: true,
                    _variants: item.configurations,
                  }}
                  onClick={() => router.push(`/projects/${item.id}`)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={fetchProperties}
            />
          </>
        )}

        {/* Browse other categories */}
        <div className="pt-8 border-t border-[#172033]/10">
          <p className="text-xs uppercase tracking-widest text-[#172033]/40 font-bold mb-4">Browse Other Categories</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects/apartments-mumbai-thane"
              className="px-4 py-2 rounded-lg border border-[#172033]/10 text-sm font-medium text-[#172033]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              Apartments
            </Link>
            <Link
              href="/projects/plots-mumbai-thane"
              className="px-4 py-2 rounded-lg border border-[#172033]/10 text-sm font-medium text-[#172033]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              Plots
            </Link>
            <Link
              href="/projects/commercial-projects-mumbai-thane"
              className="px-4 py-2 rounded-lg border border-[#172033]/10 text-sm font-medium text-[#172033]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              Commercial
            </Link>
            <Link
              href="/projects/new-launch-projects-mumbai-thane"
              className="px-4 py-2 rounded-lg border border-[#172033]/10 text-sm font-medium text-[#172033]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              New Launches
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg border border-[#172033]/10 text-sm font-medium text-[#172033]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsCategoryPage(props: ProjectsCategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 flex items-center justify-center text-[#172033]/60 font-semibold text-lg">
          Loading properties...
        </div>
      }
    >
      <CategoryPageContent {...props} />
    </Suspense>
  );
}
