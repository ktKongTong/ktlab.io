import Link from "@/components/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HTMLProps} from "react";

export type GithubActivityProps = {
  ghType: 'issue' | 'pr' | 'star' | 'push',
  relateRepo: string
  relateRepoLink: string
  actor: string
  actorLink: string
  avatar: string
  payload: any
  time: number
} & HTMLProps<HTMLDivElement>

export default function GithubActivity(props: GithubActivityProps) {
    // console.log("github",props)
  const renderActivityDescription = () => {
    const actorWithAvatar = (
      <div className="flex items-center space-x-1 text-xs  glow:invisible">
        <Avatar className="h-6 w-6">
          <AvatarImage src={props.avatar}/>
          <AvatarFallback>{props.actor.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <Link href={props.actorLink} withFavicon={false} className="animate-underline">{props.actor}</Link>
      </div>
    );

    const getDisplayRepoName = (relateRepo: string, actor: string) => {
      const [username, repoName] = relateRepo.split('/');
      return username === actor ? repoName : relateRepo;
    };

    switch (props.ghType) {
      case 'push':
        return (
          <div className="text-sm text-primary opacity-70 flex flex-col items-start glow:invisible">
            {actorWithAvatar}
            <div>向 <Link href={props.relateRepoLink} className="animate-underline">{getDisplayRepoName(props.relateRepo, props.actor)}</Link> 推送了 {props.payload.size} 个提交</div>
          </div>
        );
      case 'star':
        return (
          <div className="text-sm text-primary opacity-70 flex flex-col items-start  glow:invisible">
            {actorWithAvatar}
            <span>为 <Link href={props.relateRepoLink} className="animate-underline">{getDisplayRepoName(props.relateRepo, props.actor)}</Link> 点了星标</span>
          </div>
        );
      case 'pr':
        const action = props.payload.action === 'opened' ? '打开了' : '关闭了';
        return (
          <div className="text-sm text-primary opacity-70 flex flex-col items-start  glow:invisible">
            {actorWithAvatar}
            <span>在 <Link href={props.relateRepoLink} className="animate-underline">{getDisplayRepoName(props.relateRepo, props.actor)}</Link> 中{action}拉取请求 <Link href={props.payload.pull_request.html_url} className="animate-underline">{props.payload.pull_request.title}</Link></span>
          </div>
        );
      case 'issue':
        const issueAction = props.payload.action === 'opened' ? '创建了' : '关闭了';
        return (
          <div className="text-sm text-primary opacity-70 flex flex-col items-start  glow:invisible">
            {actorWithAvatar}
            <span>在 <Link href={props.relateRepoLink} className="animate-underline">{getDisplayRepoName(props.relateRepo, props.actor)}</Link> 中{issueAction}问题 <Link href={props.payload.issue.html_url} className="animate-underline">{props.payload.issue.title}</Link></span>
          </div>
        );
      default:
        return null;
    }
  };

  const activityDescription = renderActivityDescription();
  
  return activityDescription
  // console.log(props.time)

  // if (props.ghType === 'push') {
  //   return (
  //     <div className={'text-sm text-primary opacity-70'}>
  //       <div className={'flex items-center space-x-2 p-1'}>
  //         <Avatar className={'h-6 w-6 rounded-full'}>
  //           <AvatarImage src={props.avatar} />
  //         </Avatar>
  //         <Link href={props.actorLink}>{props.actor}</Link>
  //       </div>
  //       <div>
  //       为 <Link href={props.relateRepoLink}>{props.relateRepo}</Link> 推送了{props.payload.size}个 commit
  //       </div>
  //     </div>
  //   )
  // }

  // if (props.ghType === 'star') {
  //   return (
  //     <div>
  //       <Avatar className={'h-6 w-6 rounded-full'}>
  //         <AvatarImage src={props.avatar} />
  //       </Avatar>
  //       <Link href={props.actorLink}>{props.actor}</Link> star 了 <Link href={props.relateRepoLink}>{props.relateRepo}</Link>
  //     </div>
  //   )
  // }

  // if (props.ghType === 'pr') {
  //   return (
  //     <div className={'flex items-center max-w-40'}>
  //       <Avatar>
  //         <AvatarImage src={props.avatar} />
  //       </Avatar>
  //       <Link href={props.actorLink}>{props.actor}</Link> 为 <Link href={props.relateRepoLink}>{props.relateRepo}</Link> 打开/关闭了 <Link href={props.payload.pull_request.html_url}>{props.payload.pull_request.title}</Link>
  //     </div>
  //   )
  // }
  // return (
  //   <div>
  //     <Link href={props.actorLink}>{props.actor}</Link>
  //   </div>
  // )
}

