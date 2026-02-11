import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  //const token = localStorage.getItem("token");
  console.log('teste');

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    // "/dashboard",
    // "/login",
    // "/usuarios/:path*",
    // "/produtos/:path*"
    '/((?!api|_next/static|_next/image|favicon.ico|login|imagens).*)'
],
};

