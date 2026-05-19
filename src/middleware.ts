import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/giris and /api/admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/giris') {
    const token = req.cookies.get('admin_token')?.value;
    const secret = process.env.ADMIN_SECRET ?? 'supersecret';

    if (token !== secret) {
      return NextResponse.redirect(new URL('/admin/giris', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
