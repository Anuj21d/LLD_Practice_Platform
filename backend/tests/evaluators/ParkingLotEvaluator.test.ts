import { describe, it, expect } from "vitest";
import { ParkingLotEvaluator } from "../../src/Evaluator/ParkingLotEvaluator";

describe("ParkingLotEvaluator", () => {
  it("should give a score greater than zero for a valid Parking Lot design", async () => {
    const evaluator = new ParkingLotEvaluator();

    const solution = `
      ParkingLot manages parking spots.
      Vehicle can be Car, Motorcycle, or Truck.
      AllocationStrategy decides where vehicles are parked.
      Ticket is created when a vehicle enters.
      PricingStrategy calculates the parking fee.
      A lock is used to handle concurrent allocation.
    `;

    const result = await evaluator.evaluate(solution);

    expect(result.score).toBeGreaterThan(0);
    expect(result.criteria.length).toBe(5);
  });
});
