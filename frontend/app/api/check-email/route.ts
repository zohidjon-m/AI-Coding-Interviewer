import { type NextRequest, NextResponse } from "next/server"

interface CheckEmailResponse {
  available: boolean
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validate input
    if (!email) {
      return NextResponse.json({ available: false, message: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ available: false, message: "Invalid email format" }, { status: 400 })
    }

    // Make request to backend API to check email availability
    // Make request to backend to check email availability
    const response = await fetch("http://localhost:8000/api/v1/auth/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    })

    // Parse response
    const data = await response.json()

    // Handle response
    if (!response.ok) {
      // If backend is unavailable, assume email is available to not block registration
      if (response.status >= 500) {
        return NextResponse.json<CheckEmailResponse>({
          available: true,
          message: "Unable to verify email availability",
        })
      }

      return NextResponse.json<CheckEmailResponse>(
        {
          available: false,
          message: data.message || "Error checking email availability",
        },
        { status: response.status },
      )
    }

    return NextResponse.json<CheckEmailResponse>({
      available: data.available,
      message: data.message,
    })
  } catch (error) {
    console.error("Check email error:", error)

    // If there's a network error, assume email is available to not block registration
    return NextResponse.json<CheckEmailResponse>({
      available: true,
      message: "Unable to verify email availability",
    })
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
