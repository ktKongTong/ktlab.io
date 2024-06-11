import RecentItem, {RecentItemProps} from "@/app/(landing)/recentItem";
import {HTMLProps} from "react";
import {cn} from "@/lib/utils";

interface RecentlyProps {
  activities: RecentItemProps[];
  blogActivities: RecentItemProps[];
}

interface TimeLineItemProps {
  isFirst: boolean;
  isLast:boolean;
  children: React.ReactNode;
}

function TimeLine(props: HTMLProps<HTMLUListElement>) {
  const { children, className, ...rest} = props;
  return (
    <ul className={className} {...rest} >
      {children}
    </ul>
  )
}

function TimeLineItem(props: TimeLineItemProps & HTMLProps<HTMLLIElement>) {
  const {isFirst, isLast, children, ...rest} = props
  return (
    <li
      {...rest}
      className={cn(
        'relative flex',
        'after:bg-primary after:h-2 p-2 after:w-2 after:-left-4 after:top-1/2 after:absolute after:rounded-full after:content-[\'\'] after:-translate-y-1/2',
        'before:bg-primary before:w-0.5 before:absolute before:-left-[13px] before:content-[\'\']',
        !isFirst && !isLast && ' before:-translate-y-1/2 before:top-1/2  before:h-full',
        !isFirst && isLast && 'before:top-0  before:h-1/2',
         isFirst && !isLast && 'before:top-1/2  before:h-1/2',
        rest.className
      )}>
      {children}
    </li>
  )
}

export default function RecentlyPage({
 activities,
 blogActivities,
 ...rest
}: RecentlyProps & HTMLProps<HTMLDivElement>) {
  return (
    <section {...rest}>
      <div className={'grow flex flex-col  max-w-[1024px] w-full mx-auto'}>
        <div className={"text-4xl pt-20 pb-10"}>最近</div>
        <div className={"grid grid-cols-1 lg:grid-cols-1"}>
          <div>
            <div className={'pb-10 pt-6  text-xl'}>最近活动</div>
              <TimeLine >
                {
                  activities.map((activity, idx) => (
                    <TimeLineItem isFirst={idx == 0} isLast={idx == activities.length - 1} key={idx}>
                      <RecentItem {...activity}/>
                    </TimeLineItem>
                  ))
                }
              </TimeLine>
            </div>
        </div>
      </div>
    </section>
  )
}