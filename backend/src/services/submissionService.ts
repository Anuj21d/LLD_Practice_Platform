import Submission from "../models/Submission";

type CreateSubmission = {
  problemId: string;
  solution: string;
};

export async function createSubmission({
  problemId,
  solution,
}: CreateSubmission) {
  const sumbssion = await Submission.create({
    problemId,
    solution,
    status: "QUEUED",
  });

  return sumbssion;
}

export async function getSubmissionById(submissionId: string) {
  const submission = await Submission.findById(submissionId);

  return submission;
}

export async function getAllSubmissions() {
  const submissions = await Submission.find().sort({ createdAt: -1 });

  return submissions;
}
