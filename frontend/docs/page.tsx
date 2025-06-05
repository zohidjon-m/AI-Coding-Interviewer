import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-foreground">CodeInterview AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/demo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </Link>
          <Link href="/docs" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          <ThemeToggle />
          <UserNav />
        </nav>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-r bg-sidebar-background text-sidebar-foreground shrink-0">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search documentation..."
                className="w-full pl-8 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-9rem)]">
            <div className="p-4">
              <div className="pb-4">
                <h4 className="mb-1 text-sm font-semibold">Getting Started</h4>
                <nav className="grid gap-1">
                  <Link
                    href="#introduction"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Introduction
                  </Link>
                  <Link
                    href="#installation"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Installation
                  </Link>
                  <Link
                    href="#quickstart"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Quickstart
                  </Link>
                </nav>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 text-sm font-semibold">Features</h4>
                <nav className="grid gap-1">
                  <Link
                    href="#ai-interviewer"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    AI Interviewer
                  </Link>
                  <Link
                    href="#code-editor"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Code Editor
                  </Link>
                  <Link
                    href="#analytics"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Analytics
                  </Link>
                </nav>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 text-sm font-semibold">Guides</h4>
                <nav className="grid gap-1">
                  <Link
                    href="#interview-tips"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Interview Tips
                  </Link>
                  <Link
                    href="#problem-solving"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Problem Solving
                  </Link>
                  <Link
                    href="#advanced-techniques"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Advanced Techniques
                  </Link>
                </nav>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 text-sm font-semibold">API Reference</h4>
                <nav className="grid gap-1">
                  <Link
                    href="#authentication"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Authentication
                  </Link>
                  <Link
                    href="#endpoints"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Endpoints
                  </Link>
                  <Link
                    href="#rate-limits"
                    className="text-sm px-2 py-1 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Rate Limits
                  </Link>
                </nav>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight" id="introduction">
                Introduction
              </h1>
              <p className="text-muted-foreground">
                Welcome to the CodeInterview AI documentation. This guide will help you get started with our platform
                and make the most of its features.
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight" id="installation">
                  Installation
                </h2>
                <p className="text-muted-foreground">
                  CodeInterview AI is a web-based platform, so there's no installation required. Simply sign up for an
                  account and you're ready to go.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Sign up for an account</h3>
                <div className="bg-card p-3 rounded border">
                  <code className="text-sm">
                    <span className="text-blue-600">1.</span> Visit{" "}
                    <Link href="/auth/signup" className="text-blue-600 hover:underline">
                      codeinterviewai.com/auth/signup
                    </Link>
                    <br />
                    <span className="text-blue-600">2.</span> Enter your email and create a password
                    <br />
                    <span className="text-blue-600">3.</span> Complete your profile
                    <br />
                    <span className="text-blue-600">4.</span> Start practicing!
                  </code>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight" id="quickstart">
                  Quickstart
                </h2>
                <p className="text-muted-foreground">Get started with CodeInterview AI in just a few simple steps.</p>
              </div>

              <Tabs defaultValue="new-users">
                <TabsList>
                  <TabsTrigger value="new-users">New Users</TabsTrigger>
                  <TabsTrigger value="existing-users">Existing Users</TabsTrigger>
                </TabsList>
                <TabsContent value="new-users" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-medium">Create an account</h3>
                        <p className="text-sm text-muted-foreground">
                          Sign up for a free account to get started with CodeInterview AI.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-medium">Choose a problem</h3>
                        <p className="text-sm text-muted-foreground">
                          Browse our library of coding problems and select one to practice.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        3
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-medium">Start the interview</h3>
                        <p className="text-sm text-muted-foreground">
                          Begin your practice session with our AI interviewer.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="existing-users" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        1
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-medium">Log in to your account</h3>
                        <p className="text-sm text-muted-foreground">Sign in with your existing credentials.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                        2
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-medium">Resume your progress</h3>
                        <p className="text-sm text-muted-foreground">
                          Continue where you left off or start a new practice session.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight" id="ai-interviewer">
                  AI Interviewer
                </h2>
                <p className="text-muted-foreground">
                  Our AI interviewer simulates a real coding interview experience, providing guidance, hints, and
                  feedback as you solve problems.
                </p>
              </div>

              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Natural Conversation</CardTitle>
                    <CardDescription>
                      Engage in a natural conversation with our AI interviewer, just like you would with a human
                      interviewer.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The AI interviewer can answer questions about the problem, provide hints when you're stuck, and
                      guide you through the solution process.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Adaptive Difficulty</CardTitle>
                    <CardDescription>
                      The AI adjusts the difficulty based on your performance and learning needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      If you're struggling with a problem, the AI will provide more guidance. If you're doing well, it
                      will challenge you with follow-up questions and optimizations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Ready to start practicing?</p>
              <Button asChild>
                <Link href="/auth/signup">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
