import { Request, Response } from "express";
import { LLMEvaluator } from "../Evaluator/LLMEvalutaor";

export async function testEvaluation(
  req: Request,
  res: Response
) {
  try {
    const { solution } = req.body;

    if (!solution?.trim()) {
      return res.status(400).json({
        message: "solution is required",
      });
    }

    const evaluator = new LLMEvaluator();

    const result = await evaluator.evaluate(solution);

    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.error("Evaluation failed:", error);

    return res.status(500).json({
      message: "Evaluation failed",
    });
  }
}