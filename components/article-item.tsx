'use client'
import {HTMLProps, useEffect, useRef} from "react";
import {cn} from "@/lib/utils";
import {Hourglass, MessageCircle, MousePointerClickIcon, ThumbsDown, ThumbsUp} from "lucide-react";
import Link from "@/components/link";

export interface ArticleItemProps {
  title: string
  link: string
  description: string
  tags: string[]
  image?: string
  date?: Date
  hit: number
  like: number,
  dislike: number,
  comments: number,
}

export default function ArticleItem(
{
  title, description, tags,link,
  image, date, like, dislike, comments,hit,
  ...rest
}: ArticleItemProps & HTMLProps<HTMLDivElement>
) {
  const ref= useRef<HTMLDivElement>(null);
  useEffect(()=> {
    const cur = ref.current;
    if(!cur) {
      return
    }
    const handlerHover = () => {
      let prev = cur.previousElementSibling;
      while (prev) {
        prev.classList.add('previous-peer');
        prev = prev.previousElementSibling;
      }
    }
    cur.addEventListener('mouseover', handlerHover);
    const handlerHoverOut = ()=> {
      let prev = cur.previousElementSibling;
      while (prev) {
        prev.classList.remove('previous-peer');
        prev = prev.previousElementSibling;
      }
    }
    cur.addEventListener('mouseout', handlerHoverOut);
    return ()=> {
      cur.removeEventListener('mousemove', handlerHover);
      cur.removeEventListener('mouseout', handlerHoverOut);
    };
  }, [ref])
  return (
    <div {...rest} ref={ref} className={cn(' flex w-full justify-between relative m-2 article-item transition-all peer-hover:blur-sm peer cursor-default duration-500 hover:scale-105', rest.className)}>
      <div className={'flex flex-col'}>
        <div
          className={'text-xl inline-flex w-fit relative font-medium cursor-pointer'}>
          <Link href={link}
          className={'transition-all duration-500 underline underline-offset-4 hover:underline-offset-8 decoration-secondary-foreground/10 hover:decoration-accent-foreground/100'}
          >{title}</Link>
        </div>
        <div className={'py-2 flex items-center'}>
          <div>
            {date?.toDateString()}
          </div>
          {tags.map((tag, idx) => <span key={idx} className={'px-2'}>{tag}</span>)}
        </div>
        <div className={'text-xs text-opacity-70'}>{description}</div>
        <div className={'flex items-center space-x-4 pt-2 hidden'}>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <ThumbsUp className={'h-3 w-3'}/>
            <span>{like}</span>
          </div>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <ThumbsDown className={'h-3 w-3'}/>
            <span>{dislike}</span>
          </div>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <MousePointerClickIcon className={'h-3 w-3'}/>
            <span>{hit}</span>
          </div>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <MessageCircle className={'h-3 w-3'}/>
            <span>{comments}</span>
          </div>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <Hourglass className={'h-3 w-3'}/>
            <span>{1}min</span>
          </div>
        </div>
      </div>
      {
        image &&
          <img className={'hidden ml-2 sm:block shadow-sm max-h-30 max-w-40 object-cover right-0 top-1/2  rounded-lg'}
               src={image}/>
      }
    </div>
  )
}