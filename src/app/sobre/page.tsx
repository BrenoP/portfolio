"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import {
  COLOR_BG,
  COLOR_HEADER,
  COLOR_SECTION_BLUE,
} from "../colors";

interface Formacao {
  titulo: string;
  descricao: string;
  linkCertificado: string;
}

interface Experiencia {
  titulo: string;
  empresa: string;
  logo?: string;
  periodo: string;
  local?: string;
  descricao: string;
  competencias?: string;
}

export default function SobrePage() {
  const [sobre, setSobre] = useState<string[]>([]);
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.sobre) setSobre(data.sobre);
        if (data.formacoes) setFormacoes(data.formacoes);
        if (data.experiencias) setExperiencias(data.experiencias);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: COLOR_BG }}>
      {/* Seta para voltar */}
      <div className="w-full max-w-4xl mx-auto pt-10 pb-2 px-2 flex items-center">
        <button
          className="flex items-center gap-2 mb-6 text-lg font-medium"
          style={{ color: COLOR_HEADER, cursor: 'pointer' }}
          onClick={() => router.push("/")}
        >
          <FaArrowLeft /> Voltar
        </button>
      </div>
      <section className="w-full flex flex-col items-center justify-center py-10 px-2" style={{ background: COLOR_BG }}>
        <h1 className="text-5xl font-extrabold mb-4 text-center" style={{ color: COLOR_HEADER }}>Saiba mais sobre mim</h1>
        <h2 className="text-xl text-gray-700 mb-8 text-center">Formações acadêmicas e experiências profissionais detalhadas</h2>
      </section>

      {/* Sobre mim */}
      <section className="w-full pb-12 flex flex-col items-center px-2" style={{ background: COLOR_BG }}>
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
          {sobre.length > 0 && sobre.map((p, i) => (
            <p key={i} className="text-lg text-gray-800 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Formação Acadêmica */}
      <section className="w-full py-16 px-2" style={{ background: COLOR_SECTION_BLUE }}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-white">Formação Acadêmica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formacoes.map((f) => (
              <div key={f.titulo} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition">
                <h4 className="text-lg font-bold mb-1 text-[#001d3d]">{f.titulo}</h4>
                <p className="text-gray-700 mb-2">{f.descricao}</p>
                <a href={f.linkCertificado} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffc300] text-[#001d3d] rounded-full font-semibold shadow hover:bg-[#ffe066] transition w-fit">
                  Ver credencial <FaExternalLinkAlt />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiências Profissionais */}
      <section className="w-full py-16 px-2" style={{ background: COLOR_BG }}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-10" style={{ color: COLOR_HEADER }}>Experiências Profissionais</h3>
          <div className="relative flex flex-col gap-16">
            {/* Linha vertical centralizada (timeline) */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-200 z-0" style={{ transform: 'translateX(-50%)' }} />
            {experiencias.map((exp) => (
              <div key={exp.titulo + exp.empresa} className="relative flex flex-row gap-6 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 z-10 items-center max-w-2xl mx-auto">
                {exp.logo && (
                  <div className="hidden md:flex flex-shrink-0 items-center justify-center w-20 h-20 bg-gray-100 rounded-xl overflow-hidden mr-4">
                    <Image src={exp.logo.replace('/public', '')} alt={exp.empresa} width={64} height={64} className="object-contain w-full h-full" />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-[#001d3d]">{exp.titulo}</h4>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
                    <span className="font-semibold">{exp.empresa}</span>
                    <span>·</span>
                    <span>{exp.periodo}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line mt-2">{exp.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 