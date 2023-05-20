
const headerNavLinks = [
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    { href: '/projects', title: 'Lab' },
    // { href: '/about', title: 'About' },
]

const projects = [
    {
        title: '睡前消息文稿合集',
        description: '睡前消息文稿合集 build with vuepress',
        github: 'https://github.com/ktkongtong/btnews',
        link: 'https://btnews.ktlab.io',
        preview: '/projects/project_btnews.png',
        // darkPreview: '/projects/project_btnews_dark.png',
    },
    {
        title: 'Bigo',
        description: 'A bilibili media downloader writen in go',
        github: 'https://github.com/ktkongtong/bigo',
        link: 'https://github.com/ktkongtong/bigo',
    }
]

export const siteMetadata = {
    waliineServeUrl: 'https://waline-blog-iota-lake.vercel.app',
    presetEmoji:['https://unpkg.com/@waline/emojis@1.1.0/alus',
    'https://unpkg.com/@waline/emojis@1.1.0/bilibili',
    'https://unpkg.com/@waline/emojis@1.1.0/weibo',
    'https://unpkg.com/@waline/emojis@1.1.0/tieba',
    'https://unpkg.com/@waline/emojis@1.1.0/bmoji',
],
    title: "ktlab",
    author: 'kongtong',
    headerTitle: 'ktlab',
    headerImg: '/avatar-no-bg.png',
    description: '👋 halo, traveler',
    maxRencentPosts: 2,
    language: 'zh-cn',
    theme: 'system',
    siteUrl: 'https://ktlab.io',
    socialIcons:[
        {
            id: 'i-mdi-email',
            dark:'i-mdi-email',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            source: 'solid',
            href: 'mailto:kt@ktlab.io',
        },
        {
            id: 'i-mdi-github',
            dark:'i-mdi-github',
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
    ],
    projects
}