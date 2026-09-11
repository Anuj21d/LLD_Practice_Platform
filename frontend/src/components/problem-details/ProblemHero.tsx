import React from "react";

const ProblemHero = () => {
  return (
    <section className="mb-16">
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#6B7280]">
          MEDIUM
        </span>

        <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#6B7280]">
          EST. ~45 MIN
        </span>

        <span className="font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#6B7280]">
          PREREQUISITE: OOD &amp; STRATEGY PATTERN
        </span>
      </div>

      <h1 className="mb-7 max-w-[900px] font-[Space_Grotesk] text-[64px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[92px]">
        PARKING
        <br />
        <span className="relative inline-block">
          LOT
          <span className="absolute -bottom-2 left-0 h-[5px] w-full bg-[#FF5A5F]" />
        </span>
      </h1>

      <p className="max-w-[820px] text-lg leading-8 text-[#6B7280] md:text-xl">
        Design a scalable, highly reliable parking lot management engine capable
        of handling multiple floor topologies, dynamic vehicle classification
        profiles, deterministic spot assignment, cryptographic ticketing, and
        decoupled runtime pricing strategies.
      </p>
    </section>
  );
};

export default ProblemHero;
