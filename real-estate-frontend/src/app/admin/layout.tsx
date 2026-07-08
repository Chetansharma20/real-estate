"use client";

import Link from "next/link";
import { LayoutDashboard, Building2, Users, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const SIDEBAR_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      if (res.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#0B132B]/10 flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-[#0B132B]/10">
          <span className="font-serif text-xl font-bold text-[#0B132B]">Admin Portal</span>
        </div>
        
        <nav className="flex-1 py-8 px-4 space-y-2">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#0B132B]/70 font-medium hover:bg-[#0B132B]/5 hover:text-[#0B132B] rounded-md transition-colors"
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#0B132B]/10">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md h-12"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#0B132B]/10 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-[#0B132B]">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
