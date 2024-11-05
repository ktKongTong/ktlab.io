
const nextConfig = {
    transpilePackages: ['lucide-react'],
    images: {
        remotePatterns: [
            {
                hostname: 'favicon.yandex.net',
                protocol: 'https',
            },
            {
                hostname: 'cdn.akamai.steamstatic.com',
                protocol: 'https',
            },
            {
                hostname: 'cdn.nlark.com',
                protocol: 'https',
            },
            {
                hostname: 'obsidian.ktlab.io',
                protocol: 'https',
            },
        ],
    },
    // webpack: (config, { webpack }) => {
    //     config.plugins.push(new webpack.IgnorePlugin({
    //         resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    //     }))
    //
    //     return config
    // },
};



export default nextConfig
// withContentlayer()