"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Calendar, Clock, TrendingUp, Target, BookOpen, Award, BarChart3, Code, Check, Database, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useState } from "react"

type DifficultyLevel = "beginner" | "intermediate" | "advanced"
type TechStack = "java-backend" | "frontend" | "database"
type CompanyTier = "startup" | "mid" | "bigtech"

function DashboardContent() {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null)
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null)
  const [selectedCompanyTier, setSelectedCompanyTier] = useState<CompanyTier | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo - Added link to home page */}
            <Link href="/" className="flex items-center mr-6">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-foreground">CodeInterview AI</span>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Ready for your next challenge?</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild>
              <Link href="/interview">
                <Play className="mr-2 h-4 w-4" />
                Start Practice
              </Link>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>

      {/* Rest of the dashboard content remains the same */}
      <main className="max-w-screen-2xl mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12h</div>
                  <p className="text-xs text-muted-foreground">Practice time this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Level & Stack Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Practice Level Selection
                </CardTitle>
                <CardDescription>Choose your difficulty level, technology stack, and company tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Difficulty Level Selection */}
                  <div>
                    <h4 className="font-medium mb-3">Difficulty Level</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200 relative",
                          selectedLevel === "beginner"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                            : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                        )}
                        onClick={() => setSelectedLevel("beginner")}
                      >
                        {selectedLevel === "beginner" && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex items-center justify-center mb-2">
                          <Badge
                            variant="outline"
                            className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Beginner
                          </Badge>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Fundamentals & basic concepts</p>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200 relative",
                          selectedLevel === "intermediate"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                            : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                        )}
                        onClick={() => setSelectedLevel("intermediate")}
                      >
                        {selectedLevel === "intermediate" && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex items-center justify-center mb-2">
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                          >
                            Intermediate
                          </Badge>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Advanced topics & patterns</p>
                      </div>
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200 relative",
                          selectedLevel === "advanced"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                            : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                        )}
                        onClick={() => setSelectedLevel("advanced")}
                      >
                        {selectedLevel === "advanced" && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex items-center justify-center mb-2">
                          <Badge
                            variant="outline"
                            className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                          >
                            Advanced
                          </Badge>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">Complex problems & system design</p>
                      </div>
                    </div>
                  </div>

                  {/* Stack & Company Tier 한 줄에 배치 */}
                  <div className="grid grid-cols-2 gap-8 mb-8 min-h-[220px]">
                    {/* Technology Stack */}
                    <div className="flex flex-col h-full">
                      <h4 className="font-medium mb-3">Technology Stack</h4>
                      <div className="grid grid-rows-3 gap-3 flex-1">
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative",
                            selectedStack === "java-backend"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedStack("java-backend")}
                        >
                          {selectedStack === "java-backend" && (
                            <div className="absolute top-4 right-4">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                              <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h5 className="font-medium">Java Backend</h5>
                              <p className="text-xs text-muted-foreground">Spring Boot, REST, JPA</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative",
                            selectedStack === "frontend"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedStack("frontend")}
                        >
                          {selectedStack === "frontend" && (
                            <div className="absolute top-4 right-4">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                              <LayoutTemplate className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h5 className="font-medium">Frontend</h5>
                              <p className="text-xs text-muted-foreground">React, HTML/CSS/JS</p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative",
                            selectedStack === "database"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedStack("database")}
                        >
                          {selectedStack === "database" && (
                            <div className="absolute top-4 right-4">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                              <Database className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h5 className="font-medium">Database</h5>
                              <p className="text-xs text-muted-foreground">SQL/NoSQL design and queries</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Company Tier */}
                    <div className="flex flex-col h-full">
                      <h4 className="font-medium mb-3">Company Tier</h4>
                      <div className="grid grid-rows-3 gap-3 flex-1">
                        {/* Startup */}
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative flex-1 flex flex-col justify-center",
                            selectedCompanyTier === "startup"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedCompanyTier("startup")}
                        >
                          {selectedCompanyTier === "startup" && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center justify-center mb-2">
                            <Badge
                              variant="outline"
                              className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800"
                            >
                              Startup
                            </Badge>
                          </div>
                          <p className="text-xs text-center text-muted-foreground">Small/startup company</p>
                        </div>
                        {/* Mid-size */}
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative flex-1 flex flex-col justify-center",
                            selectedCompanyTier === "mid"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedCompanyTier("mid")}
                        >
                          {selectedCompanyTier === "mid" && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center justify-center mb-2">
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                            >
                              Mid-size
                            </Badge>
                          </div>
                          <p className="text-xs text-center text-muted-foreground">Mid-size company</p>
                        </div>
                        {/* Big Tech */}
                        <div
                          className={cn(
                            "border rounded-lg p-2 cursor-pointer transition-all duration-200 relative flex-1 flex flex-col justify-center",
                            selectedCompanyTier === "bigtech"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                              : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                          )}
                          onClick={() => setSelectedCompanyTier("bigtech")}
                        >
                          {selectedCompanyTier === "bigtech" && (
                            <div className="absolute top-2 right-2">
                              <Check className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex items-center justify-center mb-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            >
                              Big Tech
                            </Badge>
                          </div>
                          <p className="text-xs text-center text-muted-foreground">FAANG, large tech</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 버튼은 선택 영역 아래에! */}
                  <Button
                    className="w-full mt-4"
                    asChild
                    disabled={!selectedLevel || !selectedStack || !selectedCompanyTier}
                  >
                    <Link
                      href={
                        selectedLevel && selectedStack && selectedCompanyTier
                          ? `/interview?difficulty=${selectedLevel}&stack=${selectedStack}&company_tier=${selectedCompanyTier}`
                          : "/interview"
                      }
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Practice Session
                      {selectedLevel && selectedStack && selectedCompanyTier && (
                        <span className="ml-2 text-xs opacity-75">
                          ({selectedLevel} • {selectedStack.replace("-", " ")} • {selectedCompanyTier})
                        </span>
                      )}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mock Interview */}
            <Card>
              <CardHeader>
                <CardTitle>Mock Interview</CardTitle>
                <CardDescription>Jump into practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full justify-start" asChild>
                  <Link href="/mock-exam">
                    <Play className="mr-2 h-4 w-4" />
                    Start Mock Interview
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your improvement over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Easy Problems</span>
                    <span>12/20</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium Problems</span>
                    <span>8/15</span>
                  </div>
                  <Progress value={53} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hard Problems</span>
                    <span>2/10</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <CardTitle>Recent Activity</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/history">
                      <BarChart3 className="mr-2 h-3 w-3" />
                      View History
                    </Link>
                  </Button>
                </div>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">Two Sum Problem</h4>
                      <p className="text-xs text-muted-foreground">Score: 85% • 12 min</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      2h
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">Binary Tree Traversal</h4>
                      <p className="text-xs text-muted-foreground">In progress • 8 min</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      1d
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">First Perfect Score</p>
                    <p className="text-xs text-muted-foreground">Solved without hints</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Speed Demon</p>
                    <p className="text-xs text-muted-foreground">Solved in under 10 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  )
}
