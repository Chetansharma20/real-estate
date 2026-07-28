"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

export function CtaSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    try {
      await api.post("/leads", {
        name,
        phone: `${phoneCode} ${phone}`,
        message: notes,
        type: "CALLBACK"
      });
      toast({ title: "Success!", description: "Your request has been submitted. We'll contact you soon." });
      setName("");
      setPhone("");
      setNotes("");
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.message || "Failed to submit request", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-[700px] overflow-hidden bg-white">
      
      {/* ── Left Section: Form ── */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-10 bg-white">
        <div className="w-full max-w-[440px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#C9A84C]" />
            <h2 className="text-[#172033] font-medium tracking-[0.15em] text-[13px] uppercase">
              Schedule a Call
            </h2>
          </div>
          
          <h3 className="font-serif text-3xl md:text-4xl text-[#172033] font-bold mb-10 leading-tight">
            Let's Discuss Your <span className="text-[#C9A84C] italic font-light">Requirements</span>
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5 text-left">
              <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-[#172033]/60 font-semibold">Name*</Label>
              <Input 
                id="name" 
                placeholder="Your name" 
                required 
                className="h-12 rounded-none border-0 border-b border-[#E5E7EB] shadow-none placeholder:text-[#9CA3AF] text-[#172033] focus-visible:ring-0 focus-visible:border-[#C9A84C] px-0 bg-transparent transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2.5 text-left">
              <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-[#172033]/60 font-semibold">Phone Number*</Label>
              <div className="flex border-b border-[#E5E7EB] h-12 focus-within:border-[#C9A84C] transition-colors">
                <Select value={phoneCode} onValueChange={(val) => setPhoneCode(val || "+91")}>
                  <SelectTrigger className="w-[85px] h-full rounded-none border-0 shadow-none focus:ring-0 focus:ring-offset-0 bg-transparent text-[#172033] px-0">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+971">+971</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="Your phone number" 
                  required 
                  className="h-full rounded-none border-0 shadow-none placeholder:text-[#9CA3AF] text-[#172033] focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 px-2 bg-transparent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2.5 text-left">
              <Label htmlFor="notes" className="text-[10px] uppercase tracking-widest text-[#172033]/60 font-semibold">Notes To Us</Label>
              <Textarea 
                id="notes" 
                placeholder="Requirements, best time for a call, etc." 
                className="rounded-none border-0 border-b border-[#E5E7EB] shadow-none placeholder:text-[#9CA3AF] text-[#172033] focus-visible:ring-0 focus-visible:border-[#C9A84C] min-h-[80px] resize-y px-0 bg-transparent transition-colors"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#172033] hover:bg-[#C9A84C] text-white rounded-none h-12 text-[12px] tracking-[0.1em] uppercase font-medium transition-all duration-300 shadow-none group flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Submitting..." : "Request Call Back"}
                {!isSubmitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Middle Decorative Arrow ── */}
      <div className="hidden md:flex absolute left-1/2 md:left-[45%] lg:left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Right Section: Image ── */}
      <div className="w-full md:w-[55%] lg:w-[60%] relative h-[400px] md:h-auto overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact-bg.png')" }}
        />
        {/* Subtle overlay for better blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-30 md:opacity-100 w-32" />
        <div className="absolute inset-0 bg-[#172033]/10 mix-blend-multiply pointer-events-none" />
      </div>

    </section>
  );
}
