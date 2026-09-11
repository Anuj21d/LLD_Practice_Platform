import Submission from "../models/Submission";

import { ParkingLotEvaluator } from "../Evaluator/ParkingLotEvaluator";
import { LLMEvaluator } from "../Evaluator/LLMEvalutaor";

export async function evaluateSubmission(submissionId: string) {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw new Error("Submission not found");
  }

  submission.status = "EVALUATING";
  await submission.save();

  try {
    const deterministicEvaluator = new ParkingLotEvaluator();

    const llmEvaluator = new LLMEvaluator();

    const deterministicResult = await deterministicEvaluator.evaluate(
      submission.solution,
    );

    const llmResult = await llmEvaluator.evaluate(submission.solution);

    const finalResult = {
      score: deterministicResult.score,
      summary: llmResult.summary,
      criteria: deterministicResult.criteria,
      strengths: llmResult.strengths,
      improvements: llmResult.improvements,
      nextStep: llmResult.nextStep,
    };

    submission.status = "COMPLETED";
    submission.score = finalResult.score;
    submission.feedback = JSON.stringify(finalResult);

    await submission.save();

    return finalResult;
  } catch (error) {
    submission.status = "FAILED";
    await submission.save();

    throw error;
  }
}
