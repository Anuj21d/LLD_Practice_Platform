function PracticeAction() {
  return (
    <section className="border border-[#E5E7EB] bg-white p-6">
      <p className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.14em] text-[#FF5A5F]">
        READY TO ARCHITECT?
      </p>

      <h2 className="mt-3 font-[Space_Grotesk] text-2xl font-bold tracking-[-0.03em]">
        Submit Design Spec
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#6B7280]">
        Start a timed practice session and submit your design for evaluation.
      </p>

      <a
        href="/problems/parking-lot/practice"
        className="mt-6 flex w-full items-center justify-center bg-[#FF5A5F] px-5 py-3 font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] text-white transition-colors hover:bg-[#e84d52]"
      >
        START PRACTICE →
      </a>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="border border-[#E5E7EB] px-3 py-3 text-xs font-semibold text-[#111827] transition-colors hover:border-[#111827]"
        >
          View Solution
        </button>

        <button
          type="button"
          className="border border-[#E5E7EB] px-3 py-3 text-xs font-semibold text-[#111827] transition-colors hover:border-[#111827]"
        >
          Download .MD
        </button>
      </div>
    </section>
  );
}

export default PracticeAction;
