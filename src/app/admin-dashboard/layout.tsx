export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3>Admin Dashboard</h3>
      <main>{children}</main>
    </div>
  );
}
