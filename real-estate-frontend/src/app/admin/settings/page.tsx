"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Save } from "lucide-react";

export default function SiteSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    agentReraNumber: "",
    agentReraValidUpTo: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      if (res.data.success && res.data.data) {
        setSettings({
          agentReraNumber: res.data.data.agentReraNumber || "",
          agentReraValidUpTo: res.data.data.agentReraValidUpTo || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      toast({ title: "Error", description: "Failed to load settings", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await api.put("/settings", settings);
      if (res.data.success) {
        toast({ title: "Success", description: "Settings saved successfully!" });
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#172033]/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-[#172033] flex items-center gap-2">
          <Building2 className="text-[#D4AF37]" />
          Site Settings
        </h1>
        <p className="text-sm text-[#172033]/60 mt-1">
          Manage global configuration for your website.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#172033]/10 p-6 space-y-6">
        <h2 className="font-semibold text-[#172033] border-b border-[#172033]/10 pb-3">
          RERA Compliance Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#172033]">
              MahaRERA Agent Reg. No.
            </label>
            <Input 
              placeholder="e.g. A51700000000"
              value={settings.agentReraNumber}
              onChange={(e) => setSettings({ ...settings, agentReraNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#172033]">
              Valid up to
            </label>
            <Input 
              placeholder="e.g. 15th August 2029"
              value={settings.agentReraValidUpTo}
              onChange={(e) => setSettings({ ...settings, agentReraValidUpTo: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-[#D4AF37] hover:bg-[#b5952f] text-white"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={16} /> Save Settings
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
