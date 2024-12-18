'use client'
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ThemeSwitch from "./theme-switch";
import NavItem, {NavItemProps} from "./nav-item";
import Toc from "@/app/_post-layout/toc";
import useToc from "@/hooks/use-toc";
import {CatalogItem} from "@/app/(public)/knowledge/catalog-item";
import {useMeasure} from "@uidotdev/usehooks";
import {LogIn, Menu, UserRoundPlus} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import LockBodyScroll from "@/components/LockBodyScroll";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {useBreakpoint} from "@/hooks/use-breakpoint";


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
  const {catalogs, toc} = useToc()
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
  }
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
        className={" border-b lg:border absolute top-0 overflow-hidden mt-6 rounded-[24px] grow lg:grow-0 transition-all border bg-background"}>
        <div
          ref={ref} className={'flex items-center justify-center'}>
          <Avatar className={'w-10 h-10 rounded-full'} onClick={()=>!isLg && setShowCatalog(s=>!s)}>
            <AvatarImage src={img}/>
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <ul className={'flex items-center justify-center gap-2'}>
            {
              navItems.map((navItem: NavItemProps, idx) => (
                <li key={idx} className={''}>
                  <NavItem name={navItem.name} childrenNav={navItem.childrenNav} link={navItem.link}/>
                </li>
              ))
            }
          </ul>
          <ThemeSwitch/>
          <AnimatePresence>
            {
              !isLg && toc &&
                <motion.div
                    layout
                    initial={{ opacity: 0, x: 20, width:0, }}
                    animate={{ opacity: 1, x: 0,  width:40, }}
                    exit={{ opacity: 0, x: 20,  width:0, }}
                    className={'h-10 rounded-full flex items-center justify-center'}
                    onClick={() => !isLg && setShowToc(s => !s)}>
                    <Menu className={'w-6 h-6'}/>
                </motion.div>
            }
          </AnimatePresence>


          <SignedOut>
            <SignInButton mode={'modal'}>
              <UserRoundPlus className={'h-10 w-10 rounded-full p-2'}/>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

        </div>

        {
          !isLg && <div
                ref={popoverRef}
                className={`max-h-[calc(100vh-64px)] overflow-y-scroll lg:hidden bg-background`}
            >
            {
              ((showCatalog && catalogs) || (showToc && toc ))
              && <LockBodyScroll/>
            }
              <AnimatePresence>
                {showCatalog && catalogs &&
                    <motion.div
                      initial={{height: 0}}
                      animate={{ height:'auto' }}
                      exit={{height: 0}}
                      className={'overflow-y-scroll p-2'} style={{
                        maxWidth: width ?? 0
                      }}
                    >
                      <ul className={''}>
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
                      <Toc className={'relative p-2'} toc={toc}/>
                  </motion.div>
              }
            </AnimatePresence>
            </div>
        }
      </motion.div>
    </header>
  )
}