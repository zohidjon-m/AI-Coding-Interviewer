"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Clock, Square } from "lucide-react"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function MockExamPage() {
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20분
  const [question, setQuestion] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [stack, setStack] = useState<string>("Python")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // 첫 질문 받아오기
  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true)
      const res = await fetch("/api/mock-ai-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stack }),
      })
      const data = await res.json()
      setQuestion(data.question)
      setAnswer("")
      setOutput("")
      setLoading(false)
    }
    fetchQuestion()
  }, [stack])

  // 타이머
  useEffect(() => {
    if (!mounted) return
    if (timeLeft <= 0) {
      alert("시험 시간이 종료되었습니다.")
      router.push("/dashboard")
      return
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [mounted, timeLeft, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // 답변 제출 시 다음 질문 요청
  const handleSubmitAnswer = async () => {
    setLoading(true)
    // 답변 저장/전송 로직 필요시 추가
    const res = await fetch("/api/mock-ai-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack }),
    })
    const data = await res.json()
    setQuestion(data.question)
    setAnswer("")
    setOutput("")
    setLoading(false)
  }

  // 코드 실행
  const handleRunCode = async () => {
    setOutput("Running...")
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: answer, stack }),
      })
      const data = await res.json()
      setOutput(data.output ?? "No output.")
    } catch {
      setOutput("Error running code.")
    }
  }

  // 시험 종료
  const handleEndExam = () => {
    alert("시험이 종료되었습니다.")
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">AI가 질문을 준비 중입니다...</span>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#232e41]">
      {/* Header */}
      <header className="w-full min-h-[52px] flex items-center justify-between border-b bg-white dark:bg-[#181f2a] px-2 lg:px-4 py-2">
        <div className="flex items-center gap-4">
          <Code className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-foreground">Mock Interview</span>
          <Badge variant="secondary">{stack}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock
              className={`h-4 w-4
                ${timeLeft < 120
                  ? "text-red-500"
                  : "text-slate-600 dark:text-white"
                }`}
            />
            {mounted && (
              <span
                className={`font-mono font-bold opacity-100
                  ${timeLeft < 120
                    ? "text-red-500"
                    : "text-slate-900 dark:text-white"
                  }`}
              >
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndExam}
          >
            <Square className="h-4 w-4 mr-2" />
            End Exam
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl bg-white dark:bg-[#181f2a] rounded shadow p-6 my-8">
          <h2 className="font-semibold mb-2">AI 질문</h2>
          <div className="mb-4 whitespace-pre-line text-slate-700 dark:text-slate-200">
            {question}
          </div>
          <MonacoEditor
            height="250px"
            language={stack.toLowerCase()}
            value={answer}
            onChange={value => setAnswer(value ?? "")}
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
            <Button size="sm" onClick={handleRunCode}>
              Run Code
            </Button>
            <Button size="sm" variant="default" onClick={handleSubmitAnswer}>
              다음 질문
            </Button>
            <Button size="sm" variant="destructive" onClick={handleEndExam}>
              시험 종료
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}