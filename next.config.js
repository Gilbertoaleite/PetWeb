/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API: 'https://adote-um-pet-multistack.herokuapp.com/api',
  },
}

module.exports = nextConfig
