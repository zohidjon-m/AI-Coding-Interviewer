import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Code,
  MessageSquare,
  Brain,
  CheckCircle,
  Clock,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
  Users,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-foreground">CodeInterview AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/how-it-works" className="text-sm font-medium text-primary">
            How It Works
          </Link>
          <Link
            href="/demo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <ThemeToggle />
          <UserNav />
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-muted">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="w-fit mx-auto">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered Process
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-foreground">
                How <span className="text-blue-600">AI Coding Interviews</span> Work
              </h1>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl/relaxed">
                Experience the future of coding interviews with our AI interviewer that adapts to your skill level,
                provides real-time feedback, and creates a personalized learning experience.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/signup">
                    Start Your First Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/demo">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                The AI Interview Process
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
                Our AI interviewer guides you through a comprehensive coding interview experience, from problem
                introduction to solution optimization.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {/* Step 1 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Problem Selection</CardTitle>
                  <CardDescription>
                    AI analyzes your skill level and selects appropriate coding problems from our curated database of
                    real interview questions from top tech companies.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Step 2 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Interactive Discussion</CardTitle>
                  <CardDescription>
                    Engage in natural conversation with the AI interviewer. Ask clarifying questions, discuss your
                    approach, and receive hints when needed - just like a real interview.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Step 3 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Live Coding</CardTitle>
                  <CardDescription>
                    Write your solution in our advanced code editor with syntax highlighting, autocomplete, and
                    real-time execution. Test your code as you develop it.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Step 4 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>AI Analysis</CardTitle>
                  <CardDescription>
                    The AI analyzes your code in real-time, checking for correctness, efficiency, and best practices.
                    Get immediate feedback on your solution approach.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Step 5 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Optimization & Follow-up</CardTitle>
                  <CardDescription>
                    Discuss time and space complexity, explore alternative solutions, and answer follow-up questions to
                    demonstrate deeper understanding.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Step 6 */}
              <Card className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  6
                </div>
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle>Detailed Feedback</CardTitle>
                  <CardDescription>
                    Receive comprehensive performance analysis with scoring, improvement suggestions, and personalized
                    recommendations for your next practice session.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                What Makes Our AI Special
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
                Our AI interviewer is trained on thousands of real coding interviews and continuously learns to provide
                the most realistic interview experience.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle>Adaptive Intelligence</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The AI adapts to your skill level and learning pace, providing appropriate hints and adjusting
                    question difficulty based on your performance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle>Natural Conversation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Engage in natural, human-like conversations. The AI understands context, remembers previous
                    discussions, and provides relevant follow-up questions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle>Real-time Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant feedback on your code quality, efficiency, and approach. The AI identifies issues and
                    suggests improvements as you code.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <CardTitle>Industry Standards</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trained on interview practices from top tech companies including Google, Amazon, Microsoft, and Meta
                    to provide authentic interview experiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Why Choose AI Interviews?
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-lg">
                AI-powered interviews offer unique advantages over traditional practice methods.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Available 24/7</h3>
                <p className="text-muted-foreground">
                  Practice anytime, anywhere. No need to schedule with human interviewers or wait for availability.
                  Start your interview session instantly.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Each session is tailored to your skill level and learning goals. The AI tracks your progress and
                  focuses on areas that need improvement.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Consistent Quality</h3>
                <p className="text-muted-foreground">
                  Every interview maintains the same high standard. No variation in interviewer mood, bias, or
                  experience level - just consistent, quality practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-700">
          <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                Ready to Experience AI Interviews?
              </h2>
              <p className="max-w-[600px] mx-auto text-blue-100 md:text-lg">
                Join thousands of developers who have improved their interview skills with our AI-powered platform.
                Start your first interview today and see the difference.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/signup">
                    Start Free Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-600 bg-white hover:bg-blue-700 hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-blue-600"
                  asChild
                >
                  <Link href="/demo">Try Demo First</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-slate-900 dark:bg-slate-800 text-slate-300 dark:text-slate-400">
        <div className="container px-4 md:px-6 max-w-screen-2xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">CodeInterview AI</span>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Master coding interviews with AI-powered practice sessions and instant feedback.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Product</h4>
              <nav className="flex flex-col space-y-3">
                <Link href="/how-it-works" className="text-sm hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="/demo" className="text-sm hover:text-white transition-colors">
                  Demo
                </Link>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Support</h4>
              <nav className="flex flex-col space-y-3">
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
              <nav className="flex flex-col space-y-3">
                <Link href="/legal/terms" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/legal/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 dark:border-slate-700 text-center text-sm text-slate-400 dark:text-slate-500">
            <p>&copy; {new Date().getFullYear()} CodeInterview AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
