import MainPage from "@/app/(public)/_landing/main";
import {ContactDock} from "@/app/(public)/_landing/contact-dock";

import {ChevronDown, ChevronsDown, Github, MailIcon, RssIcon} from "lucide-react";
import {codeToHtml} from "shiki";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {NotKnowledgebasePage} from "@/hooks/use-catalog";

const RecentPage = dynamic(() => import("@/app/(public)/_landing/recent-activity"), {
  loading: (loadingProps)=> <Skeleton className={'w-full min-h-screen'}/>,
})
const ProjectPage = dynamic(() => import("@/app/(public)/_landing/projects"), {
  loading: (loadingProps)=> <Skeleton className={'w-full min-h-screen'}/>,
})

const code =
`fun AreYouOK():Boolean {
    return true
}
`

export default async function Home() {
  const socials = [
    {
    name: 'github',
    link: 'https://github.com/ktkongtong',
    c: Github,
    className: 'bg-zinc-700'
  },{
    name: 'rss',
    link: '/feed.xml',
    c: RssIcon,
    className: 'bg-yellow-500'
  },{
    name: 'mail',
    link: 'mailto:kt@ktlab.io',
    c: MailIcon,
    className: 'bg-red-300'
  }]
  const html = await (codeToHtml(code, {
    lang: "kotlin",
    theme: "github-dark",
  }))
  return (
    <>
      <MainPage img={"/avatar.jpg"} fallback={"KT"}
                className={'min-h-screen flex flex-col px-10 md:px-40 pt-[64px] items-center my-auto w-full'}>
        <h2 className={'selection:bg-primary selection:text-primary-foreground  w-full mx-auto text-center md:text-start text-3xl font-bold'}>Hi, this is kt. 👋</h2>
        <div>
          <div className={'selection:bg-primary selection:text-primary-foreground'}>
            <span>你好，我是KT。</span>
            <span className={'pr-2'}>一名全栈</span>
            <span className={'bg-accent selection:bg-primary selection:text-primary-foreground  text-accent-foreground p-1 rounded-md font-thin'}>开发者</span>
          </div>
          <div className={'rounded-lg my-2'}>
            <div className={'rounded-lg *:p-2 *:rounded-lg  select-none '}
                 dangerouslySetInnerHTML={{__html: html}}/>
          </div>
          <div className={'mt-2 flex items-center select-none space-x-1  justify-center'}>
            <span>你可以通过这些方式找到我</span>
            <span><ChevronsDown className={'w-5 h-5'}/></span>
          </div>
          <div className={'flex space-x-2 items-center justify-center'}>
            <ContactDock/>
          </div>
        </div>
      </MainPage>
      <RecentPage className={'flex min-h-screen h-[calc(100vh-200px)] lg:h-[calc(100vh-228px)] select-none flex-col px-10 w-full md:px-40 pt-[64px] items-center my-auto'}/>
      <ProjectPage className={'h-[calc(100vh-98px)] select-none lg:h-[calc(100vh-97px)] w-full flex flex-col px-10 md:px-40 pt-[64px] my-auto'}/>
      <NotPostPage/>
      <NotKnowledgebasePage/>
    </>
  );
}
