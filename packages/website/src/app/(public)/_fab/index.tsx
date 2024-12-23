'use client'
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import Toc from "@/app/_post-layout/toc";
import { TableOfContents } from "lucide-react";

export default function FAB() {

  const [showToc, setShowToc] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const handleClickOutside = (event: any) => {
    if (
      ref.current && !ref.current.contains(event.target)
    ) {
      setShowToc(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return <div className={' fixed sm:hidden right-2 bottom-4 w-full flex flex-col items-end'}>
    <AnimatePresence>
      {
        showToc && <motion.div
              initial={{width: 0}}
              animate={{width: 'auto'}}
              exit={{width: 0}}
              ref={ref}
              className={'w-full'}
          >
              <Toc className={'relative p-2 w-fit bg-card rounded-lg border-border border '}/>
          </motion.div>
      }
    </AnimatePresence>
    <div className={'grid gap-1 w-12 h-auto mt-2'}>
      <div className={'w-8 h-8 p-1 border shadow-md border-border bg-white/80 rounded-full flex items-center justify-center  '} onClick={() => {
        setShowToc(s => !s)
      }}>
        <TableOfContents className={'w-4 h-4'} />
      </div>
    </div>


  </div>
}