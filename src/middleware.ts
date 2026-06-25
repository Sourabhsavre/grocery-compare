import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow requests to the password page so we don't cause infinite redirects
  if (path.startsWith('/password')) {
    return NextResponse.next();
  }

  // Check for the site_access cookie
  const siteAccess = request.cookies.get('site_access')?.value;

  if (siteAccess !== 'Shagun@2026') {
    const url = request.nextUrl.clone();
    url.pathname = '/password';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/svgs in public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
