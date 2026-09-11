import React from "react";

type Requirement = {
  number: string;
  title: string;
  category: string;
  description: string;
};

const requirements: Requirement[] = [
  {
    number: "01",
    title: "Multiple Parking Floors",
    category: "TOPOLOGY",
    description:
      "Support multi-level indexing with floor capacity telemetry. Prevent race conditions at peak hours across floor ramp gates.",
  },
  {
    number: "02",
    title: "Diverse Vehicle Classification",
    category: "DOMAIN MODEL",
    description:
      "Support Motorcycle, Compact/Sedan, and Large/Bus/Truck profiles with physical dimension compatibility and height thresholds.",
  },
  {
    number: "03",
    title: "Optimized Spot Assignment Algorithm",
    category: "DISPATCH ENGINE",
    description:
      "Deterministically assign the nearest compatible spot to the entrance while supporting EV and accessibility reservations.",
  },
  {
    number: "04",
    title: "Cryptographic Ticketing Lifecycle",
    category: "STATE MACHINE",
    description:
      "Generate collision-resistant ticket IDs with timestamps, gate tokens, and license fingerprints throughout the ticket lifecycle.",
  },
  {
    number: "05",
    title: "Granular Fee Invoicing",
    category: "BILLING",
    description:
      "Support the first hour complimentary, incremental multipliers, weekend surcharges, and heavy-vehicle coefficients.",
  },
  {
    number: "06",
    title: "Extensible Dynamic Pricing Engine",
    category: "STRATEGY EXTENSION",
    description:
      "Allow seasonal peak, holiday, and VIP pricing deductions without mutating the core settlement logic.",
  },
];

const RequirementsSection = () => {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <p className="mb-2 font-[JetBrains_Mono] text-xs font-bold tracking-[0.12em] text-[#FF5A5F]">
            SECTION 01
          </p>

          <h2 className="font-[Space_Grotesk] text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            SYSTEM REQUIREMENTS &amp; CONSTRAINTS
          </h2>
        </div>

        <span className="hidden font-[JetBrains_Mono] text-xs font-bold tracking-[0.1em] text-[#6B7280] md:block">
          6 FUNCTIONAL BLOCKS
        </span>
      </div>

      <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
        {requirements.map((requirement) => (
          <article
            key={requirement.number}
            className="grid gap-5 bg-white px-5 py-6 md:grid-cols-[52px_220px_1fr] md:px-7"
          >
            <span className="font-[JetBrains_Mono] text-xs font-bold text-[#9CA3AF]">
              {requirement.number}
            </span>

            <div>
              <h3 className="font-[Space_Grotesk] text-lg font-bold">
                {requirement.title}
              </h3>

              <p className="mt-2 font-[JetBrains_Mono] text-[10px] font-bold tracking-[0.12em] text-[#FF5A5F]">
                {requirement.category}
              </p>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#6B7280]">
              {requirement.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RequirementsSection;
