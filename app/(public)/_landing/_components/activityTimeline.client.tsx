'use client'

import { useActivity } from "@/hooks/query/use-activity";
import RecentItem from "./recent-activity-item";
import { TimeLineItem } from "./timeline";
import React, { HTMLProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { motion, AnimatePresence } from 'framer-motion';
interface ClientTimeLineProps {
    activityType: string;
    className?: string;
}

const itemRender = (item: any, idx: number) => <RecentItem {...item}/>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WrappedTimeLine items={data} itemRender={itemRender} className={className} {...rest} />
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
    return (
      <ul className={className} {...rest} >
        {
            items.map((item:any, idx:number) => (
            <TimeLineItem isFirst={idx == 0} isLast={idx == items.length - 1} key={item.id} time={item.time}>
                {itemRender(item, idx)}
            </TimeLineItem>
            ))
        }
      </ul>
    )
}
