import { NextResponse } from 'next/server';

export async function GET() {
  // Informações pessoais básicas
  return NextResponse.json({
    nome: 'Breno Peretta',
    profissao: 'Engenheiro Front-end 🚀',
    descricao: `
      Engenheiro de Front-End com foco em React e Next.js, especialista em construir interfaces modernas e performáticas.
    `,
    email: 'peretta.breno@gmail.com',
    telefone: '+55 (12) 991819589',
    localizacao: 'Caçapava - SP, Brasil',
    linkedin: 'https://linkedin.com/in/brenoperetta',
    github: 'https://github.com/BrenoP',
    foto: '/profile.jpg', // Coloque uma foto em public/profile.jpg se desejar
  });
} 