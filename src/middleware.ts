import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // get JWT from cookie
  console.log("token -->> ", token);
  const url = req.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}



// 👇 add config here in the same file
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
