import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string; // e.g., "99, 102, 241" (RGB values)
  maxRotation?: number; // Maximum tilt angle in degrees
  depthZ?: number; // Z-axis translate depth for children
  glare?: boolean; // Shiny glass glare reflection overlay
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className, 
  glow = true,
  glowColor = "99, 102, 241", // Default indigo glow
  maxRotation = 8,
  depthZ = 12,
  glare = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation]), { damping: 20, stiffness: 150 });
  
  const glowX = useSpring(useMotionValue(0), { damping: 25, stiffness: 250 });
  const glowY = useSpring(useMotionValue(0), { damping: 25, stiffness: 250 });

  // Shine/glare calculations
  const glareOpacity = useSpring(useTransform(y, [-0.5, 0.5], [0.05, 0.15]), { damping: 20, stiffness: 150 });
  const glareRotate = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const currX = (e.clientX - rect.left) / rect.width - 0.5;
    const currY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(currX);
    y.set(currY);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-3xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-100/30 backdrop-blur-xl transition-all duration-300 group hover:border-violet-300/40 hover:shadow-2xl hover:shadow-violet-100/30 cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Glow Highlight */}
      {glow && !shouldReduceMotion && (
        <motion.div 
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none z-10"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(220px circle at ${gx}px ${gy}px, rgba(${glowColor}, 0.1), transparent 80%)`
            )
          }}
        />
      )}

      {/* Shine/Glare Layer */}
      {glare && !shouldReduceMotion && (
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 mix-blend-overlay z-10"
          style={{
            opacity: glareOpacity,
            rotate: glareRotate,
            transformStyle: "preserve-3d"
          }}
        />
      )}

      {/* 3D Depth Inner Wrapper */}
      <div 
        style={shouldReduceMotion ? {} : { transform: `translateZ(${depthZ}px)`, transformStyle: "preserve-3d" }}
        className="relative z-20 h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
