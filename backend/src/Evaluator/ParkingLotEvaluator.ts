import type {
    Evaluator,
    EvaluationResult,
    EvaluationCriterion,
} from "./Evaluator";

export class ParkingLotEvaluator implements Evaluator {
  async evaluate(solution: string): Promise<EvaluationResult> {
    const normalizedSolution = solution.toLowerCase();

    const hasDomainModel =
      normalizedSolution.includes("parkinglot") ||
      normalizedSolution.includes("parking lot");

    const hasVehicleModel =
      normalizedSolution.includes("vehicle") &&
      (
        normalizedSolution.includes("motorcycle") ||
        normalizedSolution.includes("car") ||
        normalizedSolution.includes("truck")
      );

    const hasAllocationStrategy =
      normalizedSolution.includes("allocationstrategy") ||
      normalizedSolution.includes("allocation strategy");

    const hasTicket =
      normalizedSolution.includes("ticket");

    const hasPricingStrategy =
      normalizedSolution.includes("pricingstrategy") ||
      normalizedSolution.includes("pricing strategy");

    const hasConcurrency =
      normalizedSolution.includes("mutex") ||
      normalizedSolution.includes("lock") ||
      normalizedSolution.includes("atomic") ||
      normalizedSolution.includes("thread");

    const criteria: EvaluationCriterion[] = [
      {
        name: "Domain Model",
        score: hasDomainModel ? 20 : 8,
        maxScore: 20,
        feedback: hasDomainModel
          ? "Parking lot domain concepts are explicitly represented."
          : "Define the core ParkingLot domain entity and its responsibilities.",
      },
      {
        name: "Vehicle Classification",
        score: hasVehicleModel ? 20 : 8,
        maxScore: 20,
        feedback: hasVehicleModel
          ? "Vehicle classification is represented in the design."
          : "Model vehicle types and their parking compatibility explicitly.",
      },
      {
        name: "Strategy Design",
        score: hasAllocationStrategy && hasPricingStrategy ? 20 : 10,
        maxScore: 20,
        feedback:
          hasAllocationStrategy && hasPricingStrategy
            ? "Allocation and pricing responsibilities are represented through strategy abstractions."
            : "Introduce separate allocation and pricing strategy abstractions.",
      },
      {
        name: "Ticket Lifecycle",
        score: hasTicket ? 20 : 8,
        maxScore: 20,
        feedback: hasTicket
          ? "The design includes a ticketing concept."
          : "Define the ticket lifecycle from entry through exit/payment.",
      },
      {
        name: "Concurrency",
        score: hasConcurrency ? 20 : 5,
        maxScore: 20,
        feedback: hasConcurrency
          ? "The design considers concurrent spot allocation."
          : "Explain how simultaneous vehicles claiming the same spot are prevented.",
      },
    ];

    const score = criteria.reduce(
      (total, criterion) => total + criterion.score,
      0
    );

    const strengths = criteria
      .filter((criterion) => criterion.score >= 15)
      .map((criterion) => criterion.feedback);

    const improvements = criteria
      .filter((criterion) => criterion.score < 15)
      .map((criterion) => criterion.feedback);

    let summary = "Your design needs further refinement.";

    if (score >= 80) {
      summary =
        "Strong design covering most of the core Parking Lot requirements.";
    } else if (score >= 60) {
      summary =
        "The design covers several core concepts but has important architectural gaps.";
    }

    return {
      score,
      summary,
      criteria,
      strengths,
      improvements,
      nextStep:
        improvements.length > 0
          ? improvements[0]
          : "Try refining the design further by explaining key trade-offs.",
    };
  }
}