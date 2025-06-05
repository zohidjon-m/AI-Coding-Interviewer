"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  plan: "free" | "pro" | "enterprise"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  loading: boolean
  updateUser: (userData: Partial<User>) => void
}

interface SignupData {
  email: string
  firstName: string
  lastName: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          // In a real app, you'd validate the token with your backend
          const userData = localStorage.getItem("user_data")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (email === "demo@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          email: "demo@example.com",
          firstName: "Demo",
          lastName: "User",
          plan: "pro",
          avatar: "/placeholder.svg?height=40&width=40",
        }

        // Store auth data
        localStorage.setItem("auth_token", "mock_token_123")
        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)

        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const userData: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        plan: "free",
      }

      // Store auth data
      localStorage.setItem("auth_token", `token_${userData.id}`)
      localStorage.setItem("user_data", JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Signup failed. Please try again." }
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading, updateUser }}>{children}</AuthContext.Provider>
  )
}
