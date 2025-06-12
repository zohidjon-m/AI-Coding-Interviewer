import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 인증 미들웨어 기능 비활성화 (모든 요청 통과)
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|images|.*\\.png$).*)",
  ],
}
