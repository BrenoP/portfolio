const t = {
  pt: {
    profession: (info: any) => info?.profissao || '',
    subtitle: (info: any) => info?.descricao || '',
    personalProjects: 'Projetos Pessoais',
    professionalProjects: 'Projetos Profissionais',
    navProjects: 'Projetos',
    navContact: 'Contato',
    loading: 'Carregando informações...'
  },
  en: {
    profession: (info: any) => info?.profissao || '',
    subtitle: (info: any) => info?.descricao || '',
    personalProjects: 'Personal Projects',
    professionalProjects: 'Professional Projects',
    navProjects: 'Projects',
    navContact: 'Contact',
    loading: 'Loading information...'
  }
};

export default t; 