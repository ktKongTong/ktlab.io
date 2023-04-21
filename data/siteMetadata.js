
const headerNavLinks = [
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    // { href: '/lab', title: 'Lab' },
    // { href: '/about', title: 'About' },
]

export const siteMetadata = {
    title: "ktlab",
    author: 'kt',
    headerTitle: 'ktlab',
    headerImg: '/avatar-no-bg.png',
    description: '👋 halo, traveler',
    maxRencentPosts: 2,
    language: 'zh-cn',
    theme: 'system',
    siteUrl: 'https://ktlab.io',
    socialIcons:[
        {
            id: 'mdi-email',
            dark:'mdi-email',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            source: 'solid',
            href: 'mailto:kt@ktlab.io',
        },
        {
            id: 'mdi-github',
            dark:'mdi-github',
            source: 'brands',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            href: 'https://github.com/ktKongTong',
        }
    ],
    headerNavLinks,
    icons:[
        "i-mdi-email",
        "i-mdi-github",
        "i-carbon-sun",
        "i-carbon-moon",
    ]
}