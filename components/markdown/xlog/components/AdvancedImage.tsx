import Image, {ImageProps} from "next/image";

import {ExcalidrawSource} from "@/components/markdown/xlog/components/Excalidraw";
export type TImageProps = {
  className?: string
  src?: string
  width?: number | string
  height?: number | string
  "original-src"?: string
  imageRef?: React.MutableRefObject<HTMLImageElement>
  zoom?: boolean
  blurDataURL?: string
  placeholder?: "blur"
} & React.HTMLAttributes<HTMLImageElement> &
  ImageProps


const isExcalidrawLink = (src:string) => {
  return src.endsWith('.excalidraw.md')
}

export default function AdvancedImage(props: TImageProps) {
  if(isExcalidrawLink(props.src)) {
    return <ExcalidrawSource {...props} className={"rounded-lg"} />
  }
  return <Image src={props.src} className={'relative rounded-lg border mx-auto'} loading="lazy" alt={props.alt} />
}



