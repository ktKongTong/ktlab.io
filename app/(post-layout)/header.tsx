import {Calendar, EyeIcon, Hourglass, TagIcon} from "lucide-react";
import {formatTime} from "@/lib/utils";
import Tag from "@/components/tags";
import {View} from "@/app/(post-layout)/view";

interface Tag {
  name: string,
  href: string,
}
interface HeaderProps {
  title: string;
  createdAt?: string;
  lastModifiedAt?: string;
  wordCount: number;
  description?: string;
  tags: Tag[];
}


export default function Header({
  title,
  wordCount,
  createdAt,
  description,
  tags
}:HeaderProps) {
  return (
    <>
    <div>
      <h1 className={'text-4xl font-bold'}>{title}</h1>
      <div className={'flex space-x-4 pt-4  text-sm font-medium'}>
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
                    {tags.map((tag, idx) => <Tag key={idx} href={tag.href} className={'px-0'}>{tag.name}</Tag>)}
                  </div>
              </div>
          }
          <div className={'flex space-x-1 items-center'}>
            <Hourglass className={'h-4 w-4'}/>
            <span>{wordCount} 字</span>
          </div>
          {/*use client, and combine with use metadata("post_id")*/}
          <div className={'flex space-x-1 items-center'}>
            <EyeIcon className={'h-4 w-4'}/>
            <span><View /></span>
          </div>
        </div>
        {
          description && <div
                className={'text-sm font-medium inline-flex justify-center items-center space-x-0.5'}>{description}</div>
        }
      </div>
    </div>
    </>
  )
}