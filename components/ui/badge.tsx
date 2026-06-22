import React from 'react';

type Severity = 'success' | 'warning' | 'danger' | 'primary';

export const Badge = ({ children, variant = 'primary' }: { children: React.ReactNode, variant?: Severity }) => {
  const styles = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${styles[variant]}`}>
      {children}
    </span>
  );
};