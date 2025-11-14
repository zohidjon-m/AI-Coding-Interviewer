'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import Link from "next/link"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const MONACO_THEMES = [
  { label: "Auto (Sync with main theme)", value: "auto" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "vs-dark" },
  { label: "High Contrast", value: "hc-black" },
];

// 스택별 기본 언어 매핑 함수 추가
function getDefaultLanguageByStack(stack: string) {
  switch (stack.toLowerCase()) {
    case "frontend":
      return "html";
    case "java-backend":
      return "java";
    case "database":
      return "mysql";
    default:
      return "python";
  }
}

  // 언어별 초기 코드 템플릿 함수 추가
  function getInitialCodeTemplate(language: string) {
    switch (language.toLowerCase()) {
      case "python":
        return "# Write your solution here";
      case "javascript":
      case "typescript":
        return "// Write your solution here";
      case "java":
        return "public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}";
      case "cpp":
      case "c++":
        return "// Write your solution here";
      default:
        return "// Write your solution here";
    }
  }

// Monaco에서 지원하는 언어 코드로 매핑하는 함수 추가
function getMonacoLanguage(lang: string) {
  switch (lang.toLowerCase()) {
    case "python":
      return "python";
    case "javascript":
      return "javascript";
    case "typescript":
      return "typescript";
    case "java":
      return "java";
    case "c":
    case "cpp":
    case "c++":
      return "cpp"; // Monaco는 c/c++ 모두 cpp로 처리
    default:
      return "python";
  }
}

