"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Projeto {
  titulo: string;
  descricao: string;
  link: string;
  tecnologias: string[];
  imagem: string;
}

interface Projects {
  pessoais: Projeto[];
  profissionais: Projeto[];
}

export default function ProjetoPage() {
  const params = useParams();
  // Next.js recomenda: const { slug } = React.use(params)
  // Mas como useParams já retorna o objeto, usamos assim:
  // Se for Promise, use React.use(params) no futuro
  // @ts-ignore
  const slug = params.slug as string;

  const [projects, setProjects] = useState<Projects | null>(null);
  const [project, setProject] = useState<Projeto | null>(null);
  const [skillModal, setSkillModal] = useState<string | null>(null);
  const [skillProjects, setSkillProjects] = useState<Projeto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        
        const allProjects = [...data.pessoais, ...data.profissionais];
        const foundProject = allProjects.find(
          (p) => p.titulo.toLowerCase().replace(/\s+/g, "-") === slug
        );
        
        if (!foundProject) {
          router.push("/");
          return;
        }
        
        setProject(foundProject);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        router.push("/");
      }
    };

    fetchProjects();
  }, [slug, router]);

  const openSkillModal = (skill: string) => {
    if (!projects) return;
    const allProjects = [...projects.pessoais, ...projects.profissionais];
    const filtered = allProjects.filter((proj) => proj.tecnologias.includes(skill));
    setSkillProjects(filtered);
    setSkillModal(skill);
  };

  const openProjectFromSkill = (proj: Projeto) => {
    setSkillModal(null);
    setTimeout(() => {
      router.push(`/projetos/${encodeURIComponent(
        proj.titulo.toLowerCase().replace(/\s+/g, "-")
      )}`);
    }, 300);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-400 animate-pulse">Carregando projeto...</div>
      </div>
    );
  }

  // Cores principais (iguais ao page.tsx)
  const COLOR_BG = '#FFF7F3';
  const COLOR_HEADER = '#001d3d';
  const COLOR_SKILL_TAG_BG = 'rgba(255, 214, 10, .5)';
  const COLOR_SKILL_TAG_BORDER = 'rgba(255, 214, 10, .5)';
  const COLOR_SKILL_TAG_TEXT = '#001d3d';
  const COLOR_SKILL_BAR = '#ffc300';
  const COLOR_SECTION_BLUE = '#003566';

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4" style={{ background: COLOR_BG }}>
      <div className="w-full max-w-6xl mx-auto">
        <button
          className="flex items-center gap-2 mb-6 text-lg font-medium"
          style={{ color: COLOR_HEADER, cursor: 'pointer' }}
          onClick={() => router.push("/")}
        >
          <FaArrowLeft /> Voltar
        </button>
        <h1 className="text-5xl font-extrabold mb-12 text-center" style={{ color: COLOR_HEADER }}>{project.titulo}</h1>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {project.tecnologias.map((tec: string) => (
            <button
              key={tec}
              className="px-4 py-2 rounded-full text-sm font-mono shadow-sm focus:outline-none transition cursor-pointer"
              style={{ background: COLOR_SKILL_TAG_BG, color: COLOR_SKILL_TAG_TEXT, border: `1px solid ${COLOR_SKILL_TAG_BORDER}` }}
              onClick={() => openSkillModal(tec)}
            >
              {tec}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-lg text-gray-700 mb-4">{project.descricao}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition mt-4"
              style={{ background: COLOR_HEADER, color: '#fff' }}
            >
              {project.link.includes("github.com") ? (
                <><FaGithub /> GitHub</>
              ) : project.link.includes("linkedin.com") ? (
                <><FaLinkedin /> LinkedIn</>
              ) : (
                <>Ver Projeto</>
              )}
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src={project.imagem} alt="Imagem do projeto" width={600} height={360} className="rounded-2xl shadow-lg" style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '420px' }} />
          </div>
        </div>
      </div>
      {/* Modal de habilidade */}
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
              <h4 className="font-semibold mb-2 text-gray-900">Projetos que usam esta habilidade:</h4>
              <ul className="flex flex-col gap-2">
                {skillProjects.length === 0 && (
                  <li className="text-gray-500 text-sm">Nenhum projeto encontrado.</li>
                )}
                {skillProjects.map((proj) => (
                  <li key={proj.titulo}>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-blue-50 transition font-medium text-blue-900 cursor-pointer"
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
    </div>
  );
} 