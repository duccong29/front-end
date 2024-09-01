// src/app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/utils/AuthContext'; // Đảm bảo AuthProvider bao gồm các context cần thiết

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex">
        <aside className="w-64 bg-gray-800 text-white h-screen p-4">
          <h2 className="text-2xl mb-4">Admin Dashboard</h2>
          <ul>
            <li><Link href="/admin/users">Quản lý người dùng</Link></li>
            <li><Link href="/admin/apartments">Quản lý căn hộ</Link></li>
            <li><Link href="/admin/apartmentType">Quản lý loại căn hộ</Link></li>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
