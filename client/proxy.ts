import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export function proxy(req: NextRequest) {
  const locales = ['en', 'kr','ru'];
  const url = req.nextUrl.clone();
  const pathname = url.pathname.split('/');

  const locale = pathname[1];
  if (locales.includes(locale)) {
    url.pathname = url.pathname.replace(`/${locale}`, ''); 
    Cookies.set('locale', locale, { expires: 365 });
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|api|favicon.ico).*)',
};