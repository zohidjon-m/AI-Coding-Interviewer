import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // OpenAI에 문제 생성 프롬프트
  const prompt = "If you tx ake difficulty id is 1. Create easy Problem. Create a new coding interview problem in the style of LeetCode. Include a title, description, and one example input/output. Use markdown for formatting.";

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