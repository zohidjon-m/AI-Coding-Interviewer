import type { NextApiRequest, NextApiResponse } from "next";

<<<<<<< HEAD
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

=======
>>>>>>> 0623d3d99e8a16debea5a89a6bfaeb2724fc14ad
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

<<<<<<< HEAD
  const { code, languageId = 71 } = req.body; // languageId 기본값: Python 3

  // Judge0 코드 실행 함수
  async function runCodeWithJudge0(sourceCode: string, languageId: number) {
    const submissionRes = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY || "",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: languageId,
      }),
    });
    const submissionData = await submissionRes.json();
    return submissionData;
  }

  try {
    const result = await runCodeWithJudge0(code, languageId);
    res.status(200).json({
      output: result.stdout || result.stderr || result.compile_output || "No output.",
      status: result.status,
    });
  } catch (error) {
    res.status(500).json({ error: "Judge0 execution failed." });
  }
=======
  const { code } = req.body;

  // 예시: piston API를 사용한 파이썬 코드 실행
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: "python3",
      source: code,
    }),
  });

  const data = await response.json();
  res.status(200).json({ output: data.output });
>>>>>>> 0623d3d99e8a16debea5a89a6bfaeb2724fc14ad
}