import React from "react";
import { motion } from "framer-motion";

export const RadarScanner: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-full shadow-inner p-4 backdrop-blur-md overflow-hidden">
      {/* Radar sweep line */}
      <motion.div
        className="absolute inset-0 w-full h-full rounded-full origin-center pointer-events-none z-10"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Concentric circles */}
      <div className="absolute inset-4 border border-indigo-100/60 rounded-full" />
      <div className="absolute inset-12 border border-indigo-100/40 rounded-full" />
      <div className="absolute inset-20 border border-indigo-100/20 rounded-full" />
      
      {/* Pulsing glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-indigo-200/50"
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-cyan-200/40"
        animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Central neural dot */}
      <div className="relative z-20 flex items-center justify-center">
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-indigo-200/50"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V5a2 2 0 00-2-2H4a2 2 0 00-2 2v6c0 1.76.353 3.441.99 4.978M19 11v5m0 0l-2-2m2 2l2-2M12 3a9 9 0 00-9 9" />
          </svg>
        </motion.div>
        
        {/* Radar targets (threat particles) */}
        <motion.div
          className="absolute -top-16 -left-12 w-3 h-3 rounded-full bg-danger shadow-md shadow-rose-300"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-16 -right-16 w-3 h-3 rounded-full bg-warning shadow-md shadow-amber-300"
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.div
          className="absolute -bottom-12 -left-16 w-2.5 h-2.5 rounded-full bg-success shadow-md shadow-teal-300"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      {/* Grid line guidelines */}
      <div className="absolute inset-0 w-full h-px bg-indigo-100/30 top-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 h-full w-px bg-indigo-100/30 left-1/2 -translate-x-1/2" />
    </div>
  );
};
export default RadarScanner;
