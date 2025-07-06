import { signIn } from "next-auth/react"

// Utility functions for authentication
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  fullName: string
  role?: "CANDIDATE" | "ADMIN"
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: number
    email: string
    fullName: string
    role: string
  }
}

// Login function using NextAuth
export async function loginUser(credentials: LoginCredentials) {
  try {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    })

    if (result?.error) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    return {
      success: true,
      message: "Login successful",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

// Register function
export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
      }
    }

    // Auto-login after successful registration
    if (data.success) {
      const loginResult = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (loginResult?.error) {
        return {
          success: true,
          message: "Account created successfully. Please log in.",
        }
      }
    }

    return {
      success: true,
      message: "Account created and logged in successfully",
      user: data.user,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration",
    }
  }
}

// Check if email is available
export async function checkEmailAvailability(email: string): Promise<boolean> {
  try {
    const response = await fetch("/api/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    return data.available || false
  } catch (error) {
    console.error("Email check error:", error)
    return false
  }
}

// Validate password strength
export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return { isValid: false, message: "Password must be at least 6 characters long" }
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" }
  }

  return { isValid: true }
}

// Validate email format
export function validateEmail(email: string): { isValid: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" }
  }

  return { isValid: true }
}
