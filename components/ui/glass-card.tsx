import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${
        hover
          ? "transition-all hover:border-cyan-500/20 hover:bg-white/[0.05]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
