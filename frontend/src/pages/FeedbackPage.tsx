import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type EvaluationCriterion = {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
};

type EvaluationResult = {
  score: number;
  summary: string;
  criteria: EvaluationCriterion[];
  strengths: string[];
  improvements: string[];
  nextStep: string;
};

type Submission = {
  _id: string;
  problemId: string;
  solution: string;
  status: "QUEUED" | "EVALUATING" | "COMPLETED" | "FAILED";
  score?: number;
  feedback?: string;
};

function FeedbackPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<Submission | null>(null);

  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  useEffect(() => {
    async function fetchSubmission() {
      if (!submissionId) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/problem/submission/${submissionId}`,
        );

        const currentSubmission = response.data.submission;

        setSubmission(currentSubmission);

        if (currentSubmission.feedback) {
          const parsedFeedback = JSON.parse(currentSubmission.feedback);

          setEvaluation(parsedFeedback);
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      }
    }

    fetchSubmission();
  }, [submissionId]);

  if (!submission || !evaluation) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <p className="font-[JetBrains_Mono] text-sm">Loading evaluation...</p>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] px-6 py-14 md:px-10 lg:px-12">
        {/* Header */}

        <div className="border-b border-[#E5E7EB] pb-8">
          <p className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#FF5A5F]">
            LLD LAB // EVALUATION COMPLETE
          </p>

          <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em] md:text-5xl">
            Architectural Review
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B7280]">
            Your Parking Lot design has been evaluated. Review the feedback
            below and identify what you should improve in your next attempt.
          </p>
        </div>

        {/* Score */}

        <section className="mt-8 border border-[#E5E7EB] bg-white p-8">
          <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">
            OVERALL SCORE
          </p>

          <div className="mt-3 flex items-end gap-3">
            <span className="font-[Space_Grotesk] text-7xl font-bold">
              {evaluation.score}
            </span>

            <span className="mb-3 font-[JetBrains_Mono] text-sm text-[#6B7280]">
              / 100
            </span>
          </div>

          <h2 className="mt-6 font-[Space_Grotesk] text-2xl font-bold">
            {evaluation.summary}
          </h2>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Criteria */}

          <section className="border border-[#E5E7EB] bg-white p-6">
            <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">
              CRITERIA BREAKDOWN
            </p>

            <div className="mt-6 space-y-6">
              {evaluation.criteria.map((criterion) => (
                <div key={criterion.name}>
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">{criterion.name}</span>

                    <span className="font-[JetBrains_Mono] text-xs font-bold">
                      {criterion.score}/{criterion.maxScore}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {criterion.feedback}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths */}

          <section className="border border-[#E5E7EB] bg-white p-6">
            <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">
              WHAT YOU DID WELL
            </p>

            <ul className="mt-6 space-y-4">
              {evaluation.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="border-l-2 border-[#10B981] pl-4 text-sm leading-6"
                >
                  {strength}
                </li>
              ))}
            </ul>
          </section>

          {/* Improvements */}

          <section className="border border-[#E5E7EB] bg-white p-6">
            <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">
              IMPROVEMENTS
            </p>

            <ul className="mt-6 space-y-4">
              {evaluation.improvements.map((improvement, index) => (
                <li
                  key={index}
                  className="border-l-2 border-[#FF5A5F] pl-4 text-sm leading-6"
                >
                  {improvement}
                </li>
              ))}
            </ul>
          </section>

          {/* Next Step */}

          <section className="border border-[#111827] bg-[#111827] p-6 text-white">
            <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-gray-400">
              RECOMMENDED NEXT STEP
            </p>

            <p className="mt-5 text-sm leading-7">{evaluation.nextStep}</p>

            <button
              onClick={() =>
                navigate(`/problems/${submission.problemId}/practice`)
              }
              className="mt-6 border border-white px-5 py-3 font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] transition-colors hover:bg-white hover:text-[#111827]"
            >
              TRY AGAIN →
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FeedbackPage;
