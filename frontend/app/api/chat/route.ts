import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  // system 프롬프트 추가 (AI의 역할/성격/스타일 지정)
  const systemPrompt = {
    role: "system",
    content: "You are an AI coding interviewer. Only answer as a professional interviewer and give hints if asked.",
  };

  const fullMessages = [systemPrompt, ...messages];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: fullMessages,
    }),
  });

  const data = await response.json();
  res.status(200).json({ ai: data.choices[0].message.content });
}