import React from "react";
import { User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
      <div className="flex h-14  items-center justify-between px-10 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5A5F] ring-2 ring-[#FF5A5F]/20" />

          <span className="font-[Space_Grotesk] text-lg font-bold tracking-tight uppercase">
            LLD LAB
          </span>

          <span className="rounded border border-[#E5E7EB] bg-[#F3F4F6] px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
            ARCH-OPS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex h-full items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 font-mono text-sm transition-colors ${
                isActive
                  ? "border-[#FF5A5F] font-semibold text-[#111827]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`
            }
          >
            Problems
          </NavLink>

          <NavLink
            to="/attempts"
            className={({ isActive }) =>
              `flex h-full items-center border-b-2 font-mono text-sm transition-colors ${
                isActive
                  ? "border-[#FF5A5F] font-semibold text-[#111827]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`
            }
          >
            My Attempts
          </NavLink>
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded border border-[#E5E7EB] bg-[#F3F4F6] px-2.5 py-1 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16A34A]" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#4B5563]">
              SYNCHRONIZED
            </span>
          </div>

          <div className="flex items-center gap-2.5 border-l border-[#E5E7EB] pl-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded border border-[#E5E7EB] bg-[#F3F4F6] font-mono text-[11px] font-semibold">
              AD
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#16A34A] ring-2 ring-white" />
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5E7EB]">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
