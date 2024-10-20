'use client'
import { useState } from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";
import Link from "@/components/link";
export interface NavItemProps {
  name: string,
  link?: string,
  childrenNav: NavItemProps[]
}

export default function NavItem(
{
  name,
  link,
  childrenNav
}:NavItemProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    childrenNav.length > 0 ? (
        <HoverCard openDelay={100} closeDelay={70} open={isOpen} onOpenChange={setOpen}>
          <HoverCardTrigger asChild>
            <Button variant="link" className={'text-secondary-foreground hover:text-primary'}>
              {
                link ? <Link href={link}>{name}</Link> : name
              }
            </Button>
          </HoverCardTrigger>
          <AnimatePresence>
            {
              isOpen && (
                <HoverCardContent asChild forceMount className={'data-[state=open]:animate-none data-[state=closed]:animate-none min-w-16 w-fit shadow-none rounded-lg p-1'}>
                  <motion.ul
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.1, stiffness: 100 , type:'spring'}}
                  >
                    {
                      childrenNav.map((item, index) => (
                        <li key={index}>
                          <NavItem name={item.name} childrenNav={item.childrenNav} link={item.link} key={index}/>
                        </li>
                      ))
                    }
                  </motion.ul>
                </HoverCardContent>
              )
            }
          </AnimatePresence>
        </HoverCard>
      ) :
      <Button variant="link" className={'text-secondary-foreground hover:text-primary'}>
        {
          link ? <Link href={link}>{name}</Link> : name
        }
      </Button>
  )
}