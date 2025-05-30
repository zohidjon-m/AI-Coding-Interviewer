import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Calendar, Clock, TrendingUp, Target, BookOpen, Award, BarChart3 } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { UserNav } from "@/components/user-nav"

function DashboardContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back! Ready for your next challenge?</p>
          </div>
          <div className="flex items-center gap-4">
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

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Practice Sessions
                </CardTitle>
                <CardDescription>Your scheduled interview practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Algorithm & Data Structures</h4>
                      <p className="text-sm text-slate-600">Medium difficulty • 45 minutes</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Arrays</Badge>
                        <Badge variant="secondary">Dynamic Programming</Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-sm text-slate-600">Today, 2:00 PM</p>
                      <Button size="sm" asChild>
                        <Link href="/interview">Start Now</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">System Design Basics</h4>
                      <p className="text-sm text-slate-600">Hard difficulty • 60 minutes</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Scalability</Badge>
                        <Badge variant="secondary">Architecture</Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-sm text-slate-600">Tomorrow, 10:00 AM</p>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest practice sessions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Completed: Two Sum Problem</h4>
                      <p className="text-sm text-slate-600">Score: 85% • Time: 12 minutes</p>
                    </div>
                    <Badge variant="outline">2 hours ago</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Started: Binary Tree Traversal</h4>
                      <p className="text-sm text-slate-600">In progress • 8 minutes elapsed</p>
                    </div>
                    <Badge variant="outline">1 day ago</Badge>
                  </div>
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Jump into practice sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/interview/random">
                    <Play className="mr-2 h-4 w-4" />
                    Random Problem
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/interview/mock">
                    <Calendar className="mr-2 h-4 w-4" />
                    Mock Interview
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/app/history">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">First Perfect Score</p>
                    <p className="text-xs text-slate-600">Solved without hints</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Speed Demon</p>
                    <p className="text-xs text-slate-600">Solved in under 10 minutes</p>
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
