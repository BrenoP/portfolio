import React from "react";

type TitleProps = {
  children: React.ReactNode;
  size?: string;
  color?: string;
  className?: string;
};

export default function Title({ children, size = "text-2xl", color, className = "" }: TitleProps) {
  return (
    <h2 
      className={`font-bold ${size} ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </h2>
  );
} 