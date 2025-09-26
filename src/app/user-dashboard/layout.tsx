import Navbar from './widgets/navbar';
import UserSidebar from './widgets/sidebar';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" relative w-full ">
      <UserSidebar>
        <Navbar />
        <main className="flex flex-col bg-[#EBEBEB] rounded-tl-[40px] p-6  w-full">{children}</main>
      </UserSidebar>
    </div>
  );
}
