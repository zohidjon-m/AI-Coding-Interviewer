import { NextRequest, NextResponse } from "next/server";

const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { code, stack = "python" } = await req.json();

    const languageMap: Record<string, number> = {
      // Java Backend
      java: 62,
      "java backend": 62,
      "spring boot": 62, // Spring Boot는 Java로 실행

      // Frontend
      javascript: 63,
      js: 63,
      typescript: 74,
      html: 78, // HTML은 실행 언어가 아니지만, Judge0에서 지원
      css: 77,  // CSS도 마찬가지

      // Database
      mysql: 40,
      sql: 82,
      postgresql: 11,
      sqlite: 83,
      mongodb: 47, // MongoDB는 Judge0에서 지원하지 않음(참고)
      // NoSQL은 대부분 지원하지 않음

      // 기타 자주 쓰는 언어
      python: 71,
      c: 50,
      cpp: 54,
      csharp: 51,
      go: 60,
      ruby: 72,
      php: 68,
      kotlin: 78,
      swift: 83,
      rust: 73,
      // 필요시 추가
    };
    const languageId = languageMap[stack.toLowerCase()] || 71;

    const submissionRes = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY || "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
      }),
    });

    if (!submissionRes.ok) {
      const errorText = await submissionRes.text();
      return NextResponse.json(
        { error: "Judge0 execution failed.", detail: errorText },
        { status: 500 }
      );
    }

    const result = await submissionRes.json();
    return NextResponse.json({
      output: result.stdout || result.stderr || result.compile_output || "No output.",
      status: result.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "서버 에러", detail: error.message },
      { status: 500 }
    );
  }
}