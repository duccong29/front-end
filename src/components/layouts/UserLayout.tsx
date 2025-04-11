// layouts/UserLayout.tsx
import UserHeader from '@/components/users/UserHeader';
import UserFooter from '@/components/users/UserFooter';
import React from 'react';


export default function  UserLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <div className="min-h-screen flex flex-col">
            <UserHeader />
            <main>{children}</main>
            <UserFooter />
            </div>
        </>
    );
};


