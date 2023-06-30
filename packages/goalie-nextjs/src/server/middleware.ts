import { NextResponse, NextRequest } from 'next/server';
import { GOALIE_AUTH_API_ENDPOINT } from '../types';

const writeTokenToCookie = (request: NextRequest) => {
  const headers = request.headers;
  const token = headers.get('authentication') || '';
  const refreshToken = headers.get('refreshtoken') || '';

  const resp = NextResponse.json({status: 200});

  console.log('write token to cookie');

  resp.cookies.set('authorization', token);
  resp.cookies.set('refreshtoken', refreshToken);

  return resp
};

// This is authentication middleware for Nextjs
export function goalieAuthMiddleware() {
  return function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;
    console.log('pathname', pathname);

    if (pathname.includes(GOALIE_AUTH_API_ENDPOINT)) {
      return writeTokenToCookie(request);
    }

    if (pathname.includes('/testapi')) {
      const cookies = request.cookies;
      console.log('cookie token', cookies.get('authorization'));
      console.log('refresh token', cookies.get('refreshtoken'));
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.next();
  };
}
