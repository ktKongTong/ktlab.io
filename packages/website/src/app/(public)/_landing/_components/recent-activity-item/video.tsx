import {HTMLProps} from "react";


export type VideoProps = {
  platform: 'bilibili' | 'qq' | 'other',
  coverImage: string,
  name: string,
  link?: string,
} & HTMLProps<HTMLDivElement>
export default function VideoItem(props: VideoProps) {
  return (
    <div>

    </div>
  )
}
