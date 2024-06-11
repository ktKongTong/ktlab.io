import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";

export interface MusicProps {
  platform: 'netease' | 'qq' | 'spotify' | 'other',
  coverImage: string,
  name: string,
  author?: string,
  link?: string,
}

export function MusicItem(props: MusicProps) {
  return (
    <div className={'flex items-center space-x-2 p-1'}>
      <Avatar className={'h-6 w-6 rounded-full'}>
        <AvatarImage src={props.coverImage}/>
        <AvatarFallback>x</AvatarFallback>
      </Avatar>
      <Link href={props.link??""} target={'_blank'} className={'font-bold text-xs'}><span>{props.name}</span></Link>
    </div>
  )
}

