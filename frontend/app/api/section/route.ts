import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const systemPrompt = fs.readFileSync(
  path.join(process.cwd(), "app/api/section/system.md"),
  "utf-8"
);

export async function POST(req: NextRequest) {
  try {
    const { messages, stack, difficulty, language, company_tier } = await req.json();

    const difficultyMap: Record<string, string> = {
      beginner: "easy",
      intermediate: "medium",
      advanced: "hard",
    };
    const mappedDifficulty = difficultyMap[difficulty] || difficulty;

    const sessionInfo = `
[Session Preferences]
- Tech Stack: ${stack || "(Not specified)"}
- Years of Experience: (Not specified)
- Difficulty Level: ${difficulty || "(Not specified)"}
- Company Tier: ${company_tier || "(Not specified)"}
- Language: ${language || "(Not specified)"}
`;

    // Compose messages for OpenAI API
    const openaiMessages = [
      { role: "system", content: systemPrompt + "\n" + sessionInfo },
      ...(messages || []).map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.message,
      })),
    ];

    console.log("openaiMessages", JSON.stringify(openaiMessages, null, 2));
    console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY ? "OK" : "MISSING");
    console.log("systemPrompt", systemPrompt.slice(0, 100)); // 앞 100자만

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
        max_tokens: 800,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      console.error("OpenAI API error:", error); // 추가
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}