
const headerNavLinks = [
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    { href: '/lab', title: 'Lab' },
    { href: '/about', title: 'About' },
]

export const siteMetadata = {
    title: "ktlab",
    author: 'kt',
    headerTitle: 'ktlab',
    description: 'halo,traveler',
    language: 'zh-cn',
    theme: 'system',
    siteUrl: 'https://ktlab.io',
    socialIcons:[
        {
            id: 'material-symbols-alternate-email',
            dark:'material-symbols-alternate-email',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            source: 'solid',
            href: 'mailto:kt@ktlab.io',
        },
        {
            id: 'carbon-moon',
            dark:'mdi-github',
            source: 'brands',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            href: 'https://github.com/ktKongTong',
        }
    ],
    headerNavLinks,
}