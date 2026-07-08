"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PropertyImageSlider } from "@/components/ui/property-image-slider";
import {
  MapPin,
  Loader2,
  Calendar,
  Clock,
  Phone,
  User,
  MessageSquare,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("CALLBACK");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/properties/${id}`);
        if (res.data.success) {
          setProperty(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        propertyId: id,
        name,
        phone,
        type,
        message,
        preferredDate: preferredDate ? new Date(preferredDate).toISOString() : undefined,
        preferredSlot: preferredSlot || undefined,
      };

      const res = await api.post("/leads", payload);
      if (res.data.success) {
        setSubmitSuccess(true);
        setName("");
        setPhone("");
        setType("CALLBACK");
        setMessage("");
        setPreferredDate("");
        setPreferredSlot("");
      }
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusLabel = (tag: string, status: string) => {
    if (tag === "READY_TO_MOVE") return "Ready to Move";
    if (tag === "UNDER_CONSTRUCTION") return "Under Construction";
    return status === "ACTIVE" ? "Available" : status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#0B132B]/50 bg-[#F4F6F9]">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#0B132B]/50 bg-[#F4F6F9] px-4 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#0B132B]">Property Not Found</h2>
        <p className="text-sm max-w-sm">The listing you are looking for does not exist or has been removed.</p>
        <Link href="/properties">
          <Button className="bg-[#0B132B] text-white">Back to Properties</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link href="/properties" className="inline-flex items-center text-sm font-medium text-[#0B132B]/60 hover:text-[#0B132B] transition-colors gap-1">
          <ChevronLeft className="w-4 h-4" />
          Back to Listings
        </Link>

        {/* Title & Location Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white border-none rounded-sm px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                {property.type.replace("_", " ")}
              </Badge>
              {property.tag && property.tag !== "NONE" && (
                <Badge className="bg-[#172033] hover:bg-[#172033] text-white border-none rounded-sm px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                  {property.tag.replace("_", " ")}
                </Badge>
              )}
              {property.constructionStatus && property.constructionStatus !== "NONE" && (
                <Badge className="bg-green-600 hover:bg-green-600 text-white border-none rounded-sm px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold">
                  {property.constructionStatus === "READY_TO_MOVE" ? "Ready to Move" : "Under Construction"}
                </Badge>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#0B132B] font-bold">{property.title}</h1>
            <div className="flex items-center text-[#0B132B]/60 text-sm">
              <MapPin className="w-4 h-4 mr-1 text-[#D4AF37]" />
              <span>{property.address ? `${property.address}, ` : ""}{property.locality}, {property.city}</span>
            </div>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl border border-[#0B132B]/10 shadow-sm shrink-0">
            <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold mb-0.5">Base Price</p>
            <p className="text-3xl font-bold text-[#D4AF37]">
              ₹{Number(property.basePrice).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          
          {/* Left Panel: Carousel, Description, Amenities */}
          <div className="space-y-8">
            
            {/* Image Slider */}
            {property.images && property.images.length > 0 ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#0B132B]/10 bg-white p-2 h-64 sm:h-96 md:h-[480px]">
                <PropertyImageSlider images={property.images} title={property.title} disableHoverPause={true} />
              </div>
            ) : (
              <div className="h-64 sm:h-96 bg-white border border-[#0B132B]/10 rounded-2xl flex items-center justify-center text-[#0B132B]/30 font-medium">
                No images available for this property listing.
              </div>
            )}

            {/* Quick Specs Panel */}
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-[#0B132B]/10">
                <div className="p-6 text-center">
                  <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold">BHK Config</p>
                  <p className="text-xl font-bold text-[#0B132B] mt-1">{property.bhk} BHK</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold">Carpet Area</p>
                  <p className="text-xl font-bold text-[#0B132B] mt-1">{property.carpetArea} sqft</p>
                </div>
                <div className="p-6 text-center">
                  <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold">Transaction</p>
                  <p className="text-xl font-bold text-[#0B132B] mt-1 uppercase tracking-wider">{property.priceType}</p>
                </div>
              </div>
            </Card>

            {/* Description Card */}
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-sm p-8 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-[#0B132B] font-bold">About the Property</h2>
              <p className="text-[#0B132B]/75 leading-relaxed text-sm sm:text-base font-light whitespace-pre-line">
                {property.description}
              </p>
            </Card>

            {/* Amenities Card */}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-sm p-8 space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#0B132B] font-bold">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((item: any, idx: number) => (
                    <div key={item.id ?? `amenity-${idx}`} className="flex items-center gap-3 p-3 bg-[#F8F9FA] border border-[#0B132B]/5 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#0B132B]/80">{item.amenity.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Location Map */}
            {property.mapUrl && (
              <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-sm p-8 space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#0B132B] font-bold">Property Location</h2>
                <div className="rounded-xl overflow-hidden h-80 w-full border border-[#0B132B]/5 shadow-inner">
                  <iframe
                    src={property.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Card>
            )}

          </div>

          {/* Right Panel: Sticky Inquiry Form */}
          <div className="lg:sticky lg:top-28">
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-md p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-[#0B132B]">Interested in this Property?</h3>
                <p className="text-xs text-[#0B132B]/60">Submit your contact info and our advisory experts will reach out to you.</p>
              </div>

              {submitSuccess ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <h4 className="font-bold text-green-800">Inquiry Submitted!</h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Thank you for expressing interest in <strong>{property.title}</strong>. An advisor will contact you shortly on your provided phone number.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-100 bg-white text-xs uppercase tracking-wider"
                  >
                    Submit another inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-xs text-[#0B132B]/80 font-medium">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B132B]/40" />
                      <Input
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-9 h-11 border-[#0B132B]/10 focus-visible:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs text-[#0B132B]/80 font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B132B]/40" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-9 h-11 border-[#0B132B]/10 focus-visible:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <Label htmlFor="type" className="text-xs text-[#0B132B]/80 font-medium">Inquiry Type</Label>
                    <Select value={type} onValueChange={(v) => setType(v ?? "")}>
                      <SelectTrigger className="w-full h-11 border-[#0B132B]/10 focus-visible:border-[#D4AF37] focus:ring-3 focus:ring-[#D4AF37]/20 rounded-lg text-[#0B132B] px-3 bg-white flex items-center justify-between">
                        <SelectValue placeholder="Choose option" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-[#0B132B] border border-[#0B132B]/10 p-1 shadow-xl rounded-lg">
                        <SelectItem value="CALLBACK">
                          Request Callback
                        </SelectItem>
                        <SelectItem value="SITE_VISIT">
                          Schedule Site Visit
                        </SelectItem>
                        <SelectItem value="VIDEO_TOUR">
                          Request Video Tour
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Date & Slot (Only if Site Visit or Video Tour) */}
                  {type !== "CALLBACK" && (
                    <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="space-y-1">
                        <Label htmlFor="preferredDate" className="text-xs text-[#0B132B]/80 font-medium">Preferred Date</Label>
                        <div className="relative">
                          <Input
                            id="preferredDate"
                            type="date"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="border-[#0B132B]/10 focus-visible:ring-[#D4AF37]"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="preferredSlot" className="text-xs text-[#0B132B]/80 font-medium">Time Slot</Label>
                        <Select value={preferredSlot} onValueChange={(v) => setPreferredSlot(v ?? "")}>
                          <SelectTrigger className="border-[#0B132B]/10 focus:ring-[#D4AF37]">
                            <SelectValue placeholder="Select Slot" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#0B132B] border-[#0B132B]/10">
                            <SelectItem value="MORNING">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="AFTERNOON">Afternoon (12 PM - 4 PM)</SelectItem>
                            <SelectItem value="EVENING">Evening (4 PM - 7 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs text-[#0B132B]/80 font-medium">Custom Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#0B132B]/40" />
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="I'm interested in..."
                        className="flex min-h-[90px] w-full rounded-md border border-[#0B132B]/10 bg-transparent pl-9 pr-3 py-2 text-sm text-[#0B132B] placeholder:text-[#0B132B]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B132B] hover:bg-primary text-white hover:text-[#0B132B] font-semibold text-xs uppercase tracking-widest h-11 transition-all duration-300"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Submit Request
                  </Button>

                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-[#0B132B]/10 w-full"></div>
                    <span className="bg-white px-3 text-[10px] text-[#0B132B]/40 uppercase tracking-wider absolute">Or</span>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      const msg = `Hi Bricksage, I am interested in the property: *${property.title}* located in ${property.locality}. Here is the link: ${window.location.href}`;
                      window.open(`https://wa.me/91808041953?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs uppercase tracking-widest h-11 transition-all duration-300 flex items-center justify-center rounded-md"
                  >
                    <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.89-3.88l.385.23c1.472.873 3.165 1.333 4.89 1.335 5.537 0 10.04-4.507 10.044-10.05.002-2.684-1.04-5.207-2.93-7.097C16.536 2.65 14.02 1.61 11.332 1.61 5.792 1.61 1.287 6.115 1.283 11.66c-.001 1.83.479 3.618 1.39 5.197l.255.44-1.01 3.689 3.77-.988zM16.52 14.19c-.274-.137-1.62-.8-1.87-.893-.25-.093-.43-.138-.61.137-.18.275-.7 1.01-.86 1.194-.16.184-.32.206-.6.069-.27-.137-1.15-.423-2.18-1.347-.8-.717-1.34-1.605-1.5-1.88-.16-.275-.02-.424.12-.56.12-.124.27-.32.41-.48.14-.16.19-.275.28-.458.09-.184.05-.344-.02-.482-.07-.137-.61-1.468-.84-2.01-.22-.54-.48-.465-.66-.474-.17-.008-.37-.01-.57-.01-.2 0-.52.074-.79.37-.27.295-1.04 1.016-1.04 2.477 0 1.46 1.06 2.87 1.21 3.078.15.206 2.09 3.195 5.07 4.485.71.307 1.26.49 1.69.628.71.226 1.36.194 1.87.118.57-.085 1.62-.663 1.85-1.302.23-.639.23-1.187.16-1.302-.07-.11-.25-.183-.52-.32z"/>
                    </svg>
                    Direct Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
