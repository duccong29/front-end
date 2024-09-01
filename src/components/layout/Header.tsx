// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/utils/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        logout();
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/" className="mr-4">Home</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="ml-4">Logout</button>
          ) : (
            <>
              <Link href="/login" className="ml-4">Login</Link>
              <Link href="/signup" className="ml-4">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;