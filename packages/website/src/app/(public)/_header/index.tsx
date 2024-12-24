'use client'
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import NavItem, {NavItemProps} from "./nav-item";
import {useCatalog} from "@/hooks/use-catalog";
import {useMeasure} from "@uidotdev/usehooks";
import {LogIn, Menu, UserRoundPlus} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import LockBodyScroll from "@/components/LockBodyScroll";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {useBreakpoint} from "@/hooks/use-breakpoint";
import {usePostId} from "@/app/_post-layout/use-post";
import ThemeSwitch from "@/app/(public)/_header/theme-switch";
import {CatalogSelector} from "@/app/(public)/knowledge/_catalog/aside/catalog-selector";
import {CatalogItem} from "@/app/(public)/knowledge/_catalog/aside/catalog-item";


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
  const { catalogs, currentCatalog, isKnowledgebasePage } = useCatalog()
  const [showCatalog, setShowCatalog] = useState<boolean>(false)
  const popoverRef = useRef<HTMLDivElement>(null);
  const [ref, {width, height}] = useMeasure();
  const handleClickOutside = (event: any) => {
    if (
      popoverRef.current && !popoverRef.current.contains(event.target)
    ) {
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
      // const {handleMouseMove, MouseTrackGlow} = useBgGlow()
      return (
      <header
        {...rest}
        className={cn(' select-none flex items-center justify-center min-h-16 relative', rest.className)}>
        <motion.div
          className={" border-b lg:border border-border  absolute top-0 overflow-hidden mt-6 rounded-[24px] grow lg:grow-0 transition-all border bg-background "}>
        <motion.nav
          // onMouseMove={handleMouseMove}
          ref={ref}
          className={cn(
            'flex items-center justify-center ',
            'group',
            'shadow-lg',
            //  shadow-zinc-800/5 ring-1 ring-zinc-900/5 bg-gradient-to-b from-zinc-50/70 to-white/90 dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10
            'rounded-full',
            'relative',
            )}

        >
            {/*<MouseTrackGlow/>*/}
            <Avatar className={'w-10 h-10 rounded-full'}>
              <AvatarImage src={img}/>
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <ul className={'flex items-center justify-center gap-2 z-10'}>
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
                !isLg && isKnowledgebasePage &&
                  <motion.div
                      layout
                      initial={{opacity: 0, x: 20, width: 0,}}
                      animate={{opacity: 1, x: 0, width: 40,}}
                      exit={{opacity: 0, x: 20, width: 0,}}
                      className={'h-10 rounded-full flex items-center justify-center'}
                      onClick={() => !isLg && setShowCatalog(s => !s)}>
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
              <UserButton/>
            </SignedIn>
    </motion.nav>

    {
      !isLg && <div
            ref={popoverRef}
            className={`max-h-[calc(100vh-64px)] overflow-y-scroll lg:hidden bg-background`}
        >
          <AnimatePresence>
            {showCatalog && catalogs &&
              <motion.div
                initial={{height: 0}}
                animate={{height: 'auto'}}
                exit={{height: 0}}
                className={'overflow-y-scroll p-2'} style={{ maxWidth: width ?? 0 }}
              >
                <ul className={''}>
                  {/*catalog item*/}
                  <CatalogSelector/>
                  {
                    currentCatalog?.catalogs.map((catalog, idx) => (<CatalogItem key={idx} {...catalog} />))
                  }
                </ul>
                <LockBodyScroll/>
              </motion.div>
            }
          </AnimatePresence>
        </div>
    }
  </motion.div>
</header>
)
}