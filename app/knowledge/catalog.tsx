'use client';
import React, {HTMLProps, useEffect, useState} from "react";
import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import useToc from "@/hooks/use-toc";
import { AnimatePresence, motion } from "framer-motion";
import { useMatchPath } from "@/hooks/use-match-path";

interface CatalogItemProps{
  id: string,
  href?: string,
  title: string,
  createdAt: string,
  lastModifiedAt: string,
  children: CatalogItemProps[]
}

export function CatalogItem({
  href,
  title,
  children
}:CatalogItemProps) {

  const match = useMatchPath(href ?? '')
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
    { children.length ? (
        <>
          <li className={'block text-md font-medium py-1'}>
            <div className={' flex justify-between items-center mt-0 overflow-ellipsis '}>
              {href ? <Link
                className={cn(`                
                  text-md font-medium
                  hover:text-primary/80 break-all w-full
                  transition-all  overflow-ellipsis line-clamp-2`,
                  match ? 'text-primary':'text-muted-foreground'
                )}
                href={href}
                >{title}</Link> :
                <span onClick={()=>setActive(!active)} className={'cursor-pointer w-full'}>{title}</span>
              }
              <ChevronRight className={`h-4 cursor-pointer w-4 transition-all ${active ? 'rotate-90':''}`}  onClick={()=>setActive(!active)}/>
            </div>
            {/*${active ? 'opacity-1' : 'opacity-0 max-h-0 '}*/}
            <motion.div className={`transition-all`}>
              <AnimatePresence>
                {
                  active && <motion.ul
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
                        className={` group pointer-events-auto flex flex-col  ml-4 border-l pl-2 overflow-x-visible`}>
                    {children.map((item, idx: number) => <CatalogItem {...item} key={idx}/>)}
                    </motion.ul>
                }
              </AnimatePresence>
            </motion.div>
          </li>
        </>
    ) : (
      <li
        className={`
          block py-1
          text-md font-medium
          transition-colors duration-300 break-all
          hover:text-primary/80 
          ${match ? 'text-primary' : 'text-muted-foreground'}
        `}
      >
        <span className={'pt-1'}>{href ? <Link className={" overflow-ellipsis line-clamp-2"} href={href}>{title}</Link> :
          <span className={'cursor-default overflow-ellipsis line-clamp-2'}>{title}</span>}</span>
      </li>
    )
    }
    </>
  )
}

export default function Catalog({
  catalogs,
  ...rest
}: {
  catalogs:CatalogItemProps[]
} & HTMLProps<HTMLDivElement>) {

  const {updateCatalogs} = useToc()
  useEffect(() => {
    updateCatalogs(catalogs)
    return ()=> {
      updateCatalogs(undefined)
    }
  }, [catalogs, updateCatalogs]);

  return (
    <div {...rest} className={cn('relative', rest.className)}>
      <div className={'text-lg font-bold py-2'}>Catalog</div>
      <ul>
        {
          catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}