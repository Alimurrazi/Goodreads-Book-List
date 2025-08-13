import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/api/auth'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const hasSession = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  // if (!hasSession) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
