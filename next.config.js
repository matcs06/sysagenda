/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


}


module.exports = {
  images: {
    domains: ['localhost', "oimparcial.com.br", "clickeagenda.arangal.com"],

  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']

}