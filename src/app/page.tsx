"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { LangOption } from "./components/ClientOnlySelect";
import Title from "./components/Title";
import Button from "./components/Button";
import { PersonalInfo, Projeto, Projects } from "./types";
import {
  COLOR_BG,
  COLOR_HEADER,
  COLOR_SKILL_TAG_BG,
  COLOR_SKILL_TAG_BORDER,
  COLOR_SKILL_TAG_TEXT,
  COLOR_SKILL_BAR,
  COLOR_SECTION_BLUE,
} from "./colors";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState as useReactState } from "react";
import t from "./components/i18n";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { projectsData, habilidadesData } from './data/projects';

export default function Home() {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [year, setYear] = useState<number | null>(null);

  const [hardSkills, setHardSkills] = useState<string[]>([]);

  // Estados para modais
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);
  const [skillModal, setSkillModal] = useState<string | null>(null);
  const [skillProjects, setSkillProjects] = useState<Projeto[]>([]);

  // Estado do menu lateral mobile
  const [drawerOpen, setDrawerOpen] = useReactState(false);

  // Refs para scroll suave
  const heroRef = useRef<HTMLDivElement>(null!);
  const habilidadesRef = useRef<HTMLDivElement>(null!);
  const projetosRef = useRef<HTMLDivElement>(null!);

  const router = useRouter();

  // Novo: buscar habilidades e sobre da API
  const [habilidadesTopicos, setHabilidadesTopicos] = useState<{ titulo: string; skills: string[] }[]>([]);

  useEffect(() => {
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then(setInfo);
    
    // Usar dados estáticos para projetos
    setProjects(projectsData);
    
    // Usar dados estáticos para habilidades
    setHabilidadesTopicos(habilidadesData);
    
    // Unificar tecnologias dos projetos pessoais e profissionais, removendo duplicatas
    const allProjects = [...projectsData.pessoais, ...projectsData.profissionais];
    const allTechs = allProjects.flatMap((proj) => proj.tecnologias || []);
    const uniqueTechs = Array.from(new Set(allTechs));
    setHardSkills(uniqueTechs);
    
    setYear(new Date().getFullYear());
  }, []);

  // Função para scroll suave
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Função para abrir modal de habilidade
  const openSkillModal = (skill: string) => {
    if (!projects) return;
    const allProjects = [...projects.pessoais, ...projects.profissionais];
    const filtered = allProjects.filter((proj) => proj.tecnologias.includes(skill));
    setSkillProjects(filtered);
    setSkillModal(skill);
  };

  // Função para abrir modal de projeto a partir do modal de habilidade
  const openProjectFromSkill = (proj: Projeto) => {
    setSkillModal(null);
    setTimeout(() => {
      router.push(`/projetos/${encodeURIComponent(proj.titulo.toLowerCase().replace(/\s+/g, '-'))}`);
    }, 300);
  };

  // Função para pegar o link do projeto (GitHub ou LinkedIn)
  const getProjectLink = (proj: Projeto) => {
    if (proj.link.includes("github.com")) return { url: proj.link, label: "GitHub", icon: <FaGithub className="inline ml-1" /> };
    if (proj.link.includes("linkedin.com")) return { url: proj.link, label: "LinkedIn", icon: <FaLinkedin className="inline ml-1" /> };
    return { url: proj.link, label: lang === 'pt' ? 'Ver Projeto' : 'View Project', icon: null };
  };

  // Unir todos os projetos para exibição única
  const allProjects = projects
    ? [...projects.pessoais, ...projects.profissionais]
        .sort((a, b) => (b.data && a.data) ? Number(b.data) - Number(a.data) : 0)
    : [];

  // Imagens para o carrossel de clientes
  const clientImages = [
    '/zappts.png',
    '/ultragaz.png',
    '/cea.png',
    '/compass.png',
    '/porto.png',
    '/meetime.png',
    '/vivo.png',
  ];

  // Opções para o select de linguagem
  const langOptions: LangOption[] = [
    { value: "pt", label: "PT" },
    { value: "en", label: "EN" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: COLOR_BG }}>
      <Header
        info={info}
        lang={lang}
        setLang={setLang}
        langOptions={langOptions}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        scrollToSection={scrollToSection}
        heroRef={heroRef}
        habilidadesRef={habilidadesRef}
        projetosRef={projetosRef}
        t={t}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="w-full flex flex-col items-center justify-center min-h-[60vh] mb-8 px-2" style={{ background: COLOR_BG, paddingTop: '5rem', paddingBottom: '5rem' }}>
        {info && (
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-12 animate-fade-in">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-4" style={{ color: COLOR_HEADER, lineHeight: 1.1 }}>{lang === 'pt' ? info.profissao : info.job}</h1>
              <div className="text-xl text-gray-700 mb-4 max-w-2xl flex flex-col gap-2">
                {lang === 'pt' ? info.descricao : info.description}
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end items-center">
              <div className="w-56 h-56 md:w-64 md:h-64 overflow-hidden bg-gray-200 flex items-center justify-center shadow-lg" style={{ borderRadius: '50%' }}>
                <Image
                  src={info.foto}
                  alt={info.nome}
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
        {(!info) && (
          <div className="text-center text-gray-400 mt-10 animate-pulse">{t[lang].loading}</div>
        )}
      </section>

      {/* Seção Saiba mais sobre mim */}
      <section className="w-full border-b border-gray-200 py-20" style={{ background: COLOR_SECTION_BLUE }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-2">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl font-extrabold mb-2" style={{ color: COLOR_BG }}>
              {lang === 'pt' ? 'Saiba mais sobre mim' : 'Learn more about me'}
            </h2>
            <p className="text-lg mb-4" style={{ color: COLOR_BG }}>
              {lang === 'pt' ? 'Formações acadêmicas e experiências profissionais detalhadas' : 'Academic background and detailed professional experiences'}
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <Button
              href="/sobre"
              className="px-8 py-3 bg-[#ffc300] text-[#001d3d] rounded-full text-lg font-semibold shadow hover:bg-[#ffe066] transition flex items-center gap-2 w-full md:w-auto justify-center md:justify-end"
            >
              {lang === 'pt' ? 'Ir para página sobre mim' : 'Go to about me page'}
            </Button>
          </div>
        </div>
      </section>

      {/* Habilidades Section - tópicos estilizado sem cards */}
      <section ref={habilidadesRef} className="w-full border-b border-gray-200 py-20" style={{ background: COLOR_BG }}>
        <div className="max-w-5xl mx-auto px-2">
          <Title size="text-3xl" className="mb-12 text-left">{lang === 'pt' ? 'Habilidades' : 'Skills'}</Title>
          <div className="flex flex-col gap-12">
            {habilidadesTopicos.length > 0 ? habilidadesTopicos.map((topico, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="block w-2 h-8 rounded" style={{ background: COLOR_SKILL_BAR }} />
                  <h4 className="text-lg font-bold" style={{ color: COLOR_HEADER, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{topico.titulo}</h4>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {topico.skills.map((skill, index) => (
                    <button
                      key={index}
                      className="px-5 py-2 rounded-full text-base font-mono shadow hover:shadow-md focus:outline-none transition cursor-pointer"
                      style={{ background: COLOR_SKILL_TAG_BG, color: COLOR_SKILL_TAG_TEXT, border: `1px solid ${COLOR_SKILL_TAG_BORDER}` }}
                      onClick={() => openSkillModal(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )) : (
              <div className="flex flex-wrap gap-4">
                {hardSkills.map((skill, index) => (
                  <button
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-mono shadow-sm border border-yellow-200 focus:outline-none hover:bg-yellow-200 transition cursor-pointer"
                    onClick={() => openSkillModal(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projetos Section - todos juntos */}
      <section ref={projetosRef} className="w-full py-20" style={{ background: COLOR_BG }}>
        <div className="max-w-5xl mx-auto px-2">
          <Title size="text-3xl" color={COLOR_HEADER} className="mb-8 text-left">{lang === 'pt' ? 'Projetos' : 'Projects'}</Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {allProjects.map((proj, index) => (
              <button
                key={index}
                onClick={() => router.push(`/projetos/${encodeURIComponent(proj.titulo.toLowerCase().replace(/\s+/g, '-'))}`)}
                className="block w-full text-left bg-white border border-gray-200 rounded-xl p-0 shadow-sm transition-all group focus:outline-none cursor-pointer hover:bg-[#F9FAFB] h-[480px] flex flex-col"
                style={{ minHeight: 480 }}
              >
                {proj.imagem && (
                  <div className="w-full h-56 rounded-t-xl overflow-hidden flex items-center justify-center bg-gray-100" style={{ height: '150px' }}>
                    <Image src={proj.imagem} alt={proj.titulo} className="object-cover w-full h-full" width={200} height={224} style={{ height: '224px', width: '100%' }} />
                  </div>
                )}
                <div className="flex flex-col gap-1 mb-2 px-8 pt-6 flex-1">
                  <span className="text-xs text-gray-400">{proj.data}</span>
                  <h4 className="text-lg font-semibold mb-1 group-hover:no-underline" style={{ color: COLOR_HEADER }}>{proj.titulo}</h4>
                  <p className="text-gray-700 mb-2">{proj.descricao.length > 100 ? proj.descricao.slice(0, 100) + '...' : proj.descricao}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto px-8 pb-6">
                  {proj.tecnologias.map((tec, index) => (
                    <span key={index} style={{ background: COLOR_SKILL_TAG_BG }} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-mono">{tec}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quem já contou com meu trabalho - carrossel de imagens */}
      <section className="w-full py-20 overflow-x-hidden" style={{ background: COLOR_BG }}>
        <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: COLOR_HEADER }}>{lang === 'pt' ? 'Quem já contou com meu trabalho' : 'Who has trusted my work'}</h3>
        <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={3.5}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
              { breakpoint: 768, settings: { slidesToShow: 1.5 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ]}
            arrows={false}
            className="carousel-clients half-slide-carousel"
          >
            {clientImages.map((img, idx) => (
              <div key={idx} className="flex items-center justify-center w-full h-56 md:h-60 lg:h-64 px-6">
                <Image
                  src={img}
                  className="w-full h-full object-contain"
                  alt={`Cliente ${idx + 1}`}
                  width={220}
                  height={120}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <style jsx global>{`
          .half-slide-carousel .slick-list {
            overflow: visible !important;
            padding-right: 0 !important;
            max-width: 100vw;
          }
          .half-slide-carousel .slick-slide {
            transition: transform 0.3s;
          }
        `}</style>
      </section>

      {/* Contato Section - texto grande + redes sociais */}
      <section className="w-full py-20" style={{ background: COLOR_HEADER }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-2">
          <div className="flex-1">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight text-center md:text-left" style={{ color: "#fff" }}>
              {lang === 'pt' ? 'Mantenha contato' : 'Keep in touch'}
            </h2>
          </div>
          <div className="flex-1 flex flex-col gap-6 items-center md:items-start">
            {info && (
              <>
                <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:underline text-xl cursor-pointer"><FaLinkedin /> LinkedIn</a>
                <a href={`mailto:${info.email}`} className="flex items-center gap-3 text-white hover:underline text-xl cursor-pointer"><FaEnvelope /> {info.email}</a>
                <span className="flex items-center gap-3 text-white text-xl cursor-pointer"><FaPhone /> {info.telefone}</span>
                <a href={info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:underline text-xl cursor-pointer"><FaGithub /> GitHub</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modais */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
              exit={{ scale: 0.8, opacity: 0, y: 40, transition: { duration: 0.2 } }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setSelectedProject(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{selectedProject.titulo}</h2>
              <p className="text-gray-700 mb-4">{selectedProject.descricao}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-900">{lang === 'pt' ? 'Tecnologias utilizadas:' : 'Technologies used:'}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tecnologias.map((tec, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-mono">{tec}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                {(() => {
                  const link = getProjectLink(selectedProject);
                  return (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">
                      {lang === 'pt' ? 'Ver no' : 'View on'} {link.label} {link.icon}
                    </a>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {skillModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSkillModal(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
              exit={{ scale: 0.8, opacity: 0, y: 40, transition: { duration: 0.2 } }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer" onClick={() => setSkillModal(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{skillModal}</h2>
              <h4 className="font-semibold mb-2 text-gray-900">{lang === 'pt' ? 'Projetos que usam esta habilidade:' : 'Projects using this skill:'}</h4>
              <ul className="flex flex-col gap-2">
                {skillProjects.length === 0 && (
                  <li className="text-gray-500 text-sm">{lang === 'pt' ? 'Nenhum projeto encontrado.' : 'No projects found.'}</li>
                )}
                {skillProjects.map((proj, index) => (
                  <li key={index}>
                    <button
                      className="w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-blue-50 transition font-medium text-blue-900"
                      onClick={() => openProjectFromSkill(proj)}
                    >
                      {proj.titulo}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer info={info} year={year} />
    </div>
  );
}
