"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PersonalInfo {
  nome: string;
  profissao: string;
  descricao: string;
  email: string;
  telefone: string;
  localizacao: string;
  linkedin: string;
  github: string;
  foto: string;
}

interface Projeto {
  titulo: string;
  descricao: string;
  link: string;
  tecnologias: string[];
  data: string; // Adicionado para armazenar a data
  imagem?: string; // Adicionado para armazenar a imagem
}

interface Projects {
  pessoais: Projeto[];
  profissionais: Projeto[];
}

export default function Home() {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [projects, setProjects] = useState<Projects | null>(null);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  // Adicione as soft skills e habilidades para exibir nas novas seções
  const softSkills = [
    lang === 'pt'
      ? [
          'Comunicação',
          'Trabalho em equipe',
          'Resolução de problemas',
          'Pensamento crítico',
          'Adaptabilidade',
          'Empatia',
        ]
      : [
          'Communication',
          'Teamwork',
          'Problem Solving',
          'Critical Thinking',
          'Adaptability',
          'Empathy',
        ],
  ][0];

  const hardSkills = [
    'React',
    'Next.js',
    'React hooks',
    'React query',
    'Zod',
    'Webpack',
    'React Testing Library',

    'Tailwind',
    'Styled-components',

    'Zustand',
    'Context API',
    'Redux',
    'Redux saga',

    'Angular',
    'Angular JS',

    'Micro front-end',
    'Atomic design',

    'Adobe Experience Manager (AEM)',
    'Adobe Experience Cloud (AEC)',
    
    'TypeScript',
    'JavaScript',
    'CSS',
    'SCSS',
    'JQuery',

    'Scrum',
    'Kanban',

    'Node.js',
    'ESLint',
    'Docker',

    'Git',
    'Azure devops',
    'Circle CI',
    'Github actions',
    'Gitlab',
    'AWS Code Commit',
    'Jenkins'
  ];

  const sobre = `
    Oi, sou Breno. Sou desenvolvedor front-end, tenho experiência na atuação de grandes projetos, com maior foco no desenvolvimento voltado para WEB. Sou formado em analise e desenvolvimento de sistemas na ETEP. Comecei atuando como desenvolvedor em 2018.

    Dentre as tecnologias que utilizo para desenvolver tenho mais domínio em: ReactJS e o NextJS, Typescript para tipagem e maior controle do código, Styled componentes para estilização, React testing library para testes, Context API no gerenciamento de estados e NodeJS para criação de api's. Já trabalhei com diversas outras tecnologias e sempre busco me adaptar no desenvolvimento.

    Sempre busco aprender coisas novas e atualizar a forma como desenvolvo, para estar sempre por dentro das melhores práticas e métodos de desenvolvimento. Também busco trabalhar junto da equipe para superar os desafios.
  `;
  const about = `
    Hi, I'm Breno. I'm a front-end developer, I have experience in bigger projects focusing on web development. I graduated in analysis and systems development at ETEP. I started working with development in 2018.
    Between the technologies I use for development, I have excellent skills in ReactJS and NextJS, Typescript for better code control, Styled components for styling, React testing library for code tests, Context API in state management, and NodeJS for API creation. I have already worked with other technologies and I'm always adapting my way of development.
    I always try to learn new things and update my developer skills, trying to be on top of the best patterns and development methods. I also try to work along with the team to overcome challenges.
  `;

  // Estados para modais
  const [selectedProject, setSelectedProject] = useState<Projeto | null>(null);
  const [skillModal, setSkillModal] = useState<string | null>(null);
  const [skillProjects, setSkillProjects] = useState<Projeto[]>([]);

  // Refs para scroll suave
  const heroRef = useRef<HTMLDivElement>(null!);
  const sobreRef = useRef<HTMLDivElement>(null!);
  const habilidadesRef = useRef<HTMLDivElement>(null!);
  const projetosRef = useRef<HTMLDivElement>(null!);

  const router = useRouter();

  // Textos traduzidos
  const t = {
    pt: {
      profession: info?.profissao || '',
      subtitle: info?.descricao || '',
      personalProjects: 'Projetos Pessoais',
      professionalProjects: 'Projetos Profissionais',
      navProjects: 'Projetos',
      navContact: 'Contato',
      loading: 'Carregando informações...'
    },
    en: {
      profession: info?.profissao || '',
      subtitle: info?.descricao || '',
      personalProjects: 'Personal Projects',
      professionalProjects: 'Professional Projects',
      navProjects: 'Projects',
      navContact: 'Contact',
      loading: 'Loading information...'
    }
  };

  // Novo: buscar habilidades e sobre da API
  const [habilidadesTopicos, setHabilidadesTopicos] = useState<{ titulo: string; skills: string[] }[]>([]);
  const [sobreParagrafos, setSobreParagrafos] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/personal-info")
      .then((res) => res.json())
      .then(setInfo);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        if (data.habilidades) setHabilidadesTopicos(data.habilidades);
        if (data.sobre) setSobreParagrafos(data.sobre);
      });
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

  // Imagens fictícias para o carrossel de clientes
  const clientImages = [
    '/public/zappts.png',
    '/public/ultragaz.png',
    '/public/cea.png',
    '/public/compass.png',
    '/public/porto.png',
    '/public/meetime.png',
    '/public/vivo.png',
  ];

  // Opções para o select de linguagem
  const langOptions = [
    { value: "pt", label: "PT" },
    { value: "en", label: "EN" },
  ];

  // Estilo customizado para o react-select
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: 9999,
      minWidth: 80,
      borderColor: "#d1d5db",
      boxShadow: "none",
      cursor: "pointer",
      padding: "2px 4px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#1C398E" : state.isFocused ? "#F9FAFB" : "#fff",
      color: state.isSelected ? "#fff" : "#1C398E",
      borderRadius: 8,
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: 12,
      overflow: "hidden",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#1C398E",
      fontWeight: 700,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#1C398E",
      padding: 4,
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  // Cores principais
  const COLOR_BG = '#FFF7F3';
  const COLOR_HEADER = '#332E2E';
  const COLOR_SKILL_TAG_BG = '#FFF9C4'; // amarelo claro
  const COLOR_SKILL_TAG_BORDER = '#FFECB3'; // amarelo mais escuro
  const COLOR_SKILL_TAG_TEXT = '#332E2E';
  const COLOR_SKILL_BAR = '#FFD600'; // barra lateral
  const COLOR_SECTION_BLUE = '#1C398E';

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: COLOR_BG }}>
      {/* Header sem linha divisória */}
      <header className="w-full bg-white py-12 px-4 flex items-center justify-center mb-4 mt-8" style={{ background: COLOR_BG }}>
        <div className="w-full max-w-5xl flex items-center justify-between gap-4">
          <span className="font-extrabold text-4xl tracking-tight" style={{ color: COLOR_HEADER }}>{info ? info.nome : ""}</span>
          <div className="flex items-center gap-4">
            <div style={{ minWidth: 80 }}>
              <Select
                options={langOptions}
                value={langOptions.find((o) => o.value === lang)}
                onChange={(opt: { value: string; label: string } | null) => setLang((opt?.value === 'pt' || opt?.value === 'en') ? opt.value : 'pt')}
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
      </header>

      {/* Hero Section - estilo inspirado na referência */}
      <section ref={heroRef} className="w-full flex flex-col items-center justify-center min-h-[60vh] mb-8" style={{ background: COLOR_BG, paddingTop: '5rem', paddingBottom: '5rem' }}>
        {info && (
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start gap-12 animate-fade-in">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-4" style={{ color: COLOR_HEADER, lineHeight: 1.1 }}>{info.profissao}</h1>
              <div className="text-xl text-gray-700 mb-4 max-w-2xl flex flex-col gap-2">
                {info.descricao}
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

      {/* Sobre mim + Soft Skills juntos */}
      <section className="w-full border-b border-gray-200 py-20" style={{ background: COLOR_SECTION_BLUE }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p className="whitespace-pre-line text-base text-lg text-gray-700 mb-6 text-center md:text-left" style={{ color: 'white' }}>
              {lang === 'pt'
                ? sobre
                : about}
            </p>
            <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
              {softSkills.map((skill) => (
                <li key={skill} className="bg-blue-50 text-blue-900 px-4 py-2 rounded-full text-sm font-medium border border-blue-100">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Texto grande + imagem ao lado */}
      {/* <section className="w-full border-b border-gray-200 py-20" style={{ background: "#1C398E" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight text-center md:text-left" style={{ color: "#fff" }}>
              {lang === 'pt' ? 'Transformando ideias em experiências digitais memoráveis.' : 'Turning ideas into memorable digital experiences.'}
            </h2>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/globe.svg" alt="Globo" width={220} height={220} className="rounded-2xl shadow-lg" />
          </div>
        </div>
      </section> */}

      {/* Habilidades Section - tópicos estilizado sem cards */}
      <section ref={habilidadesRef} className="w-full border-b border-gray-200 py-20" style={{ background: COLOR_BG }}>
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-left">{lang === 'pt' ? 'Habilidades' : 'Skills'}</h3>
          <div className="flex flex-col gap-12">
            {habilidadesTopicos.length > 0 ? habilidadesTopicos.map((topico, idx) => (
              <div key={topico.titulo} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="block w-2 h-8 rounded" style={{ background: COLOR_SKILL_BAR }} />
                  <h4 className="text-lg font-bold" style={{ color: COLOR_HEADER, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{topico.titulo}</h4>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {topico.skills.map((skill) => (
                    <button
                      key={skill}
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
                {hardSkills.map((skill) => (
                  <button
                    key={skill}
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
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-left" style={{ color: COLOR_HEADER }}>{lang === 'pt' ? 'Projetos' : 'Projects'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            {allProjects.map((proj) => (
              <button
                key={proj.titulo}
                onClick={() => router.push(`/projetos/${encodeURIComponent(proj.titulo.toLowerCase().replace(/\s+/g, '-'))}`)}
                className="block w-full text-left bg-white border border-gray-200 rounded-xl p-0 shadow-sm transition-all group focus:outline-none cursor-pointer hover:bg-[#F9FAFB]"
              >
                {proj.imagem && (
                  <div className="w-full h-40 rounded-t-xl overflow-hidden flex items-center justify-center bg-gray-100">
                    <img src={proj.imagem} alt={proj.titulo} className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="flex flex-col gap-1 mb-2 px-8 pt-6">
                  <span className="text-xs text-gray-400">{proj.data}</span>
                  <h4 className="text-lg font-semibold mb-1 group-hover:no-underline" style={{ color: COLOR_HEADER }}>{proj.titulo}</h4>
                </div>
                <p className="text-gray-700 mb-2 px-8">{proj.descricao.length > 100 ? proj.descricao.slice(0, 100) + '...' : proj.descricao}</p>
                <div className="flex flex-wrap gap-2 mt-2 px-8 pb-6">
                  {proj.tecnologias.map((tec) => (
                    <span key={tec} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-mono">{tec}</span>
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
        <div style={{ maxWidth: 900, width: '60vw', margin: '0 auto' }}>
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
                  src={img.replace('/public', '')}
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
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
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
                  {selectedProject.tecnologias.map((tec) => (
                    <span key={tec} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-mono">{tec}</span>
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
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={() => setSkillModal(null)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{skillModal}</h2>
              <h4 className="font-semibold mb-2 text-gray-900">{lang === 'pt' ? 'Projetos que usam esta habilidade:' : 'Projects using this skill:'}</h4>
              <ul className="flex flex-col gap-2">
                {skillProjects.length === 0 && (
                  <li className="text-gray-500 text-sm">{lang === 'pt' ? 'Nenhum projeto encontrado.' : 'No projects found.'}</li>
                )}
                {skillProjects.map((proj) => (
                  <li key={proj.titulo}>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-blue-50 transition font-medium text-blue-900"
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

      {/* Footer minimal */}
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
        © {new Date().getFullYear()} {info ? info.nome : ""}. Portfólio pessoal.
      </footer>
    </div>
  );
}
