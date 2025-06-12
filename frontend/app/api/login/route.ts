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
    const response = await fetch("http://localhost:8000/api/v1/auth/login", {
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
      let errorMessage = "Invalid credentials"

      // Handle specific error cases
      if (response.status === 401) {
        errorMessage = "Invalid email or password"
      } else if (response.status === 404) {
        errorMessage = "Account not found"
      } else if (response.status === 429) {
        errorMessage = "Too many login attempts. Please try again later"
      } else if (response.status === 500) {
        errorMessage = "Server error. Please try again later"
      } else {
        errorMessage = data.message || errorMessage
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
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

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { success: false, message: "Unable to connect to server. Please try again later." },
        { status: 503 },
      )
    }

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
