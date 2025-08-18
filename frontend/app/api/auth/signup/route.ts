import { type NextRequest, NextResponse } from "next/server"

// This is a wrapper around the register API for NextAuth compatibility
export async function POST(request: NextRequest) {
  try {
    // Forward the request to our register API
    const body = await request.json()

    const registerResponse = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await registerResponse.json()

    // Return the same response
    return NextResponse.json(data, { status: registerResponse.status })
  } catch (error) {
    console.error("Signup wrapper error:", error)
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}
