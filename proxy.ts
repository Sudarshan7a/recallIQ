import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    const payload = verifyToken(token);
    if (!payload && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/study/:path*", "/decks/:path*"],
};
