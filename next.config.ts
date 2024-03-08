// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true
//   },
//   basePath: process.env.NODE_ENV === 'production' ? '/portfolio-pessoal' : '',
// };

// export default nextConfig;

import type { NextConfig } from "next";

const repo = 'portfolio-pessoal'; // nome exato do repositório no GitHub

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};

export default nextConfig;
