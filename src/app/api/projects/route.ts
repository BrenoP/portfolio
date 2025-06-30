import { NextResponse } from 'next/server';

export async function GET() {
  // Exemplo de projetos pessoais e profissionais
  return NextResponse.json({
    pessoais: [
      {
        titulo: 'Jogo adivinhe as cores em Next',
        descricao: `
          O projeto é um jogo de cores, onde o jogador deve escolher rapidamente a cor que está escrita no card grande, isso antes que o tempo acabe.
          Fiz o projeto com o intuito de estudar um pouco mais do ambiente NextJs, e nesse projeto quis ver principalmente como o Next trabalha com uma API já integrada com o Front. O jogo é simples, mas deu pra ver muitos conceitos do Next com ele.
        `,
        link: 'https://github.com/BrenoP/Color-game',
        tecnologias: [
          'React', 
          'Next.js',
          'Typescript',
          'CSS',
          'Node.js',
          'Vercel'
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
          'React',
          'Typescript',
          'CSS',
          'Node.js',
          'Vercel',
          'Context API',
          'Webpack', 
        ],
        data: '2024',
        imagem: '/projects/termo.gif',
      },
    ],
    profissionais: [
      {
        titulo: 'Ultragaz revendas',
        descricao: `
          Uma aplicação web focada no mobile para conexão dos revendedores com a empresa Ultragaz, nele existiam diversas funcionalidades para ajudar o revendedor além de um sistema de pontos integrado na aplicação, além disso existiam integrações com Api's em micro serviço, autenticação de usuários, cookies de segurança, interações e edição de pdf entre outros. 
          A Aplicação era hospedada na cloud da AWS e eram utilizadas pipelines automatizadas.
        `,
        link: 'https://www.ultragaz.com.br/',
        tecnologias: [
          "SASS", 
          "JavaScript", 
          "Context API", 
          "Git", 
          "Redux", 
          "Bootstrap", 
          "AWS CodePipeline", 
          "React Testing Library", 
          "CSS", 
          "React Hooks", 
          "React.js", 
          "Webpack", 
          "AWS Code Commit", 
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
          "Redux", 
          "React Testing Library", 
          "CSS", 
          "Micro front-end", 
          "Kanban", 
          "React Hooks", 
          "React.js", 
          "Webpack", 
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
        link: 'https://www.portoseguro.com.br/seguro-viagem',
        tecnologias: [
          "SASS", 
          "JavaScript", 
          "Adobe Experience Cloud (AEC)", 
          "Context API", 
          "Adobe Experience Manager (AEM)", 
          "React Testing Library", 
          "Metodologias Agile", 
          "CSS", 
          "Automação de testes", 
          "Kanban", 
          "React Hooks", 
          "React.js", 
          "Integração e entrega contínuas (CI/CD)", 
          "Styled-components"
        ],
        data: '2023',
        imagem: '/projects/porto.gif',
      },
      {
        titulo: 'Meetime FLOW',
        descricao: `
          Meetime flow é uma plataforma de sales engagement que ajuda os SDR's em sua rotina de prospecção.

          - Criação de novas páginas e componentes para integração do 
          Meetime FLOW, como modal de atividades, serviços de feature flag
          entre outros.
          - Criação de testes unitários de componentes com o Jasmine. 
          - Manutenção do sistema do Flow como um todo, testando o sistema, 
          refatorando componentes e resolvendo bugs.
        `,
        link: 'https://meetime.com.br/dashboard',
        tecnologias: [
          "SASS", 
          "JavaScript", 
          "CircleCI", 
          "Git", 
          "GitHub", 
          "Docker", 
          "Automação de testes", 
          "AngularJS", 
          "Integração e entrega contínuas (CI/CD)", 
          "ESLint", 
          "Jasmine Framework"
        ],
        data: '2024',
        imagem: '/projects/Meetime.gif',
      },
      {
        titulo: 'IA manager Vivo Aura',
        descricao: `
          Vivo Aura a inteligência artificial da vivo, dentro da plataforma principal da IA. 

          - Atuação com React e suas principais tecnologias 
          (Typescript, Context, Zustand, Hooks entre outras)
          - Criação de novas funcionalidades para a IA, com conexões com 
          api's da Meta. 
          - Atuação no projeto com Micro frontends e Feature flags.
          - Formulários com Zod e React Hook Form.
          - CI/CD com Azure Devops na manutenção e criação de Pipelines
          automatizadas e Builds para a entrega das Features.
        `,
        link: 'https://vivo.com.br/para-voce/ajuda/mais-ajuda/aura',
        tecnologias: [
          "JavaScript", 
          "Azure devops", 
          "React query", 
          "Micro front-end", 
          "React Hooks", 
          "React.js", 
          "Zustand", 
          "Zod"
        ],
        data: '2025',
        imagem: '/projects/vivo.jpg',
      },
    ],
    habilidades: [
      { titulo: 'Front-end', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Angular JS', 'Micro front-end', 'Atomic design', 'Styled-components', 'Tailwind', 'SCSS', 'CSS', 'JQuery'] },
      { titulo: 'Back-end', skills: ['Node.js', 'Zod'] },
      { titulo: 'State Management', skills: ['Zustand', 'Context API', 'Redux', 'Redux saga'] },
      { titulo: 'Testing', skills: ['React Testing Library', 'Jasmine Framework'] },
      { titulo: 'DevOps', skills: ['Docker', 'Azure devops', 'Circle CI', 'Github actions', 'Gitlab', 'AWS Code Commit', 'Jenkins'] },
      { titulo: 'Ferramentas', skills: ['Webpack', 'ESLint', 'Git'] },
      { titulo: 'Metodologias', skills: ['Scrum', 'Kanban'] },
      { titulo: 'Adobe', skills: ['Adobe Experience Manager (AEM)', 'Adobe Experience Cloud (AEC)'] },
    ],
    sobre: [
      'Oi, sou Breno. Sou desenvolvedor front-end, tenho experiência na atuação de grandes projetos, com maior foco no desenvolvimento voltado para WEB.',
      'Sou formado em analise e desenvolvimento de sistemas na ETEP. Comecei atuando como desenvolvedor em 2018.',
      'Dentre as tecnologias que utilizo para desenvolver tenho mais domínio em: ReactJS e o NextJS, Typescript para tipagem e maior controle do código, Styled componentes para estilização, React testing library para testes, Context API no gerenciamento de estados e NodeJS para criação de api\'s. Já trabalhei com diversas outras tecnologias e sempre busco me adaptar no desenvolvimento.',
      'Sempre busco aprender coisas novas e atualizar a forma como desenvolvo, para estar sempre por dentro das melhores práticas e métodos de desenvolvimento. Também busco trabalhar junto da equipe para superar os desafios.'
    ]
  });
} 