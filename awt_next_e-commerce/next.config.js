/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/categories/:path*', // Your API route
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:5000',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
  ...nextConfig, // Include other configurations if needed

  images: {
    domains: ['localhost', 'i.ibb.co'], // Add the domain/hostnames of your images
  },
};
