'use client'

import { useActivity } from "@/hooks/query/use-activity";
import RecentItem from "./recent-activity-item";
import { TimeLineItem } from "./timeline";
import React, {HTMLProps, useEffect} from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
interface ClientTimeLineProps {
    activityType: string;
    className?: string;
}

const itemRender = (item: any, idx: number) => <RecentItem {...item} className={'glow:invisible'}/>

function ClientActivityTimeLine(props: ClientTimeLineProps) {
    const { activityType:type, className, ...rest} = props;
    const { data, status, error } = useActivity(type)
    return (
      <AnimatePresence mode="wait">
        {status === 'pending' ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Skeleton className="h-full w-full bg-zinc-300/70 rounded-lg" />
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-500"
          >
            错误: {error.message}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className={'max-h-full h-full overflow-y-scroll'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          <WrappedTimeLine items={data} itemRender={itemRender} className={className} {...rest}/>

          </motion.div>
        )}
      </AnimatePresence>
    );
}

export default React.memo(ClientActivityTimeLine)

interface WrappedTimeLineProps<T extends {id: string, time: number}> {
    items: T[]; 
    itemRender: (item: T, idx: number) => React.ReactNode;
}

export function WrappedTimeLine<T extends {id: string, time: number}>(props: HTMLProps<HTMLUListElement> & WrappedTimeLineProps<T>) {
    const { children, className, items, itemRender, ...rest} = props;
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        // if(!ref.current ) return
        // if(cur.classList.contains('glow-capture')) return
        //
        if(ref.current) {
            const cur = ref.current
            cur.classList.add('glow-capture')
            // const elem = React.createElement('div', { className: "glow-capture" })

            const capture = cur
            const clonedChild = capture.children[0].cloneNode(true)
            const overlay = capture.querySelector(".glow-overlay") as HTMLElement | null
            if((overlay?.children.length ?? 0) > 0) {
                return
            }
            overlay?.appendChild(clonedChild)
            const leaveEvent = () => {
                overlay?.style?.setProperty("--glow-opacity", "0")
            }

            const moveEvent = (event: any) => {

                const x = 64
                // todo: scroll bug
                const y = event?.pageY - capture?.offsetTop + (capture?.parentElement?.scrollTop ?? 0)
                overlay?.style?.setProperty("--glow-x", `${x}px`)
                overlay?.style?.setProperty("--glow-y", `${y}px`)
                overlay?.style?.setProperty("--glow-opacity", "1")
            }
            capture.addEventListener("mousemove", moveEvent)
            capture.addEventListener("mouseleave", leaveEvent)
            return ()=> {
                capture.removeEventListener('mousemove', moveEvent)
                capture.removeEventListener('mouseleave', leaveEvent)
            }
        }
    }, [ref]);

    return (
          <div ref={ref}  className={'relative pl-2'}>
              <ul className={cn('', className)} {...rest}>
                  {
                      items.map((item: any, idx: number) => (
                        <TimeLineItem isFirst={idx == 0} isLast={idx == items.length - 1} key={item.id}
                                      time={item.time}>
                            {itemRender(item, idx)}
                        </TimeLineItem>
                      ))
                  }
              </ul>
              <div className="glow-overlay relative pl-2"></div>
          </div>
    )
}
