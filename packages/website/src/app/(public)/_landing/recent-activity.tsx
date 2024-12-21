'use client'
import React, {HTMLProps} from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import ClientActivityTimeLine from "./_components/activityTimeline.client";
import { useMeasure } from "@uidotdev/usehooks";
import ScrollToBottom from "@/components/scrollToBottom";
import {ChevronDown} from "lucide-react";


interface RecentlyProps {
}


export default function RecentlyPage({
 ...rest
}: RecentlyProps & HTMLProps<HTMLDivElement>) {
  const keys = ['spotify', 'steam', 'github']
  // const [ref, { height }] = useMeasure();

  // const [containerRef, { height: containerHeight }] = useMeasure();
  // todo useMeasure cause infinity rerender, need fix later
  // const tabContentHeight = ((containerHeight??0) - ((height??0) + 16))
  return (
    <section {...rest}>
      <div className={'grow flex flex-col max-w-[1200px] max-h-max w-full mx-auto'}>
        <div className={"text-4xl lg:pt-14 lg:pb-7 pt-4 pb-4"}>最近</div>
        <div className={"grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-180px)] lg:h-[calc(100vh-248px)]"}>
          <Tabs defaultValue="github" className="w-full overflow-y-hidden flex flex-col">
            <TabsList className="flex items-center justify-start w-auto gap-1 bg-transparent p-0 mt-0">
              <TabsTrigger value="github"
                           className="data-[state=active]:bg-transparent bg-transparent px-1">最近在做</TabsTrigger>
              <TabsTrigger value="spotify"
                           className="data-[state=active]:bg-transparent bg-transparent px-1">最近在听</TabsTrigger>
              <TabsTrigger value="steam"
                           className="data-[state=active]:bg-transparent bg-transparent px-1">最近在玩</TabsTrigger>
              <TabsTrigger value="bilibili"
                           className="data-[state=active]:bg-transparent bg-transparent px-1">最近在看</TabsTrigger>
            </TabsList>
            {
              keys.map((key) => (
                <TabsContent value={key} key={key} className="p-2 overflow-y-hidden">
                  <ClientActivityTimeLine activityType={key} className="pl-2 lg:pl-20"/>
                </TabsContent>
              ))
            }
          </Tabs>
          <Tabs defaultValue="io" className="w-full overflow-y-hidden  flex-col hidden lg:flex">
            <TabsList className="flex items-center justify-start w-auto gap-1 bg-transparent p-0 mt-0">
              <TabsTrigger value="io"
                           className="data-[state=active]:bg-transparent bg-transparent px-1">最近IO</TabsTrigger>
            </TabsList>
            <TabsContent value={'io'} className="p-2 overflow-y-hidden">
              <ClientActivityTimeLine activityType={'github'} className="pl-2 lg:pl-20"/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className={'mb-2 mx-auto'}>
        <ScrollToBottom fraction={2}>
          <div className={"flex flex-col items-center justify-center"}>
            <span className={'text-sm text-muted-foreground'}>还有什么？</span>
            <ChevronDown className={'animate-bounce w-3 h-3'}/>
          </div>
        </ScrollToBottom>
      </div>
    </section>
  )
}