"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectInquirySectionProps {
  projectTitle: string;
  projectId?: string;
}

export default function ProjectInquirySection({ projectTitle, projectId }: ProjectInquirySectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("CALLBACK");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "Error", description: "Name and Phone are required.", variant: "destructive" });
      return;
    }
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      toast({ title: "Invalid Input", description: "Please enter a valid mobile number.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/leads", { name, phone, type, message, ...(projectId ? { projectId } : {}) });
      setIsSubmitted(true);
    } catch (error: any) {
      toast({ title: "Error", description: error?.response?.data?.message || "Failed to submit request", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-green-500" />
        <h4 className="font-serif text-xl font-bold text-[#172033]">Request Received!</h4>
        <p className="text-sm text-[#172033]/60 font-light max-w-xs">
          Thank you! Our Bricksage advisor will call you shortly with verified details for {projectTitle}.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="text-xs uppercase tracking-wider">
          Send Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="inq-name" className="text-xs uppercase tracking-widest text-[#172033]/60 font-bold">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#172033]/30" />
          <Input
            id="inq-name"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-11 bg-[#F4F6F9] border-[#172033]/10 focus:border-[#D4AF37] focus-visible:ring-0 text-[#172033]"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="inq-phone" className="text-xs uppercase tracking-widest text-[#172033]/60 font-bold">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#172033]/30" />
          <Input
            id="inq-phone"
            type="tel"
            required
            placeholder="+91 XXXXX XXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-10 h-11 bg-[#F4F6F9] border-[#172033]/10 focus:border-[#D4AF37] focus-visible:ring-0 text-[#172033]"
          />
        </div>
      </div>

      {/* Type */}
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-widest text-[#172033]/60 font-bold">I Want To</Label>
        <Select value={type} onValueChange={(v) => setType(v ?? "CALLBACK")}>
          <SelectTrigger className="h-11 bg-[#F4F6F9] border-[#172033]/10 focus:ring-[#D4AF37] text-[#172033]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#172033]/10">
            <SelectItem value="CALLBACK">Request a Callback</SelectItem>
            <SelectItem value="SITE_VISIT">Schedule a Site Visit</SelectItem>
            <SelectItem value="BROCHURE">Get Brochure & Price Sheet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="inq-msg" className="text-xs uppercase tracking-widest text-[#172033]/60 font-bold">Message (Optional)</Label>
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#172033]/30" />
          <textarea
            id="inq-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your query or preferred configuration..."
            className="flex min-h-[90px] w-full rounded-md border border-[#172033]/10 bg-[#F4F6F9] pl-10 pr-3 py-2.5 text-sm focus:border-[#D4AF37] focus:outline-none text-[#172033]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-[#D4AF37] hover:bg-[#c5a030] text-white font-bold text-sm uppercase tracking-widest rounded-lg"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {type === "SITE_VISIT" ? "Schedule My Visit" : "Talk to an Expert"}
      </Button>

      <a
        href="https://wa.me/919987510672?text=Hi!%20I%27m%20interested%20in%20learning%20more%20about%20the%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full h-12 bg-[#172033] hover:bg-[#172033]/90 text-white font-bold text-sm rounded-lg transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        Chat on WhatsApp
      </a>

      <p className="text-center text-[10px] text-[#172033]/40 font-light">
        0% Brokerage · No Hidden Charges · Direct Developer Pricing
      </p>
    </form>
  );
}
