import {Calendar, Clock, EyeIcon, Hourglass, PencilLine, TagIcon, TriangleAlert} from "lucide-react";
import {dayDiff, formatTime, relativeTime} from "@/lib/utils";
import Tag from "@/components/tags";
import {View} from "@/app/_post-layout/view";

interface Tag {
  name: string,
  href: string,
}
interface HeaderProps {
  title: string;
  createdAt?: string;
  lastModifiedAt?: string;
  timeliness?: boolean,
  wordcount: number;
  excerpt?: string;
  tags: Tag[];
}


export default function Header({
title,
wordcount,
createdAt,
lastModifiedAt,
timeliness = false,
excerpt,
tags
}:HeaderProps) {
  const showLastModifiedAt = true
  //
  const diffDay = -dayDiff(lastModifiedAt!)
  const warningText = (timeliness && (-diffDay) > 45) ?
    <span className={'inline-flex gap-1 items-center'}>
      <TriangleAlert className={'w-3 h-3'}/><span>本文最后修改于{diffDay}天前，请注意时效性</span>
    </span> :
    <span className={'inline-flex gap-1 items-center'}>
      <Clock className={'w-3 h-3'}/><span>最后修改于{relativeTime(lastModifiedAt!)}</span>
    </span>

  return (
    <>
    <div>
      <h1 className={'text-4xl font-bold'}>{title}</h1>
      <div className={'flex pt-4  text-sm font-medium justify-between md:flex-row flex-col'}>
        <div className={'py-2 flex items-center gap-2  font-medium text-sm flex-wrap'}>
          {
            createdAt && <div className={'flex items-center justify-between space-x-1'}><Calendar className={'h-3 w-3'}/><span>{formatTime(createdAt)}</span></div>
          }
          <div className={'flex space-x-1 items-center'}>
            <PencilLine className={'h-3 w-3'}/>
            <span>{wordcount} 字</span>
          </div>
          <div className={'flex space-x-1 items-center'}>
            <EyeIcon className={'h-3 w-3'}/>
            <View />
          </div>
          {
            tags.length > 0 &&
              <div className={'flex items-center justify-between space-x-1'}>
                  <TagIcon className={'h-3 w-3'}/>
                  <div className={'space-x-1'}>
                    {tags.map((tag, idx) => <Tag key={idx} href={tag.href} className={'px-0'}>{tag.name}</Tag>)}
                  </div>
              </div>
          }
        </div>
        <div className={'relative flex items-center'}>
          { showLastModifiedAt && <>{warningText}</> }
        </div>
      </div>
    </div>
    </>
  )
}