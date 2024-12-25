import React from "react";
import {FragmentList} from "@/app/(public)/fragment/fragments-loader";
import {NotPostPage} from "@/app/_post-layout/use-post";
import {NotKnowledgebasePage} from "@/hooks/use-catalog";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ktlab | Fragments",
    description: "Fragments",
  }
}


export default function FragmentPage(){
  return <main className="grow flex flex-col items-center max-w-[1024px] w-full mx-auto pt-[64px] ">
    <div className={'w-full px-4 pt-4'}>
      <FragmentList/>
    </div>
    <NotPostPage/>
    <NotKnowledgebasePage/>
  </main>
}
