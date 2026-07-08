import { Request } from "express";

/**
 * Extended Express Request with authenticated user payload
 */
export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string | null;
    phone: string | null;
    role: string;
  };
}

/**
 * Standard paginated response shape
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
