import RecentItem, {RecentItemProps} from "@/app/(landing)/recentItem";
import {HTMLProps} from "react";
import {cn} from "@/lib/utils";
import {getRecentActivity} from "@/queries/activities";
import dayjs from "dayjs";

interface RecentlyProps {
  // activities: RecentItemProps[];
  // blogActivities: RecentItemProps[];
}

interface TimeLineItemProps {
  isFirst: boolean;
  isLast:boolean;
  time: number;
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
        'relative flex group',
        'after:bg-primary after:h-2 p-2 after:w-2 after:-left-4 after:top-1/2 after:absolute after:rounded-full after:content-[\'\'] after:-translate-y-1/2',
        'before:bg-primary before:w-0.5 before:absolute before:-left-[13px] before:content-[\'\']',
        !isFirst && !isLast && ' before:-translate-y-1/2 before:top-1/2  before:h-full',
        !isFirst && isLast && 'before:top-0  before:h-1/2',
         isFirst && !isLast && 'before:top-1/2  before:h-1/2',
        rest.className
      )}>
      <div className={'absolute text-zinc-400 text-sm p-2 -left-4 -translate-x-full top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-70 duration-300 transition-opacity ease-in-out'}>{dayjs().to(dayjs(props.time))}</div>
      {children}
    </li>
  )
}

export default async function RecentlyPage({
 // activities,
 // blogActivities,
 ...rest
}: RecentlyProps & HTMLProps<HTMLDivElement>) {
  const {activities, blogActivities} = await getRecentActivity()
  return (
    <section {...rest}>
      <div className={'grow flex flex-col  max-w-[1024px] w-full mx-auto'}>
        <div className={"text-4xl pt-20 pb-10"}>最近</div>
        <div className={"grid grid-cols-1 lg:grid-cols-1"}>
          <div>
              <div className={'pb-10 pt-6  text-xl'}>最近活动</div>
              <div className={'max-w-[480px] max-h-full overflow-y-auto pl-6 md:pl-24'}>
              <TimeLine>
                {
                  activities.map((activity:any, idx:number) => (
                    <TimeLineItem isFirst={idx == 0} isLast={idx == activities.length - 1} key={idx} time={activity.time}>
                      <RecentItem {...activity}/>
                    </TimeLineItem>
                  ))
                }
              </TimeLine>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}