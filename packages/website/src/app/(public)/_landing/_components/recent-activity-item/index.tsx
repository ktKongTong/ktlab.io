import BlogActivity, {BlogActivityProps} from "./blog";
import GithubActivity, {GithubActivityProps} from "./github";
import MusicItem, { MusicProps} from "./music";
import GameItem, {GameProps} from "./steam";
import VideoItem , {VideoProps} from "./video";
import React from "react";


export type RecentItemProps = (MusicProps & {type:'music'}
  | VideoProps & { type: 'video' }
  | GithubActivityProps & { type: 'github'}
  | BlogActivityProps & { type: 'blog'}
  | GameProps & { type: 'game'})


 function RecentItem({
 type,
 ...rest
}:RecentItemProps) {
  switch (type) {
    case 'music':
      return <MusicItem {...rest as MusicProps} />
    case 'video':
      return <VideoItem {...rest as VideoProps} />
    case 'github':
      return <GithubActivity {...rest as GithubActivityProps} />
    case 'blog':
      return <BlogActivity {...rest as BlogActivityProps} />
    case 'game':
      return <GameItem {...rest as GameProps}/>
  }
}
export default React.memo(RecentItem)