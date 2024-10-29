import { HTMLProps } from "react";
import {cn, formatTime} from "@/lib/utils";
import {Calendar, MousePointerClickIcon, PencilLine, TagIcon} from "lucide-react";
import Link from "@/components/link";
import Tag from "@/components/tags";
import Image from "next/image";
import {SSRArticle} from "@/interfaces/article";

export type ArticleItemProps = SSRArticle

export default function ArticleItem(
{
  title,
  excerpt,
  tags,
  slug,
  wordcount,
  image,
  createdAt,
  lastModifiedAt,
  ...rest
}: ArticleItemProps & HTMLProps<HTMLDivElement>
) {
  return (
    <div {...rest} className={cn(' flex w-full justify-between relative m-2 cursor-default', rest.className)}>
      <div className={'flex flex-col'}>
        <div className={'text-xl inline-flex w-fit relative font-medium cursor-pointer'}>
          <Link href={slug} className={'animate-underline'}>{title}</Link>
        </div>
        <div className={'py-2 flex items-center space-x-4  font-medium text-sm'}>
          {
            createdAt && <div className={'flex items-center justify-between space-x-1'}>
                  <Calendar className={'h-3 w-3'}/>
                  <span>{formatTime(createdAt)}</span>
              </div>
          }
          <div className={'flex items-center text-sm font-medium space-x-1'}>
            <PencilLine className={'h-3 w-3'}/>
            <span>{wordcount} 字</span>
          </div>
          {
            tags.length > 0 &&
              <div className={'flex items-center justify-between space-x-1'}>
                  <TagIcon className={'h-3 w-3'}/>
                  <div className={'space-x-1'}>
                    {tags.map((tag, idx) => <Tag key={idx} href={`/blog/categories/${tag}`}
                                                 className={'px-0'}>{tag}</Tag>)}
                  </div>
              </div>
          }
        </div>
        <div className={'text-xs text-opacity-70'}>{excerpt}</div>
        {/*<div className={'flex items-center space-x-4 pt-2'}>*/}
          {/*<div className={'flex items-center text-sm font-medium space-x-1'}>*/}
          {/*  <MousePointerClickIcon className={'h-3 w-3'}/>*/}
          {/*  <span> 0 </span>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
      {
        image && <Image alt={''} className={'hidden ml-2 sm:block shadow-sm max-h-30 max-w-40 object-cover right-0 top-1/2  rounded-lg'} src={image} width={'800'} height={'400'} />
      }
    </div>
  )
}