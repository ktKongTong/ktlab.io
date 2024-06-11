import { withContentlayer } from 'next-contentlayer'
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react']
};



export default withContentlayer(nextConfig)