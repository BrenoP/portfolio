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

export interface HabilidadeTopico {
  titulo: string;
  skills: string[];
}

export const habilidadesData: HabilidadeTopico[] = [
  { titulo: 'Front-end', skills: ['React.js', 'Next.js', 'Typescript', 'JavaScript', 'Angular', 'Angular JS', 'Micro front-end', 'Atomic design', 'Styled-components', 'Tailwind', 'SCSS', 'CSS', 'JQuery'] },
  { titulo: 'Back-end', skills: ['Node.js', 'Zod'] },
  { titulo: 'State Management', skills: ['Zustand', 'Context API', 'Redux', 'Redux saga'] },
  { titulo: 'Testing', skills: ['React Testing Library', 'Jasmine Framework'] },
  { titulo: 'DevOps', skills: ['Docker', 'Azure devops', 'Circle CI', 'Github actions', 'Gitlab', 'AWS Code Commit', 'Jenkins'] },
  { titulo: 'Ferramentas', skills: ['Webpack', 'ESLint', 'Git', 'Vercel'] },
  { titulo: 'Metodologias', skills: ['Scrum', 'Kanban'] },
  { titulo: 'Adobe', skills: ['Adobe Experience Manager (AEM)', 'Adobe Experience Cloud (AEC)'] },
];

