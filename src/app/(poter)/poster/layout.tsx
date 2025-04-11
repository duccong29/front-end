// app/user/layout.tsx
import { ReactNode } from 'react';
import PosterLayout from '@/components/layouts/PosterLayout';
import UserLayout from '@/components/layouts/UserLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <PosterLayout>
      {children}
    </PosterLayout>
  );     
}
