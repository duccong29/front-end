// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const privateRoutes = ['/dashboard', '/profile'];
const publicRoutes = ['/login', '/signup'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  if (authToken) {
    try {
      const response = await fetch('http://localhost:8080/users/myInfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        const userRoles = result.data.roles.map((role: any) => role.name);

        // Kiểm tra các đường dẫn của admin
        if (adminRoutes.some(route => pathname.startsWith(route)) && !userRoles.includes('ADMIN')) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Kiểm tra các đường dẫn riêng tư
  if (privateRoutes.includes(pathname) && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Kiểm tra các đường dẫn công khai
  if (publicRoutes.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/admin/:path*', '/dashboard', '/profile'],
};
