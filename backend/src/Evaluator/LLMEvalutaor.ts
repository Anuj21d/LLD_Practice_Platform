import { GoogleGenAI } from "@google/genai";

import type {
  Evaluator,
  EvaluationResult,
} from "./Evaluator";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export class LLMEvaluator implements Evaluator {
  async evaluate(solution: string): Promise<EvaluationResult> {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
You are a senior software engineer evaluating a Low-Level Design submission.

Evaluate this Parking Lot LLD solution.

Focus on:
- Domain modeling
- SOLID principles
- Responsibility separation
- Strategy pattern usage
- Ticket lifecycle
- Concurrency considerations
- Extensibility
- Design trade-offs

Do not give points merely because keywords are present.
Evaluate whether the design actually addresses the requirements.

Return ONLY valid JSON in exactly this structure:

{
  "score": 0,
  "summary": "",
  "criteria": [
    {
      "name": "",
      "score": 0,
      "maxScore": 20,
      "feedback": ""
    }
  ],
  "strengths": [],
  "improvements": [],
  "nextStep": ""
}

The total score must be out of 100.

Here is the learner's submission:

${solution}
      `,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    return JSON.parse(text) as EvaluationResult;
  }
}