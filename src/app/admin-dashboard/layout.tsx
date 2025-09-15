export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3>Admin Dashboard</h3>
      <main className="w-max-[1440px] flex items-center justify-center">{children}</main>
    </div>
  );
}
