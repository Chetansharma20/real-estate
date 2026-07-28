import { useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";

interface UsePaginationFetchProps {
  endpoint: string;
  limit?: number;
  dataKey?: string; // e.g., 'properties', 'posts', 'leads'
}

export function usePaginationFetch<T>({
  endpoint,
  limit = 8,
  dataKey,
}: UsePaginationFetchProps) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);
        // Include '?' or '&' depending on the endpoint string
        const separator = endpoint.includes("?") ? "&" : "?";
        const res = await api.get(`${endpoint}${separator}page=${page}&limit=${limit}`);
        
        if (res.data.success) {
          const responseData = res.data.data.data || res.data.data;
          
          if (responseData && responseData.pagination) {
            // It has pagination wrapper
            setData(dataKey ? responseData[dataKey] : responseData.data || responseData);
            setTotalPages(responseData.pagination.totalPages);
            setCurrentPage(responseData.pagination.currentPage);
            setTotalItems(responseData.pagination.totalItems);
          } else {
            // Flat array
            setData(responseData || []);
          }
        }
      } catch (err: any) {
        console.error(`Failed to fetch from ${endpoint}:`, err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, limit, dataKey]
  );

  useEffect(() => {
    fetchData(1);
  }, [endpoint, limit, dataKey, fetchData]);

  return {
    data,
    setData,
    isLoading,
    currentPage,
    totalPages,
    totalItems,
    fetchData,
    error,
  };
}
