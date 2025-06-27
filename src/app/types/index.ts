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

export interface TranslationKeys {
  profession: (info: PersonalInfo | null) => string;
  subtitle: (info: PersonalInfo | null) => string;
  personalProjects: string;
  professionalProjects: string;
  navProjects: string;
  navContact: string;
  loading: string;
}

export interface Translations {
  pt: TranslationKeys;
  en: TranslationKeys;
} 