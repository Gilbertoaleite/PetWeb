/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Configuração movida para .env.local para facilitar desenvolvimento
    // BASE_API: 'https://adote-pet-web.herokuapp.com/api/',
  },
}

module.exports = nextConfig
