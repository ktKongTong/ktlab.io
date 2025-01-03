
const nextConfig = {
    transpilePackages: ['lucide-react','@repo/shared'],
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
                hostname: '*.ktlab.io',
                protocol: 'https',
            },
            {
                hostname: 'p1-jj.byteimg.com',
                protocol: 'https',
            },
            {
                hostname: 'www.snowpack.dev',
                protocol: 'https',
            }
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