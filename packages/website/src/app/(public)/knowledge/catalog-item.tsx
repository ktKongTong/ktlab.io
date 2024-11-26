import {useMatchPath} from "@/hooks/use-match-path";
import React, {useState} from "react";
import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {cva} from "class-variance-authority";
import {CatalogItem as CatalogItemProps} from "@/interfaces/catalog-item";

export type { CatalogItemProps }

const catalogVariants = cva(
  "block py-1 text-sm font-medium break-all hover:text-primary/80 w-full  overflow-ellipsis line-clamp-2",
  {
    variants: {
      variant: {
        sub_active: "text-primary",
        sub_inactive: "text-zinc-500",
        leaf_active: "text-primary",
        leaf_inactive: "text-zinc-500",
      },
    }
  }
)
export function CatalogItem({
                              href,
                              title,
                              children: childrenz
                            }:CatalogItemProps) {

  const match = useMatchPath(href ?? '')
  const [active, setActive] = useState<boolean>(false)
  const toggle = ()=>setActive(!active)

  return (
    <>
      { childrenz.length ? (
          <li className={'block text-md font-medium py-1'}>
            <div className={' flex justify-between items-center mt-0 cursor-pointer'}>
              {href ?
                <Link className={cn(catalogVariants({variant: match ? 'sub_active' :'sub_inactive'}))} href={href}>{title}</Link>
                :
                <span onClick={toggle} className={cn(catalogVariants({variant: match ? 'sub_active' :'sub_inactive'}))}>{title}</span>
              }
              <ChevronRight className={cn(`h-4 w-4`,  active ? 'rotate-90':'')}  onClick={toggle}/>
            </div>
            <motion.div>
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
                        className={` group pointer-events-auto flex flex-col  ml-2 border-l pl-2 overflow-x-visible`}>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    {childrenz.map((item, idx: number) => <CatalogItem {...item} key={idx}/>)}
                    </motion.ul>
                }
              </AnimatePresence>
            </motion.div>
          </li>
      ) : (
        <li>
          {href ?
            <Link className={cn(catalogVariants({variant: match ? 'leaf_active' :'leaf_inactive'}))} href={href}>{title}</Link> :
            <span className={cn(catalogVariants({variant: match ? 'leaf_active' :'leaf_inactive'}))}>{title}</span>
          }
        </li>
      )
      }
    </>
  )
}
