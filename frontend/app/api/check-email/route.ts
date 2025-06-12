import { type NextRequest, NextResponse } from "next/server"

// API route to check if email is already registered
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ available: false, message: "Email is required" }, { status: 400 })
    }

    // Make request to backend to check email availability
    const response = await fetch("http://localhost:8000/api/v1/auth/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    })

    if (!response.ok) {
      // If backend doesn't have this endpoint, assume email checking is not available
      return NextResponse.json({ available: true })
    }

    const data = await response.json()
    return NextResponse.json({ available: data.available })
  } catch (error) {
    console.error("Email check error:", error)
    // On error, assume email is available to not block registration
    return NextResponse.json({ available: true })
  }
}
