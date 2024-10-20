import Link from "@/components/link";
import Image from "next/image";

export interface GameProps {
  platform: 'steam',
  coverImage: string,
  name: string,
  length: number,
  author?: string,
  link?: string,
  // timestamp
  time: number
}

export default function GameItem(props: GameProps) {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex flex-row space-x-1 items-center'}>

        <span className={'text-xs'}>打开了</span>
        <Link href={props.link ?? ""} target={'_blank'} className={'text-xs animate-underline items-center flex'}><span>{props.name}</span></Link>
        <span className={'text-xs'}>, 最近两周</span>
        <span className={'text-xs'}>{(props.length / 60).toFixed(1) + 'h'}</span>
      </div>
      <Image src={props.coverImage} className={'rounded-lg'} alt={props.name} height={120} width={256} />

    </div>
  )
}

