import React from "react";

const HeroSection = () => {
  return (
    <section className="overflow-hidden pb-12 pt-4">
      <div className="max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2.5 rounded border border-[#E5E7EB] bg-white px-2.5 py-1 shadow-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF5A5F]" />

          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E03E44]">
            LLD PRACTICE // ARCH-SPEC
          </span>
        </div>

        <h1 className="mb-6 font-[Space_Grotesk] text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-6xl">
          Design systems.
          <br />
          <span className="text-[#6B7280]">Think in objects.</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
          Practice Low-Level Design problems, get explainable architectural
          feedback, and harden your structural intuition one specification at a
          time.
        </p>

        <div className="flex items-center gap-4">
          <div className="h-0.5 w-24 bg-[#FF5A5F]" />
          <div className="h-px flex-1 bg-[#E5E7EB]" />

          <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#6B7280]">
            SPEC: VERIFIED
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
