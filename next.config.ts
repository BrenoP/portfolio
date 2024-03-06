// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true
//   },
//   basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
// };

// export default nextConfig;

const isGithubPages = process.env.NODE_ENV === 'production'

const repoName = 'portifolio-pessoal' // nome do repositório no GitHub

module.exports = {
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  trailingSlash: true, // importante para funcionar bem no GitHub Pages
}
