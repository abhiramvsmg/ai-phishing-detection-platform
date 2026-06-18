// components/ui/SecurityCard.tsx
import { motion } from "framer-motion";

export const SecurityCard = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-brand-surface/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent/50" />
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{title}</h3>
    {children}
  </motion.div>
);