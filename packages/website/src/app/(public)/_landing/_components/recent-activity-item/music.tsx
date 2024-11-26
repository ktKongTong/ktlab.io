import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Spotify} from "react-spotify-embed";
import React, {HTMLProps} from "react";
import {cn} from "@/lib/utils";

export type MusicProps = {
  platform: 'netease' | 'qq' | 'spotify' | 'other',
  coverImage: string,
  name: string,
  author?: string,
  link?: string,
  time: number
} & HTMLProps<HTMLDivElement>

 function MusicItem(props: MusicProps) {
  if(props.platform === 'spotify') {
    return (
      <div className={cn('flex flex-col items-start space-x-2 p-1', props.className)}>
        <Spotify link={props.link!!} wide />
      </div>
    )
  }
  return (
    <div className={cn('flex items-center space-x-2 p-1', props.className)}>
      <Avatar className={'h-6 w-6 rounded-full'}>
        <AvatarImage src={props.coverImage}/>
        <AvatarFallback>x</AvatarFallback>
      </Avatar>
      <Link href={props.link??""} target={'_blank'} className={'font-bold text-xs'}><span>{props.name}</span></Link>
    </div>
  )
}

export default MusicItem
// React.memo();