export const projectsData: Projects = {
  pessoais: [
    {
      titulo: 'Jogo adivinhe as cores em Next',
      descricao: `
        O projeto é um jogo de cores, onde o jogador deve escolher rapidamente a cor que está escrita no card grande, isso antes que o tempo acabe.
        Fiz o projeto com o intuito de estudar um pouco mais do ambiente NextJs, e nesse projeto quis ver principalmente como o Next trabalha com uma API já integrada com o Front. O jogo é simples, mas deu pra ver muitos conceitos do Next com ele.
      `,
      link: 'https://github.com/BrenoP/Color-game',
      tecnologias: [
        "React.js", 
        "Next.js",
        "Typescript",
        "CSS",
        "Node.js",
        "Vercel",
        "Styled-components",
        "Github actions"
      ],
      data: '2022',
      imagem: '/projects/color-game.gif',
    },
    {
      titulo: 'Termo',
      descricao: `
        Esse projeto pessoal é a recriação do conhecido jogo termo (caso queira checar o original o link é esse: https://term.ooo/). 
        Neste jogo, o objetivo é acertar uma palavra composta por 5 letras, onde a cada tentativa o jogo automáticamente mostra as letras que estão  corretas e na posição certa (indicado pela cor verde), as letras que  estão corretas mas na posição errada (indicada pela cor amarela) e as letras que não estão corretas (indicadas pela cor neutra cinza).
        O intuito do projeto era estudar a nova versão do Next de uma forma prática, aplicando os conceitos que aprendi em um projeto que fosse o mais interativo possível, no caso, um jogo. 
      `,
      link: 'https://github.com/BrenoP/Termo-recriation',
      tecnologias: [
        "React.js",
        "Next.js",
        "Typescript",
        "CSS",
        "Node.js",
        "Vercel",
        "Context API",
        "Webpack", 
        "Tailwind"
      ],
      data: '2024',
      imagem: '/projects/termo.gif',
    },
  ],
  profissionais: [
    {
      titulo: 'Ultragaz revendas',
      descricao: `
        Desenvolvedor Front end do Ultragaz revenda, uma aplicação web focada no mobile para conexão dos revendedores com a empresa Ultragaz, nele existiam diversas funcionalidades para ajudar o revendedor além de um sistema de pontos integrado na aplicação, além disso existiam integrações com Api´s em micro serviço, autenticação de usuários, cookies de segurança, interações e edição de pdf entre outros. 
        A Aplicação era hospedada na cloud da AWS e eram utilizadas pipelines automatizadas.
      `,
      link: 'https://www.ultragaz.com.br/',
      tecnologias: [
        "React.js",
        "SASS", 
        "JavaScript", 
        "Context API", 
        "Git", 
        "Redux", 
        "Redux saga",
        "Bootstrap", 
        "AWS CodePipeline", 
        "React Testing Library", 
        "CSS", 
        "SCSS",
        "React Hooks", 
        "Webpack", 
        "AWS Code Commit", 
        "Scrum",
        "Atomic design",
        "Styled-components"
      ],
      data: '2021',
      imagem: '/projects/ultragaz.jpg',
    },
    {
      titulo: 'Site principal CEA',
      descricao: `
        Atuação no time da parte de produtos e de marketplace no site principal da C&A, atuando como desenvolvedor VTEX (plataforma para Ecommerce) e utilizando a própria plataforma para controle das páginas. 
        Era utilizado o padrão de micro front-ends para a organização das diferentes partes do site e o mesmo era hospedado na Cloud da própria VTEX.
      `,
      link: 'https://www.cea.com.br/',
      tecnologias: [
        "SASS", 
        "JavaScript", 
        "Git", 
        "Gitlab",
        "Redux", 
        "React Testing Library", 
        "CSS", 
        "Micro front-end", 
        "Kanban", 
        "React Hooks", 
        "React.js", 
        "Webpack", 
        "Styled-components"
      ],
      data: '2022',
      imagem: '/projects/cea.png',
    },
    {
      titulo: 'Porto viagens PWA',
      descricao: `
        Desenvolvedor no Produto de seguro viagem da Porto, uma aplicação web para a contratação do seguro viagem, era desenvolvido em React com uso da plataforma AEM. 
        Na aplicação fiquei encarregado da parte de cloud utilizando o Adobe Cloud, mas também desenvolvi componentes, funções com o Formik (biblioteca para formulários complexos) e também diversos tipos de teste automatizados como teste de integração, teste de renderização e teste de snapshot.
      `,
      link: 'https://www.portoseguro.com.br/',
      tecnologias: [
        "SASS", 
        "JavaScript", 
        "Git", 
        "Redux", 
        "React Testing Library", 
        "CSS", 
        "Micro front-end", 
        "Kanban", 
        "React Hooks", 
        "React.js", 
        "Webpack", 
        "Adobe Experience Manager (AEM)",
        "Adobe Experience Cloud (AEC)",
        "Formik",
        "Jest",
        "Scrum"
      ],
      data: '2023',
      imagem: '/projects/porto.gif',
    },
    {
      titulo: 'Compass UOL',
      descricao: `
        Atuação em projetos internos como site da Compass migrado para AEM. Utilizando o React e também bibliotecas para o gerenciamento de estado como Context.
        - Atuação no time do site principal da Porto, desenvolvendo componentes editáveis em ReactJs, implementando tagueamento com google analitcs e também integrações com as Api's Porto.
      `,
      link: 'https://www.compass.uol/',
      tecnologias: [
        "SASS", 
        "JavaScript", 
        "Typescript",
        "Git", 
        "Redux", 
        "React Testing Library", 
        "CSS", 
        "SCSS",
        "Micro front-end", 
        "Kanban", 
        "React Hooks", 
        "React.js", 
        "Webpack", 
        "Adobe Experience Manager (AEM)",
        "Adobe Experience Cloud (AEC)",
        "Formik",
        "Jest",
      ],
      data: '2023',
      imagem: '/compass.png',
    },
    {
      titulo: 'Meetime',
      descricao: `
        Desenvolvedor Front-end no produto principal da Meetime, sendo o Meetime flow, que é uma plataforma de sales engagement que ajuda os SDR's em sua rotina de prospecção.

      - Criação de novas páginas e componentes para integração do Meetime FLOW, como modal de atividades, serviços de feature flag entre outros.
      - Criação de testes unitários de componentes com o Jasmine. 
      - Manutenção do sistema do Flow como um todo, testando o sistema, refatorando componentes e resolvendo bugs.
      `,
      link: 'https://www.meetime.com.br/',
      tecnologias: [
        "Angular",
        "Angular JS",
        "JQuery",
        "CSS",
        "SASS", 
        "JavaScript", 
        "Git", 
        "Gitlab",
        "CSS", 
        "Kanban", 
        "Jenkins",
        "Circle CI",
        "Jasmine Framework",
        "ESLint",
        "Docker"
      ],
      data: '2024',
      imagem: '/projects/Meetime.gif',
    },
    {
      titulo: 'Vivo',
      descricao: `
       Desenvolvedor de Front end Pleno atuando no projeto da Vivo Aura, inteligência artificial da vivo, dentro da plataforma principal da IA. 

      - Atuação com React e suas principais tecnologias (Typescript, Context, Zustand, Hooks entre outras)
      - Criação de novas funcionalidades para a IA, com conexões com api's da Meta. 
      - Atuação no projeto com Micro frontends e Feature flags.
      - Formulários com Zod e React Hook Form.
      - CI/CD com Azure Devops na manutenção e criação de Pipelines automatizadas e Builds para a entrega das Features.
      `,
      link: 'https://www.vivo.com.br/',
      tecnologias: [
        "CSS",
        "SASS", 
        "JavaScript", 
        "Typescript",
        "Git", 
        "Redux", 
        "CSS", 
        "Micro front-end", 
        "Kanban", 
        "React Hooks", 
        "React.js", 
        "Webpack", 
        "Formik",
        "Jest",
        "Zod",
        "Zustand",
        "Styled-components",
        "Azure devops",
        "Scrum"
      ],
      data: '2025',
      imagem: '/projects/aura.jpg',
    },
  ],
}; 