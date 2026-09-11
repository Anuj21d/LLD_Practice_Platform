import React from "react";

const ChallengeHeader = () => {
  return (
    <section className="mb-8">
      <div className="flex flex-col justify-between gap-4 border-b border-[#E5E7EB] pb-4 sm:flex-row sm:items-end">
        <div>
          <span className="mb-1 block font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E03E44]">
            MODULE SELECTION
          </span>

          <h2 className="font-[Space_Grotesk] text-2xl font-bold tracking-tight">
            CHOOSE A CHALLENGE
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6B7280]">FILTER BY:</span>

          <div className="flex gap-1.5">
            <button className="rounded bg-[#111827] px-2.5 py-1 font-mono text-xs font-medium text-white">
              ALL (3)
            </button>

            <button className="rounded border border-[#E5E7EB] bg-white px-2.5 py-1 font-mono text-xs font-medium text-[#4B5563] hover:border-[#D1D5DB]">
              CORE PATTERNS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeHeader;
