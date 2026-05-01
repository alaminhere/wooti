import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const authPages = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verification',
];

const isAuthPage = url => {
  return authPages.some(item => url === item || url.startsWith(item + '/'));
};

export default withAuth(
  async function middleware(request) {
    const url = request.nextUrl?.pathname;
    const token = request.nextauth?.token;
    const role = token?.user?.role;

    // admin protect
    if (role !== 'admin' && url.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && isAuthPage(url)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized({ token, req }) {
        const url = req.nextUrl?.pathname;

        if (isAuthPage(url)) {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/checkout/:path*',
    '/cart/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/forgot-password/:path*',
    '/reset-password',
    '/reset-password/:path*',
    '/verification',
    '/verification/:path*',
  ],
};
