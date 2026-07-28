import { Loader2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

interface DataTableSkeletonProps {
  isLoading: boolean;
  isEmpty: boolean;
  columnCount: number;
  loadingMessage?: string;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function DataTableContent({
  isLoading,
  isEmpty,
  columnCount,
  loadingMessage = "Loading...",
  emptyMessage = "No data found.",
  children,
}: DataTableSkeletonProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={columnCount} className="text-center py-10 text-[#172033]/50">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
          {loadingMessage}
        </TableCell>
      </TableRow>
    );
  }

  if (isEmpty) {
    return (
      <TableRow>
        <TableCell colSpan={columnCount} className="text-center py-10 text-[#172033]/50">
          {emptyMessage}
        </TableCell>
      </TableRow>
    );
  }

  return <>{children}</>;
}
