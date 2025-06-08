import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, problem } = req.body;

  // OpenAI에게 채점 프롬프트 생성
  const prompt = `
You are a coding interviewer. 
Given the following problem and user code, generate at least 3 diverse test cases (including edge cases), run the code on each, and return:
- Which test cases passed/failed
- If failed, show the input/output/expected
- Give a short feedback for the user (correct/incorrect, and hint if incorrect)
- Format test results as JSON array: [{input, expected, output, pass}]
- Feedback은 영어로 해줘.

Problem:
${problem}

User code:
\`\`\`
${code}
\`\`\`
`;

  // OpenAI API 호출
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional coding interviewer and code evaluator." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  // OpenAI 응답에서 피드백과 테스트 결과 추출 (예시: JSON 파싱)
  // 실제로는 OpenAI 응답 포맷에 따라 파싱 필요
  const content = data.choices[0].message.content;

  // 예시: content에서 JSON과 피드백 분리(간단 파싱, 실제로는 정규식 등 필요)
  const match = content.match(/(\[.*\])([\s\S]*)/);
  let testCases = [];
  let feedback = content;
  if (match) {
    try {
      testCases = JSON.parse(match[1]);
      feedback = match[2].trim();
    } catch (e) {
      // 파싱 실패 시 전체 content를 feedback으로 사용
    }
  }

  // 테스트 결과 텍스트 생성
  const testResultText = Array.isArray(testCases) && testCases.length
    ? testCases.map((t, i) =>
        `Test case ${i + 1}: ${t.pass ? "Passed" : "Failed"}\n입력: ${t.input}\n기대값: ${t.expected}\n출력: ${t.output}\n`
      ).join("\n")
    : "테스트 결과를 파싱하지 못했습니다.";

  res.status(200).json({ feedback, testCases, testResultText });
}