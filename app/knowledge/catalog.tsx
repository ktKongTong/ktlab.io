'use client';
import React, {HTMLProps, useEffect, useMemo, useState} from "react";
import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import {usePathname} from "next/navigation";
import useTOC from "@/hooks/useTOC";
import {AnimatePresence, motion} from "framer-motion";

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

  const pathname = usePathname()
  const current = useMemo(()=> pathname === href || pathname +"/index.md" === href || pathname +"/index" === href, [pathname, href])
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
    { children.length ? (
        <>
          <li
            className={`
              block
              text-md font-medium
            `}
          >
            <div className={' flex justify-between items-center mt-0'}>
              {href ? <Link
                className={`                
                  text-md font-medium
                  hover:text-primary/80
                  transition-all
                  ${current ? 'text-primary':'text-muted-foreground'}
                `}
                href={href}>{title}</Link> : <span className={'cursor-default'}>{title}</span> }
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
                        className={` group pointer-events-auto flex flex-col  overflow-hidden  ml-4 border-l pl-2 pt-4 space-y-4`}>
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
          block
          text-md font-medium
          transition-colors duration-300
          hover:text-primary/80
          ${current ? 'text-primary' : 'text-muted-foreground'}
        `}
      >
        <span className={'pt-1'}>{href ? <Link href={href}>{title}</Link> :
          <span className={'cursor-default'}>{title}</span>}</span>
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

  const {updateCatalogs} = useTOC()
  useEffect(() => {
    updateCatalogs(catalogs)
    return ()=> {
      updateCatalogs(undefined)
    }
  }, [catalogs, updateCatalogs]);

  return (
    <div {...rest}  className={cn('relative', rest.className)}>
      <ul className={'space-y-4'}>
        {
          catalogs.map((catalog ,idx)=> (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}