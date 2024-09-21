import Link from "@/components/link";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";

export interface GithubActivityProps {
  ghType: 'issue' | 'pr' | 'star' | 'push',
  relateRepo: string
  relateRepoLink: string
  actor: string
  actorLink: string
  avatar: string
  payload: any
  time: number
}

export default function GithubActivity(props: GithubActivityProps) {
  console.log(props.time)
  if (props.ghType === 'push') {
    return (
      <div className={'text-sm text-primary opacity-70'}>
        <div className={'flex items-center space-x-2 p-1'}>
          <Avatar className={'h-6 w-6 rounded-full'}>
            <AvatarImage src={props.avatar} />
          </Avatar>
          <Link href={props.actorLink}>{props.actor}</Link>
        </div>
        <div>
        为 <Link href={props.relateRepoLink}>{props.relateRepo}</Link> 推送了{props.payload.size}个 commit
        </div>

      </div>
    )
  }

  if (props.ghType === 'star') {
    return (
      <div>
        <Avatar>
          <AvatarImage src={props.avatar} />
        </Avatar>
        <Link href={props.actorLink}>{props.actor}</Link> star 了 <Link href={props.relateRepoLink}>{props.relateRepo}</Link>
      </div>
    )
  }

  if (props.ghType === 'pr') {
    return (
      <div className={'flex items-center max-w-40'}>
        <Avatar>
          <AvatarImage src={props.avatar} />
        </Avatar>
        <Link href={props.actorLink}>{props.actor}</Link> 为 <Link href={props.relateRepoLink}>{props.relateRepo}</Link> 打开/关闭了 <Link href={props.payload.pull_request.html_url}>{props.payload.pull_request.title}</Link>
      </div>
    )
  }
  return (
    <div>
      <Link href={props.actorLink}>{props.actor}</Link>
    </div>
  )
}

