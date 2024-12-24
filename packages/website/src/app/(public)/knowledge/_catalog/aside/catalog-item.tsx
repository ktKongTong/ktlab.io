import {useMatchPath} from "@/hooks/use-match-path";
import React, {useState} from "react";
import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {cva} from "class-variance-authority";
import {CatalogItem as CatalogItemProps} from "@/interfaces/catalog-item";

export type { CatalogItemProps }

const catalogVariants = cva(
  "block py-1 text-sm font-medium break-all hover:text-primary/80 w-full  overflow-ellipsis line-clamp-2",
  {
    variants: {
      variant: {
        sub_active: "text-primary hover:bg-secondary px-2 rounded-md my-1",
        sub_inactive: "text-muted-foreground hover:bg-secondary px-2  rounded-md my-1",
        leaf_active: "text-primary bg-secondary px-2 rounded-md my-1",
        leaf_inactive: "text-muted-foreground px-2 rounded-md my-1 hover:bg-secondary",
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
  const toggle = (e: any)=> {
    e.preventDefault()
    setActive(!active)
  }

  return (
    <>
      { childrenz.length ? (
          <li className={'block text-md font-medium py-1'}>
            <div className={' flex justify-between items-center mt-0 cursor-pointer'}>
              {href ?
                <Link className={cn(catalogVariants({variant: match ? 'sub_active' :'sub_inactive'}), 'flex items-center justify-between')} href={href}>{title}
                  <ChevronRight className={cn(`h-4 w-4`,  active ? 'rotate-90':'')}  onClick={toggle}/>
                </Link>
                :
                <span onClick={toggle} className={cn(catalogVariants({variant: match ? 'sub_active' :'sub_inactive'}), 'flex items-center justify-between')}>{title}
                  <ChevronRight className={cn(`h-4 w-4`,  active ? 'rotate-90':'')}  onClick={toggle}/>
                </span>
              }

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
