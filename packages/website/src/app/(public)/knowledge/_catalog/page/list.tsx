'use client'
import React, {useState} from "react";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "motion/react";
import {CatalogItem, CatalogItemProps} from "./item";

export const CatalogList = (
  {
    title,createdAt,href, children
  }:CatalogItemProps
) => {
  const [open,setOpen] = useState(true)

  if(!(children && children.length > 0)) {
    return <CatalogItem title={title} createdAt={createdAt} href={href} children={[]}/>
  }
  return <div className={'select-none'}>
    <div className={'inline-flex items-center'}>
      <button className={'ring-0'} onClick={() => {
        setOpen(s => !s)
      }}>
        <ChevronDown className={cn('w-6 h-6 p-1 rounded-lg hover:bg-secondary  transition ', open ? '' : '-rotate-90')}/>
      </button>
      <span className={'whitespace-nowrap text-xs text-secondary-foreground'}>{title}</span>
    </div>
    <AnimatePresence>
      {
        open && <motion.ul
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className={` group pointer-events-auto flex flex-col  ml-2 pl-3 overflow-x-visible`}>
          {
            children.map((it) => {
              return <CatalogList title={it.title} createdAt={it?.createdAt} href={it.href} key={it.title} children={it.children}/>
            })
          }
          </motion.ul>
      }
    </AnimatePresence>
  </div>
}
