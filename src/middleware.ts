import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define route patterns
const PUBLIC_ROUTES = ['/app', '/about', '/apps'];
const AUTH_ROUTES = ['/login', '/register', '/signup']; // Authentication pages
const PROTECTED_ROUTES = ['/admin', '/poster']; // Routes that require authentication

// Secret key for JWT verification - should match your Spring Boot backend
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'C8axA3GtUIO06OTzBnghCNq97Z4SN/WUeEKZyuCu1WbI/XBc1e6BHF8/y7C33beJ');

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Get the JWT token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  // Check if user is logged in
  const isLoggedIn = !!token && await isValidToken(token);
  
  // If user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && AUTH_ROUTES.some(route => path === route || path.startsWith(`${route}/`))) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // If it's not a protected route, allow access without authentication check
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // If it's a protected route and user is not logged in, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verify and decode the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Extract roles from the scope field (space-separated string)
    const userRoles = ((payload.scope as string) || '').split(' ');
    
    // Check role-based access for admin routes
    if (path.startsWith('/admin')) {
      if (!userRoles.includes('ROLE_ADMIN')) {
        // Redirect unauthorized users to an appropriate page
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // Check role-based access for poster routes
    if (path.startsWith('/poster')) {
      if (!userRoles.includes('ROLE_POSTER')) {
        // Redirect unauthorized users to an appropriate page
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // User is authenticated and authorized, proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    console.error('JWT verification failed:', error);
    
    // Clear the invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('authToken');
    return response;
  }
}

// Helper function to validate token
async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Configure which routes middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};