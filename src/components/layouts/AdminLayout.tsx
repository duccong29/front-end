// layouts/AdminLayout.tsx
import React from 'react';
// import AdminHeader from '../admin/AdminHeader';
import AdminFooter from '../admin/AdminFooter';
import AdminSidebar from '../admin/AdminSidebar';
import { SidebarProvider } from '../ui/sidebar';


export default function AdminLayout({
        children, 
      }: {
        children: React.ReactNode
      }) {
    return (  
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-950 dark:to-gray-900">
      <SidebarProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          {/* <AdminHeader /> */}
          <main className="flex-1 bg-gray-100 dark:bg-gray-900 scrollbar-hide">
            <div className="container max-w-full">{children}</div>
          </main>
          <AdminFooter />
        </div>
      </div>
    </SidebarProvider>
    </div>
    );
};

