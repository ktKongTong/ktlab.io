import BlogActivity, {BlogActivityProps} from "@/app/(landing)/recentItem/blog";
import GithubActivity, {GithubActivityProps} from "@/app/(landing)/recentItem/github";
import {VideoProps} from "@/app/(landing)/recentItem/video";
import {MusicItem, MusicProps} from "@/app/(landing)/recentItem/music";
import {Video} from "lucide-react";
import GameItem, {GameProps} from "@/app/(landing)/recentItem/steam";


export type RecentItemProps = MusicProps & {type:'music'}
  | VideoProps & { type: 'video' }
  | GithubActivityProps & { type: 'github'}
  | BlogActivityProps & { type: 'blog'}
  | GameProps & { type: 'game'}


export default function RecentItem({
 type,
 ...rest
}:RecentItemProps) {
  switch (type) {
    case 'music':
      return <MusicItem {...rest as MusicProps} />
    case 'video':
      return <Video {...rest as VideoProps} />
    case 'github':
      return <GithubActivity {...rest as GithubActivityProps} />
    case 'blog':
      return <BlogActivity {...rest as BlogActivityProps} />
    case 'game':
      return <GameItem {...rest as GameProps}/>
  }
}