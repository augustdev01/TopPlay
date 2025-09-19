import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si on est dans /admin (sauf login et register)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/signin")
  ) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    /* const payload = verifyToken(token);
    if (!payload)
      return NextResponse.redirect(new URL("/admin/login", request.url)); */
  }

  // Exemple: protection API publique avec rate limiting (facultatif)
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/admin/")) {
    // Ici tu peux plug un vrai système de rate limiting (Redis, Upstash, etc.)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/admin/:path*", "/api/:path*"],
};
