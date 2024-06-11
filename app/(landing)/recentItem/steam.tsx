import Link from "@/components/link";

export interface GameProps {
  platform: 'steam',
  coverImage: string,
  name: string,
  length: string,
  author?: string,
  link?: string,
}

export default function GameItem(props: GameProps) {
  return (
    <div className={'flex items-center space-x-2 p-1'}>
      <img src={props.coverImage} className={'max-h-16 rounded-lg'}/>
      <div>
        <Link href={props.link ?? ""} target={'_blank'} className={'font-bold text-md'}><span>{props.name}</span></Link>
        <div className={'text-xs'}>最近两周：{props.length}</div>
      </div>

    </div>
  )
}

