import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ['/user-dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Auth routes (signin, signup)
  const isAuthRoute = pathname.startsWith('/signin') || pathname.startsWith('/signup');

  // If trying to access protected route without authentication
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If already logged in and trying to access auth pages, redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/user-dashboard', req.url));
  }

  return NextResponse.next();
});

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$).*)',
  ],
};
