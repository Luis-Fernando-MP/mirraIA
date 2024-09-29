/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loader: 'cloudinary',
    domains: ['img.clerk.com', 'res.cloudinary.com', 'i.redd.it']
  },
  webpack: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
}

export default nextConfig
