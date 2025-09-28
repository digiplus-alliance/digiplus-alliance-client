"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";

import { apiClient } from "@/lib/apiClient";
import { generateQueryKey } from "@/lib/generateQueryKey";

type AllowedMethodType = "post" | "put" | "delete" | "get" | "PATCH";

type QueryResponse<T> = {
  success: boolean;

  message: string;
} & T;

interface IUseSendOptions<RequestBodyType, TData = unknown, TContext = unknown> {
  url: string;
  baseUrl?: string;
  method: AllowedMethodType;
  hasAuth?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown, variables: RequestBodyType, context?: TContext) => void;
  invalidateKeys?: (string | unknown[])[];
  invalidationEnabled?: boolean;
  config?: RequestInit & { headers?: Record<string, string> };
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
  schema?: z.ZodSchema<TData> | z.ZodTypeAny;
  onMutate?: (variables: RequestBodyType) => Promise<TContext | undefined>;
  onSettled?: (
    data: QueryResponse<TData> | undefined,
    error: unknown,
    variables: RequestBodyType,
    context?: TContext
  ) => void;
}

const useSend = <RequestBodyType, TData = unknown, TContext = unknown>({
  url,
  baseUrl,
  method,
  hasAuth = true,
  onError,
  onSuccess,
  invalidateKeys,
  invalidationEnabled = true,
  showErrorMessage = true,
  showSuccessMessage = true,
  successMessage,
  errorMessage,
  schema,
  config,
  ...options
}: IUseSendOptions<RequestBodyType, TData, TContext>) => {
  const queryClient = useQueryClient();

  const defaultQueryKey = generateQueryKey({ url, baseUrl, hasAuth });
  const parseResponseData = (data?: QueryResponse<TData>): TData | undefined => {
    if (!data) return undefined;
    if (!schema) return (data as unknown) as TData;
    try {
      const target = 'data' in data ? (data as Record<string, unknown>).data : data;
      return (schema as z.ZodSchema<TData>).parse(target);
    } catch (e) {
      console.error("Zod parsing error:", e);
      return undefined;
    }
  };

  return useMutation<QueryResponse<TData>, unknown, RequestBodyType, TContext>({
    
    mutationFn: async (variables: RequestBodyType): Promise<QueryResponse<TData>> => {
      console.log("useSend called with:", { url, method, hasAuth, config });
      const response = await apiClient<QueryResponse<TData>>(url, {
        method: (method as unknown) as string,
        body: JSON.stringify(variables),
        hasAuth,
        ...config,
      });
      return response as QueryResponse<TData>;
    },
    onSuccess: (data: QueryResponse<TData>) => {
      if (showSuccessMessage) {
        const message = successMessage || data.message;
        toast.success(String(message));
      }
      const parsedData = parseResponseData(data);
      if (onSuccess && parsedData !== undefined) {
        onSuccess(parsedData);
      }
  // no runtime registration; using generateQueryKey as single source of truth
    },
    onError: (error: unknown, variables: RequestBodyType, context: TContext | undefined) => {
      let message: string | React.ReactNode = "An unexpected error occurred.";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        message = (error as { message: string }).message;
      }
      const displayMessage = errorMessage || message;
      if (showErrorMessage) {
        toast.error(String(displayMessage));
      }
      if (onError) {
        onError(error, variables, context);
      }
    },
    ...options,
    onSettled: (
      data: QueryResponse<TData> | undefined,
      error: unknown,
      variables: RequestBodyType,
      context?: TContext
    ) => {
      if (invalidationEnabled) {
        if (invalidateKeys && invalidateKeys.length > 0) {
          invalidateKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
          });
        } else {
          // invalidate using the generated key
          queryClient.invalidateQueries({ queryKey: defaultQueryKey });
        }
      }
      if (options.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
};

export default useSend;
