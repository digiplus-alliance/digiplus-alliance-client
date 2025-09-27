import { AuthGuard } from "@/components/AuthGuard";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['business_owner', 'user']}>
      <div>
        <h3>User Dashboard</h3>
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}
