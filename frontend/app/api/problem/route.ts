import { NextRequest, NextResponse } from "next/server";

type Difficulty = "easy" | "medium" | "hard";

export async function POST(req: NextRequest) {
  // body 파싱
  const body = await req.json();
  const { language = "Python", stack = "", difficulty = "easy" } = body as { language?: string; stack?: string; difficulty?: Difficulty };

  // 테스트용 더미 문제 반환
  return NextResponse.json({
    problem: `[Dummy Problem]\nWrite a function that returns the sum of two numbers.\n\nInput: Two integers\nOutput: Their sum`,
    type: "coding",
  });

  /*
  // 아래는 실제 OpenAI 연동 코드 (나중에 주석 해제)
  // if (!process.env.OPENAI_API_KEY) {
  //   return NextResponse.json({
  //     problem: `[Dummy Problem]\nWrite a function that returns the sum of two numbers.\n\nInput: Two integers\nOutput: Their sum`,
  //     type: "coding",
  //   });
  // }

  // 난이도별 설명
  const difficultyGuide: Record<Difficulty, string> = {
    easy: "Focus on basic theory and simple coding.",
    medium: "Include deeper theoretical concepts and intermediate coding challenges.",
    hard: "Focus on advanced coding problems that require complex logic or algorithms.",
  };

  // OpenAI 프롬프트 생성
  const prompt = `
You are an expert coding interviewer.
Generate a coding interview problem for the following preferences:

- Language/Stack: ${language}${stack ? `, ${stack}` : ""}
- Difficulty: ${difficulty}

Guidelines:
- ${difficultyGuide[difficulty]}
- The problem should be in the style of LeetCode.
- Include a title, description, and one example input/output.
- Use markdown for formatting.
- Do not include the solution or hints.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional coding interviewer." },
          { role: "user", content: prompt },
        ],
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { problem: "[Error] Failed to fetch problem from OpenAI.", type: "coding" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const problemContent = data.choices?.[0]?.message?.content || "[Error] No problem generated.";

    // 문제 유형 추출 (theory 또는 coding)
    let problemType: "theory" | "coding" = "coding";
    if (problemContent.toLowerCase().includes("theory")) problemType = "theory";

    return NextResponse.json({ problem: problemContent, type: problemType });
  } catch (error) {
    return NextResponse.json(
      { problem: "[Error] Unexpected error occurred.", type: "coding" },
      { status: 500 }
    );
  }
  */
}