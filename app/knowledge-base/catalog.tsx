'use client';
import React, {HTMLProps, useEffect, useMemo, useState} from "react";
import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import {usePathname} from "next/navigation";
import useTOC from "@/hooks/useTOC";

interface CatalogItemProps{
  href?: string,
  title: string,
  level: number,
  catalogs: CatalogItemProps[]
}

export function CatalogItem({
  href,
  title,
  level,
  catalogs
}:CatalogItemProps) {

  const pathname = usePathname()
  const current = useMemo(()=> pathname === href, [pathname, href])
  const [active, setActive] = useState<boolean>(false)

  return (
    <>
    { catalogs.length ? (
        <>
          <li
            className={`
              block
              text-md font-medium
            `}
          >
            <div className={' flex justify-between items-center  mt-0'} onClick={()=>setActive(!active)}>
              {href ? <Link
                className={`                
                  text-md font-medium
                  hover:text-primary/80
                  transition-colors duration-300 
                  ${current ? 'text-primary':'text-muted-foreground'}
                `}
                href={href}>{title}</Link> : title }
              <ChevronRight className={`h-4 w-4 duration-500 transition-all  ${active ? 'rotate-90':''}`}/>
            </div>

            <div className={`  ease-in-out transition-all duration-700 overflow-hidden ${active ? 'max-h-svh opacity-1' : 'opacity-0 max-h-0 '}`}>
              <ul
                className={` group pointer-events-auto flex flex-col  overflow-hidden  ml-4 border-l pl-2 mt-4 space-y-4`}>
                {catalogs.map((item, idx: number) => <CatalogItem {...item} key={idx}/>)}
              </ul>
            </div>
          </li>
        </>
    ) : (
      <li
        className={`
          block
          text-md font-medium
          transition-colors duration-300
          hover:text-primary/80
          ${current ? 'text-primary':'text-muted-foreground'}
        `}
      >
        <span className={'pt-1'}>{href ? <Link href={href}>{title}</Link> : title}</span>
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
      <ul className={' transition duration-300 space-y-4'}>
        {
          catalogs.map((catalog ,idx)=> (<CatalogItem key={idx} {...catalog} />))
        }
      </ul>
    </div>
  )
}