"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Trash2, Phone, Calendar, Clock, ExternalLink } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = async (page: number = currentPage) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/admin/leads?page=${page}&limit=10`);
      if (res.data.success) {
        const responseData = res.data.data.data || res.data.data;
        if (responseData && responseData.leads) {
          setLeads(responseData.leads);
          setTotalPages(responseData.pagination.totalPages);
          setCurrentPage(responseData.pagination.currentPage);
        } else {
          setLeads(responseData || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(1);
  }, []);

  const handleStatusChange = async (leadId: string, status: string) => {
    try {
      const res = await api.patch(`/admin/leads/${leadId}/status`, { status });
      if (res.data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status } : l))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        const res = await api.delete(`/admin/leads/${leadId}`);
        if (res.data.success) {
          fetchLeads(currentPage);
        }
      } catch (error) {
        console.error("Failed to delete lead:", error);
      }
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CONTACTED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "CLOSED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#0B132B]">Leads</h2>
        <p className="text-[#0B132B]/60 text-sm mt-1">Manage customer inquiries and tour requests</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#0B132B]/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F4F6F9]">
            <TableRow>
              <TableHead className="font-semibold text-[#0B132B]">Name</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Contact</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Inquiry Type</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Property</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Details</TableHead>
              <TableHead className="font-semibold text-[#0B132B]">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-[#0B132B]/50">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading leads...
                </TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-[#0B132B]/50">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-[#0B132B]">
                    {lead.name}
                    <div className="text-xs text-[#0B132B]/40 font-normal mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-[#0B132B]/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#0B132B]/40" />
                        {lead.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold rounded-md uppercase tracking-wider">
                      {lead.type.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    {lead.property ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[#0B132B]/80 font-medium line-clamp-1 max-w-[150px]">
                          {lead.property.title}
                        </span>
                        <a
                          href={`/properties/${lead.property.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#D4AF37] hover:text-[#0B132B] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">General Inquiry</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    {lead.message && (
                      <p className="text-xs text-[#0B132B]/70 line-clamp-2" title={lead.message}>
                        {lead.message}
                      </p>
                    )}
                    {(lead.preferredDate || lead.preferredSlot) && (
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[10px] text-[#0B132B]/50 font-medium">
                        {lead.preferredDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lead.preferredDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                        {lead.preferredSlot && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lead.preferredSlot}
                          </span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(val) => handleStatusChange(lead.id, val)}
                    >
                      <SelectTrigger
                        className={`w-[130px] h-8 text-xs font-semibold border rounded-md shadow-none focus:ring-0 ${getStatusStyle(
                          lead.status
                        )}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-[#0B132B] border-[#0B132B]/20">
                        <SelectItem value="NEW" className="text-blue-700 hover:bg-blue-50">
                          NEW
                        </SelectItem>
                        <SelectItem value="CONTACTED" className="text-amber-700 hover:bg-amber-50">
                          CONTACTED
                        </SelectItem>
                        <SelectItem value="CLOSED" className="text-green-700 hover:bg-green-50">
                          CLOSED
                        </SelectItem>
                        <SelectItem value="CANCELLED" className="text-gray-700 hover:bg-gray-50">
                          CANCELLED
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(lead.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLeads(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => fetchLeads(page)}
                className={
                  currentPage === page
                    ? "bg-[#0B132B] text-white hover:bg-[#0B132B]"
                    : "bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
                }
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLeads(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-white text-[#0B132B] border-[#0B132B]/10 hover:bg-[#F4F6F9]"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
