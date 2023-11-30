import { NextResponse, type NextRequest } from "next/server"

import { getSession } from "@/lib/session"

export async function middleware(request: NextRequest) {
  const authenticated = await getSession()
  if (!authenticated) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
}
