import { type NextRequest, NextResponse } from "next/server"

// Define types based on the backend User entity
interface User {
  id: number
  email: string
  fullName: string
  role: "CANDIDATE" | "ADMIN"
}

interface LoginResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Make request to backend API
    const response = await fetch(`${process.env.BACKEND_URL || "http://localhost:8081"}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    // Parse response
    const data = await response.json()

    // Handle unsuccessful login
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Invalid credentials",
        },
        { status: response.status },
      )
    }

    // Create response with auth token in cookie
    const responseObj = NextResponse.json<LoginResponse>({
      success: true,
      user: data.user,
      token: data.token,
    })

    // Set HTTP-only cookie with the JWT token
    responseObj.cookies.set({
      name: "auth_token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // Set expiration to 7 days
      maxAge: 60 * 60 * 24 * 7,
    })

    return responseObj
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
