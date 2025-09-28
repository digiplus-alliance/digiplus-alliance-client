import { AuthGuard } from "@/components/AuthGuard";
import UserSidebar from "./widgets/sidebar";
import Navbar from "./widgets/navbar";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['business_owner', 'user']}>
       <div className=" relative w-full ">
      <UserSidebar>
        <Navbar />
        <main className="flex flex-col bg-[#EBEBEB] rounded-tl-[40px] p-6  w-full">{children}</main>
      </UserSidebar>
    </div>
    </AuthGuard>
  );
}
