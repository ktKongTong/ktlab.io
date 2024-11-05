'use client'
import {HTMLProps} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import ClientActivityTimeLine from "./_components/activityTimeline.client";
import { useMeasure } from "@uidotdev/usehooks";


interface RecentlyProps {
}


export default function RecentlyPage({
 ...rest
}: RecentlyProps & HTMLProps<HTMLDivElement>) {
  const keys = ['spotify', 'steam', 'github']
  const [ref, { height }] = useMeasure();

  const [containerRef, { height: containerHeight }] = useMeasure();

  const tabContentHeight = ((containerHeight??0) - ((height??0) + 16))
  return (
    <section {...rest}>
      <div className={'grow flex flex-col max-w-[1024px] w-full mx-auto'}>
        <div className={"text-4xl lg:pt-14 lg:pb-7 pt-10 pb-4"}>最近</div>
        <div className={"grid grid-cols-1 lg:grid-cols-2 "} ref={containerRef}>
          <Tabs defaultValue="github" className="w-full overflow-y-hidden h-[calc(100vh-160px)] lg:h-[calc(100vh-188px)] flex flex-col">
            <TabsList className="flex items-center justify-start w-auto gap-1 bg-transparent p-0 mt-0" ref={ref}>
              <TabsTrigger value="github" className="data-[state=active]:bg-transparent bg-transparent px-1">最近在做</TabsTrigger>
              <TabsTrigger value="spotify" className="data-[state=active]:bg-transparent bg-transparent px-1">最近在听</TabsTrigger>
              <TabsTrigger value="steam" className="data-[state=active]:bg-transparent bg-transparent px-1">最近在玩</TabsTrigger>
              <TabsTrigger value="bilibili" className="data-[state=active]:bg-transparent bg-transparent px-1">最近在看</TabsTrigger>
            </TabsList>
              {
                keys.map((key) => (
                  <TabsContent value={key} key={key} className="p-2 overflow-y-auto" style={{height: tabContentHeight}}>
                    <ClientActivityTimeLine activityType={key} className="pl-4 lg:pl-20"/>
                  </TabsContent>
                ))
              }
          </Tabs>
          <Tabs defaultValue="io" className="w-full overflow-y-hidden h-[calc(100vh-160px)] lg:h-[calc(100vh-188px)] flex-col hidden lg:flex">
            <TabsList className="flex items-center justify-start w-auto gap-1 bg-transparent p-0 mt-0">
              <TabsTrigger value="io" className="data-[state=active]:bg-transparent bg-transparent px-1">最近IO</TabsTrigger>
            </TabsList>
            <TabsContent value={'io'} className="p-2 overflow-y-auto" style={{height: tabContentHeight}}>
              <ClientActivityTimeLine activityType={'github'} className="pl-4"/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}