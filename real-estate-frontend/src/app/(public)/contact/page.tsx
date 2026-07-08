"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Phone, Mail, MapPin, CheckCircle2, MessageSquare, User, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("CALLBACK");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name,
        phone,
        type,
        message,
      };

      const res = await api.post("/leads", payload);
      if (res.data.success) {
        setSubmitSuccess(true);
        setName("");
        setPhone("");
        setType("CALLBACK");
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to submit contact request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto space-y-2"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">— Get In Touch</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0B132B] font-bold">Contact Bricksage</h1>
          <p className="text-[#0B132B]/50 font-light text-sm sm:text-base">
            Reach out to our advisory experts or request a consultation regarding commercial property acquisitions and luxury home listings.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          
          {/* Left panel: Info cards */}
          <div className="space-y-6">
            
            {/* Call Center */}
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold">Phone Consultation</p>
                <a href="tel:02234125357" className="font-semibold text-[#0B132B] text-sm block hover:text-[#D4AF37] transition-colors">022 34125357</a>
                <p className="text-xs text-[#0B132B]/50">Mon-Sat, 9:00 AM - 7:00 PM</p>
              </div>
            </Card>

            {/* Email Center */}
            <motion.div variants={fadeUpVariant}>
              <Card className="border border-[#0B132B]/10 rounded-2xl bg-white p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold">Advisory Inbox</p>
                  <a href="mailto:business@bricksage.in" className="font-semibold text-[#0B132B] text-sm block hover:text-[#D4AF37] transition-colors">business@bricksage.in</a>
                  <p className="text-xs text-[#0B132B]/50">Typically replies within 24 hours</p>
                </div>
              </Card>
            </motion.div>

            {/* Office Locations */}
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-3 w-full">
                <div>
                  <p className="text-[10px] text-[#0B132B]/40 uppercase tracking-widest font-bold mb-1">Corporate HQ</p>
                  <p className="font-semibold text-[#0B132B] text-sm leading-snug">Office No. 415, Avior Corporate Park</p>
                  <p className="text-xs text-[#0B132B]/50 mt-1 leading-relaxed">
                    LBS Marg, Opposite Johnson & Johnson,<br />Mulund-West, Mumbai
                  </p>
                </div>
              </div>
            </Card>

          </div>

          {/* Right panel: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="border border-[#0B132B]/10 rounded-2xl bg-white shadow-lg shadow-[#0B132B]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#172033] to-[#25324D] p-6 text-center border-b border-[#D4AF37]/30">
                <h3 className="text-xl font-serif font-bold text-white tracking-wide">Consultation Form</h3>
                <p className="text-xs text-white/70 mt-1.5 font-light">Fill in the fields below to schedule a callback or property sell request.</p>
              </div>

            {submitSuccess ? (
              <div className="p-10 bg-green-50 border border-green-200 rounded-xl text-center space-y-4 max-w-xl mx-auto">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-green-800">Request Received!</h4>
                <p className="text-sm text-green-700 leading-relaxed font-light">
                  Thank you for contacting Bricksage Properties Advisory. Your request has been queued in our system. One of our Senior Property Consultants will call you shortly.
                </p>
                <Button
                  onClick={() => setSubmitSuccess(false)}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-100 bg-white text-xs uppercase tracking-wider"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs text-[#0B132B]/80 font-medium">Your Name</Label>
                    <div className="relative focus-within:text-[#D4AF37] text-[#0B132B]/40 transition-colors duration-300">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-current transition-colors duration-300" />
                      <Input
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-9 h-11 border-[#0B132B]/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-lg text-[#0B132B] transition-all duration-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs text-[#0B132B]/80 font-medium">Phone Number</Label>
                    <div className="relative focus-within:text-[#D4AF37] text-[#0B132B]/40 transition-colors duration-300">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-current transition-colors duration-300" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-9 h-11 border-[#0B132B]/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-lg text-[#0B132B] transition-all duration-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-1 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="type" className="text-xs text-[#0B132B]/80 font-medium">Request Action</Label>
                    <Select value={type} onValueChange={(v) => setType(v ?? "")}>
                      <SelectTrigger className="w-full h-11 border-[#0B132B]/10 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none rounded-lg text-[#0B132B] px-3 bg-white flex items-center justify-between transition-all duration-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-[#0B132B] border border-[#0B132B]/10 p-1 shadow-xl rounded-lg">
                        <SelectItem value="CALLBACK">
                          Request Callback Consultation
                        </SelectItem>
                        <SelectItem value="SELL_REQUEST">
                          Submit Property Selling Request
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="col-span-1 sm:col-span-2 space-y-1.5">
                    <Label htmlFor="message" className="text-xs text-[#0B132B]/80 font-medium">Message / Inquiry Details</Label>
                    <div className="relative focus-within:text-[#D4AF37] text-[#0B132B]/40 transition-colors duration-300">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-current transition-colors duration-300" />
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please write details about what location or budget properties you are looking for..."
                        className="flex min-h-[120px] w-full rounded-lg border border-[#0B132B]/10 bg-transparent pl-9 pr-3 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:opacity-50 text-[#0B132B] transition-all duration-300 bg-white"
                      />
                    </div>
                  </div>

                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4 border-t border-[#0B132B]/5">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#172033] hover:bg-[#D4AF37] text-white hover:text-[#172033] font-semibold text-xs uppercase tracking-widest h-11 px-8 rounded-lg transition-all duration-300 shadow-sm shadow-[#172033]/15 hover:shadow-md hover:shadow-[#D4AF37]/20"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </Card>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
