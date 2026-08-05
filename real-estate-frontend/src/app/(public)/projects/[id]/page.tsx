"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, getMediaUrl } from "@/lib/api";
import { MapPin, Building2, Check, User, Phone, Mail, FileText, ChevronRight, ArrowRight, Loader2, MessageSquare, CheckSquare, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { TruvaGallery } from "@/components/ui/truva-gallery";
import { formatPrice } from "@/lib/utils";

export default function ProjectDetailPage() {
  const params = useParams();
  const { toast } = useToast();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);
  const [selectedFloorPlanConfigId, setSelectedFloorPlanConfigId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const [activeFloorPlan, setActiveFloorPlan] = useState<any>(null);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("CALLBACK");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderFormContent = (isModal: boolean = false) => (
    <div className={isModal ? "" : ""}>
      <div className={isModal ? "mb-6 text-center" : "mb-6"}>
        <h3 className="text-2xl font-bold text-[#172033]">Interested in {isConfigView ? 'this unit' : 'this project'}?</h3>
        <p className="text-sm text-gray-500 mt-2">Get exclusive details, pricing & offers directly from Bricksage experts.</p>
      </div>

      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h4 className="text-[#172033] font-bold text-xl">Request Received</h4>
            <p className="text-gray-500 text-sm mt-2">Our team will contact you shortly.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLeadSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="name" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 bg-gray-50 border-gray-200 focus-visible:ring-[#D4AF37]" />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="phone" type="tel" required placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 h-12 bg-gray-50 border-gray-200 focus-visible:ring-[#D4AF37]" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 bg-gray-50 border-gray-200 focus-visible:ring-[#D4AF37]" />
            </div>
          </div>

          {/* Enquiry Type */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-widest text-gray-500 font-bold">I want to</Label>
            <Select value={type} onValueChange={(val) => setType(val || "CALLBACK")}>
              <SelectTrigger className="h-12 w-full bg-gray-50 border-gray-200 focus:ring-[#D4AF37] text-[#172033] font-medium">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-150">
                <SelectItem value="CALLBACK" className="text-[#172033]">Request a Callback</SelectItem>
                <SelectItem value="SITE_VISIT" className="text-[#172033]">Schedule Site Visit</SelectItem>
                <SelectItem value="BROCHURE" className="text-[#172033]">Get Brochure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-3">
            <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-[#D4AF37] hover:bg-[#c5a030] text-white font-bold text-sm uppercase tracking-wider">
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {type === "SITE_VISIT" ? "Schedule a Visit" : "Talk to an Expert"}
            </Button>

            <Button 
              type="button" 
              onClick={() => window.open("https://wa.me/919987510672?text=Hi%20there!%20I'm%20interested%20in%20your%20properties.", "_blank")}
              className="w-full h-12 bg-[#172033] hover:bg-[#172033]/90 text-white font-bold text-sm"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-[#25D366]" />
              Chat on WhatsApp
            </Button>
          </div>
        </form>
      )}
    </div>
  );

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${params.id}`);
        const projData = res.data.data;

        setProject(projData);

        if (projData.configurations && projData.configurations.length > 0) {
          setSelectedConfig(projData.configurations[0].id);
          setSelectedFloorPlanConfigId(projData.configurations[0].id);
        }

      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  // Scroll Spy logic for tabs
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ["about", "floor-plan", "flat-images", "amenities", "price"];
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top >= 0 && rect.top <= 300) {
                setActiveTab(prev => prev !== section ? section : prev);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  const openFormModal = (formType: string) => {
    setType(formType);
    setIsModalOpen(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "Error", description: "Name and Phone are required", variant: "destructive" });
      return;
    }

    // Phone validation (7-15 digits)
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      toast({ title: "Invalid Input", description: "Please enter a valid mobile number.", variant: "destructive" });
      return;
    }

    // Optional email validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({ title: "Invalid Input", description: "Please enter a valid email address.", variant: "destructive" });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await api.post("/leads", {
        name,
        email,
        phone,
        type,
        preferredDate: preferredDate ? new Date(preferredDate).toISOString() : undefined,
        preferredSlot,
        message,
        projectId: project.id
      });

      setIsSubmitted(true);
      toast({ title: "Success!", description: "Your request has been submitted. We'll contact you soon." });
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.message || "Failed to submit request", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex justify-center items-center text-xl text-[#172033]/50">
        Project not found
      </div>
    );
  }

  const configurations = project.configurations || [];

  // Dynamic State
  const configData = selectedConfig ? configurations.find((c: any) => c.id === selectedConfig) : null;
  const isConfigView = !!configData;

  // Determine Gallery Images and Flat Images
  const projectMedia = project.media || [];
  const isFlatImage = (url: string) => {
    const urlLower = url.toLowerCase();
    return urlLower.includes('flat%20images') || 
           urlLower.includes('flat images') || 
           urlLower.includes('flat%20image') || 
           urlLower.includes('flat image') ||
           urlLower.includes('flat_images') ||
           urlLower.includes('flat-images');
  };

  const flatImages = projectMedia
    .filter((m: any) => m.type === "IMAGE" && isFlatImage(m.url))
    .map((m: any) => ({ ...m, url: getMediaUrl(m.url) }));

  let galleryImages = [];
  if (isConfigView) {
    galleryImages = projectMedia.filter((m: any) => m.configurationId === selectedConfig && m.type !== "FLOOR_PLAN" && !isFlatImage(m.url));
    if (galleryImages.length === 0) {
      // Fallback to project images
      galleryImages = projectMedia.filter((m: any) => !m.configurationId && m.type !== "FLOOR_PLAN" && !isFlatImage(m.url));
    }
  } else {
    galleryImages = projectMedia.filter((m: any) => !m.configurationId && m.type !== "FLOOR_PLAN" && !isFlatImage(m.url));
  }

  // Map gallery images to format URLs
  galleryImages = galleryImages.map((m: any) => ({ ...m, url: getMediaUrl(m.url) }));

  // Sort gallery images so that the cover image (isCover === true) comes first
  galleryImages.sort((a: any, b: any) => {
    if (a.isCover && !b.isCover) return -1;
    if (!a.isCover && b.isCover) return 1;
    return (a.sortOrder || 0) - (b.sortOrder || 0);
  });

  // Fallback if no images found at all (e.g. cover image deleted)
  if (galleryImages.length === 0) {
    if (flatImages.length > 0) {
      galleryImages = flatImages;
    } else {
      const anyImage = projectMedia.filter((m: any) => m.type === "IMAGE" && m.type !== "FLOOR_PLAN");
      if (anyImage.length > 0) {
        galleryImages = anyImage.map((m: any) => ({ ...m, url: getMediaUrl(m.url) }));
      } else {
        galleryImages = [
          { url: "https://placehold.co/800x600/f3f4f6/a1a1aa?text=No+Images+Available", id: "placeholder" }
        ];
      }
    }
  }

  // Determine Floor Plans
  const allFloorPlans = projectMedia.filter((m: any) => m.type === "FLOOR_PLAN");
  
  // Find current selected floor plan config
  const currentFloorPlanConfig = selectedFloorPlanConfigId
    ? configurations.find((c: any) => c.id === selectedFloorPlanConfigId)
    : null;

  // Find floor plan image based on configurationId, BHK fallback or filename fallback
  let currentFloorPlan = activeFloorPlan;
  if (!currentFloorPlan && currentFloorPlanConfig) {
    // 1. Try direct config link
    currentFloorPlan = allFloorPlans.find((fp: any) => fp.configurationId === currentFloorPlanConfig.id);
    
    // 2. Try configuration sharing the same BHK type
    if (!currentFloorPlan) {
      currentFloorPlan = allFloorPlans.find((fp: any) => {
        if (!fp.configurationId) return false;
        const linkedConfig = configurations.find((c: any) => c.id === fp.configurationId);
        return linkedConfig && linkedConfig.bhk === currentFloorPlanConfig.bhk;
      });
    }

    // 3. Try parsing filename (e.g. "2bhk" or "3bhk")
    if (!currentFloorPlan) {
      currentFloorPlan = allFloorPlans.find((fp: any) => {
        const urlLower = fp.url.toLowerCase();
        const bhk = currentFloorPlanConfig.bhk;
        return urlLower.includes(`${bhk}bhk`) || urlLower.includes(`${bhk} bhk`) || urlLower.includes(`${bhk}_bhk`);
      });
    }
  }

  // 4. Fallback if no matching floor plan found
  if (!currentFloorPlan && allFloorPlans.length > 0) {
    currentFloorPlan = allFloorPlans[0];
  }

  // Determine Prices
  const projectMinPrice = configurations.length > 0
    ? Math.min(...configurations.map((c: any) => Number(c.totalPrice)))
    : 0;

  const currentPrice = projectMinPrice;
  const pageTitle = project.township 
    ? `${project.township.name} - ${project.title}` 
    : project.title;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <div className="py-4 text-xs font-medium text-gray-500 flex items-center gap-2 mb-2">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/projects" className="hover:text-black">Projects</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{pageTitle}</span>
        </div>

        {/* Gallery Section */}
        <div className="mb-8">
          <TruvaGallery images={galleryImages} title={pageTitle} />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Details */}
          <div className="lg:col-span-2">

            {/* Header / Key Info */}
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-[#172033]/5 text-[#172033] hover:bg-[#172033]/10 border-none rounded-md px-3">
                  {project.propertyType?.replace(/_/g, " ")}
                </Badge>
                {!isConfigView && project.constructionStatus && (
                  <Badge className="bg-green-50 text-green-700 border-none rounded-md px-3">
                    {project.constructionStatus?.replace(/_/g, " ")}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#172033] tracking-tight mb-3">
                {pageTitle}
              </h1>

              <div className="flex items-center text-[#172033]/60 text-base md:text-lg mb-8">
                <MapPin className="w-5 h-5 mr-2 text-[#D4AF37] shrink-0" />
                {project.googleMapUrl || project.township?.googleMapUrl ? (
                  <a
                    href={project.googleMapUrl || project.township?.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] hover:underline transition-all cursor-pointer"
                    title="View on Google Maps"
                  >
                    {project.address ? `${project.address}, ` : ""}
                    {project.township?.locality || project.locality}, {project.township?.city || project.city}
                  </a>
                ) : (
                  <span>
                    {project.address ? `${project.address}, ` : ""}
                    {project.township?.locality || project.locality}, {project.township?.city || project.city}
                  </span>
                )}
              </div>

              {/* RERA Block */}
              {(project.reraId || project.reraQrCode) && (
                <div className="flex items-center gap-4 mb-8 p-4 border border-[#172033]/15 bg-gray-50 rounded-xl w-fit min-w-[250px]">
                  {project.reraQrCode && (
                    <div className="w-16 h-16 shrink-0 relative bg-white rounded-md border border-[#172033]/10 p-1 flex items-center justify-center">
                      <Image src={project.reraQrCode} alt="RERA QR Code" fill className="object-contain p-1" />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">RERA Registered</p>
                    {project.reraId && (
                      <p className="font-bold text-[#172033] text-sm">{project.reraId}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Property Details Section Design */}
              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">
                        STARTING PRICE
                      </p>
                      <h2 className="text-4xl md:text-5xl font-bold text-[#172033]">
                        INR {formatPrice(currentPrice)} {isConfigView ? "" : "*"}
                      </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        Legally cleared
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        RERA Approved
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-green-600" />
                        No commissions
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={() => openFormModal("CALLBACK")}
                      className="h-14 bg-[#D4AF37] hover:bg-[#c5a030] text-white text-lg font-semibold flex items-center justify-center gap-2 rounded-xl"
                    >
                      <MessageSquare className="w-5 h-5" /> Talk to an Expert
                    </Button>
                    <Button
                      onClick={() => openFormModal("SITE_VISIT")}
                      variant="outline"
                      className="h-14 bg-white border-2 border-[#172033] text-[#172033] hover:bg-[#172033] hover:text-white text-lg font-semibold flex items-center justify-center gap-2 rounded-xl transition-colors group"
                    >
                      <Calendar className="w-5 h-5 text-[#172033] group-hover:text-white transition-colors" /> Schedule a visit
                    </Button>
                  </div>
                </div>

                {/* Sticky Tabs */}
                <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                  <div className="flex overflow-x-auto no-scrollbar">
                    <button onClick={() => scrollToSection("about")} className={`whitespace-nowrap px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'about' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                      About the Home
                    </button>
                    <button onClick={() => scrollToSection("floor-plan")} className={`whitespace-nowrap px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'floor-plan' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                      Floor Plan and Area
                    </button>
                    <button onClick={() => scrollToSection("flat-images")} className={`whitespace-nowrap px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'flat-images' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                      Flat Images
                    </button>
                    <button onClick={() => scrollToSection("amenities")} className={`whitespace-nowrap px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'amenities' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                      Amenities
                    </button>
                    <button onClick={() => scrollToSection("price")} className={`whitespace-nowrap px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-colors ${activeTab === 'price' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                      Price Breakdown
                    </button>

                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-6 md:p-8 space-y-16">

                  {/* ABOUT THE HOME */}
                  <div id="about" className="scroll-mt-32 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#172033] mb-3 uppercase tracking-wider">House Overview</h3>
                      <div className="text-gray-600 leading-relaxed text-base whitespace-pre-wrap">
                        {project.description}
                      </div>
                    </div>

                    {configurations.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Configurations & Pricing</h4>
                          {project.reraId && (
                            <span className="text-xs text-gray-400">RERA: <span className="font-bold text-[#172033]">{project.reraId}</span></span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {configurations.map((config: any) => {
                            return (
                              <div 
                                key={config.id}
                                className="border border-gray-200 bg-white p-5 rounded-2xl flex flex-col justify-between h-full shadow-xs"
                              >
                                <div>
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="text-base font-bold text-[#172033] flex items-center gap-1.5">
                                      <Building2 className="w-4.5 h-4.5 text-[#D4AF37]" />
                                      {config.bhk} BHK
                                    </span>
                                    {config.label && (
                                      <Badge className="bg-[#172033]/5 text-[#172033] hover:bg-[#172033]/10 border-none rounded-md text-[10px] uppercase font-bold px-2 py-0.5">
                                        {config.label}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                                    <div className="flex justify-between">
                                      <span>Carpet Area:</span>
                                      <span className="font-semibold text-[#172033]">{config.carpetArea} sq.ft</span>
                                    </div>
                                    {config.builtUpArea && (
                                      <div className="flex justify-between">
                                        <span>Built-up Area:</span>
                                        <span className="font-semibold text-[#172033]">{config.builtUpArea} sq.ft</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                  <span className="text-[10px] text-gray-400 font-bold uppercase">Starting Price</span>
                                  <span className="text-sm font-bold text-[#D4AF37]">
                                    ₹{formatPrice(config.totalPrice)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FLOOR PLAN AND AREA */}
                  <div id="floor-plan" className="scroll-mt-32">
                    <h3 className="text-xl font-bold text-[#172033] uppercase tracking-wider mb-6">Floor Plan and Area</h3>

                    {allFloorPlans.length > 0 ? (
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Main Image */}
                        <div className="lg:w-2/3">
                          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center relative min-h-[400px] lg:min-h-[500px] h-full">
                            {currentFloorPlan ? (
                              <Image src={getMediaUrl(currentFloorPlan.url)} alt="Floor Plan" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-contain p-6" />
                            ) : (
                              <p className="text-gray-400 italic">No floor plan available</p>
                            )}
                          </div>
                        </div>

                        {/* Right: List */}
                        <div className="lg:w-1/3 flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                          {configurations.map((config: any) => {
                            const isActive = selectedFloorPlanConfigId === config.id;
                            const displayName = `${config.bhk} BHK (${config.carpetArea} sq.ft)`;

                            return (
                              <button
                                key={config.id}
                                onClick={() => {
                                  setSelectedFloorPlanConfigId(config.id);
                                  setActiveFloorPlan(null);
                                }}
                                className={`text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-between ${isActive ? 'border-[#D4AF37] bg-[#D4AF37]/5 font-bold text-[#172033]' : 'border-gray-100 bg-white hover:border-gray-300 text-gray-600'}`}
                              >
                                <span>{displayName}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#D4AF37] translate-x-1' : 'text-gray-400'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[300px]">
                        <p className="text-gray-500 italic mb-4">No floor plans available.</p>
                      </div>
                    )}
                  </div>

                  {/* FLAT IMAGES */}
                  <div id="flat-images" className="scroll-mt-32">
                    <h3 className="text-xl font-bold text-[#172033] mb-6 uppercase tracking-wider">Flat Images</h3>
                    {flatImages.length > 0 ? (
                      <TruvaGallery images={flatImages} title="Flat Images" />
                    ) : (
                      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-gray-500 italic">No flat images available at the moment.</p>
                      </div>
                    )}
                  </div>

                  {/* AMENITIES */}
                  <div id="amenities" className="scroll-mt-32">
                    <h3 className="text-xl font-bold text-[#172033] mb-6 uppercase tracking-wider">Amenities</h3>
                    {project.amenities && project.amenities.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {Object.entries(
                          project.amenities.reduce((acc: any, pa: any) => {
                            const cat = pa.amenity.category || "General";
                            if (!acc[cat]) acc[cat] = [];
                            if (!acc[cat].some((a: any) => a.id === pa.amenity.id)) {
                              acc[cat].push(pa.amenity);
                            }
                            return acc;
                          }, {})
                        ).map(([category, amenities]: [string, any]) => (
                          <div key={category}>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">{category}</h4>
                            <ul className="space-y-3">
                              {amenities.map((amenity: any) => (
                                <li key={amenity.id} className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  </div>
                                  <span className="text-gray-700 font-medium">{amenity.name}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No amenities specified.</p>
                    )}
                  </div>

                  {/* PRICE BREAKDOWN */}
                  <div id="price" className="scroll-mt-32">
                    <h3 className="text-xl font-bold text-[#172033] mb-6 uppercase tracking-wider">Price Breakdown</h3>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 max-w-md">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Base Price</span>
                        <span className="font-bold text-[#172033]">₹{formatPrice(currentPrice)} {isConfigView ? "" : "onwards"}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Government Taxes & Duties</span>
                        <span className="text-gray-500 italic">As applicable</span>
                      </div>
                      <div className="flex justify-between items-center py-4">
                        <span className="text-lg font-bold text-[#172033]">Estimated Total</span>
                        <span className="text-xl font-bold text-[#D4AF37]">₹{formatPrice(currentPrice)}*</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">*Prices are indicative and subject to change.</p>
                    </div>
                  </div>



                  {/* Brochure Download */}
                  {project.media?.some((m: any) => m.type === "BROCHURE") && (
                    <div className="pt-8 mt-8 border-t border-gray-100">
                      <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100">
                        <div>
                          <h3 className="text-lg font-bold text-[#172033] mb-1">Download Official Brochure</h3>
                          <p className="text-sm text-gray-500">Get complete details about floor plans, amenities, and specifications.</p>
                        </div>
                        <Button
                          onClick={() => {
                            const doc = project.media.find((m: any) => m.type === "BROCHURE");
                            if (doc) window.open(doc.url, "_blank");
                          }}
                          className="bg-[#172033] hover:bg-black text-white shrink-0 gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Form (Sticky) */}
          <div className="lg:col-span-1" id="lead-form">
            <div className="sticky top-28">
              <Card className="p-6 md:p-8 border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl bg-white">
                {renderFormContent()}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 bg-white border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="hidden">
            <DialogTitle>Contact Form</DialogTitle>
          </DialogHeader>
          {renderFormContent(true)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
