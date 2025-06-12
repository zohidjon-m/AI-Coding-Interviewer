import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Define the auth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call our login API route
          const response = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await response.json()

          if (!response.ok || !data.success) {
            return null
          }

          // Return the user object and token
          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.fullName || data.user.name, // 둘 중 하나로 맞추세요
            role: data.user.role,
            token: data.token,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to the token when signing in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      // session.user가 undefined일 수 있으니 체크
      if (token && session.user) {
        // 타입 단언으로 확장
        ;(session.user as any).id = token.id as string
        ;(session.user as any).email = token.email as string
        ;(session.user as any).name = token.name as string
        ;(session.user as any).role = token.role as string
        ;(session as any).accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-default-secret-change-this",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
