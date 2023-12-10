/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  ...nextConfig, // Include other configurations if needed

  images: {
    domains: ['localhost', 'i.ibb.co'], // Add the domain/hostnames of your images
  },
};
