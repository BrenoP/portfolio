"use client";

import React, { useState, useEffect } from "react";
import Select, { StylesConfig, GroupBase } from "react-select";

export interface LangOption {
  value: string;
  label: string;
}

interface ClientOnlySelectProps {
  options: LangOption[];
  value: LangOption | null;
  onChange: (option: LangOption | null) => void;
  styles?: StylesConfig<LangOption, false, GroupBase<LangOption>>;
  isSearchable?: boolean;
  "aria-label"?: string;
  className?: string;
}

export default function ClientOnlySelect({
  options,
  value,
  onChange,
  styles,
  isSearchable = true,
  "aria-label": ariaLabel,
  className
}: ClientOnlySelectProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`w-full h-10 bg-white border border-gray-300 rounded-md ${className}`}>
        <div className="w-full h-full flex items-center px-3 text-gray-500">
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      styles={styles}
      isSearchable={isSearchable}
      aria-label={ariaLabel}
      className={className}
    />
  );
} 