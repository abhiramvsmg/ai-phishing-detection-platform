import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className, glow = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 20, stiffness: 150 });
  
  const glowX = useSpring(useMotionValue(0), { damping: 25, stiffness: 250 });
  const glowY = useSpring(useMotionValue(0), { damping: 25, stiffness: 250 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-2xl border border-slate-200/60 bg-white p-6 shadow-md shadow-slate-100/50 backdrop-blur-xl transition-colors duration-300 group hover:border-indigo-300/50 hover:shadow-lg hover:shadow-indigo-100/40",
        className
      )}
    >
      {glow && !shouldReduceMotion && (
        <motion.div 
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(180px circle at ${gx}px ${gy}px, rgba(99, 102, 241, 0.08), transparent 80%)`
            )
          }}
        />
      )}
      <div style={shouldReduceMotion ? {} : { transform: "translateZ(8px)" }}>
        {children}
      </div>
    </motion.div>
  );
};
export default TiltCard;
