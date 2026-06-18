"use client";
import { motion } from 'framer-motion';

export const SecurityCard = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-card border border-border rounded-lg shadow-xl ${className}`}
  >
    <div className="px-4 py-2 border-b border-border bg-surface/30">
      <h3 className="text-[11px] font-bold text-muted uppercase tracking-tighter">{title}</h3>
    </div>
    <div className="p-4">
      {children}
    </div>
  </motion.div>
);