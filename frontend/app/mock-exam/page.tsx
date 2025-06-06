"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, ChevronLeft, ChevronRight, Clock, Square } from "lucide-react"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function MockExamPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60분
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(3)
  const [problems, setProblems] = useState<string[]>([])
  const [codes, setCodes] = useState<string[]>([])
  const [outputs, setOutputs] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // 모의고사 시작 시 문제 3개 한 번에 받아오기
    const fetchProblems = async () => {
      setLoading(true)
      const promises = Array.from({ length: totalQuestions }).map((_, idx) =>
        fetch("/api/problem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: "Python",
            stack: "",
            difficulty: idx === 0 ? "easy" : idx === 1 ? "medium" : "hard",
          }),
        }).then(res => res.json())
      )
      const results = await Promise.all(promises)
      setProblems(results.map(r => r.problem))
      setCodes(Array(totalQuestions).fill("# Write your solution here"))
      setOutputs(Array(totalQuestions).fill(""))
      setLoading(false)
    }
    fetchProblems()
  }, [totalQuestions])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleRunCode = async () => {
    const code = codes[currentQuestion - 1]
    setOutputs(prev => {
      const newOutputs = [...prev]
      newOutputs[currentQuestion - 1] = "Running..."
      return newOutputs
    })
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setOutputs(prev => {
        const newOutputs = [...prev]
        newOutputs[currentQuestion - 1] = data.output ?? "No output."
        return newOutputs
      })
    } catch {
      setOutputs(prev => {
        const newOutputs = [...prev]
        newOutputs[currentQuestion - 1] = "Error running code."
        return newOutputs
      })
    }
  }

  const handleSubmitExam = () => {
    // 실제로는 서버로 코드 제출 및 채점 요청 가능
    alert("Mock exam submitted!\n(채점 기능은 별도 구현 필요)")
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Loading mock exam problems...</span>
      </div>
    )
  }

  const problem = problems[currentQuestion - 1]
  const code = codes[currentQuestion - 1]
  const output = outputs[currentQuestion - 1]

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#232e41]">
      {/* Header */}
      <header className="w-full min-h-[52px] flex items-center justify-between border-b bg-white dark:bg-[#181f2a] px-2 lg:px-4 py-2">
        <div className="flex items-center gap-4">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-foreground">Mock Exam</span>
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
          <Button
            variant="destructive"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
            <Square className="h-4 w-4 mr-2" />
            End Exam
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white dark:bg-[#181f2a] rounded shadow p-6 my-8">
          <h2 className="font-semibold mb-2">Problem {currentQuestion}</h2>
          <div className="mb-4 whitespace-pre-line text-slate-700 dark:text-slate-200">
            {problem}
          </div>
          <MonacoEditor
            height="250px"
            language="python"
            value={code}
            onChange={value => {
              const newCodes = [...codes]
              newCodes[currentQuestion - 1] = value ?? ""
              setCodes(newCodes)
            }}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              fontFamily: "Fira Mono, monospace",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
          <div className="mt-4 bg-slate-100 dark:bg-[#232e41] rounded p-3 font-mono text-sm min-h-[60px] whitespace-pre-wrap">
            Output: {output ? output : "Your code output will appear here."}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" disabled={currentQuestion === 1} onClick={() => setCurrentQuestion(q => q - 1)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={currentQuestion === totalQuestions} onClick={() => setCurrentQuestion(q => q + 1)}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="sm" onClick={handleRunCode}>
              Run Code
            </Button>
            {currentQuestion === totalQuestions && (
              <Button size="sm" variant="destructive" onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}