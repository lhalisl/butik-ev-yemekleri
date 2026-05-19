import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin/giris', request.url));
  res.cookies.delete('admin_token');
  return res;
}
