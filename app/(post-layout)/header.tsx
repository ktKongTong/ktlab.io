import Link from "next/link";
import {Calendar, EyeIcon, TagIcon, WatchIcon} from "lucide-react";

interface Tag {
  name: string,
  href: string,
}
interface HeaderProps {
  title: string;
  // timestamp
  date?: Date;
  wordcount: string;
  description?: string;
  tags: Tag[];
}


export default function Header({
  title,
  wordcount,
  date,
  description,
  tags
}:HeaderProps) {
  return (
    <>
    <div>
      <h1 className={'text-4xl font-bold'}>{title}</h1>
      <div className={'flex space-x-4 pt-4  text-sm font-medium'}>
        <div className={'text-sm font-medium inline-flex justify-center items-center h-10 space-x-0.5'}>
          <Calendar className={'h-4 w-4'}/>
          <span>{date?.toDateString()}
          </span>
        </div>
        <div className={'flex space-x-1 items-center'}>
          <TagIcon className={'h-4 w-4'}/>
          <div className={'flex space-x-2 items-center '}>
          {
            tags.map((tag,idx)=> (
              <div
                key={idx} className={
                'cursor-point underline px-1 transition-all duration-300 hover:transition-all hover:duration-300  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm t font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline hover:underline-offset-8 h-10 w-fit'}>
                <Link href={tag.href}>{tag.name}</Link>
              </div>
            ))
          }
          </div>
        </div>
        {/*<div className={'flex space-x-1 items-center'}>*/}
        {/*  <EyeIcon className={'h-4 w-4'}/>*/}
        {/*  <span>233</span>*/}
        {/*</div>*/}
      </div>
      {
        description && <div className={'text-sm font-medium inline-flex justify-center items-center space-x-0.5'}>{description}</div>
      }
    </div>
    </>
  )

}