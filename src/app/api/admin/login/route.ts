import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'hazalchef2024';
  const secret = process.env.ADMIN_SECRET ?? 'supersecret';

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Şifre hatalı.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_token', secret, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

// GET /api/admin/logout
export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/giris', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'));
  res.cookies.delete('admin_token');
  return res;
}
