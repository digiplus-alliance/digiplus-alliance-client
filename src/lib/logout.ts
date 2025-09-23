import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export function signOutCompletelyClientSide() {
  useAuthStore.setState({ user: null } as any);
}

export function useLogout() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
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
      setUser(null as any);
      queryClient.clear();
      toast.success("Logged out");
      router.push("/auth/login");
    },
    onError(err: unknown) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
      // still clear client state to avoid stuck sessions
      setUser(null as any);
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}
