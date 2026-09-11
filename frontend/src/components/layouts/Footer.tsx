import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-6 bottom-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs text-[#6B7280] md:flex-row md:px-8">
        <div>
          <span className="font-[Space_Grotesk] font-bold uppercase text-[#111827]">
            LLD Lab
          </span>

          <span className="mx-2 text-[#D1D5DB]">/</span>

          <span>System Architecture & Low-Level Design Engine</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A5F]" />
            v2.4.0-CORE
          </span>

          <span className="font-medium">ENGINEERING-GRADE EVALUATION</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
