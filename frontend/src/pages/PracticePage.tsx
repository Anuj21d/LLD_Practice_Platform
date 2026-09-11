import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PracticePage() {
  const [solution, setSolution] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { problemId } = useParams();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115]">
      <Navbar />

      <main className="w-full bg-[#F8F9FA] pt-14">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-8 md:px-10 lg:px-12">
          {/* Header */}
          <div className="mb-8 border-b border-[#E5E7EB] pb-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#FF5A5F]">
                PRACTICE // CHALLENGE 01
              </span>

              <span className="font-[JetBrains_Mono] text-xs font-bold text-[#6B7280]">
                ~45 MIN
              </span>
            </div>

            <h1 className="font-[Space_Grotesk] text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Parking Lot
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280]">
              Design the domain model, allocation strategy, ticketing lifecycle,
              billing system, and extensibility boundaries.
            </p>
          </div>

          {/* Workspace */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Requirements */}
            <section className="lg:col-span-4">
              <div className="border border-[#E5E7EB] bg-white">
                <div className="border-b border-[#E5E7EB] px-5 py-4">
                  <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#FF5A5F]">
                    PROBLEM
                  </p>

                  <h2 className="mt-1 font-[Space_Grotesk] text-lg font-bold">
                    Requirements
                  </h2>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  <div className="p-5">
                    <p className="font-semibold">01. Multiple Parking Floors</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Support multiple floors and prevent race conditions during
                      spot assignment.
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="font-semibold">02. Vehicle Classification</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Support motorcycles, compact vehicles, and large vehicles.
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="font-semibold">03. Spot Assignment</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Assign the nearest compatible parking spot
                      deterministically.
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="font-semibold">04. Ticket Lifecycle</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Design a collision-resistant ticketing lifecycle.
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="font-semibold">05. Fee Invoicing</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Support complimentary periods, multipliers, surcharges,
                      and coefficients.
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="font-semibold">06. Dynamic Pricing</p>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Keep pricing strategies extensible without modifying
                      settlement logic.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Editor */}
            <section className="lg:col-span-8">
              <div className="border border-[#E5E7EB] bg-white">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
                  <div>
                    <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#6B7280]">
                      DESIGN SPEC
                    </p>

                    <h2 className="mt-1 font-[Space_Grotesk] text-lg font-bold">
                      Your Solution
                    </h2>
                  </div>

                  <span className="font-[JetBrains_Mono] text-[10px] text-[#9CA3AF]">
                    DRAFT
                  </span>
                </div>

                <div className="p-5">
                  <label
                    htmlFor="solution"
                    className="mb-3 block text-sm font-semibold"
                  >
                    Describe your design
                  </label>

                  <textarea
                    id="solution"
                    value={solution}
                    onChange={(event) => {
                      setSolution(event.target.value);
                    }}
                    placeholder={`Example:

class ParkingLot {
  ...
}

interface AllocationStrategy {
  ...
}

Explain your classes, interfaces, responsibilities,
relationships, and important design decisions.`}
                    className="min-h-[500px] w-full resize-y border border-[#E5E7EB] bg-[#FCFCFC] p-5 font-[JetBrains_Mono] text-sm leading-7 outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#111827]"
                  />

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xs text-[#9CA3AF]">
                      You can submit pseudocode, code, or a combination.
                    </p>

                    {submitted && (
                      <div className="mr-4 border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-xs text-[#166534]">
                        Design submitted successfully. Evaluation queued.
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={async () => {
                        if (!solution.trim()) {
                          return;
                        }

                        try {
                          setIsSubmitting(true);

                          const response = await axios.post(
                            "http://localhost:3000/api/problem/submission",
                            {
                              problemId,
                              solution,
                            },
                          );

                          setSubmitted(true);

                          const submissionId = response.data.submission._id;

                          navigate(`/submissions/${submissionId}`);
                        } catch (error) {
                          console.log(error);
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      className="bg-[#FF5A5F] px-6 py-3 font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] text-white transition-colors hover:bg-[#e84d52]"
                    >
                      SUBMIT DESIGN →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PracticePage;
