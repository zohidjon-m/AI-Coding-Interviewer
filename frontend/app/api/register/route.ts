import { type NextRequest, NextResponse } from "next/server"

// Define types based on the backend User entity
interface User {
  id: number
  email: string
  fullName: string
  role: "CANDIDATE" | "ADMIN"
}

interface RegisterRequest {
  email: string
  password: string
  fullName: string
  role?: "CANDIDATE" | "ADMIN"
}

interface RegisterResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RegisterRequest = await request.json()
    const { email, password, fullName, role = "CANDIDATE" } = body

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, message: "Email, password, and full name are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please provide a valid email address" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 },
      )
    }

    // Validate full name
    if (fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Full name must be at least 2 characters long" },
        { status: 400 },
      )
    }

    // Validate role
    if (role && !["CANDIDATE", "ADMIN"].includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role specified" }, { status: 400 })
    }

    // Make request to backend API
    const response = await fetch(`${process.env.BACKEND_URL || "http://localhost:8081"}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
        fullName: fullName.trim(),
        role,
      }),
    })

    // Parse response
    const data = await response.json()

    // Handle unsuccessful registration
    if (!response.ok) {
      let errorMessage = "Registration failed"

      // Handle specific error cases
      if (response.status === 409) {
        errorMessage = "An account with this email already exists"
      } else if (response.status === 400) {
        errorMessage = data.message || "Invalid registration data"
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

    // Create response with auth token in cookie (auto-login after registration)
    const responseObj = NextResponse.json<RegisterResponse>({
      success: true,
      message: "Account created successfully",
      user: data.user,
      token: data.token,
    })

    // Set HTTP-only cookie with the JWT token for auto-login
    if (data.token) {
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
    }

    return responseObj
  } catch (error) {
    console.error("Registration error:", error)

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        { success: false, message: "Unable to connect to server. Please try again later." },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { success: false, message: "An unexpected error occurred during registration" },
      { status: 500 },
    )
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
