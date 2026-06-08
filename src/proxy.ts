import { NextRequest, NextResponse } from 'next/server';

// The store's built-in admin is retired. Funnel any old /admin/* bookmark
// (siparisler, urunler, giris) to the "panel moved" notice at /admin.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
