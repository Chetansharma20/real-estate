"use client";

import React from "react";
import { ArrowRight, MapPin, Building2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyImageSlider } from "@/components/ui/property-image-slider";
import { getMediaUrl } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: any;
  onClick: () => void;
  priority?: boolean;
}

export default function PropertyCard({ property, onClick, priority = false }: PropertyCardProps) {
  const isProject = !!property._isProject;
  const variants: any[] = property._variants ?? [];
  
  const loc = property.locality || property.township?.locality || "Location";
  const cty = property.city || property.township?.city || "TBD";
  const title = property.township ? `${property.township.name} - ${property.title}` : property.title;

  const rawImages = (isProject ? (property.media || property.images) : property.images) || [];
  const sliderImages = rawImages.map((img: any) => ({
    ...img,
    url: getMediaUrl(img.url)
  }));

  // Project specific data
  const allBhk = isProject ? [...new Set(variants.flatMap((v: any) => (Array.isArray(v.bhk) ? v.bhk : [v.bhk])))].sort() : [];
  const minPrice = isProject ? (variants.length > 0 ? Math.min(...variants.map((v: any) => Number(v.totalPrice || 0))) : 0) : Number(property.basePrice || 0);

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer overflow-hidden flex flex-col bg-white border border-[#172033]/10 shadow-sm hover:shadow-lg hover:bg-[#172033] transition-all duration-300 rounded-xl group h-full"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <PropertyImageSlider images={sliderImages} title={property.title} priority={priority} />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isProject ? (
            <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
              Project
            </Badge>
          ) : (
            <>
              <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
                {property.type?.replace("_", " ")}
              </Badge>
              {property.tag && property.tag !== "NONE" && (
                <Badge className="bg-[#172033]/90 hover:bg-[#172033] text-white border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold w-fit">
                  {property.tag.replace("_", " ")}
                </Badge>
              )}
            </>
          )}
        </div>

        {!isProject && property.constructionStatus && property.constructionStatus !== "NONE" && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 backdrop-blur-xs text-[#172033] hover:bg-white/90 border-none rounded-sm px-3 py-1 text-[10px] uppercase tracking-wider font-bold">
              {property.constructionStatus === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
            </Badge>
          </div>
        )}

        {isProject && variants.length > 0 && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-[#172033]/80 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
              {variants.length} {variants.length === 1 ? "Unit" : "Units"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-6 flex-grow bg-transparent space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-xl text-[#172033] line-clamp-1 group-hover:text-white transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-[#172033]/60 group-hover:text-blue-100 text-sm transition-colors">
            <MapPin className="w-4 h-4 mr-1 text-[#D4AF37] group-hover:text-white transition-colors" />
            <span className="truncate">{loc}, {cty}</span>
          </div>
        </div>

        {isProject ? (
          <div className="border-t border-[#172033]/5 group-hover:border-[#38486b] pt-4 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-[#172033]/40 group-hover:text-blue-200 font-semibold mb-2 transition-colors">
              Available Configurations
            </p>
            <div className="flex flex-wrap gap-2">
              {allBhk.length > 0 ? allBhk.map((bhk: number) => (
                <span
                  key={bhk}
                  className="px-3 py-1 text-xs font-bold rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-white/15 group-hover:border-white/30 group-hover:text-white transition-colors"
                >
                  {bhk} BHK
                </span>
              )) : (
                <span className="text-xs text-[#172033]/60 group-hover:text-blue-200">TBD</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm border-t border-[#172033]/5 group-hover:border-[#38486b] pt-4 transition-colors">
            <div>
              <p className="text-[#172033]/40 group-hover:text-blue-200 uppercase tracking-wider text-[11px] transition-colors">Config</p>
              <p className="font-semibold text-[#172033] group-hover:text-white mt-0.5 transition-colors">
                {Array.isArray(property.bhk) ? property.bhk.join(", ") : property.bhk}{" "}
                <span className="font-normal text-xs">BHK</span>
              </p>
            </div>
            {property.carpetArea && (
              <div>
                <p className="text-[#172033]/40 group-hover:text-blue-200 uppercase tracking-wider text-[11px] transition-colors">Carpet Area</p>
                <p className="font-semibold text-[#172033] group-hover:text-white mt-0.5 transition-colors">{property.carpetArea} sqft</p>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex flex-wrap gap-4 justify-between items-center border-t border-[#172033]/5 group-hover:border-[#38486b] bg-[#F8F9FA]/50 group-hover:bg-transparent mt-auto transition-colors">
        <div>
          <p className="text-[#172033]/40 group-hover:text-blue-200 text-[10px] uppercase tracking-wider font-bold transition-colors">
            {isProject ? "Starting From" : "Base Price"}
          </p>
          <p className="font-bold text-base sm:text-lg text-[#172033] group-hover:text-white transition-colors">
            {minPrice > 0 ? `₹${formatPrice(minPrice)}` : "Price on Request"}
            {isProject && minPrice > 0 && <span className="text-[10px] sm:text-xs font-normal ml-1 opacity-70">onwards</span>}
          </p>
        </div>
        <div className="inline-flex items-center justify-center gap-1.5 bg-transparent border border-[#172033]/10 group-hover:border-white text-[#172033] group-hover:bg-white group-hover:text-[#172033] rounded-lg h-9 sm:h-10 px-4 sm:px-5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300">
          {isProject ? (
            <>
              <Building2 className="w-3.5 h-3.5" />
              Explore
            </>
          ) : (
            <>
              View <ArrowRight className="w-4 h-4" />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
