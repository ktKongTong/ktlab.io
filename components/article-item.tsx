import { HTMLProps } from "react";
import {cn, formatTime} from "@/lib/utils";
import {Calendar, Hourglass, MousePointerClickIcon, TagIcon} from "lucide-react";
import Link from "@/components/link";
import Tag from "@/components/tags";

export interface ArticleItemProps {
  title: string
  link: string
  description: string
  tags: string[]
  image?: string
  createdAt?: string
  lastModifiedAt?: string
  wordCount: number,
  like: number,
  dislike: number,
  click: number,
}

export default function ArticleItem(
{
  title, description, tags,link,wordCount,
  image, createdAt, lastModifiedAt, like, dislike,click,
  ...rest
}: ArticleItemProps & HTMLProps<HTMLDivElement>
) {
  return (
    <div {...rest} className={cn(' flex w-full justify-between relative m-2 article-item transition-all peer cursor-default duration-500 hover:scale-105', rest.className)}>
      <div className={'flex flex-col'}>
        <div
          className={'text-xl inline-flex w-fit relative font-medium cursor-pointer'}>
          <Link href={link}
          className={'animate-underline'}
          >{title}</Link>
        </div>
        <div className={'py-2 flex items-center space-x-4  font-medium text-sm'}>
          {
            createdAt && <div className={'flex items-center justify-between space-x-1'}>
              <Calendar className={'h-4 w-4'}/>
              <span>{formatTime(createdAt)}</span>
              </div>
          }
          {
            tags.length > 0 &&
            <div className={'flex items-center justify-between space-x-1'}>
              <TagIcon className={'h-4 w-4'}/>
              <div className={'space-x-1'}>
                {tags.map((tag, idx) => <Tag key={idx} href={`/blog/categories/${tag}`} className={'px-0'}>{tag}</Tag>)}
              </div>
            </div>
          }
        </div>
        <div className={'text-xs text-opacity-70'}>{description}</div>
        <div className={'flex items-center space-x-4 pt-2'}>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <MousePointerClickIcon className={'h-3 w-3'}/>
            <span>{click}</span>
          </div>
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <Hourglass className={'h-3 w-3'}/>
            <span>{wordCount} 字</span>
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