"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Code, Database, Layout, Trophy, User } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"

// Mock data for interview history
const mockHistory = [
  {
    id: 1,
    type: "Mock Interview",
    stack: "Java Backend",
    level: "Intermediate",
    date: "2024-01-15",
    duration: "45 min",
    score: 85,
    status: "Completed",
    problems: ["Two Sum", "Binary Tree Traversal", "REST API Design"],
    feedback: "Good problem-solving approach. Consider optimizing time complexity.",
  },
  {
    id: 2,
    type: "Practice Session",
    stack: "Frontend",
    level: "Beginner",
    date: "2024-01-12",
    duration: "30 min",
    score: 92,
    status: "Completed",
    problems: ["DOM Manipulation", "CSS Flexbox", "React Components"],
    feedback: "Excellent understanding of React fundamentals.",
  },
  {
    id: 3,
    type: "Mock Interview",
    stack: "Database",
    level: "Advanced",
    date: "2024-01-10",
    duration: "60 min",
    score: 78,
    status: "Completed",
    problems: ["Query Optimization", "Database Design", "NoSQL vs SQL"],
    feedback: "Strong database concepts. Work on query optimization techniques.",
  },
  {
    id: 4,
    type: "Practice Session",
    stack: "Java Backend",
    level: "Advanced",
    date: "2024-01-08",
    duration: "40 min",
    score: 88,
    status: "Completed",
    problems: ["Spring Boot Security", "JPA Relationships", "Microservices"],
    feedback: "Great understanding of Spring Boot architecture.",
  },
  {
    id: 5,
    type: "Mock Interview",
    stack: "Frontend",
    level: "Intermediate",
    date: "2024-01-05",
    duration: "35 min",
    score: 76,
    status: "Completed",
    problems: ["State Management", "API Integration", "Performance Optimization"],
    feedback: "Good grasp of React concepts. Focus on performance optimization.",
  },
]

const getStackIcon = (stack: string) => {
  switch (stack) {
    case "Java Backend":
      return <Code className="h-4 w-4" />
    case "Frontend":
      return <Layout className="h-4 w-4" />
    case "Database":
      return <Database className="h-4 w-4" />
    default:
      return <Code className="h-4 w-4" />
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 dark:text-green-400"
  if (score >= 80) return "text-blue-600 dark:text-blue-400"
  if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
  return "text-red-600 dark:text-red-400"
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Interview History</h1>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/how-it-works">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                How It Works
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                Pricing
              </Button>
            </Link>
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockHistory.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockHistory.reduce((acc, item) => acc + item.score, 0) / mockHistory.length)}
              </div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">210 min</div>
              <p className="text-xs text-muted-foreground">Across all sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">All sessions completed</p>
            </CardContent>
          </Card>
        </div>

        {/* History List */}
        <Card>
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>Your complete interview and practice session history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockHistory.map((session, index) => (
              <div key={session.id}>
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      {getStackIcon(session.stack)}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{session.type}</h3>
                        <Badge variant="secondary">{session.stack}</Badge>
                        <Badge className={getLevelColor(session.level)}>{session.level}</Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{session.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Problems: </span>
                          <span>{session.problems.join(", ")}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Feedback: </span>
                          <span>{session.feedback}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(session.score)}`}>{session.score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>

                {index < mockHistory.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
