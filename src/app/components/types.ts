export interface PersonalInfo {
  nome: string;
  profissao: string;
  job: string;
  descricao: string;
  description: string;
  email: string;
  telefone: string;
  localizacao: string;
  linkedin: string;
  github: string;
  foto: string;
}

export interface Projeto {
  titulo: string;
  descricao: string;
  link: string;
  tecnologias: string[];
  data: string;
  imagem?: string;
}

export interface Projects {
  pessoais: Projeto[];
  profissionais: Projeto[];
} 