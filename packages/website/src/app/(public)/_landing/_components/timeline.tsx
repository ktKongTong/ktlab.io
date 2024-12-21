
import { cn, formatRelativeTime } from "@/lib/utils";
import React, { HTMLProps } from "react";



interface TimeLineItemProps {
    isFirst: boolean;
    isLast:boolean;
    time: number;
    children: React.ReactNode;
}

export function TimeLine(props: HTMLProps<HTMLUListElement>) {
    const { children, className, ...rest} = props;
    return (
      <ul className={className} {...rest} >
        {children}
      </ul>
    )
}

export function TimeLineItem(props: TimeLineItemProps & HTMLProps<HTMLLIElement>) {
  const {isFirst, isLast, children, ...rest} = props
  return (
    <li
      {...rest}
      className={cn(
        'relative flex group',
        'after:glow:ring-1 after:glow:ring-primary after:glow:bg-primary',
        'before:glow:bg-primary before:glow:shadow-primary',
        'group-hover:after:scale-120 after:duration-300 after:transition-all after:ease-in-out',
        // 'hover:before:from-primary hover:before:via-secondary hover:before:to-primary hover:before:bg-gradient-to-b before:duration-300 before:transition-all before:ease-in-out',
        'after:bg-secondary after:h-2 p-2 after:w-2 after:-left-4 after:top-1/2 after:absolute after:rounded-full after:content-[\'\'] after:-translate-y-1/2',
        'before:bg-secondary before:w-0.5 before:absolute before:-left-[13px] before:content-[\'\']',
        !isFirst && !isLast && ' before:-translate-y-1/2 before:top-1/2  before:h-full',
        !isFirst && isLast && 'before:top-0  before:h-1/2',
        isFirst && !isLast && 'before:top-1/2  before:h-1/2',
        rest.className
      )}>
      <div
        className={'absolute cursor-default text-secondary-foreground text-sm p-2 -left-4 -translate-x-full top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-70 duration-300 transition-opacity ease-in-out'}>
        {formatRelativeTime(props.time)}
      </div>
      {children}
    </li>
  )
}