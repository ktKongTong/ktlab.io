import { Activity} from "@/interfaces";

const musicActivity:Activity = {
  type:'music' as const,
  platform: 'netease' as const,
  author: 'Coldplay',
  name: 'A Head Full of Dream',
  coverImage: 'http://p1.music.126.net/BtsEBmnJ05DLBxMdWdhNpA==/109951163780293240.jpg?param=130y130',
  link: 'https://music.163.com/#/song?id=37240628',
}

const steamActivity:Activity = {
  type:'game' as const,
  platform: 'steam' as const,
  name: 'It takes two',
  coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1426210/header_schinese.jpg?t=1717004494',
  link: 'https://store.steampowered.com/app/1426210/_/',
  recentDuration: 1,

}

const githubActivity:Activity = {
  type:'github' as const,
  ghType: 'issue',
  relateRepoLink: 'https://github.com/ktKongTong/ktlab.io',
  author: 'ktKongTong',
  authorLink: 'https://github.com/microsoft/music.163.com',
  authorAvatar: ''
}

const blogActivity:Activity = {
  type:'blog' as const,
  // eventType: 'like',
  // likeCnt:3,
  articleId: '323',
  articleName: '关于 GPG PGP',
  timestamp: Date.now(),
}

const activities = [musicActivity, steamActivity,githubActivity]
const blogActivities = [blogActivity]
const ac:Activity[] = [
  // ...blogActivities,
 ...activities
]

export default ac