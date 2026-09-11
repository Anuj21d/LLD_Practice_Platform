import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ProblemContextHeader from "../components/problem-details/ProblemContextHeader";
import ProblemHero from "../components/problem-details/ProblemHero";
import RequirementsSection from "../components/problem-details/RequirementsSection";
import DeliverablesSection from "../components/problem-details/DeliverablesSection";
import PracticeAction from "../components/problem-details/PracticeAction";

const problemMap = {
  "parking-lot": {
    title: "Parking Lot",
    difficulty: "Medium",
    description:
      "Design a parking system that balances vehicle capacity, pricing logic, and operational state transitions under concurrent requests.",
  },
  "vending-machine": {
    title: "Vending Machine",
    difficulty: "Easy",
    description:
      "Model a machine that coordinates inventory, payment flows, refunds, and product dispatch without breaking state consistency.",
  },
  elevator: {
    title: "Elevator System",
    difficulty: "Medium",
    description:
      "Build an elevator dispatcher that handles multiple requests, prioritizes movement, and respects safety constraints in real time.",
  },
};

const ProblemDetailsPage = () => {
  const { problemId } = useParams();
  const problem = problemMap[problemId as keyof typeof problemMap] ?? {
    title: "Unknown problem",
    difficulty: "N/A",
    description: "No challenge details are available for this route.",
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F1115]">
      {/*Navbar*/}
      <Navbar />
      <main className="w-full bg-[#F8F9FA] pt-14">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-8 md:px-10 lg:px-12">
          <ProblemContextHeader />

          <ProblemHero />

          <RequirementsSection />

          <DeliverablesSection />

          <PracticeAction />
        </div>
      </main>
      {/*Footer*/}
      <Footer />
    </div>
  );
};

export default ProblemDetailsPage;
