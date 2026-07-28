"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await api.post("/auth/login", { email, password });
      
      // Store user info in localStorage if needed, or rely on HTTP-only cookie
      if (response.data.success) {
        localStorage.setItem("admin_user", JSON.stringify(response.data.data.user));
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F9] p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-none bg-white">
        <CardHeader className="space-y-2 text-center pb-8 pt-10">
          <div className="mx-auto w-12 h-12 bg-[#172033]/5 flex items-center justify-center rounded-full mb-4">
            <Lock className="w-6 h-6 text-[#172033]" />
          </div>
          <CardTitle className="text-3xl font-serif font-bold text-[#172033]">Admin Portal</CardTitle>
          <CardDescription className="text-[#172033]/50 font-light">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 px-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-[#172033]/70">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@bricksage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-none bg-transparent border-[#172033]/20 text-[#172033] placeholder:text-[#172033]/30 focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-widest text-[#172033]/70">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-none bg-transparent border-[#172033]/20 text-[#172033] placeholder:text-[#172033]/30 focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
                {errorMsg}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="px-10 pb-10 pt-4 flex-col gap-4 bg-transparent border-0 rounded-none">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-none bg-[#172033] hover:bg-primary text-white hover:text-[#172033] text-sm uppercase tracking-widest font-semibold transition-all duration-300 group"
            >
              {isLoading ? "Authenticating..." : "Login to Dashboard"}
              {!isLoading && (
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
            <p className="text-center text-xs text-[#172033]/40 font-light">
              Secure access restricted to authorized personnel only.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
