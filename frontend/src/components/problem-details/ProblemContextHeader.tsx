import React from "react";

const ProblemContextHeader = () => {
  return (
    <div className="mb-10 flex items-center justify-between border-b border-[#E5E7EB] pb-5">
      <a
        href="/problems"
        className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#6B7280] transition-colors hover:text-[#FF5A5F]"
      >
        ← ALL PROBLEMS
      </a>

      <div className="flex items-center gap-4">
        <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#6B7280]">
          CHALLENGE 01 // ARCH-SPEC v1.2
        </span>

        <span className="flex items-center gap-2 font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#16A34A]">
          <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
          ACTIVE SPEC
        </span>
      </div>
    </div>
  );
};

export default ProblemContextHeader;
