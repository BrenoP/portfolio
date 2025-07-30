import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
};

export default function Button({ children, onClick, href, className = "", style, type = "button" }: ButtonProps) {
  if (href) {
    return (
      <a href={href} className={`px-4 py-2 rounded-full font-semibold shadow transition cursor-pointer ${className}`} style={style} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={`px-4 py-2 rounded-full font-semibold shadow transition cursor-pointer ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
} 