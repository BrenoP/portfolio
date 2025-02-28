import { Translations } from '../types';

const t: Translations = {
  pt: {
    profession: (info) => info?.profissao || '',
    subtitle: (info) => info?.descricao || '',
    personalProjects: 'Projetos Pessoais',
    professionalProjects: 'Projetos Profissionais',
    navProjects: 'Projetos',
    navContact: 'Contato',
    loading: 'Carregando informações...'
  },
  en: {
    profession: (info) => info?.job || '',
    subtitle: (info) => info?.description || '',
    personalProjects: 'Personal Projects',
    professionalProjects: 'Professional Projects',
    navProjects: 'Projects',
    navContact: 'Contact',
    loading: 'Loading information...'
  }
};

export default t; 