export default function MockExamPage() {
  // 시간을 1분(60초)으로 변경
  const [timeLeft, setTimeLeft] = useState(10);
  const [chatMessage, setChatMessage] = useState("");
  const [chats, setChats] = useState<any[]>([
    {
      id: 1,
      sender: "ai",
      message: "Welcome to your mock coding test. You can ask questions or submit your code here.",
      timestamp: "", // 초기에는 빈 문자열
    },
  ]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedStack = searchParams.get("stack") || "frontend";
  const selectedLanguage = searchParams.get("language") || getDefaultLanguageByStack(selectedStack);

  // company_tier 파라미터를 쿼리에서 가져오거나 기본값 설정
  const selectedCompanyTier = searchParams.get("company_tier") || "default";

  const [sessionConfig, setSessionConfig] = useState({
    stack: selectedStack,
    language: selectedLanguage,
    company_tier: selectedCompanyTier, // 필요하다면 유지
    // mock에서는 difficulty 필요 없으면 제외
  });

  const [code, setCode] = useState<string>(getInitialCodeTemplate(selectedLanguage));
  const [output, setOutput] = useState<string>("");
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [finalFeedback, setFinalFeedback] = useState<string>("");
  const [result, setResult] = useState<"pass" | "fail" | null>(null);

  const [editorTheme, setEditorTheme] = useState("auto");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme } = useTheme();

  const autoEditorTheme = editorTheme === "auto"
    ? (theme === "dark" ? "vs-dark" : "light")
    : editorTheme;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  // 클라이언트 마운트 후 timestamp를 실제 시간으로 교체
  useEffect(() => {
    setChats((prev) => {
      if (prev[0].timestamp) return prev; // 이미 세팅되어 있으면 무시
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      };
      return updated;
    });
  }, []);

  // 채팅 전송
  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    const newChats = [
      ...chats,
      {
        id: chats.length + 1,
        sender: "user",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];
    setChats(newChats);
    setChatMessage("");

    const res = await fetch("/api/mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newChats,
        stack: selectedStack,
        company_tier: selectedCompanyTier,
      }),
    });
    const data = await res.json();

    setChats((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "ai",
        message: data.reply,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      },
    ]);
  };

  // 코드 실행
  const handleRunCode = async () => {
    let languageToSend = selectedLanguage;

    if (sessionConfig.stack === "frontend") {
      languageToSend = "javascript"; // 프론트엔드 스택은 JavaScript로 처리
    } else if (sessionConfig.stack === "java-backend") {
      languageToSend = "java";
    } else if (sessionConfig.stack === "database") {
      languageToSend = "mysql";
    }

    const res = await fetch("/api/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        language: languageToSend,
        stack: selectedStack,
      }),
    });
    const data = await res.json();

    if (data.error && data.detail?.message === "Too many requests") {
      setOutput("⚠️ Too many execution requests. Please try again in a moment.");
      return;
    }
    if (data.error) {
      setOutput(`Error: ${data.detail?.message || data.error}`);
      console.error("Judge0 detail:", data.detail);
      return;
    }

    setOutput(data.output ?? "No output received.");
  }

  // 솔루션 제출
  const handleSubmitSolution = async () => {
    setOutput("Grading...");

    const newChats = [
      ...chats,
      {
        id: chats.length + 1,
        sender: "user",
        message: `Here is my code for the problem:\n\n${code}`,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      },
    ];
    setChats(newChats);

    const res = await fetch("/api/mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newChats,
        stack: selectedStack,
        company_tier: selectedCompanyTier,
      }),
    });
    const data = await res.json();

    setChats((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "ai",
        message: data.reply,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      },
    ]);

    setOutput(data.testResultText || "");
  }

  useEffect(() => {
    if (timeLeft === 0 && finalScore === null) {
      // 시간 종료 시 서버에 최종 점수 요청
      fetch("/api/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chats,
          stack: selectedStack,
          company_tier: selectedCompanyTier,
          requestFinalScore: true, // 서버에서 이 플래그로 최종 평가임을 구분
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setFinalScore(data.score);
          setFinalFeedback(data.feedback);
          setResult(data.score >= 60 ? "pass" : "fail");
          setChats((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: "ai",
              message: `Test finished!\n\nFinal Score: ${data.score}\nResult: ${data.score >= 60 ? "PASS" : "FAIL"}\n\n${data.feedback}`,
              timestamp: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              }),
            },
          ]);
        });
    }
  }, [timeLeft, finalScore, chats, selectedStack, selectedCompanyTier]);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#232e41]">
      {/* Header */}
      <header className="w-full min-h-[52px] flex items-center justify-between border-b bg-white dark:bg-[#181f2a] px-2 lg:px-4 py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center mr-2">
            <Code className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-foreground">CodeInterview AI</span>
          </Link>
          <h1 className="text-lg font-semibold">Mock Exam</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${timeLeft < 120 ? "text-red-500" : "text-slate-600"}`} />
            <span
              className={`font-mono ${
                timeLeft < 120
                  ? "text-red-500"
                  : "text-slate-900 dark:text-slate-200"
              }`}
            >
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
                <div className="p-2 font-semibold text-sm text-slate-800 dark:text-slate-100">Select editor theme</div>
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

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-180px)]">
              <div className="space-y-4">
                {chats.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <div className="chat-message" style={{ whiteSpace: "pre-line" }}>
                        {msg.message}
                      </div>
                      <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-slate-500"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {/* 아래에 ref div 추가 */}
                <div ref={scrollRef} />
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
          <div className="w-1/2 bg-white dark:bg-[#181f2a] flex flex-col overflow-y-auto max-h-[calc(100vh-52px)]">
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
                  language={getMonacoLanguage(sessionConfig.language || "python")}
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  theme={autoEditorTheme}
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
                {output ? output : "The result will be displayed here."}
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
        <div className="text-sm text-slate-600">
          Press <kbd className="bg-slate-100 px-1 rounded">Esc</kbd> for chat,{" "}
          <kbd className="bg-slate-100 px-1 rounded">Ctrl+L</kbd> for editor
        </div>
      </footer>

      {/* Final Score / Feedback 메시지 */}
      {finalScore !== null && (
        <div className={`mt-4 p-4 rounded text-lg font-bold ${result === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          Final Score: {finalScore} / 100<br />
          Result: {result === "pass" ? "PASS" : "FAIL"}
          <div className="mt-2 text-base font-normal">{finalFeedback}</div>
        </div>
      )}
    </div>
  )
}
