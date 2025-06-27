"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { COLOR_HEADER } from "../colors";
import { PersonalInfo } from "../types";

interface FooterProps {
  info: PersonalInfo | null;
  year: number | null;
}

export default function Footer({ info, year }: FooterProps) {
  return (
    <footer className="w-full py-8 text-center animate-fade-in text-xs text-gray-400" style={{ background: COLOR_HEADER }}>
      <div className="flex justify-center gap-6 mb-2">
        {info && (
          <>
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="text-white-800 hover:text-blue-600 text-xl"><FaLinkedin /></a>
            <a href={`mailto:${info.email}`} className="text-white-800 hover:text-white-600 text-xl"><FaEnvelope /></a>
            <a href={info.github} target="_blank" rel="noopener noreferrer" className="text-white-800 hover:text-blue-600 text-xl"><FaGithub /></a>
          </>
        )}
      </div>
      © {year ?? ""} {info ? info.nome : ""}. Portfólio pessoal.
    </footer>
  );
} 