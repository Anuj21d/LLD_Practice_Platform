import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Submission = {
  _id: string;
  problemId: string;
  solution: string;
  status: "QUEUED" | "EVALUATING" | "COMPLETED" | "FAILED";
  score?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
};

function SubmissionPage() {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const navigate = useNavigate();
  const { submissionId } = useParams();

  useEffect(() => {
    if (!submissionId) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;

    async function fetchSubmission() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/problem/submission/${submissionId}`,
        );

        const currentSubmission = response.data.submission;

        console.log("SUBMISSION:", currentSubmission);

        setSubmission(currentSubmission);

        if (currentSubmission.status === "COMPLETED") {
          clearInterval(intervalId);

          navigate(`/submissions/${currentSubmission._id}/feedback`);

          return;
        }

        if (currentSubmission.status === "FAILED") {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Failed to fetch submission:", error);
      }
    }

    fetchSubmission();

    intervalId = setInterval(fetchSubmission, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [submissionId, navigate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115]">
      <Navbar />

      <main className="w-full bg-[#F8F9FA] pt-14">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10 lg:px-12">
          <div className="mb-8 border-b border-[#E5E7EB] pb-6">
            <p className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#FF5A5F]">
              SUBMISSION // ATTEMPT #4
            </p>

            <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Parking Lot
            </h1>

            <p className="mt-3 text-sm text-[#6B7280]">
              Your design has been submitted and is being evaluated.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Status */}
            <section className="lg:col-span-8">
              <div className="border border-[#E5E7EB] bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />

                  <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#F59E0B]">
                    EVALUATION IN PROGRESS
                  </span>
                </div>

                <h2 className="mt-6 font-[Space_Grotesk] text-2xl font-bold">
                  Your submission is being evaluated
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
                  The evaluator is checking your domain model, responsibilities,
                  relationships, strategy abstractions, and concurrency
                  decisions.
                </p>

                <div className="mt-8 border-t border-[#E5E7EB] pt-6">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Evaluation status
                    </span>

                    <span className="font-[JetBrains_Mono] text-xs font-bold text-[#F59E0B]">
                      {submission?.status || "Loading....."}
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full bg-[#E5E7EB]">
                    <div className="h-full w-1/3 bg-[#F59E0B]" />
                  </div>
                </div>
              </div>

              {/* Submitted Design */}
              <div className="mt-6 border border-[#E5E7EB] bg-white">
                <div className="border-b border-[#E5E7EB] px-6 py-5">
                  <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#6B7280]">
                    YOUR SUBMISSION
                  </p>

                  <h2 className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                    Design Spec
                  </h2>
                </div>

                <pre className="overflow-x-auto p-6 font-[JetBrains_Mono] text-sm leading-7 text-[#374151]">
                  {submission?.solution || "Getting Submission...."}
                </pre>
              </div>
            </section>

            {/* Summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 border border-[#E5E7EB] bg-white p-6">
                <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">
                  SUBMISSION SUMMARY
                </p>

                <div className="mt-6 space-y-5">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Attempt</span>

                    <span className="font-[JetBrains_Mono] text-sm font-bold">
                      #4
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Submitted</span>

                    <span className="font-[JetBrains_Mono] text-xs font-bold">
                      Just now
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Status</span>

                    <span className="font-[JetBrains_Mono] text-xs font-bold text-[#F59E0B]">
                      QUEUED
                    </span>
                  </div>
                </div>

                <a
                  href="/attempts"
                  className="mt-8 block w-full border border-[#111827] px-5 py-3 text-center font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] transition-colors hover:bg-[#111827] hover:text-white"
                >
                  VIEW MY ATTEMPTS →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SubmissionPage;
