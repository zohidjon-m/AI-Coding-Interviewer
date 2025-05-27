import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Play,
  Code,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  Zap,
  Shield,
  CheckCircle,
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">CodeInterview AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Pricing
          </Link>
          <Link href="/demo" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Demo
          </Link>
          <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Docs
          </Link>
          <UserNav />
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Interviews
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-slate-900">
                    Master Coding Interviews with <span className="text-blue-600">AI Guidance</span>
                  </h1>
                  <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed">
                    Practice real coding interviews with our AI interviewer. Get instant feedback, improve your skills,
                    and land your dream job with confidence.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/auth/signup">
                      Start Free Practice
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/demo">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Free to start
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    No credit card required
                  </div>
                </div>
              </div>

              {/* Interactive Demo Visualization */}
              <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-white shadow-2xl lg:order-last relative">
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
                  {/* Mock Terminal Header */}
                  <div className="flex items-center gap-2 p-3 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-slate-400 text-sm font-mono ml-2">AI Interview Session</div>
                  </div>

                  {/* Mock Code Editor */}
                  <div className="flex-1 p-4 font-mono text-sm">
                    <div className="space-y-2">
                      <div className="text-green-400">
                        <span className="text-slate-500"># </span>
                        <span className="animate-pulse">AI: Let's solve the Two Sum problem...</span>
                      </div>
                      <div className="text-blue-400 mt-4">
                        <span className="text-slate-500">1</span>
                        <span className="ml-2">def two_sum(nums, target):</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">2</span>
                        <span className="ml-6">num_map = {}</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">3</span>
                        <span className="ml-6">for i, num in enumerate(nums):</span>
                      </div>
                      <div className="text-yellow-400">
                        <span className="text-slate-500">4</span>
                        <span className="ml-10">complement = target - num</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">5</span>
                        <span className="ml-10">if complement in num_map:</span>
                      </div>
                      <div className="text-purple-400">
                        <span className="text-slate-500">6</span>
                        <span className="ml-14">return [num_map[complement], i]</span>
                      </div>
                      <div className="text-slate-300">
                        <span className="text-slate-500">7</span>
                        <span className="ml-10">num_map[num] = i</span>
                      </div>
                    </div>

                    {/* Animated Cursor */}
                    <div className="mt-4 flex items-center">
                      <span className="text-slate-500">8</span>
                      <span className="ml-6 text-slate-300">return []</span>
                      <div className="w-2 h-5 bg-green-400 ml-1 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Mock AI Response */}
                  <div className="border-t border-slate-700 p-3 bg-slate-800">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-blue-400" />
                      <span className="text-green-400 text-sm">AI:</span>
                      <span className="text-slate-300 text-sm">Great solution! Time complexity: O(n)</span>
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  ✓ Test Passed
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  AI Analyzing...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="w-full py-12 bg-white border-b">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-8">
              <p className="text-slate-600 font-medium">Trusted by developers at leading companies</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="h-8 bg-slate-200 rounded flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">Google</span>
                </div>
                <div className="h-8 bg-slate-200 rounded flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">Microsoft</span>
                </div>
                <div className="h-8 bg-slate-200 rounded flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">Amazon</span>
                </div>
                <div className="h-8 bg-slate-200 rounded flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">Meta</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="w-fit mx-auto">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                Everything you need to ace your interview
              </h2>
              <p className="max-w-[800px] mx-auto text-slate-600 md:text-lg">
                Our AI-powered platform provides realistic interview experiences with instant feedback and detailed
                analytics.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>AI Interviewer Chat</CardTitle>
                  <CardDescription>
                    Engage in natural conversations with our AI interviewer that adapts to your responses and provides
                    helpful hints.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Live Code Editor</CardTitle>
                  <CardDescription>
                    Write and test your code in our advanced editor with syntax highlighting, autocomplete, and
                    real-time execution.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>
                    Get comprehensive feedback on your performance with scoring, time analysis, and improvement
                    suggestions.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Timed Practice</CardTitle>
                  <CardDescription>
                    Practice under realistic time constraints with our built-in timer and progress tracking.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Multiple Languages</CardTitle>
                  <CardDescription>
                    Support for Python, JavaScript, Java, C++, and more programming languages with proper syntax
                    highlighting.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Secure Environment</CardTitle>
                  <CardDescription>
                    Practice in a safe, sandboxed environment with enterprise-grade security and privacy protection.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="w-fit mx-auto">
                Process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">How it works</h2>
              <p className="max-w-[800px] mx-auto text-slate-600 md:text-lg">
                Get started with AI-powered coding interviews in three simple steps.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Choose Your Challenge</h3>
                <p className="text-slate-600">
                  Select from our curated library of coding problems ranging from easy to expert level across different
                  domains.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Code & Discuss</h3>
                <p className="text-slate-600">
                  Solve problems while chatting with our AI interviewer. Get hints, clarify requirements, and explain
                  your approach.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Review & Improve</h3>
                <p className="text-slate-600">
                  Receive detailed feedback on your solution, time complexity analysis, and personalized improvement
                  suggestions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Ready to ace your next coding interview?
              </h2>
              <p className="max-w-[600px] mx-auto text-blue-100 md:text-lg">
                Join thousands of developers who have improved their interview skills with our AI-powered platform.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/signup">
                    Start Free Practice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-700" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-slate-900 text-slate-300">
        <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">CodeInterview AI</span>
              </div>
              <p className="text-sm text-slate-400">
                Master coding interviews with AI-powered practice sessions and instant feedback.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Product</h4>
              <nav className="space-y-2">
                <Link href="/how-it-works" className="text-sm hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/demo" className="text-sm hover:text-white transition-colors">
                  Demo
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Support</h4>
              <nav className="space-y-2">
                <Link href="/docs" className="text-sm hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/help" className="text-sm hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <nav className="space-y-2">
                <Link href="/legal/terms" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/legal/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} CodeInterview AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
