// app/user/layout.tsx
import { ReactNode } from 'react';
import UserLayout from '../../components/layouts/UserLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  );     
}
