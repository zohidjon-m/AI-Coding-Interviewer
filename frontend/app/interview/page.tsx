"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Square,
  Send,
  Clock,
  HelpCircle,
  Settings,
  MessageSquare,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

// 동적 import로 SSR 이슈 방지
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function LiveInterviewPage() {
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(5)
  const [chatMessage, setChatMessage] = useState("")
  const [code, setCode] = useState(`def two_sum(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers such that they add up to target.
    """
    # Your solution here
    pass`)
  const [output, setOutput] = useState<string>("") // 추가

  const [chatMessages] = useState([
    {
      id: 1,
      sender: "ai",
      message:
        "Hello! I'm your AI interviewer. Let's start with the first problem. Please read through the Two Sum problem and let me know when you're ready to begin coding.",
      timestamp: "2:00 PM",
    },
    {
      id: 2,
      sender: "user",
      message: "I've read the problem. I think I can solve this using a hash map approach for O(n) time complexity.",
      timestamp: "2:01 PM",
    },
    {
      id: 3,
      sender: "ai",
      message:
        "Excellent! That's the optimal approach. Please go ahead and implement your solution. Feel free to explain your thought process as you code.",
      timestamp: "2:01 PM",
    },
  ])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle sending message
      setChatMessage("")
    }
  }

  const handleRunCode = () => {
    // 실제로는 서버에 코드 실행 요청을 보내야 하지만, 예시로 결과를 임의로 출력
    setOutput("실행 결과 예시: Hello, world!\n(여기에 실제 실행 결과가 표시됩니다.)")
    console.log("Running code:", code)
  }

  const handleSubmitSolution = () => {
    // Handle solution submission
    console.log("Submitting solution:", code)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Live Interview</h1>
          <Badge variant="outline">
            Question {currentQuestion}/{totalQuestions}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${timeLeft < 120 ? "text-red-500" : "text-slate-600"}`} />
            <span className={`font-mono ${timeLeft < 120 ? "text-red-500" : "text-slate-900"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="destructive" size="sm">
            <Square className="h-4 w-4 mr-2" />
            End Interview
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex flex-1">
          {/* Chat Panel */}
          <div className="w-1/2 border-r bg-white flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview Chat
              </h2>
            </div>

            {/* Problem Description */}
            <div className="p-4 border-b bg-slate-50">
              <h3 className="font-medium mb-2">Problem: Two Sum</h3>
              <p className="text-sm text-slate-600 mb-3">
                Given an array of integers <code className="bg-slate-200 px-1 rounded">nums</code> and an integer{" "}
                <code className="bg-slate-200 px-1 rounded">target</code>, return indices of the two numbers such that
                they add up to target.
              </p>
              <div className="space-y-2">
                <div>
                  <strong className="text-sm">Example:</strong>
                  <pre className="text-xs bg-white p-2 rounded border mt-1">
                    {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
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

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a question or explain your approach..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className="w-1/2 bg-white flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Editor
              </h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleRunCode}>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
                <Button size="sm" onClick={handleSubmitSolution}>
                  Submit Solution
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4 flex flex-col">
              <div className="flex-1">
                <MonacoEditor
                  height="350px" // 또는 "40vh" 등으로 고정
                  language="python"
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  theme="vs-light"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    fontFamily: "Fira Mono, monospace",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
              {/* Output 영역 */}
              <div className="mt-4 bg-slate-100 rounded p-3 font-mono text-sm min-h-[60px] whitespace-pre-wrap">
                Output:
                {output ? output : "실행 결과가 여기에 표시됩니다."}
              </div>
            </div>

            {/* Test Results */}
            <div className="border-t p-4 bg-slate-50">
              <h3 className="font-medium mb-2">Test Results</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Test case 1: Passed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Test case 2: Passed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Test case 3: Running...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Tabbed layout */}
        <div className="lg:hidden flex-1">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 m-0">
              {/* Mobile Chat Content */}
              <div className="h-full bg-white flex flex-col">{/* Same chat content as desktop */}</div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 m-0">
              {/* Mobile Code Content */}
              <div className="h-full bg-white flex flex-col">{/* Same code content as desktop */}</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" disabled={currentQuestion === 1}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={currentQuestion === totalQuestions}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="text-sm text-slate-600">
          Press <kbd className="bg-slate-100 px-1 rounded">Esc</kbd> for chat,{" "}
          <kbd className="bg-slate-100 px-1 rounded">Ctrl+L</kbd> for editor
        </div>
      </footer>
    </div>
  )
}
