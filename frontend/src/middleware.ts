import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.cookies.get("token")?.value);
  const isAuthenticated = request.cookies.get("token")?.value;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
  
}