// BaseButton.tsx
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({ className = "", children, ...props }) => {
    const colorClass = "bg-[var(--color-controls)] text-[var(--color-text-alt)]";
  return (
    <button
      {...props}
      className={className}
    >
      {children}
    </button>
  );
};

export default BaseButton;
