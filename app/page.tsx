import MainPage from "@/app/_landing/main";
import RecentlyPage from "@/app/_landing/recent-activity";
import {ChevronsDown, Github, MailIcon, RssIcon} from "lucide-react";
import {codeToHtml} from "shiki";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {ContactDock} from "@/app/_landing/contact-dock";

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
    link: '/feed',
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
    theme: "nord",
  }))
  return (
    <>
      <MainPage img={"/avatar.jpg"} fallback={"KT"} className={'min-h-screen flex flex-col px-10 md:px-40 pt-[64px] items-center my-auto'}>
        <h2 className={'w-full mx-auto text-center md:text-start text-3xl font-bold'}>Hi, this is kt. 👋</h2>
        <div>
          <div>
            <span>你好，我是KT。</span>
            <span className={'pr-2'}>一名全栈</span>
            <span className={'bg-black dark:bg-zinc-500 text-white p-1 rounded-md font-thin'}>开发者</span>
          </div>
          <div className={'rounded-lg my-2'}>
              <div className={'rounded-lg bg-black text-white *:p-2 *:rounded-lg'} dangerouslySetInnerHTML={{__html: html}} />
          </div>
          <div className={'mt-2 flex items-center space-x-1  justify-center'}>
            <span>你可以通过这些方式找到我</span>
            <span><ChevronsDown className={'w-5 h-5'}/></span>
          </div>
          <div className={'flex space-x-2 items-center text-white justify-center'}>
          <Suspense fallback={null}>
            <ContactDock/>
          </Suspense>
          </div>
        </div>
      </MainPage>
      <Suspense fallback={<Skeleton className={'w-full min-h-screen'}/>}>
        <RecentlyPage className={'min-h-screen flex flex-col px-10 md:px-40 pt-[64px] items-center my-auto'}/>
      </Suspense>

    </>
  );
}
