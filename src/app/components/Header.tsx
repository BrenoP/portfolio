"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientOnlySelect, { LangOption } from "./ClientOnlySelect";
import customSelectStyles from "./customSelectStyles";
import { COLOR_BG, COLOR_HEADER } from "../colors";
import { PersonalInfo, Translations } from "../types";

interface HeaderProps {
  info: PersonalInfo | null;
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  langOptions: LangOption[];
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  heroRef: React.RefObject<HTMLDivElement>;
  habilidadesRef: React.RefObject<HTMLDivElement>;
  projetosRef: React.RefObject<HTMLDivElement>;
  t: Translations;
}

export default function Header({
  info,
  lang,
  setLang,
  langOptions,
  drawerOpen,
  setDrawerOpen,
  scrollToSection,
  heroRef,
  habilidadesRef,
  projetosRef,
  t
}: HeaderProps) {
  return (
    <header className="w-full bg-white py-12 px-4 flex items-center justify-center mb-4 mt-8" style={{ background: COLOR_BG }}>
      <div className="w-full max-w-5xl flex items-center justify-between gap-4">
        <span className="font-extrabold text-4xl tracking-tight" style={{ color: COLOR_HEADER }}>{info ? info.nome : ""}</span>
        <div className="flex items-center gap-4">
          <div className="block md:hidden">
            <button
              className="p-2 rounded focus:outline-none border border-gray-200"
              aria-label="Abrir menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="sr-only">Abrir menu</span>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div style={{ minWidth: 80 }}>
              <ClientOnlySelect
                options={langOptions}
                value={langOptions.find((o) => o.value === lang) ?? null}
                onChange={(opt: LangOption | null) => setLang((opt?.value === 'pt' || opt?.value === 'en') ? opt.value : 'pt')}
                styles={customSelectStyles}
                isSearchable={false}
                aria-label="Selecionar idioma"
                className="focus:outline-none"
              />
            </div>
            <nav className="flex gap-6 text-base font-medium">
              <button
                className="hover:text-blue-800 transition-colors cursor-pointer" style={{ color: COLOR_HEADER }}
                onClick={() => scrollToSection(heroRef)}
              >
                {lang === 'pt' ? 'Sobre' : 'About'}
              </button>
              <button
                className="hover:text-blue-800 transition-colors cursor-pointer" style={{ color: COLOR_HEADER }}
                onClick={() => scrollToSection(habilidadesRef)}
              >
                {lang === 'pt' ? 'Habilidades' : 'Skills'}
              </button>
              <button
                className="hover:text-blue-800 transition-colors cursor-pointer" style={{ color: COLOR_HEADER }}
                onClick={() => scrollToSection(projetosRef)}
              >
                {t[lang].navProjects}
              </button>
            </nav>
          </div>
        </div>
      </div>
      {/* Drawer mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              className="bg-white w-64 h-full shadow-2xl p-8 flex flex-col gap-8"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="self-end mb-8 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setDrawerOpen(false)}>&times;</button>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                <button className="text-left" style={{ color: COLOR_HEADER }} onClick={() => { setDrawerOpen(false); scrollToSection(heroRef); }}>{lang === 'pt' ? 'Sobre' : 'About'}</button>
                <button className="text-left" style={{ color: COLOR_HEADER }} onClick={() => { setDrawerOpen(false); scrollToSection(habilidadesRef); }}>{lang === 'pt' ? 'Habilidades' : 'Skills'}</button>
                <button className="text-left" style={{ color: COLOR_HEADER }} onClick={() => { setDrawerOpen(false); scrollToSection(projetosRef); }}>{t[lang].navProjects}</button>
                <div className="mt-8">
                  <ClientOnlySelect
                    options={langOptions}
                    value={langOptions.find((o) => o.value === lang) ?? null}
                    onChange={(opt: LangOption | null) => setLang((opt?.value === 'pt' || opt?.value === 'en') ? opt.value : 'pt')}
                    styles={customSelectStyles}
                    isSearchable={false}
                    aria-label="Selecionar idioma"
                    className="focus:outline-none"
                  />
                </div>
              </nav>
            </motion.div>
            <div className="flex-1 bg-black/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 