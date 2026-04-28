import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
      );
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/mi-cuenta")) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/mi-cuenta/:path*"],
};
