import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/transactions", "/p2p"];

export default async function middleware(req: any) {
  const pathname = req?.nextUrl?.pathname;
  if (protectedRoutes.some((route) => pathname.includes(route))) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true,
    });

    if (!token) {
      const signinUrl = new URL("/api/auth/signin", req.url);
      return NextResponse.redirect(signinUrl);
    }
  }

  return NextResponse.next();
}
