import Image from "next/image";
import { FaGithub, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { projectsData } from '../../data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COLOR_BG, COLOR_HEADER, COLOR_SKILL_TAG_BG, COLOR_SKILL_TAG_BORDER, COLOR_SKILL_TAG_TEXT } from '../../colors';

// Função para gerar parâmetros estáticos
export async function generateStaticParams() {
  const allProjects = [...projectsData.pessoais, ...projectsData.profissionais];
  
  return allProjects.map((project) => ({
    slug: project.titulo.toLowerCase().replace(/\s+/g, '-'),
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjetoPage({ params }: PageProps) {
  const { slug } = await params;
  
  const allProjects = [...projectsData.pessoais, ...projectsData.profissionais];
  const project = allProjects.find(
    (p) => p.titulo.toLowerCase().replace(/\s+/g, "-") === slug
  );
  
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4" style={{ background: COLOR_BG }}>
      <div className="w-full max-w-6xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 mb-6 text-lg font-medium transition-colors"
          style={{ color: COLOR_HEADER }}
        >
          <FaArrowLeft /> Voltar
        </Link>
        
        <h1 className="text-5xl font-extrabold mb-12 text-center" style={{ color: COLOR_HEADER }}>{project.titulo}</h1>
        
                  <div className="flex flex-wrap gap-3 justify-center mb-12">
            {project.tecnologias.map((tec: string, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-mono shadow-sm"
                style={{ 
                  background: COLOR_SKILL_TAG_BG, 
                  color: COLOR_SKILL_TAG_TEXT, 
                  border: `1px solid ${COLOR_SKILL_TAG_BORDER}` 
                }}
              >
                {tec}
              </span>
            ))}
          </div>
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <p className="text-lg text-gray-700 mb-4 whitespace-pre-line">{project.descricao}</p>
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
            {project.imagem && (
              <Image 
                src={project.imagem} 
                alt="Imagem do projeto" 
                width={600} 
                height={360} 
                className="rounded-2xl shadow-lg" 
                style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '420px' }} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 