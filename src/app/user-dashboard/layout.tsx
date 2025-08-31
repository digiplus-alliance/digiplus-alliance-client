export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3>User Dashboard</h3>
      <main>{children}</main>
    </div>
  );
}
