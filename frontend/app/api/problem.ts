import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 프론트엔드에서 전달받은 값
  const { language = "Python", stack = "", difficulty = "easy" } = req.body;

  // 난이도별 설명
  const difficultyGuide = {
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

  const data = await response.json();
  res.status(200).json({ problem: data.choices[0].message.content });
}