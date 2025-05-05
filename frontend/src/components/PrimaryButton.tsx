// PrimaryButton.tsx
import React from "react";
import BaseButton, { BaseButtonProps } from "./BaseButton";

interface PrimaryButtonProps extends Omit<BaseButtonProps, "children"> {
  text: string;
  color?: "blue" | "red";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  color = "blue",
  className = "",
  ...props
}) => {
  const baseClasses = "w-full font-bold p-2 rounded-[var(--border-radii)] mt-4";
  const colorClasses =
    color === "red"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-[var(--color-controls)] text-[var(--color-text-alt)] hover:bg-[var(--color-controls-hover)]";

  return (
    <BaseButton
      {...props}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {text}
    </BaseButton>
  );
};

export default PrimaryButton;
