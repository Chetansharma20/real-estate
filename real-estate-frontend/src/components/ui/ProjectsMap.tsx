"use client";

import { useEffect, useRef } from "react";

interface Project {
  id: string;
  title: string;
  slug: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  constructionStatus: string;
  status: string;
  coverImage?: string;
  configurations?: { bhk: number; totalPrice: number }[];
}

interface ProjectsMapProps {
  projects: Project[];
}

export default function ProjectsMap({ projects }: ProjectsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    /* Map logic commented out for now
    if (!mapRef.current || mapInstanceRef.current) return;

    const validProjects = projects.filter(
      (p) => p.latitude && p.longitude && p.status === "ACTIVE"
    );

    if (validProjects.length === 0) return;

    // Dynamically import Leaflet (SSR-safe)
    import("leaflet").then((L) => {
      // Fix default icon paths for Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Center map on avg lat/lng
      const avgLat =
        validProjects.reduce((s, p) => s + p.latitude, 0) / validProjects.length;
      const avgLng =
        validProjects.reduce((s, p) => s + p.longitude, 0) / validProjects.length;

      const map = L.map(mapRef.current!, {
        center: [avgLat, avgLng],
        zoom: 11,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom gold marker icon
      const goldIcon = L.divIcon({
        html: `<div style="
          width:28px;height:28px;
          background:#D4AF37;
          border:3px solid #172033;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      // Add markers
      validProjects.forEach((project) => {
        const minPrice = project.configurations && project.configurations.length > 0
          ? Math.min(...project.configurations.map((c) => c.totalPrice))
          : null;

        const priceStr = minPrice
          ? minPrice >= 1_00_00_000
            ? `₹${(minPrice / 1_00_00_000).toFixed(2)} Cr`
            : `₹${(minPrice / 1_00_000).toFixed(1)} L`
          : "Price on request";

        const bhks = project.configurations && project.configurations.length > 0
          ? [...new Set(project.configurations.map((c) => c.bhk))].sort().join(", ") + " BHK"
          : "";

        const popupHtml = `
          <div style="font-family:'DM Sans',sans-serif;min-width:220px;max-width:260px;padding:4px;">
            ${
              project.coverImage
                ? `<img src="${project.coverImage}" alt="${project.title}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;margin-bottom:10px;"/>`
                : ""
            }
            <div style="font-size:15px;font-weight:700;color:#172033;margin-bottom:4px;">${project.title}</div>
            ${bhks ? `<div style="font-size:12px;color:#6b7280;margin-bottom:3px;">${bhks}</div>` : ""}
            <div style="font-size:13px;font-weight:600;color:#D4AF37;margin-bottom:8px;">${priceStr}</div>
            <a href="/projects/${project.slug}" style="
              display:inline-block;
              background:#172033;color:#fff;
              font-size:12px;font-weight:600;
              padding:6px 14px;border-radius:6px;
              text-decoration:none;
            ">View Project &rarr;</a>
          </div>
        `;

        L.marker([project.latitude, project.longitude], { icon: goldIcon })
          .addTo(map)
          .bindPopup(popupHtml, { maxWidth: 280 });
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    */
  }, [projects]);

  return (
    <div
      ref={mapRef}
      className="bg-[#172033]/5 border border-[#172033]/10 rounded-2xl h-[500px] flex flex-col items-center justify-center text-[#172033]/40 text-sm gap-2"
    >
      <div className="font-semibold">Interactive Map</div>
      <div className="text-xs">Map functionality is temporarily disabled.</div>
    </div>
  );
}
