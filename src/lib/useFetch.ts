"use client";

import { useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { useEffect } from "react";

import { apiClient } from "@/lib/apiClient";
import { generateQueryKey } from "@/lib/generateQueryKey";

type QueryResponse<T> = {
  success: boolean;
  message: string;
} & T;

interface IUseFetchOptions<TData = unknown> {
  url: string;
  baseUrl?: string;
  hasAuth?: boolean;
  enabled?: boolean;
  queryKey?: (string | unknown[])[];
  config?: RequestInit & { headers?: Record<string, string> };
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  schema?: z.ZodSchema<TData> | z.ZodTypeAny;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: TData | undefined, error: unknown | null) => void;
  // allow extra react-query options (like staleTime, refetchInterval, etc.)
  reactQueryOptions?: Omit<
    UseQueryOptions<QueryResponse<TData>, unknown, TData, readonly unknown[]>,
    "queryKey" | "queryFn" | "select"
  >;
}

const useFetch = <TData = unknown>({
  url,
  baseUrl,
  hasAuth = true,
  enabled = true,
  queryKey,
  config,
  showSuccessMessage = false, // default off for fetches
  showErrorMessage = true,
  successMessage,
  errorMessage,
  schema,
  onSuccess,
  onError,
  onSettled,
  reactQueryOptions,
}: IUseFetchOptions<TData>) => {
  const queryClient = useQueryClient();

  const defaultQueryKey = queryKey || generateQueryKey({ url, baseUrl, hasAuth });

  // Type guard for objects that contain a `data` property
  const hasDataField = (v: unknown): v is { data: unknown } => {
    return typeof v === "object" && v !== null && "data" in v;
  };

  const parseResponseData = (data?: QueryResponse<TData>): TData | undefined => {
    if (!data) return undefined;
    if (!schema) return (data as unknown) as TData;
    try {
      const target = hasDataField(data) ? data.data : data;
      return (schema as z.ZodSchema<TData>).parse(target);
    } catch (e) {
      console.error("Zod parsing error:", e);
      return undefined;
    }
  };

  const result = useQuery({
    queryKey: defaultQueryKey,
    enabled,
    queryFn: async (): Promise<QueryResponse<TData>> => {
      return await apiClient<QueryResponse<TData>>(url, {
        method: "GET",
        hasAuth,
        ...config,
      });
    },
    select: (response: QueryResponse<TData>): TData => {
      const parsed = parseResponseData(response);
      if (!parsed) {
        throw new Error("Response validation failed");
      }
      return parsed;
    },
    ...reactQueryOptions,
  });

  // Handle success, error, and settled callbacks outside the query options
  useEffect(() => {
    if (result.isSuccess && result.data) {
      if (showSuccessMessage) {
        toast.success(String(successMessage || "Data fetched successfully"));
      }
      if (onSuccess) {
        onSuccess(result.data);
      }
    }
  }, [result.isSuccess, result.data, onSuccess, showSuccessMessage, successMessage]);

  useEffect(() => {
    if (result.isError && result.error) {
      let message: string | React.ReactNode = "An unexpected error occurred.";
      if (result.error instanceof Error) {
        message = result.error.message;
      } else if (typeof result.error === "object" && result.error !== null && "message" in result.error) {
        const errorWithMessage = result.error as { message: unknown };
        message = typeof errorWithMessage.message === "string" 
          ? errorWithMessage.message 
          : String(errorWithMessage.message);
      }
      
      if (showErrorMessage) {
        toast.error(String(errorMessage || message));
      }
      if (onError) {
        onError(result.error);
      }
    }
  }, [result.isError, result.error, onError, showErrorMessage, errorMessage]);

  useEffect(() => {
    if (result.isFetched && onSettled) {
      onSettled(result.data, result.error);
    }
  }, [result.isFetched, result.data, result.error, onSettled]);

  return result;
};

export default useFetch;
