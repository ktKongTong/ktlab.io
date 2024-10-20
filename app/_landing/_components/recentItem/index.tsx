import BlogActivity, {BlogActivityProps} from "@/app/_landing/_components/recentItem/blog";
import GithubActivity, {GithubActivityProps} from "@/app/_landing/_components/recentItem/github";
import {VideoProps} from "@/app/_landing/_components/recentItem/video";
import MusicItem, { MusicProps} from "@/app/_landing/_components/recentItem/music";
import {Video} from "lucide-react";
import GameItem, {GameProps} from "@/app/_landing/_components/recentItem/steam";
import React from "react";


export type RecentItemProps = MusicProps & {type:'music'}
  | VideoProps & { type: 'video' }
  | GithubActivityProps & { type: 'github'}
  | BlogActivityProps & { type: 'blog'}
  | GameProps & { type: 'game'}


 function RecentItem({
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
export default React.memo(RecentItem)