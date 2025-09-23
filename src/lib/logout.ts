import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export function signOutCompletelyClientSide() {
  useAuthStore.setState({ user: null });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();
  signOutCompletelyClientSide();

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
      clearUser();
      queryClient.clear();
      toast.success("Logged out");
      router.push("/auth/login");
    },
    onError(err: unknown) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
      // still clear client state to avoid stuck sessions
      clearUser();
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}
