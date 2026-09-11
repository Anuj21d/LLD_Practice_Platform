import { Response, Request } from "express";

import {
  createSubmission,
  getSubmissionById,
  getAllSubmissions,
} from "../services/submissionService";
import { evaluateSubmission } from "../services/evaluationService";

export async function submitSubmission(req: Request, res: Response) {
  try {
    const { problemId, solution } = req.body;

    if (!problemId || !solution?.trim()) {
      return res.status(400).json({
        message: "problemId and solution are required",
      });
    }

    const submission = await createSubmission({
      problemId,
      solution,
    });

    evaluateSubmission(submission._id.toString()).catch((error) => {
      console.error("Background evaluation failed:", error);
    });

    return res.status(201).json({
      message: "Submission created successfully",
      submission,
    });
  } catch (error) {
    console.error("Submission failed:", error);

    return res.status(500).json({
      message: "Failed to create submission",
    });
  }
}

export async function getSubmission(req: Request, res: Response) {
  try {
    const { submissionId } = req.params;

    if (!submissionId || typeof submissionId !== "string") {
      return res.status(400).json({
        message: "submissionId is required",
      });
    }

    const submission = await getSubmissionById(submissionId);

    if (!submission) {
      return res.status(400).json({
        message: "problemId and solution are required",
      });
    }
    return res.status(201).json({
      message: "Submission Got It",
      submission,
    });
  } catch (error) {
    console.error("Submission failed:", error);

    return res.status(500).json({
      message: "Failed to create submission",
    });
  }
}

export async function getSubmissions(_req: Request, res: Response) {
  try {
    const submissions = await getAllSubmissions();

    return res.status(200).json({
      submissions,
    });
  } catch (error) {
    console.error("Failed to fetch submissions:", error);

    return res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
}
