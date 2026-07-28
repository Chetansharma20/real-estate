"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

interface PropertyFiltersProps {
  selectedTypes: string[];
  selectedBhks: string[];
  maxPrice: number;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedBhks: React.Dispatch<React.SetStateAction<string[]>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
}

export default function PropertyFilters({
  selectedTypes,
  selectedBhks,
  maxPrice,
  setSelectedTypes,
  setSelectedBhks,
  setMaxPrice,
  onReset,
}: PropertyFiltersProps) {
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

  return (
    <Card className="border border-[#172033]/10 rounded-xl bg-white shadow-sm p-8 lg:sticky lg:top-28 space-y-6">
      <div>
        <h3 className="font-semibold text-base text-[#172033]">Filters</h3>
        <p className="text-[10px] text-[#172033]/40 uppercase tracking-widest mt-0.5 font-bold">
          Refine your search
        </p>
      </div>

      <div className="space-y-4">
        {/* Type Filter */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#172033]/60 font-bold">Property Type</label>
          <div className="space-y-1">
            {PROPERTY_TYPES.map((pt) => (
              <label
                key={pt.value}
                className="flex items-center gap-3.5 cursor-pointer group select-none p-2.5 hover:bg-[#F8F9FA] rounded-lg transition-all border border-transparent hover:border-[#172033]/5"
              >
                <Checkbox
                  className="size-6 shrink-0 data-checked:bg-[#D4AF37] data-checked:border-[#D4AF37]"
                  checked={selectedTypes.includes(pt.value)}
                  onCheckedChange={(checked) => handleTypeCheckboxChange(pt.value, !!checked)}
                />
                <span className="text-base font-semibold text-[#172033]/80 group-hover:text-[#172033] transition-colors">
                  {pt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* BHK Filter */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#172033]/60 font-bold">
            BHK Configuration
          </label>
          <div className="space-y-1">
            {BHK_CONFIGS.map((bc) => (
              <label
                key={bc.value}
                className="flex items-center gap-3.5 cursor-pointer group select-none p-2.5 hover:bg-[#F8F9FA] rounded-lg transition-all border border-transparent hover:border-[#172033]/5"
              >
                <Checkbox
                  className="size-6 shrink-0 data-checked:bg-[#D4AF37] data-checked:border-[#D4AF37]"
                  checked={selectedBhks.includes(bc.value)}
                  onCheckedChange={(checked) => handleBhkCheckboxChange(bc.value, !!checked)}
                />
                <span className="text-base font-semibold text-[#172033]/80 group-hover:text-[#172033] transition-colors">
                  {bc.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-3 pt-2 border-t border-[#172033]/5">
          <div className="flex justify-between items-center">
            <label className="text-xs uppercase tracking-wider text-[#172033]/60 font-bold">Max Budget</label>
            <span className="text-xs text-[#D4AF37] font-bold">
              {(maxPrice / 10000000).toFixed(2)} Cr
            </span>
          </div>

          <input
            type="range"
            min={1000000}
            max={100000000}
            step={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-[#172033]/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />

          <div className="relative flex items-center mt-1">
            <span className="absolute left-3 text-xs text-[#172033]/40 font-medium">₹</span>
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="pl-7 border-[#172033]/10 focus-visible:ring-[#D4AF37] h-9 text-xs rounded-lg bg-[#F8F9FA]"
              placeholder="Enter max price"
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button
          type="button"
          onClick={onReset}
          variant="outline"
          className="w-full bg-transparent border-[#172033]/10 hover:bg-[#F8F9FA] text-[#172033] h-10 mt-2 text-xs uppercase tracking-wider rounded-lg font-semibold"
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}
