'use client'
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ThemeSwitch from "@/app/(header)/themeSwitch";
import NavItem, {NavItemProps} from "@/app/(header)/navItem";
import Toc from "@/app/(post-layout)/toc";
import useTOC from "@/hooks/useTOC";
import {CatalogItem} from "@/app/knowledge-base/catalog";
import {useMeasure} from "@uidotdev/usehooks";
import twConfig from '@/tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'
type BreakpointKey = keyof typeof breakpoints;
import {Menu} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {useMediaQuery} from "usehooks-ts";

const fullConfig = resolveConfig(twConfig)
const breakpoints = fullConfig.theme.screens;
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery( `only screen and (min-width: ${breakpoints[breakpointKey]})`,);
  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}

interface HeaderProps {
  img: string
  fallback: string,
  navItems: NavItemProps[]
}

export default function Header({
  img,
  fallback,
  navItems,
  ...rest
}: HeaderProps & React.HTMLProps<HTMLDivElement>) {
  //
  const {catalogs, toc} = useTOC()
  const [showToc, setShowToc] = useState<boolean>(false)
  const [showCatalog, setShowCatalog] = useState<boolean>(false)
  const popoverRef = useRef<HTMLDivElement>(null);
  const [ref, { width, height }] = useMeasure();
  const handleClickOutside = (event: any) => {
    if (
      popoverRef.current && !popoverRef.current.contains(event.target)
    ) {
      setShowToc(false)
      setShowCatalog(false)
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const {isLg} = useBreakpoint('lg')
  return (
    <header
      {...rest}
      className={cn('flex items-center justify-center min-h-16', rest.className)}>
      <motion.div
        className={" border-b lg:border absolute top-0 overflow-hidden my-3 rounded-[24px] grow lg:grow-0 transition-all duration-300 border"}>
        <div
          ref={ref} className={'flex items-center justify-center '}>
          {/*lg:rounded-full grow lg:grow-0 lg:m-3 lg:py-0 py-3 transition-all duration-300*/}
          <Avatar className={'w-10 h-10 rounded-full'} onClick={()=>!isLg && setShowCatalog(true)}>
            <AvatarImage src={img}/>
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <ul className={'flex items-center justify-center space-x-2 px-4'}>
            {
              navItems.map((navItem: NavItemProps, idx) => (
                <li key={idx} className={''}>
                  <NavItem name={navItem.name} childrenNav={navItem.childrenNav} link={navItem.link}/>
                </li>
              ))
            }
          </ul>
          {/*<ClientOnly>*/}
            <ThemeSwitch/>
          {/*</ClientOnly>*/}
          <AnimatePresence>
            {
              !isLg && toc &&
                <motion.div
                    layout
                    initial={{ opacity: 0, x: 20, width:0, }}
                    animate={{ opacity: 1, x: 0,  width:40, }}
                    exit={{ opacity: 0, x: 20,  width:0, }}
                    className={'h-10 rounded-full flex items-center justify-center'}
                     onClick={() => !isLg && setShowToc(true)}>
                    <Menu className={'w-6 h-6'}/>
                </motion.div>
            }
          </AnimatePresence>
        </div>
        {
          !isLg && <div
                ref={popoverRef}
                className={` overflow-hidden relative lg:hidden bg-background/90`}
            >
              <AnimatePresence>
                {showCatalog && catalogs &&
                    <motion.div
                      initial={{height: 0}}
                      animate={{ height:'auto' }}
                      exit={{height: 0}}
                      className={'relative p-2'} style={{
                        maxWidth: width ?? 0
                      }}
                    >
                        <ul className={'space-y-4 overflow-hidden'}>
                          {
                            catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
                          }
                        </ul>
                    </motion.div>
                }
              </AnimatePresence>
            <AnimatePresence>
              {
                showToc && toc && <motion.div

                      initial={{height: 0}}
                      animate={{ height:'auto' }}
                      exit={{height: 0}}
                  >
                      <Toc className={'relative p-2'}/>
                  </motion.div>
              }
            </AnimatePresence>
            </div>
        }
      </motion.div>
    </header>
  )
}