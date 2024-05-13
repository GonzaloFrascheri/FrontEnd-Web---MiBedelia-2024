import { NextResponse } from "next/server";

export async function middleware(request) {
  /*
  const token = sessionStorage.getItem("tokenFront");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  */
}

export const config = {
  matcher: ["/privado/:path*"],
};
