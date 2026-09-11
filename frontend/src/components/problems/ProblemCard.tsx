import React from "react";
import { ArrowRight, Timer } from "lucide-react";
import { Link } from "react-router-dom";

type Problem = {
  id: string;
  number: string;
  title: string;
  difficulty: string;
  difficultyClass: string;
  time: string;
  description: string;
  tags: string[];
  score: number;
  submissions: number;
};

type ProblemCardProps = {
  problem: Problem;
};

const ProblemCard = ({ problem }: ProblemCardProps) => {
  return (
    <article
      key={problem.id}
      className="group rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:border-[#D1D5DB] hover:shadow-md sm:p-8"
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* INFO */}
        <div className="flex flex-1 items-start gap-6 sm:gap-8">
          <span className="font-[Space_Grotesk] text-5xl font-bold text-[#D1D5DB] transition-colors group-hover:text-[#FF5A5F] lg:text-6xl">
            {problem.number}
          </span>

          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h3 className="font-[Space_Grotesk] text-2xl font-bold tracking-tight transition-colors group-hover:text-[#FF5A5F]">
                {problem.title}
              </h3>

              <span
                className={`rounded border px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                  problem.difficultyClass === "easy"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {problem.difficulty}
              </span>

              <span className="hidden items-center gap-1 font-mono text-xs text-[#6B7280] sm:inline-flex">
                <Timer size={14} />
                {problem.time}
              </span>
            </div>

            <p className="mb-4 max-w-2xl text-[15px] leading-relaxed text-[#4B5563]">
              {problem.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[#E5E7EB] bg-[#F3F4F6] px-2.5 py-1 font-mono text-xs font-medium text-[#374151]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E5E7EB] pt-4 lg:border-t-0 lg:pt-0 border-l-2 pl-8">
          <div className="flex flex-col font-mono text-xs text-[#6B7280] lg:items-end">
            <span className="font-semibold text-[#111827]">
              Last evaluated: {problem.score}/100
            </span>

            <span>{problem.submissions} submissions on file</span>
          </div>

          <Link
            to={`/problems/${problem.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5A5F] px-5 py-2.5 font-mono text-sm font-semibold text-white transition-all hover:bg-[#E04E53] group-hover:translate-x-0.5"
          >
            Problem Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProblemCard;
