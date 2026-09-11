import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Attempt = {
  _id: string;
  problemId: string;
  solution: string;
  status: "QUEUED" | "EVALUATING" | "COMPLETED" | "FAILED";
  score?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
};

function AttemptsPage() {
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttempts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/problem/attempts",
        );

        setAttempts(response.data.submissions);
      } catch (error) {
        console.error("Failed to fetch attempts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAttempts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115]">
      <Navbar />

      <main className="w-full bg-[#F8F9FA] pt-14">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10 lg:px-12">
          {loading ? (
            <p className="font-[JetBrains_Mono] text-sm text-[#6B7280]">
              Loading attempts...
            </p>
          ) : attempts.length === 0 ? (
            <p className="font-[JetBrains_Mono] text-sm text-[#6B7280]">
              No attempts yet.
            </p>
          ) : (
            <div className="space-y-4">
              {attempts.map((attempt, index) => (
                <div
                  key={attempt._id}
                  className="border border-[#E5E7EB] bg-white p-6"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#6B7280]">
                        ATTEMPT #{attempts.length - index}
                      </p>

                      <h2 className="mt-2 font-[Space_Grotesk] text-xl font-bold">
                        {attempt.problemId}
                      </h2>

                      <p className="mt-2 text-sm text-[#6B7280]">
                        {new Date(attempt.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.1em] text-[#6B7280]">
                          SCORE
                        </p>

                        <p className="mt-1 font-[Space_Grotesk] text-2xl font-bold">
                          {attempt.score !== undefined
                            ? `${attempt.score}/100`
                            : "—"}
                        </p>
                      </div>

                      <div>
                        <span className="font-[JetBrains_Mono] text-xs font-bold">
                          {attempt.status}
                        </span>
                      </div>

                      {attempt.status === "COMPLETED" && (
                        <button
                          onClick={() =>
                            navigate(`/submissions/${attempt._id}/feedback`)
                          }
                          className="border border-[#111827] px-4 py-3 font-[JetBrains_Mono] text-xs font-bold tracking-[0.08em] transition-colors hover:bg-[#111827] hover:text-white"
                        >
                          VIEW FEEDBACK →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default AttemptsPage;
