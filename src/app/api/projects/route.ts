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
        data: '2024',
        imagem: 'https://via.placeholder.com/150',
      },
      {
        titulo: 'Projeto Pessoal 2',
        descricao: 'Descrição do projeto pessoal 2.',
        link: 'https://github.com/seuusuario/projeto-pessoal-2',
        tecnologias: ['Next.js', 'Tailwind CSS'],
        data: '2024',
        imagem: 'https://via.placeholder.com/150',
      },
    ],
    profissionais: [
      {
        titulo: 'Ultragaz revendas',
        descricao: `
          Uma aplicação web focada no mobile para conexão dos revendedores com 
          a empresa Ultragaz, nele existiam diversas funcionalidades para ajudar
          o revendedor além de um sistema de pontos integrado na aplicação, 
          além disso existiam integrações com Api's em micro serviço, 
          autenticação de usuários, cookies de segurança, interações e edição
          de pdf entre outros. A Aplicação era hospedada na cloud da AWS e
          eram utilizadas pipelines automatizadas.
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
        imagem: 'https://via.placeholder.com/150',
      },
      {
        titulo: 'C&A',
        descricao: `
          Atuação no time da parte de produtos e de marketplace no site principal
          da C&A, atuando como desenvolvedor VTEX (plataforma para Ecommerce) e
          utilizando a própria plataforma para controle das páginas. 
          Era utilizado o padrão de micro front-ends para a organização das 
          diferentes partes do site e o mesmo era hospedado na Cloud da própria
          VTEX.
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
        imagem: 'https://via.placeholder.com/150',
      },
      {
        titulo: 'Porto viagens PWA',
        descricao: `
          Desenvolvedor no Produto de seguro viagem da Porto, uma aplicação web
          para a contratação do seguro viagem, era desenvolvido em React com 
          uso da plataforma AEM. Na aplicação fiquei encarregado da parte de 
          cloud utilizando o Adobe Cloud, mas também desenvolvi componentes, 
          funções com o Formik (biblioteca para formulários complexos) e 
          também diversos tipos de teste automatizados como teste de integração,
          teste de renderização e teste de snapshot.
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
        imagem: 'https://via.placeholder.com/150',
      },
      {
        titulo: 'Meetime FLOW',
        descricao: `
          Meetime flow é uma plataforma de sales engagement que ajuda os SDR's
          em sua rotina de prospecção.

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
        imagem: 'https://via.placeholder.com/150',
      },
      {
        titulo: 'IA manager Vivo Aura',
        descricao: `
          Vivo Aura a inteligência artificial da vivo, dentro da plataforma 
          principal da IA. 

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
          "Azure DevOps Server", 
          "React query", 
          "Micro front-end", 
          "React Hooks", 
          "React.js", 
          "Zustand", 
          "Zod"
        ],
        data: '2025',
        imagem: 'https://via.placeholder.com/150',
      },
    ],
  });
} 