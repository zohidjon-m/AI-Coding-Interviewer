import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// mock 전용 system 프롬프트 사용
const systemPrompt = fs.readFileSync(
  path.join(process.cwd(), "app/api/mock/system.md"),
  "utf-8"
);

export async function POST(req: NextRequest) {
  try {
    const { messages, stack, company_tier, requestFinalScore } = await req.json();

    const sessionInfo = `
[Session Preferences]
- Tech Stack: ${stack || "(Not specified)"}
- Company Tier: ${company_tier || "(Not specified)"}
`;

    let openaiMessages = [
      { role: "system", content: systemPrompt + "\n" + sessionInfo },
      ...(messages || []).map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.message,
      })),
    ];

    // 최종 점수 요청이면 평가 프롬프트 추가
    if (requestFinalScore) {
      openaiMessages.push({
        role: "system",
        content:
          `You are now acting as a strict coding test grader. ` +
          `Evaluate the entire conversation and all code submissions. ` +
          `Return a JSON object ONLY in the following format:\n` +
          `{"score": <number 0-100>, "feedback": "<short feedback in English>"}\n` +
          `Score based on correctness, code quality, communication, and professionalism. Do not output anything except the JSON.`
      });
    }

    // GPT-4.1 API 호출
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14",
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: requestFinalScore ? 300 : 800,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    // 최종 점수 요청이면 JSON 파싱해서 반환
    if (requestFinalScore) {
      try {
        const result = JSON.parse(reply);
        return NextResponse.json(result);
      } catch (e) {
        // 만약 파싱 실패시 원본 reply도 같이 반환
        return NextResponse.json({ score: null, feedback: "Could not parse score.", raw: reply });
      }
    }

    // 일반 대화 응답
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}