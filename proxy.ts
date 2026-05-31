import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // 1. Unauthenticated Redirect State (No token, trying to access protected route)
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    // Best practice: Append callbackUrl so the user returns here after login
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated Bypass State (Has token, trying to view login/register)
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Your explicit route matching specifications
export const config = {
  matcher: ["/dashboard/:path*", "/study/:path*", "/decks/:path*"],
};
