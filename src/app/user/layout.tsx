// app/layout.tsx

import { SidebarProvider } from "@/components/ui/sidebar";
import UserFooter from "@/components/users/UserFooter";
import UserHeader from "@/components/users/UserHeader";
import UserSidebar from "@/components/users/UserSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white">
        <UserHeader />
        <UserSidebar />
        <div className="flex flex-col flex-grow"> 
          <main className="flex-grow p-8 overflow-auto">{children}</main>
          <UserFooter />
        </div> 
      </div>
    </SidebarProvider>
  );
};

export default ProfileLayout;
