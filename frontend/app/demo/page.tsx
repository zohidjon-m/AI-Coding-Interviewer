"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Code, MessageSquare, Clock, ArrowRight, Eye, Lock } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<"overview" | "interview">("overview")

  const demoMessages = [
    {
      id: 1,
      sender: "ai",
      message:
        "Welcome to the demo! I'm your AI interviewer. Today we'll work on a classic problem: Two Sum. Have you seen this problem before?",
      timestamp: "Demo",
    },
    {
      id: 2,
      sender: "user",
      message: "Yes, I'm familiar with it. I think I can solve it using a hash map for O(n) time complexity.",
      timestamp: "Demo",
    },
    {
      id: 3,
      sender: "ai",
      message:
        "Perfect! That's exactly the optimal approach. Please implement your solution and explain your thought process as you code.",
      timestamp: "Demo",
    },
  ]

  const demoCode = `def two_sum(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers such that they add up to target.
    
    Example:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    """
    # Create a hash map to store value -> index mapping
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists in our map
        if complement in num_map:
            return [num_map[complement], i]
        
        # Store current number and its index
        num_map[num] = i
    
    return []  # No solution found`

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white">
        <Link href="/" className="flex items-center justify-center">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">CodeInterview AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Pricing
          </Link>
          <Link href="/demo" className="text-sm font-medium text-blue-600">
            Demo
          </Link>
          <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Docs
          </Link>
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Button asChild size="sm">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 py-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Eye className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 mb-4">
            Experience AI-Powered Coding Interviews
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            See how our platform works with this interactive demo. Experience the real interview environment without
            creating an account.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant={selectedDemo === "overview" ? "default" : "outline"}
              onClick={() => setSelectedDemo("overview")}
            >
              Platform Overview
            </Button>
            <Button
              variant={selectedDemo === "interview" ? "default" : "outline"}
              onClick={() => setSelectedDemo("interview")}
            >
              Interview Demo
            </Button>
          </div>
        </div>

        {selectedDemo === "overview" && (
          <div className="space-y-8">
            {/* Feature Showcase */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>AI Interviewer Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Engage in natural conversations with our AI that adapts to your responses and provides contextual
                    hints.
                  </p>
                  <div className="bg-slate-50 p-3 rounded border text-sm">
                    <div className="font-medium mb-1">AI:</div>
                    <p>"Can you explain the time complexity of your approach?"</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Live Code Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Write and test code in our advanced editor with syntax highlighting and real-time execution.
                  </p>
                  <div className="bg-slate-900 text-green-400 p-3 rounded text-sm font-mono">
                    <div>def two_sum(nums, target):</div>
                    <div className="ml-4"># Your solution here</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Real-time Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Get instant feedback on your code, performance metrics, and improvement suggestions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Time Complexity: O(n) ✓</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Space Complexity: O(n) ✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Ready to try the full experience?</h2>
              <p className="text-slate-600 mb-6">
                Create your free account and start practicing with unlimited access to our AI interviewer.
              </p>
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start Free Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {selectedDemo === "interview" && (
          <div className="bg-white rounded-lg border shadow-sm relative" style={{ minHeight: 400 }}>
            {/* Demo Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold">Demo Interview Session</h2>
                <Badge variant="outline">Read-Only Demo</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Lock className="h-4 w-4" />
                Demo Mode - Sign up for full access
              </div>
            </div>

            {/* Demo Content */}
            <div className="grid lg:grid-cols-2 h-[600px] overflow-y-auto">
              {/* Chat Panel */}
              <div className="border-r flex flex-col">
                <div className="p-4 border-b bg-slate-50">
                  <h3 className="font-medium mb-2">Problem: Two Sum</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Given an array of integers <code className="bg-slate-200 px-1 rounded">nums</code> and an integer{" "}
                    <code className="bg-slate-200 px-1 rounded">target</code>, return indices of the two numbers such
                    that they add up to target.
                  </p>
                  <div className="text-xs bg-white p-2 rounded border">
                    <strong>Example:</strong>
                    <br />
                    Input: nums = [2,7,11,15], target = 9<br />
                    Output: [0,1]
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {demoMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-slate-500"}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <Textarea
                    placeholder="This is a demo - sign up to interact with the AI interviewer"
                    disabled
                    className="min-h-[60px] resize-none"
                  />
                </div>
              </div>

              {/* Code Panel */}
              <div className="flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-medium">Code Editor</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                    <Button size="sm" disabled>
                      Submit
                    </Button>
                  </div>
                </div>

                <div className="flex-1 p-4">
                  <pre className="text-sm font-mono text-slate-800 whitespace-pre-wrap">{demoCode}</pre>
                </div>

                <div className="border-t p-4 bg-slate-50">
                  <h4 className="font-medium mb-2">Test Results</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Test case 1: Passed (nums=[2,7,11,15], target=9)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Test case 2: Passed (nums=[3,2,4], target=6)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Test case 3: Passed (nums=[3,3], target=6)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Demo Footer */}
            <div className="fixed bottom-0 left-0 w-full p-4 border-t bg-blue-50 text-center z-10">
              <p className="text-sm text-slate-600 mb-3">
                This is a read-only demo. Sign up to interact with the AI interviewer and practice coding problems.
              </p>
              <Button asChild>
                <Link href="/auth/signup">
                  Start Your Free Practice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
