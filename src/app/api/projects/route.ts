import { NextResponse } from 'next/server';

export async function GET() {
  // Exemplo de projetos pessoais e profissionais
  return NextResponse.json({
    pessoais: [
      {
        titulo: 'Projeto Pessoal 1',
        descricao: 'Descrição do projeto pessoal 1.',
        link: 'https://github.com/seuusuario/projeto-pessoal-1',
        tecnologias: ['React', 'Node.js'],
      },
      {
        titulo: 'Projeto Pessoal 2',
        descricao: 'Descrição do projeto pessoal 2.',
        link: 'https://github.com/seuusuario/projeto-pessoal-2',
        tecnologias: ['Next.js', 'Tailwind CSS'],
      },
    ],
    profissionais: [
      {
        titulo: 'Projeto Profissional 1',
        descricao: 'Descrição do projeto profissional 1.',
        link: 'https://empresa.com/projeto-profissional-1',
        tecnologias: ['TypeScript', 'AWS'],
      },
      {
        titulo: 'Projeto Profissional 2',
        descricao: 'Descrição do projeto profissional 2.',
        link: 'https://empresa.com/projeto-profissional-2',
        tecnologias: ['React', 'GraphQL'],
      },
    ],
  });
} 