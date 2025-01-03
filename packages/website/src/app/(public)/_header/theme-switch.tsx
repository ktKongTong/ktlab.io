'use client'

import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {flushSync} from "react-dom";
import React, {useRef} from "react";


export default function ThemeSwitch() {
  const {theme, setTheme, systemTheme} = useTheme()
  const nextTheme = () => {
    switch (theme) {
      case 'light': return 'dark'
      case 'dark': return 'light'
      case 'system': return 'light'
    }
    return "light"
  }
  const ref = useRef<HTMLDivElement>(null);
  const setToggle = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme());
      return;
    }
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme());
      });
    }).ready;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 900,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }
  return (
      <motion.div
        className={'p-2 w-10 h-10 border rounded-full border-transparent cursor-pointer'}
        onClick={() => setToggle()}
        ref={ref}
      >
        {/*wired ssr problem*/}
        {/*<AnimatePresence>*/}
          {
            !(theme === 'dark' || (theme === 'system' && systemTheme === 'light')) &&
              <motion.div
                key={'light-theme'}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
              ><Sun/></motion.div>
          }
          {
            (theme === 'dark' || (theme === 'system' && systemTheme === 'light')) &&
              <motion.div
                  key={'dark-theme'}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{opacity: 1, y: 0 }}
            >
              <Moon/>
            </motion.div>
        }
      </motion.div>
  )
}