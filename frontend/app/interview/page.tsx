"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Link } from "lucide-react"
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
import { useTheme } from "next-themes"; // tailwind/daisyUI 등에서 제공

// 동적 import로 SSR 이슈 방지
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const MONACO_THEMES = [
  { label: "Auto (메인 테마와 연동)", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "vs-dark" },
  { label: "High Contrast", value: "hc-black" },
];

export default function LiveInterviewPage() {
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(5)
  const [chatMessage, setChatMessage] = useState("")
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDifficulty = searchParams.get("difficulty") || "beginner";
  const selectedStack = searchParams.get("stack") || "frontend";
  const selectedLanguage = searchParams.get("language") || "Python";

  // 문제 상태를 아래처럼 선언
  const [problems, setProblems] = useState<{ problem: string; type: "theory" | "coding" }[]>(
    [{ problem: "Loading problem...", type: "coding" }]
  );
  const [codes, setCodes] = useState<string[]>(["# Write your solution here"]);
  const [outputs, setOutputs] = useState<string[]>([""]);
  const [chats, setChats] = useState<any[][]>([[
    {
      id: 1,
      sender: "ai",
      message: "Hello! I'm your AI interviewer. Let's start with the first problem.\n\n",
      timestamp: "", // 초기값은 빈 문자열
    }
  ]]);

  const [editorTheme, setEditorTheme] = useState("light");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme } = useTheme(); // "light" 또는 "dark" 반환

  // theme가 "dark"면 vs-dark, 아니면 light
  const autoEditorTheme = editorTheme === "auto"
    ? (theme === "dark" ? "vs-dark" : "light")
    : editorTheme;

  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    setChats([[
      {
        id: 1,
        sender: "ai",
        message: "Hello! I'm your AI interviewer. Let's start with the first problem.\n\n",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).replace("오전", "").replace("오후", "").trim() + " " +
          (new Date().getHours() < 12 ? "AM" : "PM"),
      }
    ]]);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 문제 생성 요청
  useEffect(() => {
    const fetchProblem = async () => {
      const res = await fetch("/api/problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage, // 언어도 필요하다면 같이 넘기세요
          stack: selectedStack,
          difficulty: selectedDifficulty,
        }),
      });
      const data = await res.json();
      setProblems([{ problem: data.problem, type: data.type }]);
    };
    fetchProblem();
  }, [selectedLanguage, selectedStack, selectedDifficulty]);

  useEffect(() => {
    const fetchAllProblems = async () => {
      const problemsArr = [];
      for (let i = 0; i < totalQuestions; i++) {
        const res = await fetch("/api/problem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            stack: selectedStack,
            difficulty: selectedDifficulty,
          }),
        });
        const data = await res.json();
        problemsArr.push({ problem: data.problem, type: data.type });
      }
      setProblems(problemsArr);
      setCodes(Array(totalQuestions).fill("# Write your solution here"));
      setOutputs(Array(totalQuestions).fill(""));
      setChats(Array(totalQuestions).fill([
        {
          id: 1,
          sender: "ai",
          message: "Let's start!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).replace("오전", "").replace("오후", "").trim() +
            " " +
            (new Date().getHours() < 12 ? "AM" : "PM"),
        },
      ]));
    };
    fetchAllProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, selectedStack, selectedDifficulty]);

  const { problem, type: problemType } = problems[currentQuestion - 1] || {};
  const code = codes[currentQuestion - 1] || "";
  const output = outputs[currentQuestion - 1] || "";
  const chatMessages = chats[currentQuestion - 1] || [];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newChats = [...chats];
      newChats[currentQuestion - 1] = [
        ...newChats[currentQuestion - 1],
        {
          id: newChats[currentQuestion - 1].length + 1,
          sender: "user",
          message: chatMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).replace("오전", "").replace("오후", "").trim() + " " +
            (new Date().getHours() < 12 ? "AM" : "PM"),
        },
      ];
      setChats(newChats);
      setChatMessage("");
    }
  }

  const languageIdMap: Record<string, number> = {
    Python: 71,
    JavaScript: 63,
    Java: 62,
    // 필요시 추가
  };

  const handleRunCode = async () => {
    const code = codes[currentQuestion - 1] || "";

    const res = await fetch("/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        stack: selectedStack,
      }),
    });
    const data = await res.json();

    // 에러 detail 콘솔 출력
    if (data.error) {
      console.error("Judge0 detail:", data.detail);
    }

    setOutputs((prev) => {
      const copy = [...prev];
      copy[currentQuestion - 1] = data.output ?? data.error ?? "실행 결과를 받아오지 못했습니다.";
      return copy;
    });
  }

  const handleSubmitSolution = async () => {
    setOutputs((prev) => {
      const newOutputs = [...prev];
      newOutputs[currentQuestion - 1] = "채점 중...";
      return newOutputs;
    });

    // 문제와 코드를 함께 전송
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        problem, // 현재 문제
      }),
    });
    const data = await res.json();

    // 채팅에 AI의 피드백 추가
    const newChats = [...chats];
    newChats[currentQuestion - 1] = [
      ...newChats[currentQuestion - 1],
      {
        id: newChats[currentQuestion - 1].length + 1,
        sender: "ai",
        message: data.feedback, // AI의 피드백 메시지
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).replace("오전", "").replace("오후", "").trim() + " " +
          (new Date().getHours() < 12 ? "AM" : "PM"),
      },
    ];
    setChats(newChats);

    // 테스트 결과 출력
    setOutputs((prev) => {
      const newOutputs = [...prev];
      newOutputs[currentQuestion - 1] = data.testResultText;
      return newOutputs;
    });
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < totalQuestions) {
      const nextIdx = currentQuestion;
      if (!problems[nextIdx]) {
        const res = await fetch("/api/problem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            stack: selectedStack,
            difficulty: selectedDifficulty,
          }),
        });
        const data = await res.json();

        setProblems((prev) => {
          const copy = [...prev];
          copy[nextIdx] = { problem: data.problem, type: data.type };
          return copy;
        });
        setCodes((prev) => {
          const copy = [...prev];
          copy[nextIdx] = "# Write your solution here";
          return copy;
        });
        setOutputs((prev) => {
          const copy = [...prev];
          copy[nextIdx] = "";
          return copy;
        });
        setChats((prev) => {
          const copy = [...prev];
          copy[nextIdx] = [
            {
              id: 1,
              sender: "ai",
              message: data.problem,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }).replace("오전", "").replace("오후", "").trim() +
                " " +
                (new Date().getHours() < 12 ? "AM" : "PM"),
            },
          ];
          return copy;
        });
      }
      // ★ 항상 호출!
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

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
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setThemeDropdownOpen((open) => !open)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#232e41] border rounded shadow z-50">
                <div className="p-2 font-semibold text-sm text-slate-800 dark:text-slate-100">에디터 테마 선택</div>
                {MONACO_THEMES.map((theme) => (
                  <button
                    key={theme.value}
                    className={`w-full text-left px-4 py-2 text-sm
        hover:bg-slate-100 dark:hover:bg-[#26324a]
        ${editorTheme === theme.value
          ? "font-bold text-blue-600"
          : "text-slate-900 dark:text-white"
        }`}
                    onClick={() => {
                      setEditorTheme(theme.value);
                      setThemeDropdownOpen(false);
                    }}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => router.push("/dashboard")}
          >
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
          <div className="w-1/2 border-r bg-white dark:bg-[#181f2a] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interview Chat
              </h2>
            </div>

            {/* Problem Description */}
            <div className="p-4 border-b bg-slate-50 dark:bg-[#232e41]">
              <h3 className="font-medium mb-2">Problem</h3>
              <p className="text-sm text-slate-600 mb-3 whitespace-pre-line">
                {problem}
              </p>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages?.map((msg) => (
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
                  height="400px"
                  language={selectedLanguage.toLowerCase()}
                  value={code}
                  onChange={(value) => {
                    const newCodes = [...codes];
                    newCodes[currentQuestion - 1] = value ?? "";
                    setCodes(newCodes);
                  }}
                  theme={autoEditorTheme} // ← 여기! "vs-dark"는 다크, "vs-light"는 라이트, "hc-black"은 하이콘트라스트
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
                {output ? output : "실행 결과가 여기에 표시됩니다."}
              </div>
            </div>

            {/* Test Results */}
            <div className="border-t p-4 bg-slate-50 dark:bg-[#232e41]">
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
      <footer className="bg-white dark:bg-[#181f2a] border-t px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentQuestion === 1}
            onClick={handlePreviousQuestion}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentQuestion >= totalQuestions}
            onClick={handleNextQuestion}
          >
            Next{" "}
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
