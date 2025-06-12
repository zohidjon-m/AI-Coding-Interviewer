"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Calendar, Clock, TrendingUp, Target, BookOpen, Award, BarChart3, Code, Check, Database, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

type DifficultyLevel = "beginner" | "intermediate" | "advanced"
type TechStack = "java-backend" | "frontend" | "database"
type CompanyTier = "startup" | "mid" | "bigtech"

interface Props {
  selectedStack: TechStack | null
  setSelectedStack: (v: TechStack | null) => void
  selectedCompanyTier: CompanyTier | null
  setSelectedCompanyTier: (v: CompanyTier | null) => void
}

export function StackAndCompanySelector({
  selectedStack,
  setSelectedStack,
  selectedCompanyTier,
  setSelectedCompanyTier,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8 min-h-[220px]">
      {/* Technology Stack */}
      <div>
        <h4 className="font-medium mb-3">Technology Stack</h4>
        <div className="grid gap-3">
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedStack === "java-backend"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
            )}
            onClick={() =>
              setSelectedStack(selectedStack === "java-backend" ? null : "java-backend")
            }
          >
            {selectedStack === "java-backend" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Java Backend</span>
            </div>
            <p className="text-xs text-muted-foreground">Spring Boot, REST, JPA</p>
          </div>
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedStack === "frontend"
                ? "border-purple-500 bg-purple-50 dark:bg-purple-950 ring-2 ring-purple-500 ring-opacity-20"
                : "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950",
            )}
            onClick={() =>
              setSelectedStack(selectedStack === "frontend" ? null : "frontend")
            }
          >
            {selectedStack === "frontend" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-purple-600" />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <LayoutTemplate className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Frontend</span>
            </div>
            <p className="text-xs text-muted-foreground">React, HTML/CSS/JS</p>
          </div>
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedStack === "database"
                ? "border-green-500 bg-green-50 dark:bg-green-950 ring-2 ring-green-500 ring-opacity-20"
                : "hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950",
            )}
            onClick={() =>
              setSelectedStack(selectedStack === "database" ? null : "database")
            }
          >
            {selectedStack === "database" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Database</span>
            </div>
            <p className="text-xs text-muted-foreground">SQL/NoSQL design and queries</p>
          </div>
        </div>
      </div>
      {/* Company Tier */}
      <div>
        <h4 className="font-medium mb-3">Company Tier</h4>
        <div className="grid gap-3">
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedCompanyTier === "startup"
                ? "border-pink-500 bg-pink-50 dark:bg-pink-950 ring-2 ring-pink-500 ring-opacity-20"
                : "hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950",
            )}
            onClick={() =>
              setSelectedCompanyTier(selectedCompanyTier === "startup" ? null : "startup")
            }
          >
            {selectedCompanyTier === "startup" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-pink-600" />
              </div>
            )}
            <Badge className="bg-pink-500 text-white mb-2">Startup</Badge>
            <p className="text-xs text-muted-foreground">Small/startup company</p>
          </div>
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedCompanyTier === "mid"
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950 ring-2 ring-yellow-500 ring-opacity-20"
                : "hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950",
            )}
            onClick={() =>
              setSelectedCompanyTier(selectedCompanyTier === "mid" ? null : "mid")
            }
          >
            {selectedCompanyTier === "mid" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-yellow-600" />
              </div>
            )}
            <Badge className="bg-yellow-500 text-white mb-2">Mid-size</Badge>
            <p className="text-xs text-muted-foreground">Mid-size company</p>
          </div>
          <div
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all relative",
              selectedCompanyTier === "bigtech"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
            )}
            onClick={() =>
              setSelectedCompanyTier(selectedCompanyTier === "bigtech" ? null : "bigtech")
            }
          >
            {selectedCompanyTier === "bigtech" && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
            )}
            <Badge className="bg-blue-500 text-white mb-2">Big Tech</Badge>
            <p className="text-xs text-muted-foreground">FAANG, large tech</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardContent() {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null)
  const [selectedStack, setSelectedStack] = useState<TechStack | null>(null)
  const [selectedCompanyTier, setSelectedCompanyTier] = useState<CompanyTier | null>(null)
  const router = useRouter();

  const handleStartPractice = async () => {
    if (!selectedLevel || !selectedStack || !selectedCompanyTier) return;

    // Example: Get candidateId from logged-in user info
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const candidateId = userData.id;

    try {
      const res = await fetch("http://localhost:8000/api/v1/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          preferences: {
            TechStack: selectedStack,
            ExperienceLevel: selectedLevel,
            Difficulty: selectedLevel,
            CompanyTier: selectedCompanyTier,
          },
        }),
      });

      if (!res.ok) {
        alert("Failed to create session.");
        return;
      }

      const data = await res.json();
      // Navigate to interview page with session ID
      router.push(`/interview?sessionId=${data.sessionId}`);
    } catch (e) {
      alert("Network error occurred.");
    }
  };

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
                  Practice & Mock Interview
                </CardTitle>
                <CardDescription>
                  Choose your difficulty, technology stack, and company tier. You can start a practice session or a mock interview.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Difficulty Level */}
                  <div>
                    <h4 className="font-medium mb-3">
                      Difficulty Level{" "}
                      <span className="text-xs text-muted-foreground">(Practice only)</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all duration-200 relative",
                          selectedLevel === "beginner"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-500 ring-opacity-20"
                            : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
                        )}
                        onClick={() => setSelectedLevel(selectedLevel === "beginner" ? null : "beginner")}
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
                        onClick={() => setSelectedLevel(selectedLevel === "intermediate" ? null : "intermediate")}
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
                        onClick={() => setSelectedLevel(selectedLevel === "advanced" ? null : "advanced")}
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

                  {/* Stack & Company Tier Selection */}
                  <StackAndCompanySelector
                    selectedStack={selectedStack}
                    setSelectedStack={setSelectedStack}
                    selectedCompanyTier={selectedCompanyTier}
                    setSelectedCompanyTier={setSelectedCompanyTier}
                  />

                  {/* Practice Button */}
                  <Button
                    className="w-full"
                    disabled={!selectedLevel || !selectedStack || !selectedCompanyTier}
                    onClick={handleStartPractice}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Practice Session
                    <span className="ml-2 text-xs text-muted-foreground">(Difficulty required)</span>
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-muted-foreground/30" />
                    <span className="mx-3 text-xs text-muted-foreground">or</span>
                    <div className="flex-grow border-t border-muted-foreground/30" />
                  </div>

                  {/* Mock Interview Info & Button */}
                  <div className="rounded-md bg-muted p-3 mb-2">
                    <p className="text-sm text-muted-foreground">
                      <b>Mock Interview</b> runs in <span className="text-primary font-semibold">real test mode</span> without difficulty selection.
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled={!selectedStack || !selectedCompanyTier}
                    onClick={() => {
                      if (selectedStack && selectedCompanyTier) {
                        router.push(
                          `/mock-exam?stack=${selectedStack}&company_tier=${selectedCompanyTier}`
                        );
                      }
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Mock Interview
                    <span className="ml-2 text-xs text-muted-foreground">(No difficulty, real mode)</span>
                  </Button>
                </div>
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
