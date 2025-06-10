"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Square, Send, Clock, HelpCircle, MessageSquare, Code, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

// 동적 import로 SSR 이슈 방지
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function MockExamPage() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(3) // Mock exam has 3 questions
  const [chatMessage, setChatMessage] = useState("")
  const router = useRouter()

  const [questions, setQuestions] = useState<string[]>(["Loading question..."])
  const [codes, setCodes] = useState<string[]>(["# Write your solution here"])
  const [outputs, setOutputs] = useState<string[]>([""])
  const [chats, setChats] = useState<any[][]>([
    [
      {
        id: 1,
        sender: "ai",
        message: "Welcome to the Mock Exam! I'll be your AI interviewer today. Let's start with the first question.",
        timestamp: "",
      },
    ],
  ])

  const [editorTheme, setEditorTheme] = useState("vs-dark")
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [stack, setStack] = useState<string>("Python")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setChats([
      [
        {
          id: 1,
          sender: "ai",
          message: "Welcome to the Mock Exam! I'll be your AI interviewer today. Let's start with the first question.",
          timestamp:
            new Date()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("오전", "")
              .replace("오후", "")
              .trim() +
            " " +
            (new Date().getHours() < 12 ? "AM" : "PM"),
        },
      ],
    ])
  }, [])

  // Timer countdown
  useEffect(() => {
    if (!mounted) return
    if (timeLeft <= 0) {
      alert("The exam time has ended.")
      router.push("/dashboard")
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [mounted, timeLeft, router])

  // 문제 생성 요청
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true)
      try {
        // Mock API call - in production, replace with actual API
        const mockQuestions = [
          "Write a function that finds the longest substring without repeating characters in a given string.",
          "Implement a function to check if a binary tree is balanced.",
          "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setQuestions(mockQuestions)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching question:", error)
        setLoading(false)
      }
    }
    fetchQuestion()
  }, [])

  const question = questions[currentQuestion - 1] || "Loading question..."
  const code = codes[currentQuestion - 1] || "# Write your solution here"
  const output = outputs[currentQuestion - 1] || ""
  const chatMessages = chats[currentQuestion - 1] || []

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newChats = [...chats]
      if (!newChats[currentQuestion - 1]) {
        newChats[currentQuestion - 1] = []
      }

      newChats[currentQuestion - 1] = [
        ...newChats[currentQuestion - 1],
        {
          id: (newChats[currentQuestion - 1].length || 0) + 1,
          sender: "user",
          message: chatMessage,
          timestamp:
            new Date()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("오전", "")
              .replace("오후", "")
              .trim() +
            " " +
            (new Date().getHours() < 12 ? "AM" : "PM"),
        },
      ]
      setChats(newChats)
      setChatMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: newChats[currentQuestion - 1].length + 1,
          sender: "ai",
          message: "I see your approach. Remember to consider edge cases and optimize your solution when possible.",
          timestamp:
            new Date()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .replace("오전", "")
              .replace("오후", "")
              .trim() +
            " " +
            (new Date().getHours() < 12 ? "AM" : "PM"),
        }

        const updatedChats = [...newChats]
        updatedChats[currentQuestion - 1] = [...updatedChats[currentQuestion - 1], aiResponse]
        setChats(updatedChats)
      }, 1000)
    }
  }

  const handleRunCode = async () => {
    setOutputs((prev) => {
      const newOutputs = [...prev]
      newOutputs[currentQuestion - 1] = "Running code..."
      return newOutputs
    })

    try {
      // Mock execution - in production, replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockOutputs = [
        "Output: Function executed successfully\nTest case 1: Passed\nTest case 2: Passed",
        "Output: Tree is balanced\nAll test cases passed!",
        "Output: LRU Cache initialized\nPut operation: Success\nGet operation: Success",
      ]

      setOutputs((prev) => {
        const newOutputs = [...prev]
        newOutputs[currentQuestion - 1] = mockOutputs[currentQuestion - 1] || "Execution completed."
        return newOutputs
      })
    } catch (e) {
      setOutputs((prev) => {
        const newOutputs = [...prev]
        newOutputs[currentQuestion - 1] = "Error executing code."
        return newOutputs
      })
    }
  }

  const handleSubmitSolution = async () => {
    setOutputs((prev) => {
      const newOutputs = [...prev]
      newOutputs[currentQuestion - 1] = "Evaluating solution..."
      return newOutputs
    })

    // Simulate submission and feedback
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add AI feedback to chat
    const newChats = [...chats]
    if (!newChats[currentQuestion - 1]) {
      newChats[currentQuestion - 1] = []
    }

    newChats[currentQuestion - 1] = [
      ...newChats[currentQuestion - 1],
      {
        id: newChats[currentQuestion - 1].length + 1,
        sender: "ai",
        message:
          "Your solution looks good! The time complexity is optimal, but you could improve space complexity. Consider using an in-place algorithm if possible.",
        timestamp:
          new Date()
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace("오전", "")
            .replace("오후", "")
            .trim() +
          " " +
          (new Date().getHours() < 12 ? "AM" : "PM"),
      },
    ]
    setChats(newChats)

    // Update output with test results
    setOutputs((prev) => {
      const newOutputs = [...prev]
      newOutputs[currentQuestion - 1] =
        "Test Results:\n✅ Correctness: 90%\n✅ Efficiency: 85%\n✅ Code Quality: 88%\n\nOverall Score: 88%"
      return newOutputs
    })
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < totalQuestions) {
      const nextIdx = currentQuestion
      // Initialize next question if not already done
      if (!codes[nextIdx]) {
        setCodes((prev) => [...prev, "# Write your solution here"])
        setOutputs((prev) => [...prev, ""])

        if (!chats[nextIdx]) {
          setChats((prev) => [
            ...prev,
            [
              {
                id: 1,
                sender: "ai",
                message: `Let's move on to question ${nextIdx + 1}. Take your time to understand the problem before coding.`,
                timestamp:
                  new Date()
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace("오전", "")
                    .replace("오후", "")
                    .trim() +
                  " " +
                  (new Date().getHours() < 12 ? "AM" : "PM"),
              },
            ],
          ])
        }
      }
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleEndExam = () => {
    if (confirm("Are you sure you want to end the exam? Your progress will be saved.")) {
      router.push("/dashboard")
    }
  }

  if (loading && !questions[0]) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-[#232e41]">
        <div className="text-lg">AI is preparing your questions...</div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#232e41]">
      {/* Header */}
      <header className="w-full min-h-[52px] flex items-center justify-between border-b bg-white dark:bg-[#181f2a] px-2 lg:px-4 py-2">
        <div className="flex items-center gap-4">
          {/* 로고, 타이틀, 배지 */}
          <Link href="/" className="flex items-center mr-2">
            <Code className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-foreground">CodeInterview AI</span>
          </Link>
          <h1 className="text-lg font-semibold">Mock Exam</h1>
          <Badge variant="outline">
            Question {currentQuestion}/{totalQuestions}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${timeLeft < 120 ? "text-red-500" : "text-slate-600 dark:text-slate-300"}`} />
            <span className={`font-mono ${timeLeft < 120 ? "text-red-500" : "text-slate-900 dark:text-slate-200"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button variant="destructive" size="sm" onClick={handleEndExam}>
            <Square className="h-4 w-4 mr-2" />
            End Exam
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex flex-1">
          {/* Chat Panel */}
          <div className="w-1/2 border-r bg-white dark:bg-[#181f2a] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Mock Exam Chat
              </h2>
            </div>

            {/* Problem Description */}
            <div className="p-4 border-b bg-slate-50 dark:bg-[#232e41]">
              <h3 className="font-medium mb-2">Problem</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 whitespace-pre-line">{question}</p>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages?.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}
                      >
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
          <div className="w-1/2 bg-white dark:bg-[#181f2a] flex flex-col">
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
                  height="350px"
                  language="python"
                  value={code}
                  onChange={(value) => {
                    const newCodes = [...codes]
                    newCodes[currentQuestion - 1] = value ?? ""
                    setCodes(newCodes)
                  }}
                  theme={editorTheme}
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
              <div className="mt-4 bg-slate-100 dark:bg-[#232e41] rounded p-3 font-mono text-sm min-h-[60px] whitespace-pre-wrap">
                Output:
                {output ? "\n" + output : "\nYour code output will appear here."}
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
              <div className="h-full bg-white dark:bg-[#181f2a] flex flex-col">
                {/* Problem Description */}
                <div className="p-4 border-b bg-slate-50 dark:bg-[#232e41]">
                  <h3 className="font-medium mb-2">Problem</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 whitespace-pre-line">{question}</p>
                </div>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages?.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}
                          >
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
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 m-0">
              {/* Mobile Code Content */}
              <div className="h-full bg-white dark:bg-[#181f2a] flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code Editor
                  </h2>
                  <Button size="sm" variant="outline" onClick={handleRunCode}>
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                </div>

                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex-1">
                    <MonacoEditor
                      height="200px"
                      language="python"
                      value={code}
                      onChange={(value) => {
                        const newCodes = [...codes]
                        newCodes[currentQuestion - 1] = value ?? ""
                        setCodes(newCodes)
                      }}
                      theme={editorTheme}
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
                  <div className="mt-4 bg-slate-100 dark:bg-[#232e41] rounded p-3 font-mono text-sm min-h-[60px] whitespace-pre-wrap">
                    Output:
                    {output ? "\n" + output : "\nYour code output will appear here."}
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="w-full" onClick={handleSubmitSolution}>
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#181f2a] border-t px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" disabled={currentQuestion === 1} onClick={handlePreviousQuestion}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentQuestion === totalQuestions}
            onClick={handleNextQuestion}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400">
          Press <kbd className="bg-slate-100 dark:bg-slate-700 px-1 rounded">Esc</kbd> for chat,{" "}
          <kbd className="bg-slate-100 dark:bg-slate-700 px-1 rounded">Ctrl+L</kbd> for editor
        </div>
      </footer>
    </div>
  )
}
