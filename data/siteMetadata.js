
const headerNavLinks = [
    { href: '/blog', title: 'Blog' },
    { href: '/tags', title: 'Tags' },
    { href: '/papers', title: 'Papers' },
    { href: '/about', title: 'About' },
    { href: '/sponsor', title: 'Sponsor' },
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
            id: 'envelope',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            source: 'solid',
            href: 'mailto:kt@ktlab.io',
        },
        {
            id: 'github',
            source: 'brands',
            primarycolor: '#24292e',
            hoverActionType: 'bounce',
            href: 'https://github.com/ktKongTong',
        }
    ],
    headerNavLinks,
}