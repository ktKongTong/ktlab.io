import Link from "@/components/link";
import Image from "next/image";
import {HTMLProps} from "react";
import {cn} from "@/lib/utils";

export type GameProps = {
  platform: 'steam',
  coverImage: string,
  name: string,
  length: number,
  author?: string,
  link?: string,
  // timestamp
  time: number
} & HTMLProps<HTMLDivElement>

export default function GameItem(props: GameProps) {
  return (
    <div className={cn('flex flex-col gap-2', props.className)}>
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

