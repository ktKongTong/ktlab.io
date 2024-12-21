import {ChevronDown} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import ScrollToBottom from "@/components/scrollToBottom";

interface MainPageProps {
  img: string
  fallback: string
  children: React.ReactNode
}

export default function MainPage({
  img,
  fallback,
  children,
  ...rest
}:MainPageProps & React.HTMLProps<HTMLDivElement>
) {
  return (
    <section {...rest}>
      <div className={'grow flex flex-col md:flex-row items-center md:justify-between max-w-[1024px] w-full mx-auto pt-[120px] md:pt-[0px] md:pb-[200px] space-y-10'}>
        <Avatar className={'w-40 h-40 rounded-full mx-2 drop-shadow-md select-none '}>
          <AvatarImage src={img}/>
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div>
          {children}
        </div>
      </div>
      <div className={'mb-2 mx-auto'}>
        <ScrollToBottom>
          <div className={"flex flex-col items-center justify-center"}>
            <span className={'text-sm text-muted-foreground'}>看看最近在干什么？</span>
            <ChevronDown className={'animate-bounce w-3 h-3'}/>
          </div>
        </ScrollToBottom>
      </div>
    </section>
  )
}