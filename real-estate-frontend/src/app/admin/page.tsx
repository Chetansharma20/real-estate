"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FileText, IndianRupee, Loader2, Phone, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    propertiesCount: 0,
    leadsCount: 0,
    blogsCount: 0,
    totalRevenue: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/dashboard/stats");
      if (res.data.success) {
        const { propertiesCount, leadsCount, blogsCount, totalRevenue, recentLeads: fetchedLeads } = res.data.data;
        setStats({
          propertiesCount,
          leadsCount,
          blogsCount,
          totalRevenue,
        });
        setRecentLeads(fetchedLeads || []);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatRevenue = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "CONTACTED":
        return "bg-amber-100 text-amber-800";
      case "CLOSED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const STATS_CARDS = [
    { name: "Total Properties", value: stats.propertiesCount, icon: Building2, link: "/admin/properties" },
    { name: "Active Leads", value: stats.leadsCount, icon: Users, link: "/admin/leads" },
    { name: "Blog Posts", value: stats.blogsCount, icon: FileText, link: "/admin/blogs" },
    { name: "Portfolio Value", value: formatRevenue(stats.totalRevenue), icon: IndianRupee, link: null },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-[#0B132B]/50">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Loading dashboard summary...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-semibold text-[#0B132B]">Welcome back, Admin!</h2>
        <p className="text-[#0B132B]/60 text-sm mt-1">Here is what's happening with your properties today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          const content = (
            <Card className="border border-[#0B132B]/10 shadow-sm rounded-xl bg-white hover:border-[#D4AF37]/50 hover:shadow-md transition-all h-full cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                <CardTitle className="text-xs font-bold text-[#0B132B]/60 uppercase tracking-widest">
                  {stat.name}
                </CardTitle>
                <div className="w-10 h-10 rounded-full bg-[#0B132B]/5 flex items-center justify-center text-[#0B132B]/70">
                  <Icon size={18} />
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="text-3xl font-bold text-[#0B132B]">{stat.value}</div>
              </CardContent>
            </Card>
          );

          return stat.link ? (
            <Link href={stat.link} key={i}>
              {content}
            </Link>
          ) : (
            <div key={i}>{content}</div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0B132B]">Recent Inquiries</h3>
          {recentLeads.length > 0 && (
            <Link href="/admin/leads" className="text-xs font-semibold text-[#D4AF37] hover:text-[#0B132B] transition-colors">
              View All Leads →
            </Link>
          )}
        </div>

        {recentLeads.length === 0 ? (
          <Card className="border border-[#0B132B]/10 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center text-center bg-white">
            <Users className="w-12 h-12 text-[#0B132B]/20 mb-4" />
            <h4 className="text-[#0B132B] font-medium">No recent leads found</h4>
            <p className="text-sm text-[#0B132B]/50 mt-1 max-w-sm">
              When users submit inquiries through the website, they will appear here.
            </p>
          </Card>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#0B132B]/10 overflow-hidden">
            <div className="divide-y divide-[#0B132B]/10">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F4F6F9]/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0B132B]">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#0B132B]/60">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#0B132B]/40" />
                        {lead.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0B132B]/40" />
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 text-sm">
                    {lead.property ? (
                      <div className="flex items-center gap-1.5 text-xs text-[#0B132B]/80 font-medium">
                        <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded font-bold uppercase tracking-wider text-[9px]">
                          {lead.type.replace("_", " ")}
                        </span>
                        <span className="max-w-[180px] truncate">{lead.property.title}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#0B132B]/50 bg-gray-100 px-2 py-1 rounded font-medium">
                        General Inquiry
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
