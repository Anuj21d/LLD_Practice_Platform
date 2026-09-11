import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import HeroSection from "../components/problems/HeroSection";
import ChallengeHeader from "../components/problems/ChallengeHeader";
import ProblemCard from "../components/problems/ProblemCard";

import { problems } from "../data/problems";

function ProblemsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="min-h-screen w-full bg-[#F9FAFB] pt-14">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-8 md:px-10 lg:px-12">
          {/* HERO */}
          <HeroSection />

          {/* CHALLENGE HEADER */}
          <ChallengeHeader />

          {/* PROBLEM CARDS */}
          <section className="mb-16 flex flex-col gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default ProblemsPage;
