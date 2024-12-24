import React from "react";
import {FragmentList} from "@/app/(public)/fragment/fragments-loader";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {NotKnowledgebasePage} from "@/hooks/use-catalog";



export default function FragmentPage(){
  return <main className="grow flex flex-col items-center max-w-[1024px] w-full mx-auto pt-[64px] space-y-10">
    <div className={'px-4 py-10'}>
      <FragmentList/>
    </div>
    <NotPostPage/>
    <NotKnowledgebasePage/>
  </main>
}
