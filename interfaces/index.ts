export type Activity = VideoActivity | MusicActivity | GameActivity | GitHubActivity | BlogActivity

interface VideoActivity {
  type: 'video',
  platform: 'bilibili' | 'tencent' | 'iqiyi' | 'other'
  cover: string,
  name: string,
  link: string,
  imdbId?: string,
  doubanId?: string,
}

interface MusicActivity {
  type: 'music'
  platform: 'netease' | 'qq' | 'spotify' | 'other',
  coverImage: string,
  name: string,
  author: string,
  link?: string,
}

interface GameActivity {
  type: 'game'
  platform: 'steam' | 'other',
  coverImage: string,
  name: string,
  recentDuration?: number,
  link?: string,
}

interface GitHubActivity {
  type: 'github'
  ghType: 'issue' | 'pr' | 'star' | 'commit'
  relateRepoLink: string,
  author: string,
  authorLink: string,
  authorAvatar: string
}
interface BlogActivity {
  type:'blog',
  articleId: string,
  articleName: string,
  timestamp: number
}