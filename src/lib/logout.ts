import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export function signOutCompletelyClientSide() {
  useAuthStore.setState({ user: null, accessToken: null });
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-storage');
  }
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.message || "Logout failed");
      }
      return;
    },
    onSuccess() {
      // Clear client state and cached queries
      clearAuth();
      queryClient.clear();
      toast.success("Logged out");
      router.push("/auth/login");
    },
    onError(err: unknown) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
      // still clear client state to avoid stuck sessions
      clearAuth();
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}
