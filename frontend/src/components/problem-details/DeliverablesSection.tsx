type Deliverable = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

const deliverables: Deliverable[] = [
  {
    number: "01",
    title: "DOMAIN ENTITIES",
    subtitle: "Classes & Domain Boundaries",
    description:
      "Define the core domain objects including ParkingLot, ParkingFloor, ParkingSpot, Ticket, and Gate.",
  },
  {
    number: "02",
    title: "SOLID CONFORMANCE",
    subtitle: "Responsibilities & Invariants",
    description:
      "Demonstrate SRP and clearly separate ticketing, slot leasing, hardware telemetry, and payment state machines.",
  },
  {
    number: "03",
    title: "STRUCTURAL GRAPH",
    subtitle: "Relationships & Multiplicities",
    description:
      "Show UML-grade compositions and aggregations, including 1-to-N relationships and parent lifetime bindings.",
  },
  {
    number: "04",
    title: "STRATEGY CONTRACTS",
    subtitle: "Polymorphic Interfaces",
    description:
      "Define extensible contracts such as PricingStrategy, AllocationStrategy, and PaymentProcessor.",
  },
  {
    number: "05",
    title: "IMPLEMENTATION",
    subtitle: "Executable Signatures",
    description:
      "Provide type-annotated pseudocode or code with invocation chains and appropriate error handlers.",
  },
  {
    number: "06",
    title: "SYSTEM BOUNDARIES",
    subtitle: "Concurrency & Trade-Offs",
    description:
      "Address thread safety, mutex or atomic counters, memory footprint, and potential horizontal bottlenecks.",
  },
];

function DeliverablesSection() {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <p className="mb-2 font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#FF5A5F]">
            SECTION 02
          </p>

          <h2 className="font-[Space_Grotesk] text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            WHAT YOU&apos;LL SUBMIT
          </h2>
        </div>

        <span className="hidden font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] text-[#6B7280] md:block">
          EVALUATION DELIVERABLES
        </span>
      </div>

      <div className="grid gap-px border border-[#E5E7EB] bg-[#E5E7EB] md:grid-cols-2">
        {deliverables.map((deliverable) => (
          <article key={deliverable.number} className="bg-white p-6 md:p-7">
            <div className="mb-7 flex items-start justify-between">
              <span className="font-[JetBrains_Mono] text-xs font-bold text-[#9CA3AF]">
                {deliverable.number}
              </span>

              <span className="font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#FF5A5F]">
                DELIVERABLE
              </span>
            </div>

            <h3 className="font-[Space_Grotesk] text-lg font-bold">
              {deliverable.title}
            </h3>

            <p className="mt-2 text-sm font-medium text-[#111827]">
              {deliverable.subtitle}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#6B7280]">
              {deliverable.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DeliverablesSection;
