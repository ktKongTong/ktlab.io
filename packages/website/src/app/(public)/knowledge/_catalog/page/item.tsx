import Link from "@/components/link";
import {formatTime} from "@/lib/utils";
import React from "react";

export interface CatalogItemProps {
  title: string,
  createdAt?: Date | string,
  href?: string
}
export const CatalogItem = (
  {
    title, createdAt, href
  }: CatalogItemProps
) => {
  return <Link href={href ?? ""}>
    <div className={'w-full hover:bg-secondary/80 inline-flex items-center text-xs p-2 m-1 rounded-lg'}>
      <span className={'whitespace-nowrap'}>{title}</span>
      <div style={{borderWidth: '1px', borderTop: '1px'}} className={'h-[0.5px] grow w-full mx-2 border border-dashed border-border'}></div>
      <span className={'whitespace-nowrap'}>{createdAt ? formatTime(createdAt) : ''}</span>
    </div>
  </Link>
}